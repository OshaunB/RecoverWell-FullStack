"use client";

import { Card } from "flowbite-react";

export default function DiscussionCard({ topic, description, onClick, discussionId }) {
  return (
    <Card onClick={onClick} id={discussionId} className="my-4 flex justify-start items-start max-w-xl mx-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {topic}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
  );
}
