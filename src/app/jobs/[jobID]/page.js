"use client";

import { useParams } from 'next/navigation';
import { useJobs } from '../../Context/JobContext';
import DOMPurify from 'dompurify';

const JobDetails = () => {
    const { jobID } = useParams(); // Extract job ID from the URL search params
    const { jobs } = useJobs(); // Access the jobs from the context

    //   console.log(jobs);
    // console.log(jobs);

    // Find the specific job using the ID
    const IntJobID = parseInt(jobID, 10);
    const job = jobs.find((job) => job.id === IntJobID);
    // console.log(job);



    if (!job) {
        return <p>Loading...</p>; // Handle the case where the job is not found or still loading
    }

    const sanitizedDescription = DOMPurify.sanitize(job.jobDescription || 'Full Job Description');

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg text-black">
            <h1 className="text-2xl font-bold mb-4">{job.jobTitle || 'Job Title'}</h1>
            <p><strong>Company:</strong> {job.companyName || 'Company Name'}</p>
            <p><strong>Location:</strong> {job.jobGeo || 'Location'}</p>
            <p><strong>Experience Level:</strong> {job.jobLevel || 'Experience Level'}</p>
            <p><strong>Industry:</strong> {job.jobIndustry || 'Industry'}</p>
            <p><strong>Job Type:</strong> {job.jobType || 'Job Type'}</p>

            {/* Render sanitized job description with HTML content */}
            <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />

            <p><strong>Requirements:</strong> {job.jobRequirements || 'Job Requirements'}</p>
            <p><strong>Salary:</strong> {job.salary || 'Salary Details'}</p>
            {/* Add more job details as needed */}
        </div>
    );
};

export default JobDetails;
