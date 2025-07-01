import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { CaretDown, Flask, MagicWand, Plus } from "@phosphor-icons/react";
import type { ResumeDto } from "@reactive-resume/dto";
import { createResumeSchema } from "@reactive-resume/dto";
import { idSchema, sampleResume } from "@reactive-resume/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tooltip,
} from "@reactive-resume/ui";
import { cn, generateRandomName } from "@reactive-resume/utils";
import slugify from "@sindresorhus/slugify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateResume, useDeleteResume, useUpdateResume } from "@/client/services/resume";
import { useImportResume } from "@/client/services/resume/import";
import { useDialog } from "@/client/stores/dialog";
import { resumeData } from "../constant";
import { useNavigate } from "react-router";
import { axios } from "@/client/libs/axios";
const formSchema = createResumeSchema.extend({ id: idSchema.optional() || idSchema, slug: z.string() });

type FormValues = z.infer<typeof formSchema>;

export const ResumeDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<ResumeDto>("resume");
console.log(mode,"mode")
console.log(payload,"payload")
  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  const { createResume, loading: createLoading, response } = useCreateResume();
  const { updateResume, loading: updateLoading } = useUpdateResume();
  const { deleteResume, loading: deleteLoading } = useDeleteResume();
  const { importResume: duplicateResume, loading: duplicateLoading } = useImportResume();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loading = createLoading || updateLoading || deleteLoading || duplicateLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", slug: "" },
  });

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  useEffect(() => {
    const slug = slugify(form.watch("title"));
    form.setValue("slug", slug);
  }, [form.watch("title")]);


  const onSubmit = async (values: FormValues) => {

    if (isCreate) {
      const templateId = JSON.parse(localStorage.getItem("templatedata") || "{id:1,internal_name:'cv_template_8'}")
      const user = localStorage.getItem("user")
      const userData = user ? JSON.parse(user) : null;
      if (userData) {
        resumeData.basics.name = userData.first_name;
        resumeData.basics.email = userData.email;
        resumeData.metadata.template.name = templateId?.internal_name;
        console.log(resumeData,"resumeData")
      }


      const newResume = await createResume({ slug: values.slug, title: values.title, cv_template:templateId?.id, visibility: "private", cv_data:resumeData });
      let api= userData?.is_guest_user ? `/accounts/guest-user/${userData.reference_id}` : `/accounts/api/users/`
        
      axios.get(api).then((res)=>{
        console.log(res,"res.data")
        localStorage.setItem("user",JSON.stringify(res.data[0] || res.data.data))

      })
      void navigate(`/builder/${newResume.data.id}`)
    }


    if(isUpdate){
      await updateResume({
        id: payload.item?.id,
        title: values.title,
        slug: values.slug,
        visibility: "private", 
        cv_data: payload.item?.data || resumeData 
      });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    }
    

    if (isDuplicate) {
      
      if (!payload.item?.id) return;
      const user = localStorage.getItem("user") 
      const userData = user ? JSON.parse(user) : null;
      const templateId = Number(localStorage.getItem("templateId") || 1)
      const newResume = await createResume({ slug: values.slug, title: values.title, cv_template:templateId, visibility: "private", cv_data:resumeData });
      let api= userData?.is_guest_user ? `/accounts/guest-user/${userData.reference_id}` : `/accounts/api/users/`
        
      axios.get(api).then((res)=>{
        console.log(res,"res.data")
        localStorage.setItem("user",JSON.stringify(res.data[0] || res.data.data))

      })
    }


    close();
  };

  const onReset = () => {
    if (isCreate) form.reset({ title: "", slug: "" });
    if (isUpdate)
      form.reset({ id: payload.item?.id?.toString(), title: payload.item?.title, slug: payload.item?.slug });
    if (isDuplicate)
      form.reset({ title: `${payload.item?.title} (Copy)`, slug: `${payload.item?.slug}-copy`, id: payload.item?.id?.toString() });
    if (isDelete)
      form.reset({ id: payload.item?.id?.toString(), title: payload.item?.title, slug: payload.item?.slug });
  };

  const onGenerateRandomName = () => {
    const name = generateRandomName();
    form.setValue("title", name);
    form.setValue("slug", slugify(name));
  };

  const onCreateSample = async () => {
    const randomName = generateRandomName();

    await duplicateResume({
      title: randomName,
      slug: slugify(randomName),
      data: sampleResume,
    });

    close();
  };

  // const updateResumeData = async () => {
  //   if (!payload.item?.id) return;
  //   await updateResume({
  //     id: payload.item.id,
  //     title: form.getValues().title,
  //     slug: form.getValues().slug,
  //     cv_data:resumeData 
  //   });
  // }
  

  const deleteResumeData = async () => {
    if (!payload.item?.id) return;
    await deleteResume({ id: payload.item.id });
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
    close();
  }

  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent className="w-[95vw] max-w-lg mx-auto rounded-xl shadow-2xl border-0 bg-white dark:bg-gray-900 p-0 overflow-hidden">
          <Form {...form}>
            <form>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
                <AlertDialogHeader className="space-y-3">
                  <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                    <div className="p-2.5 bg-red-100 dark:bg-red-900/40 rounded-xl">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    {t`Are you sure you want to delete your resume?`}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {t`This action cannot be undone. This will permanently delete your resume and cannot be recovered.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <AlertDialogFooter className="flex-col sm:flex-row gap-3">
                  <AlertDialogCancel className="w-full sm:w-auto h-12 px-6 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    {t`Cancel`}
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    variant="error" 
                    onClick={deleteResumeData}
                    className="w-full sm:w-auto h-12 px-8 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {deleteLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>{t`Deleting...`}</span>
                      </div>
                    ) : (
                      t`Delete Resume`
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen}  onOpenChange={close}>
      <DialogContent className="w-[95vw] max-w-2xl mx-auto rounded-xl shadow-2xl border-0 bg-white dark:bg-gray-900 p-0 overflow-hidden">
        <Form {...form}>
          <form className="space-y-0" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Header Section */}
            <div className="bg-[#0D84F3] text-white px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <DialogHeader className="space-y-2">
                <DialogTitle>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                      <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {isCreate && t`Create a new resume`}
                      {isUpdate && t`Update an existing resume`}
                      {isDuplicate && t`Duplicate an existing resume`}
                    </h2>
                  </div>
                </DialogTitle>
                <DialogDescription className="text-white text-base leading-relaxed">
                  {isCreate && t`Start building your resume by giving it a name.`}
                  {isUpdate && t`Changed your mind about the name? Give it a new one.`}
                  {isDuplicate && t`Give your old resume a new name.`}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Content Section */}
            <div className="px-6 py-6 space-y-6">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {t`Title`}
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between gap-x-3">
                        <Input 
                          {...field} 
                          className="flex-1 h-12 px-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                          placeholder="Enter resume title..."
                        />

                        {(isCreate || isDuplicate) && (
                          <Tooltip content={t`Generate a random title for your resume`}>
                            <Button
                              size="icon"
                              type="button"
                              variant="outline"
                              onClick={onGenerateRandomName}
                              className="h-12 w-12 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                              <MagicWand className="w-5 h-5" />
                            </Button>
                          </Tooltip>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {t`Tip: You can name the resume referring to the position you are applying for.`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {t`Slug`}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="h-12 px-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="resume-slug"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <DialogFooter className="flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={close}
                  className="w-full sm:w-auto h-12 px-6 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  {t`Cancel`}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full sm:w-auto h-12 px-8 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl",
                    isCreate 
                      ? "bg-[#D6EF3C] rounded-full text-black hover:bg-[#D6EF3C]/90  hover:scale-105" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>
                        {isCreate && t`Creating...`}
                        {isUpdate && t`Saving...`}
                        {isDuplicate && t`Duplicating...`}
                      </span>
                    </div>
                  ) : (
                    <>
                      {isCreate && t`Create Resume`}
                      {isUpdate && t`Save Changes`}
                      {isDuplicate && t`Duplicate Resume`}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
