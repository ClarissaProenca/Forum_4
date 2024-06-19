import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormContainer = styled.div`
  max-width: 400px;
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

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #3f51b5;
`;

const Input = styled(Field)`
  padding: 10px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
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

const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Email inválido'
    )
    .required('Email é obrigatório'),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])/,
      'Senha deve conter pelo menos um número'
    )
    .required('Senha é obrigatória'),
});

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(userCredential.user, { displayName: values.name });
      navigate("/");
    } catch (error) {
      console.error("Error creating user: ", error);
      setErrors({ general: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Register</FormTitle>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="name">Nome:</Label>
              <Input id="name" name="name" type="text" />
              <ErrorMessage name="name" component={ErrorText} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <Input id="email" name="email" type="email" />
              <ErrorMessage name="email" component={ErrorText} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Senha:</Label>
              <Input id="password" name="password" type="password" />
              <ErrorMessage name="password" component={ErrorText} />
            </FormGroup>
            {errors.general && <ErrorText>{errors.general}</ErrorText>}
            <Button type="submit" disabled={isSubmitting}>
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
