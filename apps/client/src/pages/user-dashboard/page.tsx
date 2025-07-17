import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { Button } from "@reactive-resume/ui";
import { Warning, PencilSimple, Download, Plus, Bank, CreditCard, Shield, Check, Money } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { useResumes } from "@/client/services/resume";
import { useState, useEffect } from "react";
import { ResumeDto } from "@reactive-resume/dto";

export const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  const { resumes, loading } = useResumes();
  const [selectedResume, setSelectedResume] = useState<ResumeDto | null>(null);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(userData,"userData")

  useEffect(() => {
    if (resumes && resumes.length > 0) {
      setSelectedResume(resumes[0]);
    }
  }, [resumes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />
        <title>{t`Dashboard`} - Resume</title>
        <meta
          name="description"
          content="Manage your resumes and account settings in your personal dashboard."
        />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center order-2 lg:order-1">
            {/* Resume Dropdown */}
            <div className="w-full mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-2">RESUME</label>
              <select 
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  const selectedResume = resumes?.find((resume:any) => resume.id === value);
                  if (selectedResume) {
                    setSelectedResume(selectedResume);
                  }
                }}
              >
                {resumes?.map((resume) => (
                  <option key={resume.id} value={resume.id}>{resume.title}</option>
                ))}
              </select>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span className="text-yellow-500 mr-1">★</span>
                This is your <span className="font-bold mx-1">primary</span> resume
              </div>
            </div>
            
            {/* Resume Preview */}
            <div className="my-4 w-full flex justify-center">
              <div className="relative group">
                <img
                  src={`/templates/jpg/${selectedResume?.cv_template?.internal_name}.jpg`}
                  alt="Resume Preview"
                  className="rounded-lg shadow-md border border-gray-200 w-full max-w-60 h-72 object-contain bg-gray-50 transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
              </div>
            </div>
            
            {/* Edit/Download Buttons */}
            <div className="flex w-full justify-between mt-4 mb-6 gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="flex items-center gap-2 flex-1 justify-center py-2.5 hover:bg-gray-100 transition-colors" 
                onClick={() => navigate(`/builder/${selectedResume?.id}`)}
              >
                <PencilSimple size={16} /> Edit
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="flex items-center gap-2 flex-1 justify-center py-2.5 hover:bg-gray-100 transition-colors"
              >
                <Download size={16} /> Download
              </Button>
            </div>
            
            {/* Resume Strength */}
            <div className="w-full flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Resume Strength:</span>
              <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-bold">
                {selectedResume?.cv_data?.metadata?.template?.progress || 0}%
              </span>
            </div>
            
            {/* Create New Resume */}
            <Button 
              size="sm" 
              variant="success" 
              className="w-full bg-[#D6EF3C]/90 text-black px-6 h-auto !py-3 rounded-full font-semibold hover:bg-[#D6EF3C]/90 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => navigate("/onboard/select-template?create-new-resume")}
            >
              <Plus size={18} className="mr-2" /> Create New Resume
            </Button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 order-1 lg:order-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Your Recommended Next Steps</h1>
            
            {/* Resume Strength & Fix Resume */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center mb-8 border border-blue-100">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mr-0 lg:mr-8 flex flex-col items-center min-w-full md:min-w-[220px] mb-6 lg:mb-0">
                <span className="text-blue-600 font-bold text-lg mb-3">Resume Strength</span>
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-500 rounded-full px-4 py-2 text-xl font-bold">
                      {selectedResume?.cv_data?.metadata?.template?.progress || 0}%
                    </span>
                  </div>
                </div>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  {selectedResume?.cv_data?.sections?.education?.items?.length === 0 && (
                    <li className="flex items-center gap-2">
                      <Warning size={16} className="bg-red-500 rounded text-white p-0.5" />
                      Education
                    </li>
                  )}
                  {selectedResume?.cv_data?.sections?.skills?.items?.length === 0 && (
                    <li className="flex items-center gap-2">
                      <Warning size={16} className="bg-red-500 rounded text-white p-0.5" />
                      Skills
                    </li>
                  )}
                  {selectedResume?.cv_data?.sections?.experience?.items?.length === 0 && (
                    <li className="flex items-center gap-2">
                      <Warning size={16} className="bg-red-500 rounded text-white p-0.5" />
                      Experience
                    </li>
                  )}
                  {selectedResume?.cv_data?.sections?.languages?.items?.length === 0 && (
                    <li className="flex items-center gap-2">
                      <Warning size={16} className="bg-red-500 rounded text-white p-0.5" />
                      Languages
                    </li>
                  )}
                  {!selectedResume?.cv_data?.sections?.summary?.content && (
                    <li className="flex items-center gap-2">
                      <Warning size={16} className="bg-red-500 rounded text-white p-0.5" />
                      Summary
                    </li>
                  )}
                  {selectedResume?.cv_data?.sections?.projects?.items?.length === 0 && (
                    <li className="flex items-center gap-2">
                      <Warning size={16} className="bg-red-500 rounded text-white p-0.5" />
                      Projects
                    </li>
                  )}
                </ul>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Fix Resume</h2>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  We found missing sections in your resume.<br className="hidden sm:block" />
                  Use our Resume Check tool to complete them.
                </p>
                <Button 
                  className="bg-[#D6EF3C]/90 text-black px-8 py-3 rounded-full font-semibold hover:bg-[#D6EF3C]/90 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => navigate(`/builder/${selectedResume?.id}?improve=true`)}
                >
                  Improve Resume
                </Button>
              </div>
            </div>

            {/* Action Cards */}
            {userData?.subscription_details?.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Current Plan Card */}
                <div className="bg-[#0D84F3] rounded-2xl shadow-xl p-6 sm:p-8 text-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{userData?.subscription_details[0]?.plan_details?.name}</h2>
                      <p className="text-blue-100 text-sm sm:text-base">Your current subscription</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">${userData?.subscription_details[0]?.plan_details?.price}</div>
                      <div className="text-blue-100 text-sm">{userData?.subscription_details[0]?.plan_details?.validity}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4 text-blue-100 text-lg">Current Features</h3>
                      <ul className="space-y-3">
                        {userData?.subscription_details[0]?.plan_details?.fetures?.map((feature:any, index:number) => (
                          <li key={index} className="flex items-center gap-3">
                            <Check size={20} weight="bold" className="text-green-300" />
                            <span className="text-blue-50">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Upgrade Subscription Plan Card */}
                <div className="bg-[#0D84F3] rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center justify-center border border-gray-100">
                  <div className="flex items-center mb-6">
                    <span className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 mr-4">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <path fill="#F59E42" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.01z"/>
                      </svg>
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Upgrade to Premium</h2>
                  </div>
                  <p className="text-white text-center mb-6 max-w-2xl text-sm sm:text-base leading-relaxed">
                    Unlock all features and create unlimited resumes. Enjoy premium templates, advanced analytics, and priority support to boost your job search success!
                  </p>
                  <ul className="text-white text-sm sm:text-base mb-8 list-disc list-inside text-left max-w-md space-y-2">
                    <li>Unlimited resume creation</li>
                    <li>Access to all premium templates</li>
                    <li>Advanced resume analytics</li>
                    <li>Priority customer support</li>
                  </ul>
                  <Button 
                    onClick={() => navigate('/dashboard/plan-pricing')} 
                    className="bg-[#D6EF3C]/90 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#D6EF3C]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
