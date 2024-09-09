// Components/JobList.js
"use client";

import React from 'react';
import { useJobs } from '../Context/JobContext';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const JobList = ({ jobs }) => { // Accept jobs as a prop
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobs.map((job, index) => (
                <HoverCard key={index} className="border border-gray-300 rounded-lg bg-white shadow-md flex flex-col">
                    <HoverCardTrigger className="flex-1">
                        <div className="p-4 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{job.jobTitle || 'Job Title'}</h2>
                                <p><strong>Company:</strong> {job.companyName || 'Company Name'}</p>
                                <p><strong>Job Description:</strong> {job.jobExcerpt || 'Job Description'}</p>
                            </div>

                            <Link href={`/jobs/${job.id}`} passHref>
                                <Button className="mt-auto">View Details</Button>
                            </Link>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="border-t border-gray-300 p-4 bg-gray-50">
                        <p><strong>Location:</strong> {job.jobGeo || 'Location'}</p>
                        <p><strong>Experience Level:</strong> {job.jobLevel || 'Experience Level'}</p>
                        <p><strong>Industry:</strong> {job.jobIndustry || 'Industry'}</p>
                        <p><strong>Job Type:</strong> {job.jobType || 'Job Type'}</p>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    );
};

export default JobList;
