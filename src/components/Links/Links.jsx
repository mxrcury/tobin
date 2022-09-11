import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  z-index:999;
`;
const LinkButton = styled.div`
  ${'' /* padding: 5px 10px; */}
  margin-bottom: 5px;
  border-radius: 0 5px 5px 0;
  padding:3px 0px;
  &:hover {
    background: rgba(245, 245, 245, 0.8);
  }
`;

const Links = () => {
  return (
    <Wrapper>
      <LinkButton >
        <NavLink
        className={({isActive})=>isActive ? 'activeLink' : ''}
          style={({ isActive }) => ({
            background: isActive ? "#6b8e6e" : "transparent",
            color: "black",
            textDecoration: "none",
          })}
          to="/todos"
        >
          <span style={{padding:'3px 30px'}} >Todos</span>
        </NavLink>
      </LinkButton>
      <LinkButton>
        <NavLink
        className={({isActive})=>isActive ? 'activeLink' : ''}
          style={({ isActive }) => ({
            background: isActive ? "#6b8e6e" : "transparent",
            color: "black",
            textDecoration: "none",
          })}
          to="/notes"
        >
          <span style={{padding:'3px 30px'}} >Notes</span>
        </NavLink>
      </LinkButton>
    </Wrapper>
  );
};

export default Links;
