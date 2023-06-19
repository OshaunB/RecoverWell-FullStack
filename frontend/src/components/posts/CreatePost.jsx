"use client";

import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostOptions, fetchHandler } from "../../utils";

export default function CreatePost({ setPosts }) {
  const { id } = useParams();
  const [addPost, setAddPost] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPostContent = event.target.newPost.value;
    const postData = {
      discussionId: id,
      content: newPostContent,
    };

    const [data, error] = await fetchHandler(
      `/api/posts`,
      getPostOptions(postData)
    );
    if (error) {
      console.log(error);
      return;
    }

    setPosts((prevPosts) => [data, ...prevPosts]);
    setAddPost(data);
    event.target.reset();
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded px-1 py-6">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Create a post
        </label>
        <textarea
          id="newPost"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div></div>
        <div className="flex items-center justify-end py-2">
          <Button
            type="submit"
            gradientDuoTone="cyanToBlue"
            outline
            style={{ marginRight: "10px" }}
          >
            <p>Post</p>
          </Button>
        </div>
      </form>
    </div>
  );
}
