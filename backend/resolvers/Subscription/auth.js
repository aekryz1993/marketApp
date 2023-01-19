import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../..";

const tokenRefreshed = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["TOKEN_REFRESHED"]),
    (payload, _, context) => {
      if (payload.userId === context.userId) return true;
    }
  ),
};

export { tokenRefreshed };
