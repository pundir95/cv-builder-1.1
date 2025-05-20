import { axios } from "@/client/libs/axios";
import { t } from "@lingui/macro";
import { MagnifyingGlass, Funnel, Export, DotsThree, Pencil, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("non-registered"); // Tabs: non-registered, registered, premium

  useEffect(() => {
    axios.get('/accounts/api/users/').then((res) => {
      setUsersData(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  // Mock data - replace with actual API call
  const users = [
    {
      id: 1,
      name: "John Williams", 
      email: "john.w@example.com",
      createdAt: "03-12-2024",
      lastActive: "03-15-2024",
      plan: "Premium Monthly Plan",
      amount: "$15/month",
      userType: "premium"
    },
    {
      id: 2,
      name: "Pankaj Pundir", 
      email: "pankaj.pundir@example.com",
      createdAt: "03-12-2024",
      lastActive: "03-15-2024",
      plan: "Premium Monthly Plan",
      amount: "$25/month",
      userType: "registered"
    },
    {
      id: 3,
      name: "Guest User", 
      email: "-",
      createdAt: "-",
      lastActive: "-",
      plan: "-",
      amount: "-",
      userType: "non-registered"
    },
  ];

  // Filter users based on selected tab
  const filteredUsers = usersData.filter((user: any) => {
    if (selectedTab === "premium") return user.subscription_details.length > 0;
    if (selectedTab === "registered") return user.is_email_verified === true;
    if (selectedTab === "non-registered") return user.is_email_verified === false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t`Users`}</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t`Search users...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px] pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <Funnel />
              {t`Filter`}
            </button>
            <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <Export />
              {t`Export`}
            </button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-300 mb-2">
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${selectedTab === "non-registered" ? "border-primary text-primary" : "border-transparent text-gray-500"}`}
          onClick={() => setSelectedTab("non-registered")}
        >
          {t`Non-Registered Users`}
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${selectedTab === "registered" ? "border-primary text-primary" : "border-transparent text-gray-500"}`}
          onClick={() => setSelectedTab("registered")}
        >
          {t`Registered Users`}
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${selectedTab === "premium" ? "border-primary text-primary" : "border-transparent text-gray-500"}`}
          onClick={() => setSelectedTab("premium")}
        >
          {t`Premium Users`}
        </button>
      </div>
      <div className="rounded-lg border border-gray-100 bg-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left p-4 font-medium">{t`Name`}</th>
              <th className="text-left p-4 font-medium">{t`Email`}</th>
              <th className="text-left p-4 font-medium">{t`Phone`}</th>
              {/* <th className="text-left p-4 font-medium">{t`Created At`}</th> */}
              <th className="text-left p-4 font-medium">{t`Last Active`}</th>
             {selectedTab === "premium" && <th className="text-left p-4 font-medium">{t`Plan`}</th>}
              {/* <th className="text-left p-4 font-medium">{t`Amount`}</th> */}
              {/* <th className="text-left p-4 font-medium w-[100px]">{t`Actions`}</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: any) => (
              <tr key={user.id} className="border-b bg-gray-100">
                <td className="p-4 font-medium">{user.first_name} {user.last_name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone_number}</td>
                {/* <td className="p-4">{user.createdAt}</td> */}
                <td className="p-4">{user.last_login?.split("T")[0]}</td>
                {selectedTab === "premium" && <td className="p-4">
                  <span className="inline-flex items-center rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    {user.subscription_details.length > 0 ? "Premium" : "Free"}
                  </span>
                </td>}
                {/* <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                      <Pencil size={16} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-100 text-red-500">
                      <Trash size={16} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-100">
                      <DotsThree size={16} weight="bold" />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
