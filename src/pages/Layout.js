import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
`;

const Nav = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;

  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  color: white;
`;

const Layout = () => {
  return (
    <div>
      <Title>Welcome to the app!</Title>
      <Nav>
        <Link to="login">Login</Link>
      </Nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
