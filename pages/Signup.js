import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';
import axios from 'axios';

function Signup(props) {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function postSignup() {
    axios
      .post('https://nodejs-mongo-jwt.herokuapp.com/api/auth/register', {
        email,
        password,
      })
      .then((result) => {
        if (result.status === 200) {
          props.history.push('/');
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  return (
    <Card>
      <Form>
        <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          type='password'
          placeholder='password again'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Button onClick={postSignup}>Sign Up</Button>
      </Form>
      <Link to='/login'>Already have an account?</Link>
    </Card>
  );
}

export default Signup;
