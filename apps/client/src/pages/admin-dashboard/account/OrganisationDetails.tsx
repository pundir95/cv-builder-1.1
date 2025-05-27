import React, { useState } from 'react';

// Heroicons (install @heroicons/react if not already)
        import { Pencil, Eye, Clipboard, Users, Hash } from '@phosphor-icons/react';

    const OrganisationDetails: React.FC<{showModal: any, setShowModal: any}> = ({showModal, setShowModal}) => {
    const [copied, setCopied] = useState(false);
  const org = {
    name: 'Avio',
    number: '2323213123',
    id: '3c3428ae-7017-4a07-9506-f5937f6cac20',
    users: 1,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(org.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold mb-4">Organisation Details</h2> */}
      <div className="bg-white rounded-xl shadow-md p-6 relative flex flex-col gap-6">
        {/* Edit Icon */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <Pencil size={16} onClick={() => setShowModal({...showModal, organisationDetailsEdit: true, organisationDetails: false})} />
        </button>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {org.name[0]}
          </div>
          <div>
            <div className="text-lg font-semibold">Organization Name: <span className="font-bold">{org.name}</span></div>
            <div className="text-gray-500 text-sm">Organization Number: {org.number}</div>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          {/* Organization ID */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Hash size={16} />
              Organization ID
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-sm break-all">{org.id}</span>
              <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600" title="Copy">
                <Clipboard size={16} />
              </button>
              {copied && <span className="text-green-500 text-xs ml-1">Copied!</span>}
            </div>
          </div>
          {/* Users */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users size={16} />
              Users
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold">{org.users} users</span>
              <button className="ml-auto text-gray-400 hover:text-gray-600" title="View Users">
                <Eye size={16} onClick={() => setShowModal({...showModal, organisationUsers: true, organisationDetailsEdit: false, organisationDetails: false})} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationDetails;
