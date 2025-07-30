import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@reactive-resume/ui";
import { Pencil } from "@phosphor-icons/react";
import { axios } from "@/client/libs/axios";
import { useNavigate } from "react-router";

// Singleton to track API calls across all instances
let globalFetchPromise: Promise<any> | null = null;
let globalFetchInProgress = false;

// Type definition for the API response
interface ResumeVerification {
  id: number;
  cv_title: string;
  comments: string | null;
  created_at: string;
  cv_user_id: number;
  edited_at: string | null;
  email: string;
  industry_type: string;
  name: string;
  phone: string;
  score: number | null;
  status: string;
  updated_at: string;
}

export default function ResumeChecker() {
  const [resumes, setResumes] = useState<ResumeVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  console.log('ResumeChecker component rendered, globalFetchInProgress:', globalFetchInProgress);

  const fetchResumes = useCallback(async () => {
    // If there's already a fetch in progress, wait for it
    if (globalFetchInProgress && globalFetchPromise) {
      console.log('Waiting for existing API call to complete');
      try {
        const result = await globalFetchPromise;
        console.log(result,"result");
        setResumes(result.data);
        setLoading(false);
        return;
      } catch (err) {
        console.error('Error from existing API call:', err);
        setError('Failed to fetch resume data');
        setLoading(false);
        return;
      }
    }
    
    console.log('Starting new API call to fetch resumes');
    
    // Cancel any existing request
    if (abortControllerRef.current) {
      console.log('Aborting previous request');
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    // Set global fetch in progress
    globalFetchInProgress = true;
    
    try {
      setLoading(true);
      
      globalFetchPromise = axios.get(`cv-manager/human-resume-verification?t=${Date.now()}`, {
        signal: abortControllerRef.current.signal
      });
      
      const response = await globalFetchPromise;
      console.log('API Response:', response.data);
      
      // Handle the response data structure
      
      setResumes(response.data.data);
      
      // Reset global state
      globalFetchInProgress = false;
      globalFetchPromise = null;
      
    } catch (err: any) {
      // Don't set error if request was aborted
      if (err.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      console.error('Error fetching resumes:', err);
      setError('Failed to fetch resume data');
      
      // Reset global state on error
      globalFetchInProgress = false;
      globalFetchPromise = null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('ResumeChecker useEffect triggered');
    fetchResumes();

    // Cleanup function to abort request when component unmounts
    return () => {
      console.log('ResumeChecker cleanup - aborting request');
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchResumes]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (resumeId: number, event: React.MouseEvent) => {
 
  navigate(`/builder/human-resume-checker/${resumeId}`);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (resumes.length === 0) return <div className="p-8">No resumes found.</div>;

  console.log(resumes,"resumes");

  return (
    <div className="lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Resume Checker</h2>
      <p className="text-sm text-gray-500 mb-4">This is a list of all the resumes that have been uploaded to the system.</p>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left whitespace-nowrap">ID</th>
              <th className="p-4 text-left whitespace-nowrap">Name</th>
              <th className="p-4 text-left whitespace-nowrap">Email</th>
              <th className="p-4 text-left whitespace-nowrap">Phone</th>
            
              <th className="p-4 text-left whitespace-nowrap">Industry</th>
              <th className="p-4 text-left whitespace-nowrap">Status</th>
              <th className="p-4 text-left whitespace-nowrap">Score</th>
              <th className="p-4 text-left whitespace-nowrap">Created At</th>
              <th className="p-4 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume: ResumeVerification, idx: number) => (
              <tr key={resume.id || idx} className="border-b hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">{resume.id}</td>
                <td className="p-4 whitespace-nowrap">{resume.name}</td>
                <td className="p-4">{resume.email}</td>
                <td className="p-4 whitespace-nowrap">{resume.phone}</td>
              
                <td className="p-4 whitespace-nowrap">{resume.industry_type}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
                    {resume.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  {resume.score !== null ? resume.score : 'N/A'}
                </td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(resume.created_at)}
                </td>
                <td className="p-4">
                  <Button 
                    className="flex gap-1 items-center" 
                    size="sm" 
                    variant="outline" 
                    onClick={(event) => handleEdit(resume.id, event)}
                  >
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
