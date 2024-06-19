import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase";
import Loading from '../components/Loading';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #0c0b26;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #0c0b26;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #0c0b26;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #e8eaf6;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #0c0b26;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  background-color: #e8eaf6;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #0c0b26;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ##c92662;
  }
`;

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const post = docSnap.data();
        setTitle(post.title);
        setDescription(post.description);
        setLoading(false);
      } else {
        console.log("No such document!");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      title,
      description,
    });
    navigate("/posts");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <FormContainer>
      <FormTitle>Editar Post</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título:</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Descrição:</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </FormGroup>
        <Button type="submit">Update Post</Button>
      </Form>
    </FormContainer>
  );
}
