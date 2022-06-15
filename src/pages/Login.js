import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid silver;
  border-radius: 0.2rem;
`;

const Box = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid silver;
  border-radius: 0.2rem;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const resp = await axios
        .post("https://dentaldriversteam.herokuapp.com/api/auth/login", {
          username: username,
          password: password,
        })
        .then(navigate("/main"));
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={handleClick}>LOGIN</Button>
        </Form>
        <Box></Box>
      </Wrapper>
    </Container>
  );
};

export default Login;
