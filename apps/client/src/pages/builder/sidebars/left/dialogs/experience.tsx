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
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";
import { useSectionProgress } from "@/client/hooks/use-section-progress";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";
import { useEffect } from "react";

const formSchema = experienceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ExperienceDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
  });
  
  console.log(defaultExperience,"defaultExperience")

  // Watch form values to determine completion
  const formValues = form.watch();
  console.log(formValues,"formValues")
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

  const isCompleted = Boolean(
    formValues.company &&
    formValues.position &&
    formValues.startDate &&
    formValues.endDate &&
    formValues.date &&
    formValues.summary
  );
  // Use the progress hook
  useSectionProgress("experience", isCompleted);

  return (
    <SectionDialog<FormValues> id="experience" form={form} defaultValues={defaultExperience}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Company`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="date" 
                  placeholder={t`End Date`}
                  min={form.getValues("startDate")}
                  onChange={(e) => {
                    const startDate = form.getValues("startDate");
                    if (!startDate || e.target.value >= startDate) {
                      field.onChange(e);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
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
        />

<FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Location`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
