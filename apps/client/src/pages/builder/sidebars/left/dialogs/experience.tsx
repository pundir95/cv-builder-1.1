import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultExperience, experienceSchema } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
  Checkbox,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";
import { useSectionProgress } from "@/client/hooks/use-section-progress";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";
import { useEffect, useState } from "react";

const formSchema = experienceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ExperienceDialog = () => {
  const [isPresent, setIsPresent] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
  });
  
  console.log(defaultExperience,"defaultExperience")

  // Watch form values to determine completion
  const formValues = form.watch();
  console.log(formValues,"formValues")
  
  // Get form errors for validation display
  const formErrors = form.formState.errors;
  
  // Sync isPresent state with form values
  useEffect(() => {
    setIsPresent(formValues.isPresent || false);
  }, [formValues.isPresent]);
  
  // Convert date string to start and end dates
  const convertDateRange = (dateStr: string) => {
    try {
      const [startDateStr, endDateStr] = dateStr.split('–').map(d => d.trim());
      
      // Parse start date with UTC to avoid timezone offset issues
      const startDate = new Date(startDateStr + ' UTC');
      const formattedStartDate = startDate.toISOString().split('T')[0];

      // Parse end date
      let formattedEndDate = '';
      if (endDateStr.toLowerCase() === 'present') {
        const now = new Date();
        // Set time to midnight UTC
        now.setUTCHours(0,0,0,0);
        formattedEndDate = now.toISOString().split('T')[0];
      } else {
        // Parse end date with UTC
        const endDate = new Date(endDateStr + ' UTC'); 
        formattedEndDate = endDate.toISOString().split('T')[0];
      }

      return {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      };
    } catch (error) {
      console.error('Error parsing date range:', error);
      return {
        startDate: '',
        endDate: ''
      };
    }
  }

  // Update form when date changes
  useEffect(() => {
    console.log(formValues.date,"formValues.date")
    console.log(formValues.startDate,"formValues.startDate")
    console.log(formValues.endDate,"formValues.endDate")
    if (formValues.date) {
      const { startDate, endDate } = convertDateRange(formValues.date);
      form.setValue('startDate', startDate);
      form.setValue('endDate', endDate);
      form.setValue('date', "");
    }
  }, [formValues.date, formValues.startDate, formValues.endDate, form]);

  // Handle present checkbox change
  const handlePresentChange = (checked: boolean) => {
    setIsPresent(checked);
    form.setValue('isPresent', checked);
    if (checked) {
      form.setValue('endDate', '');
      form.clearErrors('endDate'); // Clear any endDate validation errors
    }
  };

  // Enhanced completion check with validation
  const isCompleted = Boolean(
    formValues.company &&
    formValues.position &&
    formValues.startDate &&
    (formValues.endDate || isPresent) &&
    formValues.location &&
    formValues.summary &&
    Object.keys(formErrors).length === 0 // No validation errors
  );
  
  // Use the progress hook
  useSectionProgress("experience", isCompleted);

  return (
    <SectionDialog<FormValues> 
      id="experience" 
      form={form} 
      defaultValues={defaultExperience}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Company`} <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter company name"
                  maxLength={100}
                  required
                  className={formErrors.company ? "border-destructive" : ""}
                />
              </FormControl>
              <FormMessage />
              {!formErrors.company && field.value && (
                <p className="text-xs text-muted-foreground">
                  {field.value.length}/100 characters
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Position",
                  context: "Position held at a company, for example, Software Engineer",
                })} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter your position/title"
                  maxLength={100}
                  required
                  className={formErrors.position ? "border-destructive" : ""}
                />
              </FormControl>
              <FormMessage />
              {!formErrors.position && field.value && (
                <p className="text-xs text-muted-foreground">
                  {field.value.length}/100 characters
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="startDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input 
                    {...field} 
                    type="date" 
                    placeholder={t`Start Date`}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className={formErrors.startDate ? "border-destructive" : ""}
                    onChange={(e) => {
                      field.onChange(e);
                      const endDate = form.getValues("endDate");
                      if (endDate && e.target.value > endDate) {
                        form.setValue("endDate", e.target.value);
                      }
                      // Clear endDate errors when startDate changes
                      if (formErrors.endDate) {
                        form.clearErrors('endDate');
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
              {!formErrors.startDate && field.value && (
                <p className="text-xs text-muted-foreground">
                  Start date: {new Date(field.value).toLocaleDateString()}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          name="endDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date {!isPresent && <span className="text-destructive">*</span>}</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input 
                    {...field} 
                    type="date" 
                    placeholder={t`End Date`}
                    min={form.getValues("startDate")}
                    disabled={isPresent}
                    className={formErrors.endDate ? "border-destructive" : ""}
                    onChange={(e) => {
                      const startDate = form.getValues("startDate");
                      if (!startDate || e.target.value >= startDate) {
                        field.onChange(e);
                      }
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="present"
                      checked={isPresent}
                      onCheckedChange={handlePresentChange}
                    />
                    <label
                      htmlFor="present"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Currently working here
                    </label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
              {!formErrors.endDate && field.value && !isPresent && (
                <p className="text-xs text-muted-foreground">
                  End date: {new Date(field.value).toLocaleDateString()}
                </p>
              )}
              {isPresent && (
                <p className="text-xs text-muted-foreground">
                  Currently employed - no end date required
                </p>
              )}
            </FormItem>
          )}
        />

        {/* <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

<FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Location`} <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter work location (city, state, country)"
                  maxLength={100}
                  required
                  className={formErrors.location ? "border-destructive" : ""}
                />
              </FormControl>
              <FormMessage />
              {!formErrors.location && field.value && (
                <p className="text-xs text-muted-foreground">
                  {field.value.length}/100 characters
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Summary`} <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  placeholder="Describe your role, responsibilities, and achievements..."
                  maxLength={1000}
                  required
                  className={formErrors.summary ? "border-destructive" : ""}
                  footer={(editor) => (
                    <AiActions
                      value={editor.getText()}
                      onChange={(value) => {
                        editor.commands.setContent(value, true);
                        field.onChange(value);
                      }}
                    />
                  )}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
              <div className="text-xs text-muted-foreground mt-1">
                {field.value?.length || 0}/1000 characters
              </div>
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
