import React from 'react';

const UploadPageError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      {/* Error Icon */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6 text-blue-500"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#EFF6FF" />
        <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
      <h1 className="text-3xl font-bold mb-2">Oops!</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't generate your upload. Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-500 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default UploadPageError;
