"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import JobList from "./Components/JobList"; // Import the JobList component
import SearchBar from "./Components/SearchBar"; // Import the SearchBar component
import { useJobs } from './Context/JobContext'; // Import the useJobs hook

export default function JobPortal() {
  const { data: session, status } = useSession();
  const { jobs } = useJobs(); // Use the useJobs hook to access jobs
  const [searchQuery, setSearchQuery] = useState("");

  // Handle loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      {/* Header Section */}
      <header className="w-full p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome, {session ? session.user.name : 'Guest'}
        </h1>
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign in
          </button>
        )}
      </header>

      {/* Main Content Section */}
      <main className="p-6 max-w-6xl mx-auto mt-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg space-y-6">
        {session ? (
          <>
            <SearchBar onSearch={setSearchQuery} /> {/* Add SearchBar component */}
            <div className="grid grid-cols-1 gap-6">
              <JobList jobs={filteredJobs} /> {/* Pass filtered jobs to JobList */}
              {/* Optionally, include JobDetails component if you want detailed job view */}
              {/* <JobDetails /> */}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">Not signed in</p>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign in
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
