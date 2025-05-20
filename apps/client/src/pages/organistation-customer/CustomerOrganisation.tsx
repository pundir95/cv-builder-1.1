import React from 'react';

const resumes = [
  { name: 'Johan Berg', modification: '10-12-2024', creation: '09-12-2024', strength: 63 },
  ...Array(9).fill({ name: 'Resume 1', modification: '10-12-2024', creation: '09-12-2024', strength: 63 })
];

const CustomerOrganisation = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">CV received from organization customers</h2>
        <button className="bg-lime-300 hover:bg-lime-400 text-black font-semibold py-2 px-6 rounded-full shadow">
          Create New Resume
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white rounded-xl">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">S.No.</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Modification</th>
              <th className="py-3 px-4 text-left">Creation</th>
              <th className="py-3 px-4 text-left">Strength</th>
              <th className="py-3 px-4 text-left rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume, idx) => (
              <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-100 transition">
                <td className="py-3 px-4 font-medium">{idx + 1}</td>
                <td className="py-3 px-4 text-blue-700 font-semibold hover:underline cursor-pointer">{resume.name}</td>
                <td className="py-3 px-4">{resume.modification}</td>
                <td className="py-3 px-4">{resume.creation}</td>
                <td className="py-3 px-4">
                  <span className="bg-cyan-100 text-cyan-600 font-bold px-3 py-1 rounded-full">{resume.strength}</span>
                </td>
                <td className="py-3 px-4 flex gap-3 items-center">
                  <button className="text-cyan-600 font-semibold hover:underline">Check</button>
                  <button className="text-blue-500 hover:text-blue-700"><span role="img" aria-label="edit">✏️</span> Edit</button>
                  <button className="text-blue-500 hover:text-blue-700"><span role="img" aria-label="download">⬇️</span> Download</button>
                  {/* <button className="text-gray-500 hover:text-gray-700"><span role="img" aria-label="more">⋯</span> More</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrganisation;
