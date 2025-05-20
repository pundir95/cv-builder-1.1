import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

export const CreateResumeCard = ({setIsLimitReachedModalOpen}:{setIsLimitReachedModalOpen:any}) => {
  const { open } = useDialog("resume");
  const user = localStorage.getItem("user") || '{"isPlanReached":[],"count":0}';
  const userData = JSON.parse(user);
  let isSubscriptionHave = userData?.subscription_details;
  let resumeCount=userData?.resume_count;

  return (
    <BaseCard
      onClick={() => {
        if((isSubscriptionHave?.length==0|| isSubscriptionHave==null) && resumeCount==1){
          setIsLimitReachedModalOpen(true)
          
        }else{
          open("create");
          
        }
       
      }}
    >
      <Plus size={64} weight="thin" />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
          "bg-gradient-to-t from-background/80 to-transparent",
        )}
      >
        <h4 className="font-medium">
          {t`Create a new resume`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^N</KeyboardShortcut>
        </h4>

        <p className="text-xs opacity-75">{t`Start building from scratch`}</p>
      </div>
    </BaseCard>
  );
};
