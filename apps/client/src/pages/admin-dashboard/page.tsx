import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button, TabsContent } from "@reactive-resume/ui";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { Pagination } from "@/client/components/pagination";
import { ChartLine, CurrencyDollar, Gear, Users, Notepad } from "@phosphor-icons/react";
import { Sidebar } from "./components/Sidbar";
import { useEffect, useState } from "react";
import { axios } from "@/client/libs/axios";
import { ListView } from "../dashboard/resumes/_layouts/list";
import { GridView } from "../dashboard/resumes/_layouts/grid";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";

export const AdminDashboardPage = () => {
  const { i18n } = useLingui();
  const [data, setData] = useState<any>(null);
  const [usersData, setUsersData] = useState<any>(null);
  
  // Pagination state - designed to work with both frontend and backend
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // For future backend pagination
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    axios.get("/admin/api/admin-dashbord/").then((res: any) => {
      setData(res.data.data);
    })
  }, [])

  // Current implementation - frontend pagination
  useEffect(() => {
    setIsLoading(true);
    axios.get('/accounts/api/users/').then((res) => {
      setUsersData(res.data);
      setTotalUsers(res.data.length);
      setHasNextPage(res.data.length > usersPerPage);
      setHasPreviousPage(false); // First page initially
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
    })
  }, [])

  // Pagination calculations for frontend
  const getCurrentPageUsers = () => {
    if (!usersData) return [];
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return usersData.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Get current users (frontend pagination for now)
  const currentUsers = getCurrentPageUsers();
  
  // Calculate total pages for frontend pagination
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Update pagination state when page changes
  useEffect(() => {
    if (usersData) {
      setHasNextPage(currentPage < totalPages);
      setHasPreviousPage(currentPage > 1);
    }
  }, [currentPage, totalPages, usersData]);

  // Change page function - designed to work with both frontend and backend
  const changePage = async (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    
    setCurrentPage(pageNumber);
    
    // For future backend pagination, you would call the API here
    // Example:
    // await fetchUsersForPage(pageNumber);
  };

  // Next page function
  const nextPage = async () => {
    if (hasNextPage) {
      await changePage(currentPage + 1);
    }
  };

  // Previous page function
  const prevPage = async () => {
    if (hasPreviousPage) {
      await changePage(currentPage - 1);
    }
  };

  // Future function for backend pagination (commented out for now)
  // const fetchUsersForPage = async (page: number) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`/accounts/api/users/?page=${page}&page_size=${usersPerPage}`);
  //     setUsersData(response.data.results);
  //     setTotalUsers(response.data.count);
  //     setHasNextPage(response.data.next !== null);
  //     setHasPreviousPage(response.data.previous !== null);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex h-screen">
      <ScrollArea orientation="vertical" className="flex-1">
        <Helmet prioritizeSeoTags>
          <html lang={i18n.locale} />
          <title>{t`Admin Dashboard`} - {t`Reactive Resume`}</title>
        </Helmet>

        <main className="py-8 md:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary">Welcome {data?.admin_details?.email}</h2>
            <p className="text-primary/70 mt-2">Manage and monitor user accounts</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-xl font-semibold text-primary">Recent Users</h3>
              <p className="text-sm text-primary/70 mt-1">
                Showing {((currentPage - 1) * usersPerPage) + 1}-{Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
              </p>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-primary/70 mt-2">Loading users...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg border border-secondary/20">
                  <table className="w-full">
                    <thead className="">
                      <tr className="border-b bg-blue-500 hover:bg-blue-600 text-white">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">S.No</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <AnimatePresence>
                        {currentUsers?.map((user: any, idx: number) => (
                          <motion.tr
                            key={user.id || idx}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.1 } }}
                            exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
                            className="border-b border-secondary/20 hover:bg-secondary/5"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-primary">
                              {((currentPage - 1) * usersPerPage) + idx + 1}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-primary">
                              {user.first_name} {user.last_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-primary/80">{user.email}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                {user.is_email_verified ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-primary/80">
                              {dayjs(user.last_login).format("DD/MM/YYYY")}
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalUsers}
                    itemsPerPage={usersPerPage}
                    onPageChange={changePage}
                    onNextPage={nextPage}
                    onPrevPage={prevPage}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    isLoading={isLoading}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default AdminDashboardPage;
