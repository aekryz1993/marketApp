import { gql } from "apollo-server-core/dist/gql";

import { enums } from "./enum";
import { image } from "./image";
import { mutation } from "./mutation";
import { product } from "./product";
import { query } from "./query";
import { user } from "./user";
import { auth } from "./auth";
import { subscription } from "./subscription";
import { tag } from "./tag";

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

  ${tag}
`;

export default typeDefs;
