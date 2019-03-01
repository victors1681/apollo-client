import React from "react";
import styled from "react-emotion";
import { ApolloConsumer } from "react-apollo";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => (
  <ApolloConsumer>
    {client => (
      <StyledButton
        onClick={() => {
          client.writeData({ data: { isLoggedIn: false } });
        }}
      >
        <ExitIcon />
        Logout
      </StyledButton>
    )}
  </ApolloConsumer>
);

export default LogoutButton;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0
});
