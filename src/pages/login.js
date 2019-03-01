import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import { LoginForm, Loading } from "../components";

const LOGIN_USER = gql`
  mutation login($email: String) {
    login(email: $email)
  }
`;

const handleCompleted = client => ({ login }) => {
  localStorage.setItem("token", login);
  client.writeData({ data: { isLoggedIn: true } });
};

const Login = () => (
  <ApolloConsumer>
    {client => (
      <Mutation mutation={LOGIN_USER} onCompleted={handleCompleted(client)}>
        {(login, { loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <p>Error {error.message}</p>;
          return <LoginForm login={login} />;
        }}
      </Mutation>
    )}
  </ApolloConsumer>
);

export default Login;
