import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const renderCartItems = data => (
  <Fragment>
    {data.cartItems.map(launchId => (
      <CartItem key={launchId} launchId={launchId} />
    ))}
    <BookTrips cartItems={data.cartItems} />
  </Fragment>
);

const Cart = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR {error.message}</p>;

      console.error(data.cartItems);
      return (
        <Fragment>
          <Header> My Cart </Header>
          {!data.cartItems || !data.cartItems.length ? (
            <p data-testid="empty-message">No Items in your cart</p>
          ) : (
            renderCartItems(data)
          )}
        </Fragment>
      );
    }}
  </Query>
);

export default Cart;
