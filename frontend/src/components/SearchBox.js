import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../style/component.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="btn1"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="btn1">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
