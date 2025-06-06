import { axios } from '@/client/libs/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DeleteSubscriptionUser } from '../admin-dashboard/account/DeleteSubscriptionUser';

const CustomerOrganisation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sharedByMe');
  const [sharedByMe, setSharedByMe] = useState([]);
  const [sharedWithMe, setSharedWithMe] = useState([]);
  const [isDelete, setIsDelete] = useState({
    delete: false,
    deletedId: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSharedCv()
  }, []);


  const fetchSharedCv = () => {
    axios.get(`/cv-manager/share-cv/`).then((res: any) => {
      console.log(res.data,"res.data"),
      setSharedByMe(res.data?.data?.share_by_me || []);
      setSharedWithMe(res.data?.data?.share_with_me || []);
    });
  }

  const deleteSharedCv = (id: any) => {
    setIsDelete({...isDelete, delete: true, deletedId: id})
  }

  const confirmDelete = () => {
    setIsLoading(true)
    axios.delete(`/cv-manager/share-cv/${isDelete.deletedId}/`).then((res: any) => {
      setIsLoading(false)
      setIsDelete({...isDelete, delete: false})
      fetchSharedCv()
    });
  }

  const renderTable = (data: any[]) => (
    console.log(data,"data"),
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="min-w-full bg-white rounded-xl">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 text-left rounded-tl-xl">S.No.</th>
            <th className="py-3 px-4 text-left">Cv Name</th>
            <th className="py-3 px-4 text-left">{activeTab === 'sharedByMe' ? 'Shared to' : 'Shared by'}</th>
            <th className="py-3 px-4 text-left rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((resume: any, idx: any) => (
            <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-100 transition">
              <td className="py-3 px-4 font-medium">{idx + 1}</td>
              <td className="py-3 px-4 text-blue-700 font-semibold hover:underline cursor-pointer">{resume?.cv?.title}</td>
             {activeTab === 'sharedByMe' && <td className="py-3 px-4">{`(${resume?.shared_user?.first_name})`} {resume?.shared_user?.email}</td>}
             {activeTab === 'sharedWithMe' && <td className="py-3 px-4">{`(${resume?.user?.first_name})`} {resume?.user?.email}</td>}
              <td className="py-3 px-4 flex gap-3 items-center">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => {
                  navigate(`/builder/shared/${resume?.id}?sahredcv=true`)
                }}><span role="img" aria-label="edit">✏️</span> Edit</button>
               {activeTab === 'sharedByMe'?  <button className="text-blue-500 hover:text-blue-700" onClick={() => deleteSharedCv(resume?.id)}><span role="img" aria-label="delete">🗑️</span>Delete</button>:""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shared CVs</h2>
          <button className="bg-lime-300 hover:bg-lime-400 text-black font-semibold py-2 px-6 rounded-full shadow">
            Create New Resume
          </button>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('sharedByMe')}
                className={`${
                  activeTab === 'sharedByMe'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Shared by Me
              </button>
              <button
                onClick={() => setActiveTab('sharedWithMe')}
                className={`${
                  activeTab === 'sharedWithMe'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Shared with Me
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'sharedByMe' ? renderTable(sharedByMe) : renderTable(sharedWithMe)}
      </div>

      <DeleteSubscriptionUser 
        isOpen={isDelete.delete}  
        onClose={() => setIsDelete({...isDelete, delete: false})} 
        id={isDelete.deletedId}
        text="Delete"
        onConfirm={() => {
         confirmDelete()
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default CustomerOrganisation;
