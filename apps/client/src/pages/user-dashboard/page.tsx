import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button } from "@reactive-resume/ui";
import { Warning, PencilSimple, Download, Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();

  const mockResumes = [
    {
      id: 1,
      name: "Software Developer Resume",
      modified: "2024-01-15",
      created: "2024-01-10", 
      strength: "85%"
    },
    {
      id: 2,
      name: "Product Manager Resume",
      modified: "2024-01-14",
      created: "2024-01-05",
      strength: "92%"
    }
  ];

  return (
    <ScrollArea orientation="vertical" className="h-screen">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />
        <title>{t`Dashboard`} - Resume</title>
        <meta
          name="description"
          content="Manage your resumes and account settings in your personal dashboard."
        />
      </Helmet>

      <main className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{t`Welcome, Pankaj Pundir`}</h1>
          <p className="text-lg text-primary/70">
            {t`Manage your resumes, track your applications, and keep your career moving forward.`}
          </p>
        </div>
        <div className="space-y-8">
          {/* Top Row with Subscription Alert and Create Resume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subscription Alert */}
            <div className="rounded-lg bg-primary/10 p-6 border border-primary/20">
              <div className="flex items-center gap-3">
                <Warning size={40} className="text-primary" />
                <div>
                  <h2 className="text-lg font-semibold text-primary">{t`No Active Subscription`}</h2>
                  <p className="text-primary/80 mt-1">
                    {t`Upgrade to Premium to unlock all features and create unlimited resumes.`}
                  </p>
                </div>
                <Button onClick={() => navigate("/dashboard/plan-pricing")} className="ml-auto bg-primary bg-blue-500 text-white hover:bg-primary/90 whitespace-nowrap">
                  {t`Upgrade Now`}
                </Button>
              </div>
            </div>

            {/* Create Resume Section */}
            <div className="flex items-center gap-6 p-6 border rounded-lg bg-primary/5">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-primary">{t`Create Your Resume`}</h2>
                <p className="text-primary/70 mb-4">
                  {t`Start building your professional resume with our easy-to-use templates.`}
                </p>
                <Button className="flex items-center gap-2 bg-primary bg-blue-500 text-white hover:bg-primary/90">
                  <Plus size={20} color="white" />
                  {t`Create New Resume`}
                </Button>
              </div>
              <div className="w-32">
                <img 
                  src="/templates/jpg/cv_template_5.jpg" 
                  alt="Resume Template"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Recent Resumes Table */}
          <div className="border rounded-lg overflow-hidden bg-primary/5">
            <h2 className="text-xl font-semibold p-6 bg-primary/10 border-b text-primary">
              {t`My Latest Resumes`}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{t`S.No`}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{t`Name`}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{t`Modified`}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{t`Created`}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{t`Strength`}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{t`Actions`}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {mockResumes.map((resume, index) => (
                    <tr key={resume.id} className="hover:bg-primary/5">
                      <td className="px-6 py-4 text-sm text-primary/80">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-primary">{resume.name}</td>
                      <td className="px-6 py-4 text-sm text-primary/80">{resume.modified}</td>
                      <td className="px-6 py-4 text-sm text-primary/80">{resume.created}</td>
                      <td className="px-6 py-4 text-sm text-primary/80">{resume.strength}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1 border-primary text-primary hover:bg-primary hover:text-white">
                            <PencilSimple size={16} />
                            {t`Edit`}
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1 border-primary text-primary hover:bg-primary hover:text-white">
                            <Download size={16} />
                            {t`Download`}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </ScrollArea>
  );
};
