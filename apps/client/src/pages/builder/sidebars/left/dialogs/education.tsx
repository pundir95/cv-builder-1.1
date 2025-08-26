import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultEducation, educationSchema } from "@reactive-resume/schema";
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
import { useEffect, useState } from "react";

import { AiActions } from "@/client/components/ai-actions";
import { useSectionProgress } from "@/client/hooks/use-section-progress";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = educationSchema;

type FormValues = z.infer<typeof formSchema>;

export const EducationDialog = () => {
  const [isPresent, setIsPresent] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: defaultEducation,
    resolver: zodResolver(formSchema),
  });

  // Watch form values to determine completion
  const formValues = form.watch();
  
  // Get form errors for validation display
  const formErrors = form.formState.errors;
  
  // Sync isPresent state with form values
  useEffect(() => {
    setIsPresent(formValues.isPresent || false);
  }, [formValues.isPresent]);
  
  // Handle present checkbox change
  const handlePresentChange = (checked: boolean) => {
    setIsPresent(checked);
    form.setValue('isPresent', checked);
    if (checked) {
      form.setValue('endDate', '');
      form.clearErrors('endDate'); // Clear any endDate validation errors
    }
  };
  
  const isCompleted = Boolean(
    formValues.institution &&
    formValues.studyType &&
    formValues.area &&
    formValues.startDate &&
    (formValues.endDate || isPresent)
  );

  // Use the progress hook
  useSectionProgress("education", isCompleted);

  return (
    <SectionDialog<FormValues> id="education" form={form} defaultValues={defaultEducation}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="institution"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Institution`}*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="studyType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Type of Study",
                  comment: "For example, Bachelor's Degree or Master's Degree",
                })}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="area"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Area of Study",
                  comment: "For example, Computer Science or Business Administration",
                })}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="score"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Score",
                  comment: "Score or honors for the degree, for example, CGPA or magna cum laude",
                })}
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="9.2 GPA" 
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or format to allow up to 2 decimal places
                    if (value === '') {
                      field.onChange(value);
                    } else {
                      // Regex to match numbers with up to 2 decimal places
                      const regex = /^\d*\.?\d{0,2}$/;
                      if (regex.test(value)) {
                        field.onChange(value);
                      }
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      
<FormField
          name="startDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              <FormLabel>Start Date</FormLabel>
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input 
                    {...field} 
                    type="date" 
                    placeholder={t`Start Date`}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      field.onChange(e);
                      const endDate = form.getValues("endDate");
                      if (endDate && e.target.value > endDate) {
                        form.setValue("endDate", e.target.value);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
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
                      Currently studying here
                    </label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
              {!formErrors?.endDate && field.value && !isPresent && (
                <p className="text-xs text-muted-foreground">
                  End date: {new Date(field.value).toLocaleDateString()}
                </p>
              )}
              {isPresent && (
                <p className="text-xs text-muted-foreground">
                  Currently enrolled - no end date required
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
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
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
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
