import React from 'react';
import PostCard from '../components/PostCard';
import posts from '../data/posts';

export default function PostsListScreen(props) {
  const { action } = props;

  function selecionarPost(post) {
    action(post);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} action={selecionarPost} />
      ))}
    </div>
  );
}
