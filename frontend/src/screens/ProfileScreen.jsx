import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from './../constants/userConstants';
import { getUserDetails, updateUserProfile } from './../actions/userActions';
import Message from './../components/Message';
import Loader from './../components/Loader';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  //   const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
  }, [dispatch, user, userInfo, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              value={name}
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
