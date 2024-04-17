import React, { useState } from 'react';
import styled from 'styled-components';

const Intro = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    onLogin(name);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <IntroContainer>
      <IntroContent>
        <IntroForm onSubmit={handleSubmit}>
          <InputLabel htmlFor="name">Enter your name:</InputLabel>
          <Input
            type='text'
            id="name"
            value={name}
            onChange={handleChange}
            required
            placeholder='Your name'
            aria-label='your name'
          />
          <SubmitButton type='submit'>Create Account</SubmitButton>
        </IntroForm>
      </IntroContent>
    </IntroContainer>
  );
};

const IntroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const IntroContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const IntroForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default Intro;
