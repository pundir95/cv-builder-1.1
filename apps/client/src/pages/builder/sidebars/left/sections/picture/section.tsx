import { t } from "@lingui/macro";
import { Aperture, Trash, UploadSimple } from "@phosphor-icons/react";
import {
  Avatar,
  AvatarImage,
  buttonVariants,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";

import { useUploadImage } from "@/client/services/storage";
import { useResumeStore } from "@/client/stores/resume";

import { PictureOptions } from "./options";
import { useParams } from "react-router";

export const PictureSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useUploadImage();
  const [isUploading, setIsUploading] = useState(false);
  const cv_id = window.location.pathname.split('/')[2];
  const setValue = useResumeStore((state) => state.setValue);
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user || "{}");
  const picture = useResumeStore((state) => state.resume.data.basics.picture);

  const isValidUrl = useMemo(() => z.string().url().safeParse(picture.url).success, [picture.url]);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsUploading(true);
      try {
        const file = event.target.files[0];
        let payload = {
          user_id: userData.id,
          image: file,
          cv_id: cv_id
        }
        const response = await uploadImage(payload);
        const url = (response as any).data.data.cv_image;
        setValue("basics.picture.url", url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onAvatarClick = () => {
    if (isValidUrl) {
      setValue("basics.picture.url", "");
    } else {
      inputRef.current?.click();
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <div className="group relative cursor-pointer" onClick={onAvatarClick}>
        <Avatar className="size-14 bg-secondary">
          <AvatarImage src={picture.url} />
        </Avatar>

        {isUploading ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : isValidUrl ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
            <Trash size={16} weight="bold" />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full">
            <UploadSimple size={16} weight="bold" />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-y-1.5">
        <Label htmlFor="basics.picture.url">{t`Picture`}</Label>
        <div className="flex items-center gap-x-2">
          <input ref={inputRef} hidden type="file" onChange={onSelectImage} />

          <Input
            id="basics.picture.url"
            placeholder="https://..."
            value={picture.url}
            onChange={(event) => {
              setValue("basics.picture.url", event.target.value);
            }}
          />

          {isValidUrl && (
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
                >
                  <Aperture />
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-[360px]">
                <PictureOptions />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
