"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

const JobContext = createContext();



export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch job listings from API
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://jobicy.p.rapidapi.com/api/v2/remote-jobs', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'x-rapidapi-host': 'jobicy.p.rapidapi.com',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setJobs(data.jobs || []); // Adjust based on the actual API response structure
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
