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
      const user = localStorage.getItem("user")
      const userData = user ? JSON.parse(user) : null;
      if (userData) {
        resumeData.basics.name = userData.first_name;
        resumeData.basics.email = userData.email;
        console.log(resumeData,"resumeData")
      }

      const templateId = Number(localStorage.getItem("templateId") || 1)
      const newResume = await createResume({ slug: values.slug, title: values.title, cv_template:templateId, visibility: "private", cv_data:resumeData });
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
        <AlertDialogContent>
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle>{t`Are you sure you want to delete your resume?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t`This action cannot be undone. This will permanently delete your resume and cannot be recovered.`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
                <AlertDialogAction variant="error" onClick={deleteResumeData}>
                  {t`Delete`}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  <Plus />
                  <h2>
                    {isCreate && t`Create a new resume`}
                    {isUpdate && t`Update an existing resume`}
                    {isDuplicate && t`Duplicate an existing resume`}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCreate && t`Start building your resume by giving it a name.`}
                {isUpdate && t`Changed your mind about the name? Give it a new one.`}
                {isDuplicate && t`Give your old resume a new name.`}
              </DialogDescription>
            </DialogHeader>

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Title`}</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input {...field} className="flex-1" />

                      {(isCreate || isDuplicate) && (
                        <Tooltip content={t`Generate a random title for your resume`}>
                          <Button
                            size="icon"
                            type="button"
                            variant="outline"
                            onClick={onGenerateRandomName}
                          >
                            <MagicWand />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
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
                  <FormLabel>{t`Slug`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex items-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(isCreate && "rounded-r-none")}
                >
                  {isCreate && t`Create`}
                  {isUpdate && t`Save Changes`}
                  {isDuplicate && t`Duplicate`}
                </Button>

                {isCreate && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" size="icon" className="rounded-l-none border-l">
                        <CaretDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="center">
                      <DropdownMenuItem onClick={onCreateSample}>
                        <Flask className="mr-2" />
                        {t`Create Sample Resume`}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
