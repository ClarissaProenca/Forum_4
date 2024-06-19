import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import styled from "styled-components";
import ImagePickerComponent from "../components/ImagePicker";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #3f51b5;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #3f51b5;
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
  color: #3f51b5;
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
  border: 1px solid #3f51b5;
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
  background-color: #3f51b5;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #303f9f;
  }
`;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const navigate = useNavigate();

  const handleImageSelected = (uri) => {
    setImageUri(uri);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        description,
        imageUri,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      // Limpar o formulário
      setTitle("");
      setDescription("");
      setImageUri(null);
      // Redirecionar para a página de posts
      navigate("/posts");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Criar novo post</FormTitle>
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
        <FormGroup>
          <Label>Imagem:</Label>
          <ImagePickerComponent onImageSelected={handleImageSelected} />
        </FormGroup>
        <Button type="submit">Criar Post</Button>
      </Form>
    </FormContainer>
  );
}
