import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

const RegisterButton = styled(Button)`
  background-color: #ff4081;
  &:hover {
    background-color: #c60055;
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

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/"); // Redirecionar para a página principal após login bem-sucedido
    } catch (error) {
      console.error("Error signing in: ", error);
      setErrors({ general: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
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
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
      <p style={{ textAlign: 'center' }}>Ainda não tem uma conta?</p>
      <RegisterButton onClick={() => navigate("/register")}>
        Criar conta
      </RegisterButton>
    </FormContainer>
  );
}
