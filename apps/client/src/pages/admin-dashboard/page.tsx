import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button } from "@reactive-resume/ui";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { ChartLine, CurrencyDollar, Gear, Users,  Notepad } from "@phosphor-icons/react";
import { Sidebar } from "./components/Sidbar";
import { useEffect, useState } from "react";
import { axios } from "@/client/libs/axios";

export const AdminDashboardPage = () => {
  const { i18n } = useLingui();
  const [data,setData] = useState<any>(null);
  const [usersData,setUsersData] = useState<any>(null);

  useEffect(()=>{
   axios.get("/admin/api/admin-dashbord/").then((res:any)=>{
    setData(res.data.data);
   })


  },[])

  useEffect(() => {
    axios.get('/accounts/api/users/').then((res) => {
      setUsersData(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className="flex h-screen">

      <ScrollArea orientation="vertical" className="flex-1">
        <Helmet prioritizeSeoTags>
          <html lang={i18n.locale} />
          <title>{t`Admin Dashboard`} - {t`Reactive Resume`}</title>
        </Helmet>

        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary">Welcome {data?.admin_details?.email}</h2>
            <p className="text-primary/70 mt-2">Manage and monitor user accounts</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary">Total Users</h3>
              <p className="text-3xl font-bold text-primary mt-2">{data?.total_user}</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary">Premium Users</h3>
              <p className="text-3xl font-bold text-primary mt-2">{data?.premium_user}</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary">Active Today</h3>
              <p className="text-3xl font-bold text-primary mt-2">{data?.active_users_today}</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">

              <h3 className="text-lg font-semibold text-primary">Total Resumes</h3>
              <p className="text-3xl font-bold text-primary mt-2">{data?.total_resume}</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-primary/5 rounded-lg overflow-hidden">
            <div className="p-6 bg-primary/10 border-b">
              <h3 className="text-xl font-semibold text-primary">Recent Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">S.No</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Last Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
           {
            usersData?.slice(0,5).map((user:any,idx:number)=>(
              <tr className="hover:bg-primary/5">
                <td className="px-6 py-4 text-sm font-medium text-primary">{idx+1}</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">{user.first_name} {user.last_name}</td>
                    <td className="px-6 py-4 text-sm text-primary/80">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{user.is_email_verified?"Active":"Inactive"}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/80">{user.last_login}</td>
                  
                    </tr>
            ))
            }
               
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default AdminDashboardPage;
