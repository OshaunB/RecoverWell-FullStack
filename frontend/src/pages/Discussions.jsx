/* eslint-disable implicit-arrow-linebreak */
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiscussionCard from "../components/DiscussionCard";
import LabelInput from "../components/LabelInput";
import { fetchHandler, getPostOptions } from "../utils";

export default function Discussions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term !== "" ? term : null);
  };

  const filteredCards = discussions.filter((discussion) => {
    if (searchTerm === null) return true;
    return (
      // eslint-disable-next-line operator-linebreak
      discussion.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDiscussion = async (event) => {
    event.preventDefault();
    const discussionData = {
      topic: event.target.elements.topic.value,
      description: event.target.elements.description.value,
    };

    const [data, error] = await fetchHandler(
      "/api/discussions",
      getPostOptions(discussionData),
    );
    if (error) return console.log(error);
    setDiscussions((prevDis) => [...prevDis, data]);
    event.target.reset();
  };

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
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex flex-col items-center px-5 sm:px-20 my-8">
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
      </div>

      {filteredCards.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          topic={discussion.topic}
          description={discussion.description}
          onClick={() => navigate(`/discussions/${discussion.id}`)}
          discussionId={discussion.id}
        />
      ))}
    </div>
  );
}
