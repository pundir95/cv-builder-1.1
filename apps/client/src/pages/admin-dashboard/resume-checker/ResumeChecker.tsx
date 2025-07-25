import { useEffect, useState } from "react";
import { Button } from "@reactive-resume/ui";
import { Pencil } from "@phosphor-icons/react";

// Mock data for demonstration
const mockResumes = [
  {
    id: 1,
    cv_name: "Frontend Developer Resume.pdf",
    user: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@example.com",
      phone_number: "+1 555-1234",
    },
  },
  {
    id: 2,
    cv_name: "Backend Engineer CV.pdf",
    user: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob.smith@example.com",
      phone_number: "+1 555-5678",
    },
  },
  {
    id: 3,
    cv_name: "UI Designer Resume.pdf",
    user: {
      first_name: "Carol",
      last_name: "Lee",
      email: "carol.lee@example.com",
      phone_number: "+1 555-8765",
    },
  },
];

export default function ResumeChecker() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setResumes(mockResumes);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (resumes.length === 0) return <div className="p-8">No resumes found.</div>;

  return (
    <div className="lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Resume Checker</h2>
      <p className="text-sm text-gray-500 mb-4">This is a list of all the resumes that have been uploaded to the system.</p>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded shadow">
          
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left whitespace-nowrap">Name</th>
              <th className="p-4 text-left whitespace-nowrap">Email</th>
              <th className="p-4 text-left whitespace-nowrap">CV Name</th>
              <th className="p-4 text-left whitespace-nowrap">Phone Number</th>
              <th className="p-4 text-left whitespace-nowrap">Edit</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume: any, idx: number) => (
              <tr key={resume.id || idx} className="border-b hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">{resume.user?.first_name} {resume.user?.last_name}</td>
                <td className="p-4">{resume.user?.email}</td>
                <td className="p-4 whitespace-nowrap">{resume.cv_name}</td>
                <td className="p-4 whitespace-nowrap">{resume.user?.phone_number}</td>
                <td className="p-4">
                  <Button className="flex gap-1 items-center" size="sm" variant="outline" onClick={() => {/* TODO: Implement edit logic */}}>
                    <Pencil size={16} /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
