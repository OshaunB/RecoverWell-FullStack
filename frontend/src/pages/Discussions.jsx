/* eslint-disable implicit-arrow-linebreak */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DiscussionCard from "../components/discussion/DiscussionCard";
import { fetchHandler, getPostOptions } from "../utils";
import SearchInput from "../components/SearchInput";
import CreateDiscussion from "../components/discussion/CreateDiscussion";
import CurrentUserContext from "../contexts/current-user-context";

export default function Discussions() {
  const navigate = useNavigate();

  const { currentUser } = useContext(CurrentUserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const [data, err] = await fetchHandler("/api/discussions");
      if (err) return console.log(err);
      setDiscussions(data);
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

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    const discussionData = {
      topic: e.target.topic.value,
      description: e.target.description.value,
    };
    console.log(discussionData);

    const [data, err] = await fetchHandler(
      "/api/discussions",
      getPostOptions(discussionData),
    );
    if (err) return console.log(err);
    setDiscussions((prevDis) => [...prevDis, data]);
    e.target.reset();
  };

  const handleNavigate = (discussionId) => {
    if (!currentUser) {
      return setError("You must be logged in to view this page");
    }
    navigate(`/discussions/${discussionId}`);
  };

  return (
    <div>
      <div className="text-center text-red-600">{error}</div>
      <h1 className="flex justify-center font-bold text-2xl">
        RecoverWell Discussions
      </h1>
      <div className="flex justify-around items-center">
        <SearchInput onChange={handleSearch} value={searchTerm} />
        <CreateDiscussion
          error={error}
          setError={setError}
          onSubmit={handleCreateDiscussion}
        />
      </div>

      {filteredCards.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          topic={discussion.topic}
          description={discussion.description}
          onClick={() => handleNavigate(discussion.id)}
          discussionId={discussion.id}
        />
      ))}
    </div>
  );
}
