import { withFilter } from "graphql-subscriptions";

import { pubsub } from "../..";

const messageSent = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["MESSAGE_SENT"]),
    (payload, variables) => {
      if (payload.sellerId === variables.clientId) return true;
    }
  ),
};

export { messageSent };
