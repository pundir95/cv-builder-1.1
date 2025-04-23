import { t } from "@lingui/macro";
import { Pencil } from "@phosphor-icons/react";
import { Button, Card, Checkbox, Input, Label, ScrollArea, Separator } from "@reactive-resume/ui";
import { useState } from "react";

export const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [isEditing, setIsEditing] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <ScrollArea orientation="vertical" className="h-screen">
      <div className="container mx-auto py-10 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">{t`Account Settings`}</h1>
          <p className="text-primary/70 mt-2">
            {t`Manage your account information and preferences`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="p-4 md:col-span-1 bg-gray-300">
            <nav className="space-y-2">
              <Button
                variant="ghost" 
                className={`w-full justify-start ${activeSection === 'general' ? 'bg-blue-300' : 'text-primary/70 hover:text-primary hover:bg-primary/10'}`}
                onClick={() => handleSectionChange('general')}
              >
                {t`General Settings`}
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === 'subscription' ? 'bg-blue-300' : 'text-primary/70 hover:text-primary hover:bg-primary/10'}`}
                onClick={() => handleSectionChange('subscription')}
              >
                {t`Subscription`}
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === 'communication' ? 'bg-blue-300' : 'text-primary/70 hover:text-primary hover:bg-primary/10'}`}
                onClick={() => handleSectionChange('communication')}
              >
                {t`Communication Preferences`}
              </Button>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activeSection === 'privacy' ? 'bg-blue-300' : 'text-primary/70 hover:text-primary hover:bg-primary/10'}`}
                onClick={() => handleSectionChange('privacy')}
              > 
                {t`Privacy Settings`}
              </Button>
            </nav>
          </Card>
          {/* Subscription Section */}
          <div className={`md:col-span-3 ${activeSection !== 'subscription' && 'hidden'}`}>
            <Card className="p-6 bg-gray-300">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h2 className="text-xl font-semibold text-primary mb-2">{t`No Subscription Active`}</h2>
                <p className="text-primary/70 mb-6">
                  {t`You currently don't have an active subscription. Subscribe now to unlock exclusive features and benefits!`}
                </p>
                <Button 
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {t`Get Subscription plan`}
                </Button>
              </div>
            </Card>
          </div>

          {/* Communication Preferences Section */}
          <div className={`md:col-span-3 ${activeSection !== 'communication' && 'hidden'}`}>
            <Card className="p-6 bg-gray-300">
              <h2 className="text-xl font-semibold text-primary mb-4">{t`Communication Preferences`}</h2>
              <p className="text-primary/70 mb-6">{t`Select which emails you would like to receive:`}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="insider-tips" defaultChecked />
                  <Label htmlFor="insider-tips">{t`Insider Tips & Tricks`}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="new-features" defaultChecked />
                  <Label htmlFor="new-features">{t`New Features & Announcements`}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="market-research" defaultChecked />
                  <Label htmlFor="market-research">{t`Market Research`}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="unsubscribe-all" />
                  <Label htmlFor="unsubscribe-all">{t`Unsubscribe from all Resume builder emails`}</Label>
                </div>
                <Button 
                  className="mt-6 bg-[#CDEA68] text-black hover:bg-[#CDEA68]/90"
                >
                  {t`Save Changes`}
                </Button>
              </div>
            </Card>
          </div>

          {/* Privacy Settings Section */}
          <div className={`md:col-span-3 ${activeSection !== 'privacy' && 'hidden'}`}>
            <Card className="p-6 bg-gray-300">
              <h2 className="text-xl font-semibold text-primary mb-4">{t`Privacy Settings`}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="analytics" defaultChecked />
                  <Label htmlFor="analytics">{t`Analytics`}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="advertising" defaultChecked />
                  <Label htmlFor="advertising">{t`Advertising`}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="personalization" defaultChecked />
                  <Label htmlFor="personalization">{t`Personalization`}</Label>
                </div>
                <Button 
                  className="mt-6 bg-[#CDEA68] text-black hover:bg-[#CDEA68]/90"
                >
                  {t`Save Changes`}
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className={`md:col-span-3 ${activeSection !== 'general' && 'hidden'}`}>
            {/* Profile Card */}
            <Card className="p-6 mb-6 bg-gray-300">
              <div className="flex items-center gap-4">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">JP</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">John Patel</h3>
                  <p className="text-primary/70">Premium Member</p>
                  <p className="text-sm text-primary/50">Member since Jan 2024</p>
                </div>
                <Button 
                  variant="outline" 
                  className="ml-auto"
                >
                  {t`Change Photo`}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-primary">{t`General Settings`}</h2>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Pencil size={16} />
                    {isEditing ? t`Save Changes` : t`Edit Details`}
                  </Button>
                </div>

                <Separator />

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>{t`Account ID`}</Label>
                    <Input 
                      value="SA498559"
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t`Email Address`}</Label>
                    <Input
                      type="email"
                      value="john@example.com"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t`Password`}</Label>
                    <Input
                      type="password"
                      value="••••••••••••"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t`Contact Number`}</Label>
                    <Input
                      type="tel"
                      value="+91 123457890"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="mt-8 p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-primary">{t`Danger Zone`}</h2>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-destructive">{t`Delete Account`}</h3>
                    <p className="text-sm text-primary/70">
                      {t`Permanently delete your account and all associated data`}
                    </p>
                  </div>
                  <Button>{t`Delete Account`}</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AccountSettings;
