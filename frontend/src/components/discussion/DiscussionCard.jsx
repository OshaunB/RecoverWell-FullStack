export default function DiscussionCard({
  topic,
  description,
  onClick,
  discussionId,
}) {
  return (
    <div className="flex items-center justify-center ">
      <div
        onClick={onClick}
        id={discussionId}
        className="card w-96 bg-base-100 shadow-xl mt-5 cursor-pointer hover:bg-gray-100"
      >
        <div className="card-body">
          <h2 className="card-title">{topic}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { Card } from "flowbite-react";

// export default function DiscussionCard({ topic, description, onClick, discussionId }) {
//   return (
//     <Card
//       onClick={onClick}
//       id={discussionId}
//       className="my-4 flex justify-start items-start max-w-xl mx-auto">
//       <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//         {topic}
//       </h5>
//       <p className="font-normal text-gray-700 dark:text-gray-400">
//         {description}
//       </p>
//     </Card>
//   );
// }s
