import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const [data, err] = await fetchHandler("/api/discussions");
      if (err) return console.log(err);
      setDiscussions(data);
      setOpen(false);
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

    const [data, err] = await fetchHandler(
      "/api/discussions",
      getPostOptions(discussionData)
    );
    if (err) return console.log(err);
    setDiscussions((prevDis) => [...prevDis, data]);

    // Close the dialog box
    setOpen(false);
  };

  const handleNavigate = (discussionId) => {
    if (!currentUser) {
      return setError("You must be logged in to view this page");
    }
    navigate(`/discussions/${discussionId}`);
  };

  return (
    <div className="w-full px-5 bg-palette-teal h-full">
      <div className="text-center text-red-600">{error}</div>
      <Typography
        className="text-center p-5"
        variant="h1"
        color="blue"
        textGradient
      >
        RecoverFresh Discussion Groups
      </Typography>
      <div className="flex justify-around items-center mb-5">
        <SearchInput
          color="white"
          onChange={handleSearch}
          value={searchTerm}
          innerText="Search Discussion Groups"
        />
        <CreateDiscussion
          error={error}
          setError={setError}
          onSubmit={handleCreateDiscussion}
          open={open}
          setOpen={setOpen}
          currentUser={currentUser}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
