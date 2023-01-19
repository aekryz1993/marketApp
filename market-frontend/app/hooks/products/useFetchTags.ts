import type { OperationVariables } from "@apollo/client";
import type { TTag } from "~/types/endpoints/product";

import { useLazyQuery } from "@apollo/client";

import { TAGS } from "~/endpoints/query/tags";

export const useFetchTags = () => {
  const [fetchTagsQuery, { loading, data, error, called }] = useLazyQuery<
    { tags: { tags: TTag[] } },
    OperationVariables
  >(TAGS);

  return { fetchTagsQuery, loading, called, data, error };
};
