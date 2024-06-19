import React from "react";
import PostCard from "../components/PostCard.jsx";

const PostsList = ({ topics }) => {
  return (
    <div>
      {topics.map((topic, index) => (
        <PostCard
          key={index}
          title={topic.title}
          description={topic.description}
          date={topic.date_publication}
          user={topic.user_creator}
          keywords={topic.keywords}
          likes={topic.likes}
          dislikes={topic.dislikes}
        />
      ))}
    </div>
  );
};

export default PostsList;
