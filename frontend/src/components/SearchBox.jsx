import React, { useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <FormControl
        type='text'
        className='mr-sm-2 ml-sm-5'
        placeholder='Search Products...'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></FormControl>
      <Button
        type='submit'
        variant='outline-success'
        style={{ padding: '.6rem' }}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
