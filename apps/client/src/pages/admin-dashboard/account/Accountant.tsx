import { t } from "@lingui/macro";
import { Pencil, UploadSimple } from "@phosphor-icons/react";
import { Button, Card, Checkbox, Input, Label, ScrollArea, Separator } from "@reactive-resume/ui";
import { useEffect, useState, useRef } from "react";
import CompanySetting from "./CompanySetting";
import { ActiveSubscription } from "./ActiveSubScription";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUpdateUserProfile, useGetUserProfile } from "@/client/services/user";
import { useToast } from "@/client/hooks/use-toast";
import { BASE_URL } from "@/client/config/config";

export const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const is_add_on_user=localStorage.getItem("is_add_on_user")
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUserProfile, loading: isUpdating } = useUpdateUserProfile();
  const { userProfile, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetUserProfile();
  const { toast } = useToast();

  useEffect(()=>{
    if(is_add_on_user){
      setActiveSection("company")
    }
  },[is_add_on_user])

  // Fetch profile data on component mount
  useEffect(() => {
    refetchProfile();
  }, [refetchProfile]);

  // Update local storage when profile data is fetched
  useEffect(() => {
      console.log(userProfile,"userProfile")
      if (userProfile) {
      localStorage.setItem("user", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const user = localStorage.getItem("user") ?? ""
  const userData = JSON.parse(user)

  // Handle photo file selection and direct upload
  const handlePhotoSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "error",
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, or WebP)",
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        variant: "error",
        title: "File too large",
        description: "Image size must be less than 5MB",
      });
      return;
    }

    // Start upload immediately
    setIsPhotoUploading(true);

    try {
      // Create FormData and append the profile image
      const formData = new FormData();
      formData.append('profile_image', file);
      
      // Update user profile with new picture using the correct API
      const response = await updateUserProfile(formData);
      
      // Update local storage with new user data
      // Assuming the API returns the updated user data or image URL
      const updatedUserData = { ...userData, profile_image: response.profile_image || response.picture || response.image_url };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      
      // Refetch profile data to ensure consistency
      refetchProfile();

      toast({
        variant: "success",
        title: "Profile photo updated successfully!",
      });
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to update profile photo. Please try again.';
      toast({
        variant: "error",
        title: "Error updating profile photo",
        description: errorMessage,
      });
    } finally {
      setIsPhotoUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <ScrollArea orientation="vertical" className="lg:h-screen">
      <div className="mx-auto py-10 ">
        <div className="flex justify-between items-center lg:flex-row flex-col gap-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
            <p className="text-primary/70 mt-2">
              Manage your account information and preferences
            </p>
          </div>
          <div>
            <Card className="p-0 bg-transparent border-0">
              <nav className="space-x-2 flex flex-wrap gap-3">
                <Button
                  variant="ghost"
                  className={`text-normal font-normal justify-start rounded-full border duration-300 ${activeSection === 'general' ? 'bg-[#D6EF3C]/90 text-black border-[#D6EF3C]/90' : 'bg-white text-[#0D84F3] border-[#0D84F3] hover:bg-[#e6f3fd]'}`}
                  onClick={() => handleSectionChange('general')}
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className={`text-normal font-normal justify-start rounded-full border duration-300 ${activeSection === 'company' ? 'bg-[#D6EF3C]/90 text-black border-[#D6EF3C]/90' : 'bg-white text-[#0D84F3] border-[#0D84F3] hover:bg-[#e6f3fd]'}`}
                  onClick={() => handleSectionChange('company')}
                >
                  Organization
                </Button>
                <Button
                  variant="ghost"
                  className={`text-normal font-normal justify-start rounded-full border duration-300 ${activeSection === 'subscription' ? 'bg-[#D6EF3C]/90 text-black border-[#D6EF3C]/90' : 'bg-white text-[#0D84F3] border-[#0D84F3] hover:bg-[#e6f3fd]'}`}
                  onClick={() => handleSectionChange('subscription')}
                >
                  Subscription
                </Button>
                <Button
                  variant="ghost"
                  className={`text-normal font-normal justify-start rounded-full border duration-300 ${activeSection === 'communication' ? 'bg-[#D6EF3C]/90 text-black border-[#D6EF3C]/90' : 'bg-white text-[#0D84F3] border-[#0D84F3] hover:bg-[#e6f3fd]'}`}
                  onClick={() => handleSectionChange('communication')}
                >
                  Communication
                </Button>
                {/* <Button 
                variant="ghost"
                className={`w-full justify-start ${activeSection === 'privacy' ? 'bg-blue-300' : 'text-primary/70 hover:text-primary hover:bg-primary/10'}`}
                onClick={() => handleSectionChange('privacy')}
              > 
                Privacy Settings
              </Button> */}
              </nav>
            </Card>
          </div>
          <div></div>
        </div>
        <div className="">
          <ActiveSubscription activeSection={activeSection} />

          {/* Communication Preferences Section */}
          <div className={`md:col-span-3 ${activeSection !== 'communication' && 'hidden'}`}>
            <Card className="p-6 bg-white border border-[#e6f3fd]">
              <h2 className="text-xl font-semibold text-[#0D84F3] mb-4">Communication Preferences</h2>
              <p className="text-[#0D84F3]/70 mb-6">Select which emails you would like to receive:</p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="insider-tips" defaultChecked />
                  <Label htmlFor="insider-tips">Insider Tips & Tricks</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="new-features" defaultChecked />
                  <Label htmlFor="new-features">New Features & Announcements</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="market-research" defaultChecked />
                  <Label htmlFor="market-research">Market Research</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="unsubscribe-all" />
                  <Label htmlFor="unsubscribe-all">Unsubscribe from all Resume builder emails</Label>
                </div>
                <Button
                  className="mt-6 bg-[#0D84F3] text-white hover:bg-[#156fd1]"
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          </div>

          {/* Privacy Settings Section */}
          <div className={`md:col-span-3 ${activeSection !== 'privacy' && 'hidden'}`}>
            <Card className="p-6 bg-white border border-[#e6f3fd]">
              <h2 className="text-xl font-semibold text-[#0D84F3] mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="analytics" defaultChecked />
                  <Label htmlFor="analytics">Analytics</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="advertising" defaultChecked />
                  <Label htmlFor="advertising">Advertising</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="personalization" defaultChecked />
                  <Label htmlFor="personalization">Personalization</Label>
                </div>
                <Button
                  className="mt-6 bg-[#0D84F3] text-white hover:bg-[#156fd1]"
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className={`md:col-span-3 ${activeSection !== 'general' && 'hidden'}`}>
            {/* Profile Card */}
            <Card className="p-6 mb-6 bg-white border border-[#e6f3fd]">
              <div className="flex lg:items-center gap-4 lg:flex-row flex-col">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="size-20 rounded-full bg-[#0D84F3] flex items-center justify-center overflow-hidden">
                      {userProfile?.profile_image ? (
                        <img 
                          src={`${BASE_URL}${userProfile?.profile_image}`} 
                          alt={`${userProfile?.first_name} ${userProfile?.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">{userProfile?.first_name?.charAt(0)}</span>
                      )}
                    </div>
                    
                    {/* Photo upload overlay */}
                    {isPhotoUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0D84F3]">{userData?.first_name} {userData?.last_name}</h3>
                    <p className="text-[#0D84F3]/70">{userData?.subscription_details?.length > 0 ? "Premium Member" : "Free Member"}</p>
                    <p className="text-sm text-[#0D84F3]/50">Member since {userData?.date_joined.split("T")[0]}</p>
                  </div>
                </div>
                
                {/* Photo upload section */}
                <div className="ml-auto flex flex-col gap-3">
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                  
                  {/* Upload button or loading state */}
                  {isPhotoUploading ? (
                    <div className="flex items-center gap-2 text-sm text-[#0D84F3]">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0D84F3]"></div>
                      Uploading...
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="bg-[#D6EF3C]/90 text-black border-[#D6EF3C]/90 hover:bg-[#D6EF3C]/90 rounded-full"
                      onClick={triggerFileInput}
                      disabled={isPhotoUploading}
                    >
                      <UploadSimple size={16} className="mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-[#e6f3fd]">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#0D84F3]">General Settings</h2>
                  <Button
                    variant="outline"
                    className="flex items-center rounded-full gap-2 bg-[#D6EF3C]/90 text-black border-[#D6EF3C]/90 hover:bg-[#D6EF3C]/90"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Pencil size={16} />
                    {isEditing ? "Save Changes" : "Edit Details"}
                  </Button>
                </div>

                <Separator />

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>Account ID</Label>
                    <Input
                      value={userData?.id}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={userData?.email}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Number</Label>
                    <PhoneInput
                      country="IN"
                      value={userData?.phone_number}
                      disabled={!isEditing}
                      inputClass={`!w-full !h-11 !pl-16 ${!isEditing ? "!bg-muted" : ""}`}
                      containerClass="phonefield-wrapper"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="mt-8 p-6 bg-white border border-[#e6f3fd]">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>

                <Separator />

                <div className="flex lg:items-center justify-between lg:flex-row flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
                    <p className="text-sm text-[#0D84F3]/70">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800">Delete Account</Button>
                </div>
              </div>
            </Card>
          </div>



          <CompanySetting activeSection={activeSection} setIsEditing={setIsEditing} isEditing={isEditing} is_add_on_user={is_add_on_user} />

        </div>
      </div>
    </ScrollArea>
  );
};

export default AccountSettings;
