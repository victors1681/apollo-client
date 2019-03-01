import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import LaunchTile from "../components/launch-tile";
import { LAUNCH_TILE_DATA } from "../pages/launches";

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const CartItem = ({ launchId }) => {
  return (
    <Query query={GET_LAUNCH} variables={{ launchId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading....</p>;
        if (error) return <p>Error:{error.message}</p>;

        return data && <LaunchTile launch={data.launch} />;
      }}
    </Query>
  );
};

export default CartItem;
