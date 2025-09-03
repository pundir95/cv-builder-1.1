import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Check, UploadSimple, Warning } from "@phosphor-icons/react";
import type { UpdateUserDto } from "@reactive-resume/dto";
import { updateUserSchema } from "@reactive-resume/dto";
import {
  Button,
  buttonVariants,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { UserAvatar } from "@/client/components/user-avatar";
import { useToast } from "@/client/hooks/use-toast";
import { useResendVerificationEmail } from "@/client/services/auth";

import { useUpdateUserProfile, useUser, useGetUserProfile } from "@/client/services/user";
import { BASE_URL } from "@/client/config/config";

// Separate memoized Avatar component to prevent re-renders
const MemoizedAvatar = React.memo(({ 
  imageUrl, 
  initials, 
  size = 80, 
  onError, 
  onLoad 
}: { 
  imageUrl: string | null; 
  initials: string; 
  size?: number; 
  onError: () => void; 
  onLoad: () => void; 
}) => {
  if (imageUrl) {
    return (
      <img
        alt="Profile preview"
        src={imageUrl}
        className="rounded-full object-cover border-2 border-border"
        style={{ width: size, height: size }}
        onError={onError}
        onLoad={onLoad}
      />
    );
  } else {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-secondary text-center text-sm font-semibold text-secondary-foreground border-2 border-border"
      >
        {initials}
      </div>
    );
  }
});

export const AccountSettings = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { updateUserProfile, loading } = useUpdateUserProfile();
  const { resendVerificationEmail } = useResendVerificationEmail();
  const { userProfile, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetUserProfile();

  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      picture: "",
      first_name: "",
      last_name: "",
      email: "",
      locale: "",
    },
  });

  useEffect(() => {
    user && onReset();
  }, [user]);

  // Fetch profile data on component mount
  useEffect(() => {
    // Only refetch if we don't have data yet
    if (!userProfile && !isLoadingProfile) {
      refetchProfile();
    }
  }, [refetchProfile, userProfile, isLoadingProfile]);

  // Update form when userProfile data is loaded
  useEffect(() => {
    if (userProfile && user) {
      onReset();
    }
  }, [userProfile, user]);

  // Cleanup preview URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onReset = () => {
    if (!user) return;

    // Clear any preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }

    // Clear selected file and error state
    setSelectedFile(null);
    setImageError(false);

    // Use userProfile data if available, otherwise fall back to user data
    const profileData = userProfile || user;
    
    // Construct proper image URL for backend images
    let pictureUrl = "";
    if (profileData.profile_image) {
      pictureUrl = profileData.profile_image.startsWith('http') 
        ? profileData.profile_image 
        : `${BASE_URL}${profileData.profile_image}`;
    } else if (profileData.picture) {
      pictureUrl = profileData.picture;
    }
    
    form.reset({
      picture: pictureUrl,
      first_name: profileData.first_name ?? "",
      last_name: profileData.last_name ?? "",
      email: profileData.email,
      locale: profileData.locale ?? "en-US",
    });
  };

  const onSubmit = async (data: UpdateUserDto) => {
    if (!user) return;

    // Check if email has changed and display a toast message to confirm the email change
    if (user.email !== data.email) {
      toast({
        variant: "info",
        title: t`Check your email for the confirmation link to update your email address.`,
      });
    }

    // Convert form data to FormData
    const formData = new FormData();
    if (data.email) formData.append('email', data.email);
    if (data.picture) formData.append('picture', data.picture);
    if (data.first_name) formData.append('first_name', data.first_name);
    if (data.last_name) formData.append('last_name', data.last_name);
    if (data.locale) formData.append('locale', data.locale);

    try {
      await updateUserProfile(formData);
      toast({
        variant: "success",
        title: t`Profile updated successfully!`,
      });
      form.reset(data);
    } catch (error) {
      toast({
        variant: "error",
        title: t`Failed to update profile. Please try again.`,
      });
    }
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      // Store the selected file for later upload
      setSelectedFile(file);
      
      // Clear any previous error state
      setImageError(false);
      
      // Create preview URL immediately
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Update form field with preview URL for immediate display
      form.setValue('picture', previewUrl);
    }
  };

  const onResendVerificationEmail = async () => {
    const data = await resendVerificationEmail();

    toast({ variant: "success", title: data.message });
  };

  // Memoize the image URL to prevent unnecessary re-renders
  const currentImageUrl = useMemo(() => {
    if (imagePreview) {
      return imagePreview;
    }
    const profileData = userProfile || user;
    if (profileData?.profile_image) {
      return profileData.profile_image.startsWith('http') 
        ? profileData.profile_image 
        : `${BASE_URL}${profileData.profile_image}`;
    }
    return null;
  }, [imagePreview, userProfile?.profile_image, user?.picture]);

  // Memoize the initials to prevent re-renders when form changes
  const userInitials = useMemo(() => {
    const profileData = userProfile || user;
    return (profileData?.first_name?.[0] || '') + (profileData?.last_name?.[0] || '') || 'A';
  }, [userProfile?.first_name, userProfile?.last_name, user?.first_name, user?.last_name]);

  // Stable error handlers to prevent re-renders
  const handleImageError = useCallback(() => setImageError(true), []);
  const handleImageLoad = useCallback(() => setImageError(false), []);

  if (!user) return null;

  // Show loading state while fetching profile data
  if (isLoadingProfile) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Account`}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t`Here, you can update your account information such as your profile picture, first name, and last name.`}
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">{t`Loading profile data...`}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Account`}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t`Here, you can update your account information such as your profile picture, first name, and last name.`}
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Profile Picture Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">{t`Profile Picture`}</h4>
              <p className="text-sm text-muted-foreground">
                {t`Upload a profile picture or enter a URL to your image.`}
              </p>
            </div>
            
            <FormField
              name="picture"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <MemoizedAvatar 
                      imageUrl={currentImageUrl && !imageError ? currentImageUrl : null}
                      initials={userInitials}
                      size={80}
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <FormItem>
                      <FormLabel>{t`Picture URL`}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/your-image.jpg" 
                          {...field} 
                          value={field.value ?? ""} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input ref={inputRef} hidden type="file" accept="image/*" onChange={onSelectImage} />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => inputRef.current?.click()}
                          className="flex items-center gap-2"
                        >
                          <UploadSimple size={16} />
                          {t`Upload Image`}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {t`JPG, PNG, or GIF. Max 5MB.`}
                        </span>
                      </div>
                      
                      <Button
                        type="button"
                        size="sm"
                        disabled={loading || !selectedFile}
                        onClick={async () => {
                          if (selectedFile) {
                            // Upload the selected file
                            try {
                              const formData = new FormData();
                              formData.append('profile_image', selectedFile);

                              await updateUserProfile(formData);
                              
                              // Clear preview and selected file
                              if (imagePreview) {
                                URL.revokeObjectURL(imagePreview);
                              }
                              setImagePreview(null);
                              setSelectedFile(null);
                              setImageError(false);
                              
                              // Refetch profile to get the updated image URL
                              refetchProfile();
                              
                              toast({
                                variant: "success",
                                title: t`Profile picture updated successfully!`,
                              });
                            } catch (error) {
                              toast({
                                variant: "error",
                                title: t`Failed to update profile picture. Please try again.`,
                              });
                            }
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        {loading ? t`Updating...` : t`Update Picture`}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">{t`Personal Information`}</h4>
              <p className="text-sm text-muted-foreground">
                {t`Update your personal details and contact information.`}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  name="first_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t`First Name`}</FormLabel>
                      <FormControl>
                        <Input 
                          autoComplete="given-name" 
                          placeholder="Enter your first name"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t`Last Name`}</FormLabel>
                      <FormControl>
                        <Input 
                          autoComplete="family-name" 
                          placeholder="Enter your last name"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Personal Info Update Button */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  disabled={loading || (form.watch('first_name') === user.first_name && form.watch('last_name') === user.last_name)}
                  onClick={async () => {
                    const formData = new FormData();
                    const firstName = form.watch('first_name');
                    const lastName = form.watch('last_name');
                    
                    if (firstName) formData.append('first_name', firstName);
                    if (lastName) formData.append('last_name', lastName);
                    
                    try {
                      await updateUserProfile(formData);
                      toast({
                        variant: "success",
                        title: t`Personal information updated successfully!`,
                      });
                    } catch (error) {
                      toast({
                        variant: "error",
                        title: t`Failed to update personal information. Please try again.`,
                      });
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {loading ? t`Updating...` : t`Update Personal Info`}
                </Button>
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">{t`Email Address`}</h4>
              <p className="text-sm text-muted-foreground">
                {t`Your email address is used for account notifications and password recovery.`}
              </p>
            </div>
            
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Email Address`}</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      autoComplete="email" 
                      className="lowercase" 
                      placeholder="Enter your email address"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      "flex items-center gap-x-2 font-medium",
                      user.emailVerified ? "text-green-600" : "text-amber-600",
                    )}
                  >
                    <div className="flex items-center gap-x-1.5">
                      {user.emailVerified ? <Check size={14} /> : <Warning size={14} />}
                      <span className="text-sm">
                        {user.emailVerified ? t`Email verified` : t`Email not verified`}
                      </span>
                    </div>
                    {!user.emailVerified && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs text-amber-600 hover:text-amber-700"
                        onClick={onResendVerificationEmail}
                      >
                        {t`Resend verification email`}
                      </Button>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Email Update Button */}
            <div className="flex justify-end">
              <Button
                type="button"
                size="sm"
                disabled={loading || form.watch('email') === user.email}
                onClick={async () => {
                  const formData = new FormData();
                  const email = form.watch('email');
                  
                  if (email) formData.append('email', email);
                  
                  try {
                    await updateUserProfile(formData);
                    toast({
                      variant: "success",
                      title: t`Email address updated successfully!`,
                    });
                  } catch (error) {
                    toast({
                      variant: "error",
                      title: t`Failed to update email address. Please try again.`,
                    });
                  }
                }}
                className="flex items-center gap-2"
              >
                {loading ? t`Updating...` : t`Update Email`}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <AnimatePresence presenceAffectsLayout>
              {form.formState.isDirty && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3"
                >
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onReset}
                    disabled={loading}
                  >
                    {t`Cancel`}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="min-w-[120px]"
                  >
                    {loading ? t`Saving...` : t`Save Changes`}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </Form>
    </div>
  );
};
