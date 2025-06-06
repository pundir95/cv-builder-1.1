import { useEffect, useState } from "react";
import { Card, Button, Input, Select, SelectTrigger, SelectContent, Badge, Switch, SelectItem } from "@reactive-resume/ui";
import { Trash } from "@phosphor-icons/react";
import AddOnUserModal from "./AddOnUserModal";
import CreateAddOnUser from "./CreateAddOnUser";
import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";
import { DeleteSubscriptionUser } from "./DeleteSubscriptionUser";

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

export default function OrganisationUsers({showModal, setShowModal, employees}: {showModal: any, setShowModal: any, employees: any}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [isDeleteORDisable, setIsDeleteORDisable] = useState({
    delete: false,
    deletedId: "",
    disable: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const userData=localStorage.getItem("user")||"";
  const userDataObj=JSON.parse(userData)


  
  // // Filtered users based on search
  // const filteredUsers = employees.filter((user: any) =>
  //   user.name.toLowerCase().includes(search.toLowerCase()) ||
  //   user.email.toLowerCase().includes(search.toLowerCase())
  // );

  // Handle status toggle
  const handleStatusChange = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
    setIsDeleteORDisable({...isDeleteORDisable, disable: true, deletedId: id.toString()})
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setIsDeleteORDisable({...isDeleteORDisable, delete: true, deletedId: id.toString()})
    setUsers((prev) => prev.filter((user) => user.id !== id));

  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`company/organization-employees/${isDeleteORDisable.deletedId}/`);
      setIsDeleteORDisable({...isDeleteORDisable, delete: false})
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
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
          <Button className="bg-blue-500 text-white px-6" onClick={() =>{
            if(userDataObj.subscription_details.length>0){
              if(userDataObj.limit==0){
                setShowModal({...showModal, addOnUser: true,createAddOnUser: false})
              }else{
                setShowModal({...showModal, addOnUser: false,createAddOnUser: true})
              }
            }else{
              toast({
                title: "You are not subscribed to any plan",
                variant: "error",
              })
            }
          }}>Add-On User</Button>
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
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">No users found.</td>
                </tr>
              ) : (
                employees?.length>0 && employees?.map((user: any, idx: any) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4 font-medium">{user.organization_user?.first_name} {user.organization_user?.last_name}</td>
                    <td className="p-4">{user.organization_user?.email}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2">
                        <span>{user.is_active ? "Active" : "Inactive"}</span>
                        <Switch checked={user.is_active} onCheckedChange={() => handleStatusChange(user.id)} />
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
        <AddOnUserModal isOpen={showModal.addOnUser} onClose={() => setShowModal({...showModal, addOnUser: false})}
          price={userDataObj.subscription_details[0]?.plan_details?.price}
          plan_id={userDataObj.subscription_details[0]?.plan_id}
          onPay={() => {
            setIsDeleteORDisable({...isDeleteORDisable, delete: true})
          }}
          />
        <CreateAddOnUser isOpen={showModal.createAddOnUser} onClose={() => setShowModal({...showModal, createAddOnUser: false})} />
      </Card>
      {isDeleteORDisable.delete && <DeleteSubscriptionUser isOpen={isDeleteORDisable.delete}  onClose={() => setIsDeleteORDisable({...isDeleteORDisable, delete: false})} id={isDeleteORDisable.deletedId}
      text="Delete"
      onConfirm={() => {
        handleConfirm()
      }}
      isLoading={isLoading}
      />}
      {isDeleteORDisable.disable && <DeleteSubscriptionUser isOpen={isDeleteORDisable.disable}  onClose={() => setIsDeleteORDisable({...isDeleteORDisable, disable: false})} id={isDeleteORDisable.deletedId}
      text="Disable"
      onConfirm={() => {
        handleConfirm()
      }}
      isLoading={isLoading}
      />}
    </div>
  );
}
