import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import DiscussionCard from "../components/DiscussionCard";
import LabelInput from "../components/LabelInput"


export default function Discussions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [addDiscussion, setAddDiscussion] = useState({});


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/discussions");
        const data = await res.json();
        setDiscussions(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDiscussion = async (event) => {
    event.preventDefault();
    const discussionData = {
      topic: event.target.elements.topic.value,
      description: event.target.elements.description.value
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discussionData),
      };

      const res = await fetch('/api/discussions', options);
      const data = await res.json();
      setDiscussions((prevDis) => [...prevDis, data])
      event.target.reset()
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="flex justify-center font-bold text-2xl">
        RecoverWell Discussions
      </h1>
      <div className="flex flex-col items-center px-5 sm:px-10 my-8">
        <div className="flex flex-wrap items-center justify-center space-x-4 sm:space-y-0 sm:space-x-2 bg-gray-100 p-2 sm:p-4 rounded-lg">
          <input
            className="flex bg-gray-100 outline-none text-sm sm:text-base"
            type="text"
            placeholder="Search Discussions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            gradientDuoTone="redToYellow"
            outline

          >
            <p>Search</p>
          </Button>
        </div>
        </div>
        <form onSubmit={handleDiscussion}>
          <LabelInput
            htmlFor="topic"
            label="Topic"
            type="text"
            name="topic"
            placeholder="Title of Discussion"
            required
          />
          <LabelInput
            htmlFor="description"
            label="Description"
            type="text"
            name="description"
            placeholder="About your Discussion"
            required
          />
          
          <div className="flex justify-center mt-4">
            <Button type="submit" gradientDuoTone="redToYellow" outline>
              <p>Add a new post</p>
            </Button>
          </div>
        </form>
      
      {discussions.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          topic={discussion.topic}
          description={discussion.description}
          onClick={() => {
            console.log(discussion.id);
          }}
          discussionId={discussion.id}
        />
      ))}
    </div>
  );
}
