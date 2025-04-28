import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { Button } from "@reactive-resume/ui";
import { Warning, PencilSimple, Download, Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();

  // Mock data for demonstration
  const mockResumes = [
    {
      id: 1,
      name: "Kristen_Connelly_Resume.pdf",
      strength: 17,
      isPrimary: true,
      preview: "/templates/jpg/cv_template_5.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />
        <title>{t`Dashboard`} - Resume</title>
        <meta
          name="description"
          content="Manage your resumes and account settings in your personal dashboard."
        />
      </Helmet>
      <div className="flex max-w-7xl mx-auto py-10 gap-8">
        {/* Sidebar */}
        <aside className="w-80 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          {/* Resume Dropdown */}
          <div className="w-full mb-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">RESUME</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              {mockResumes.map((resume) => (
                <option key={resume.id}>{resume.name}</option>
              ))}
            </select>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span className="text-yellow-500 mr-1">★</span>
              This is your <span className="font-bold mx-1">primary</span> resume
            </div>
          </div>
          {/* Resume Preview */}
          <div className="my-4 w-full flex justify-center">
            <img
              src={mockResumes[0].preview}
              alt="Resume Preview"
              className="rounded shadow border w-60 h-72 object-contain bg-gray-100"
            />
          </div>
          {/* Edit/Download Buttons */}
          <div className="flex w-full justify-between mt-2 mb-4">
            <Button size="sm" variant="ghost" className="flex items-center gap-1">
              <PencilSimple size={16} /> Edit
            </Button>
            <Button size="sm" variant="ghost" className="flex items-center gap-1">
              <Download size={16} /> Download
            </Button>
          </div>
          {/* Resume Strength */}
          <div className="w-full flex items-center justify-between mt-2 mb-2">
            <span className="text-sm text-gray-700">Resume Strength:</span>
            <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-bold">{mockResumes[0].strength}</span>
            <a href="#" className="text-blue-600 text-sm ml-2 hover:underline">Improve</a>
          </div>
          {/* Create New Resume */}
          <Button className="w-full mt-6 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Plus size={18} /> Create New Resume
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Your Recommended Next Steps</h1>
          {/* Resume Strength & Fix Resume */}
          <div className="bg-blue-50 rounded-xl p-6 flex items-center mb-8">
            <div className="bg-white rounded-lg shadow p-6 mr-8 flex flex-col items-center min-w-[220px]">
              <span className="text-blue-700 font-bold text-lg mb-2">Resume Strength</span>
              <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-xl font-bold mb-2">17</span>
              <ul className="text-left text-sm text-gray-700 space-y-1">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>Contact Information</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>Professional Summary</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>Work History</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>Education</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>Skills</li>
              </ul>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Fix Resume</h2>
              <p className="mb-4">We found <span className="font-bold">4</span> errors in your resume.<br />Use our Resume Check tool to fix them.</p>
              <Button className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800">Improve Resume</Button>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Upgrade Subscription Plan Card */}
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mr-4">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#F59E42" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.01z"/></svg>
                </span>
                <h2 className="text-2xl font-bold text-yellow-700">Upgrade to Premium</h2>
              </div>
              <p className="text-gray-700 text-center mb-4 max-w-xl">Unlock all features and create unlimited resumes. Enjoy premium templates, advanced analytics, and priority support to boost your job search success!</p>
              <ul className="text-gray-600 text-sm mb-6 list-disc list-inside text-left max-w-md">
                <li>Unlimited resume creation</li>
                <li>Access to all premium templates</li>
                <li>Advanced resume analytics</li>
                <li>Priority customer support</li>
              </ul>
              <Button onClick={() => navigate('/dashboard/plan-pricing')} className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600 transition">Upgrade Now</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
