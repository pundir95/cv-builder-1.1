import { useState } from "react";
import { Card, Button, Input, Select, SelectTrigger, SelectContent, Badge, Switch, SelectItem } from "@reactive-resume/ui";
import { Trash } from "@phosphor-icons/react";
import AddOnUserModal from "./AddOnUserModal";
import CreateAddOnUser from "./CreateAddOnUser";

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Pankaj Pundir",
    email: "pankaj@avioxtechnologies.com",
    role: "Organization Super Admin",
    status: true,
  },
  // Add more users as needed
];

export default function OrganisationUsers({showModal, setShowModal}: {showModal: any, setShowModal: any}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState(mockUsers);

  // Filtered users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle status toggle
  const handleStatusChange = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
        <span className="font-semibold text-gray-900">Organisation User</span>
      </div>
      <Card className="p-6">
        {/* Header: Search, Filter, Add-On User */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-1 gap-2 items-center">
            <Input
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">Filter by</SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-blue-500 text-white px-6" onClick={() => setShowModal({...showModal, addOnUser: false,createAddOnUser: true})}>Add-On User</Button>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-left font-semibold text-gray-700">S.No</th>
                <th className="p-4 text-left font-semibold text-gray-700">User Name</th>
                <th className="p-4 text-left font-semibold text-gray-700">Email</th>
                <th className="p-4 text-left font-semibold text-gray-700">Role</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2">
                        <span>{user.status ? "Active" : "Inactive"}</span>
                        <Switch checked={user.status} onCheckedChange={() => handleStatusChange(user.id)} />
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        className="text-red-500 hover:bg-gray-100 rounded p-2"
                        onClick={() => handleDelete(user.id)}
                        title="Delete user"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <AddOnUserModal isOpen={showModal.addOnUser} onClose={() => setShowModal({...showModal, addOnUser: false})} onPay={() => {}} />
        <CreateAddOnUser isOpen={showModal.createAddOnUser} onClose={() => setShowModal({...showModal, createAddOnUser: false})} onAdd={() => {}} />
      </Card>
    </div>
  );
}
