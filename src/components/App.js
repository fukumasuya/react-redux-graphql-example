import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  text-align: center;
`;

const ResultField = styled.div`
  font-size: 1.6rem;
  padding: 2rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 1.6rem;
  padding: 1rem;
  width: 40rem;
  border-style: none;
  border-bottom: solid #000 0.1rem;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
`;

export default ({
  login = "",
  name = "",
  email = "",
  token = "",
  onChange,
  onClick
}) =>
  <Container>
    <h1>
      Github GraphQL API example
    </h1>
    <div>
      <ResultField>
        ID: {login}
      </ResultField>
      <ResultField>
        Name: {name}
      </ResultField>
      <ResultField>
        Email: {email}
      </ResultField>
    </div>
    <div>
      <Label>GitHub API Token: </Label>
      <Input value={token} onChange={onChange} />
    </div>
    <div>
      <Button onClick={() => onClick(token)}>Get Account Info</Button>
    </div>
  </Container>;
