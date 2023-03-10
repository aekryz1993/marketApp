import { gql } from "apollo-server-core/dist/gql";

import { enums } from "./enum";
import { image } from "./image";
import { mutation } from "./mutation";
import { product } from "./product.js";
import { query } from "./query";
import { user } from "./user";
import { auth } from "./auth";
import { subscription } from "./subscription";
import { tag } from "./tag";
import { price } from "./price";
import { location } from "./location";
import { message } from "./message";
import { conversation } from "./conversation";
import { notification } from "./notification";

const typeDefs = gql`
  scalar Date

  ${enums}

  ${query}

  ${mutation}

  ${subscription}

  ${auth}

  ${user}

  ${image}

  ${product}

  ${price}

  ${location}

  ${tag}

  ${conversation}

  ${message}

  ${notification}
`;

export default typeDefs;
