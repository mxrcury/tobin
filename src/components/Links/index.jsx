import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Wrapper,LinkButton } from './styles'

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
