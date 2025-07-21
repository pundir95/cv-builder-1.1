import { axios } from '@/client/libs/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DeleteSubscriptionUser } from '../admin-dashboard/account/DeleteSubscriptionUser';

const CustomerOrganisation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sharedByMe');
  const [sharedByMe, setSharedByMe] = useState([]);
  const [sharedWithMe, setSharedWithMe] = useState([]);
  const [anyoneCv, setAnyoneCv] = useState([]);
  const [isDelete, setIsDelete] = useState({
    delete: false,
    deletedId: '',
    type:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [editingExpiryId, setEditingExpiryId] = useState(null);
  const [newExpiry, setNewExpiry] = useState('');
  const [expiryLoading, setExpiryLoading] = useState(false);

  useEffect(() => {
    fetchSharedCv()
    fetchAnyoneCv()
  }, []);


  const fetchSharedCv = () => {
    axios.get(`/cv-manager/share-cv/`).then((res: any) => {
      console.log(res.data,"res.data"),
      setSharedByMe(res.data?.data?.share_by_me || []);
      setSharedWithMe(res.data?.data?.share_with_me || []);
    });
  }

 const fetchAnyoneCv = () => {
  axios.get(`/share-resume/api/resume/share`).then((res: any) => {
    console.log(res.data,"res.data"),
    setAnyoneCv(res.data || []);
  });
 }


  const deleteSharedCv = (id: any,type: any) => {
    setIsDelete({...isDelete, delete: true, deletedId: id,type:type})
  }

  const confirmDelete = () => {
    setIsLoading(true)
    if(isDelete.type === "isSharedByMe"){
    axios.delete(`/cv-manager/share-cv/${isDelete.deletedId}/`).then((res: any) => {
      setIsLoading(false)
      setIsDelete({...isDelete, delete: false})
      fetchSharedCv()
    });
  }else{
    
    axios.delete(`/share-resume/api/resume/share/`,{
        data:{
          "uuid":isDelete.deletedId,
        }
      }).then((res: any) => {
      setIsLoading(false)
      setIsDelete({...isDelete, delete: false})
      fetchAnyoneCv();
    });
  }
  }

  const handleUpdateExpiry = (cv: any) => {

    setExpiryLoading(true);
    axios
      .patch(`/share-resume/api/resume/share/`, { expiry_day: newExpiry,uuid: cv?.id })
      .then((res) => {
        setExpiryLoading(false);
        setEditingExpiryId(null);
        fetchAnyoneCv(); // Refresh the table
      })
      .catch(() => {
        setExpiryLoading(false);
        // Optionally show an error message
      });
  };

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
              <td className="py-3 px-4 text-blue-500 font-semibold hover:underline cursor-pointer">{resume?.cv?.title}</td>
             {activeTab === 'sharedByMe' && <td className="py-3 px-4">{`(${resume?.shared_user?.first_name})`} {resume?.shared_user?.email}</td>}
             {activeTab === 'sharedWithMe' && <td className="py-3 px-4">{`(${resume?.user?.first_name})`} {resume?.user?.email}</td>}
              <td className="py-3 px-4 flex gap-3 items-center">
                <button className="text-blue-500 hover:text-blue-500" onClick={() => {
                  navigate(`/builder/shared/${resume?.id}?sahredcv=true`)
                }}><span role="img" aria-label="edit">✏️</span> Edit</button>
               {activeTab === 'sharedByMe'?  <button className="text-blue-500 hover:text-blue-500" onClick={() => deleteSharedCv(resume?.id,"isSharedByMe")}><span role="img" aria-label="delete">🗑️</span>Delete</button>:""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAnyoneTable = (data: any[]) => (
    console.log(data,"data"),
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="min-w-full bg-white rounded-xl">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 text-left rounded-tl-xl">S.No.</th>
            <th className="py-3 px-4 text-left whitespace-nowrap">CV Name</th>
            <th className="py-3 px-4 text-left whitespace-nowrap">CV ID</th>
            <th className="py-3 px-4 text-left whitespace-nowrap">Shared By</th>
            <th className="py-3 px-4 text-left whitespace-nowrap">Permission</th>
            <th className="py-3 px-4 text-left whitespace-nowrap">Expiry Date</th>
            <th className="py-3 px-4 text-left whitespace-nowrap">Edited By</th>
            <th className="py-3 px-4 text-left rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((resume: any, idx: any) => (
            <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-100 transition">
              <td className="py-3 px-4 font-medium">{idx + 1}</td>
              <td className="py-3 px-4 text-blue-500 font-semibold hover:underline cursor-pointer">
                {resume?.cv?.title}
              </td>
              <td className="py-3 px-4 font-mono text-sm text-gray-600">
                {resume?.cv}
              </td>
              <td className="py-3 px-4 font-mono text-sm text-gray-600">
                {resume?.shared_by_user_email}
              </td>
              <td className="py-3 px-4 font-mono text-sm text-gray-600">
                {resume?.permission}
              </td>
              <td className="py-3 px-4 font-mono text-sm text-gray-600">
                {editingExpiryId === resume?.cv ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={newExpiry}
                      onChange={e => setNewExpiry(e.target.value)}
                      className="border rounded px-2 py-1 w-16"
                    />
                    <button
                      className="text-green-600 font-bold"
                      disabled={expiryLoading}
                      onClick={() => handleUpdateExpiry(resume)}
                    >
                        {expiryLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" /> : "Save"}
                    </button>
                    <button
                      className="text-gray-400"
                      onClick={() => setEditingExpiryId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {resume?.expiry_day} days
                    <button
                      className="text-blue-500 hover:text-blue-500"
                      onClick={() => {
                        setEditingExpiryId(resume?.cv);
                        setNewExpiry(resume?.expiry_day);
                      }}
                      title="Increase Expiry"
                    >
                      +
                    </button>
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                <button 
                  className="text-blue-500 hover:text-blue-500 font-medium underline"
                  onClick={() => {
                    setSelectedResume(resume.edit_users);
                    setShowEditModal(true);
                  }}
                >
                  View {resume?.edit_users?.length || 0} Editor{resume?.edit_users?.length !== 1 ? 's' : ''}
                </button>
              </td>
              <td className="py-3 px-4 flex gap-3 items-center">
                <button 
                  className="text-blue-500 hover:text-blue-500 font-medium" 
                  onClick={() => {
                    navigate(`/builder/${resume?.cv}`)
                  }}
                >
                  <span role="img" aria-label="edit">✏️</span> View CV
                </button>
                <button 
                  className="text-blue-500 hover:text-blue-500 font-medium underline"
                  onClick={() => {
                    deleteSharedCv(resume?.cv,"isAnyone")
                  }}
                >
                  <span role="img" aria-label="delete">🗑️</span> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div className="lg:p-8 p-4 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6 lg:flex-row flex-col gap-4">
          <h2 className="text-2xl font-bold">Shared CVs</h2>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800">
            Create New Resume
          </button>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-auto">
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
              <button
                onClick={() => setActiveTab('anyone')}
                className={`${
                  activeTab === 'anyone'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Anyone
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'sharedByMe' ? renderTable(sharedByMe) : activeTab === 'sharedWithMe' ? renderTable(sharedWithMe) : renderAnyoneTable(anyoneCv)}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                Editors for: {selectedResume?.cv?.title}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {selectedResume?.map((user: any, idx: any) => (
                  <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-lg">
                        {user?.name}
                      </div>
                      <div className="text-gray-600">{user?.email}</div>
                      <div className="text-gray-600">{user?.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
