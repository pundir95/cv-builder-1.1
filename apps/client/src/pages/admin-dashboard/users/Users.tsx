import { t } from "@lingui/macro";
import { MagnifyingGlass, Funnel, Export, DotsThree, Pencil, Trash } from "@phosphor-icons/react";
import { useState } from "react";

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual API call
  const users = [
    {
      id: 1,
      name: "John Williams", 
      email: "john.w@example.com",
      createdAt: "03-12-2024",
      lastActive: "03-15-2024",
      plan: "Premium Monthly Plan",
      amount: "$15/month"
    },
    {
        id: 2,
        name: "Pankaj Pundir", 
        email: "pankaj.pundir@example.com",
        createdAt: "03-12-2024",
        lastActive: "03-15-2024",
        plan: "Premium Monthly Plan",
        amount: "$25/month"
      },
  ];

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
      <div className="rounded-lg border border-gray-100 bg-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left p-4 font-medium">{t`Name`}</th>
              <th className="text-left p-4 font-medium">{t`Email`}</th>
              <th className="text-left p-4 font-medium">{t`Created At`}</th>
              <th className="text-left p-4 font-medium">{t`Last Active`}</th>
              <th className="text-left p-4 font-medium">{t`Plan`}</th>
              <th className="text-left p-4 font-medium">{t`Amount`}</th>
              <th className="text-left p-4 font-medium w-[100px]">{t`Actions`}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b bg-gray-100">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.createdAt}</td>
                <td className="p-4">{user.lastActive}</td>
                <td className="p-4">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {user.plan}
                  </span>
                </td>
                <td className="p-4">{user.amount}</td>
                <td className="p-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
