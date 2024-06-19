import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostCard from "../components/PostCard";

test("renders PostCard and triggers actions", () => {
  const post = {
    title: "Test Post",
    body: "This is a test post.",
    likes: 0,
    dislikes: 0,
  };
  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const onLike = jest.fn();
  const onDislike = jest.fn();

  const { getByText } = render(
    <PostCard
      post={post}
      onEdit={onEdit}
      onDelete={onDelete}
      onLike={onLike}
      onDislike={onDislike}
    />,
  );

  expect(getByText("Post teste")).toBeInTheDocument();
  expect(getByText("Isso é um post teste")).toBeInTheDocument();

  fireEvent.click(getByText("Editar"));
  expect(onEdit).toHaveBeenCalled();

  fireEvent.click(getByText("Deletar"));
  expect(onDelete).toHaveBeenCalled();

  fireEvent.click(getByText("Curtida (0)"));
  expect(onLike).toHaveBeenCalled();

  fireEvent.click(getByText("Descurtida (0)"));
  expect(onDislike).toHaveBeenCalled();
});
