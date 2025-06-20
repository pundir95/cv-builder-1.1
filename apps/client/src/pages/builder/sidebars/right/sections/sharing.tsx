import { Select, t } from "@lingui/macro";
import { Command, CopySimple, Link, Share, X } from "@phosphor-icons/react";
import { AvatarImage, AvatarFallback, Avatar, Button, Input, Label, Switch } from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";

import { useToast } from "@/client/hooks/use-toast";
import { useUser } from "@/client/services/user";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";
import { useEffect, useState } from "react";
import { axios } from '@/client/libs/axios';
import { useLocation, useParams } from "react-router";

export const SharingSection = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const username = user?.username;

  const setValue = useResumeStore((state) => state.setValue);
  const slug = useResumeStore((state) => state.resume.slug);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");
  const [employees, setEmployees] = useState([]);
  const [sharedCvs, setSharedCvs] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isAnyoneEnabled, setIsAnyoneEnabled] = useState(false);
  const [isOrgEnabled, setIsOrgEnabled] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [sharedUrl, setSharedUrl] = useState("");

  useEffect(() => {
    axios.get(`/company/organization-employees/`).then((res) => {
      setEmployees(res?.data?.data || []);
    })
    axios.get(`/cv-manager/cv-shared-with/${id}/`).then((res) => {
      setSharedCvs(res?.data?.data || []);
    })
  }, [])

  useEffect(() => {
    if (sharedCvs?.length > 0 || employees?.length > 0) {
      const filteredEmployees = employees?.filter((employee: any) => {
        if (!employee?.organization_user?.id) return false;
        if (employee.organization_user.id === user?.id) return false;
        const isAlreadyShared = sharedCvs.some((sharedCv: any) =>
          sharedCv?.organization_user?.id === employee.organization_user.id
        );
        return !isAlreadyShared;
      });
      setEmployees(filteredEmployees);
    }
  }, [sharedCvs])

  

  const onCopy = async () => {
    await navigator.clipboard.writeText(sharedUrl);
    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  const handleShareWithUser = () => {
    axios.post(`/cv-manager/share-cv/`, {
      "share_user": selectedUserId,
      "cv": location.pathname.split("/")[2]
    }).then((res) => {
      console.log(res);
   
    })
  }

  const handleUnshare = (id: any) => {
    axios.delete(`/cv-manager/share-cv/${id}/`).then((res) => {
      console.log(res);
    })
  }

  const handleCvsahreAnyone = (value: any) => {
    axios.post(`/share-resume/api/resume/share/`, {
      "shared_by_user": user?.id,
      cv: location.pathname.split("/")[2],
      permission: value,
      "expiry_day": "7"
    }).then((res) => {
      console.log(res);
      let url=  `${window.location.origin}/builder/anyone/${id}?shared_id=${res?.data?.id}&ref_id=${res?.data?.ref_id}`;
      setSharedUrl(url);
    })
  }

  return (
    <section id="sharing" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="sharing" size={18} name={t`Sharing`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Sharing`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <div className="space-y-1.5">
          <div className="flex gap-x-4">
            <Switch
              id="anyone-visibility"
              checked={isAnyoneEnabled}
              onCheckedChange={(checked) => {
                setIsAnyoneEnabled(checked);
                if (checked) setIsOrgEnabled(false);
                setValue("visibility", checked ? "public" : "private");
              }}
            />
            <div>
              <Label htmlFor="anyone-visibility" className="space-y-1 mb-3 block">
                <p>Anyone</p>
                <p className="text-xs opacity-60">
                  {t`Anyone, even those outside your organization will be able this.`}
                </p>
              </Label>
            </div>
          </div>

          <AnimatePresence presenceAffectsLayout>
            {isAnyoneEnabled && (
              <motion.div
                layout
                className="sharing-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="mb-3">What they can do</p>
                <div className="mb-3">
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2" 
                  onChange={(e) => handleCvsahreAnyone(e.target.value)}>
                    <option value="view">View</option>
                    <option value="edit">Edit</option>
                  </select>
                </div>
                <div className="mb-5">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={onCopy}
                  >
                    <Link className="h-4 w-4" />
                   {sharedUrl ? sharedUrl : "Copy Link"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-x-4">
            <Switch
              id="org-visibility"
              checked={isOrgEnabled}
              onCheckedChange={(checked) => {
                setIsOrgEnabled(checked);
                if (checked) setIsAnyoneEnabled(false);
                setValue("visibility", checked ? "public" : "private");
              }}
            />
            <div>
              <Label htmlFor="org-visibility" className="space-y-1">
                <p>Share with Organization Users</p>
                <p className="text-xs opacity-60">
                  {t`Only users in your organization can view and download the resume.`}
                </p>
              </Label>
            </div>
          </div>

          <AnimatePresence presenceAffectsLayout>
            {isOrgEnabled && (
              <motion.div
                layout
                className="space-y-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Share with users</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                      <option value="" disabled selected>Select users to share with</option>
                      {employees.map((employee: any) => (
                        <option key={employee?.id} value={employee?.id}>
                          {employee?.organization_user?.first_name} ({employee?.organization_user?.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      className="flex items-center gap-2"
                      onClick={handleShareWithUser}
                    >
                      <Share className="h-4 w-4" />
                      Share with selected users
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={onCopy}
                    >
                      <Link className="h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>

                  <div className="mt-4">
                    <Label className="text-sm text-muted-foreground">
                      Currently shared with:
                    </Label>
                    <div className="mt-2 space-y-2">
                      {sharedCvs?.map((cv: any) => (
                        <div key={cv?.id} className="flex items-center justify-between rounded-lg border p-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span>{cv?.organization_user?.first_name} {cv?.organization_user?.email}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleUnshare(cv?.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </section>
  );
};
