import type { DocumentNode, OperationVariables } from "@apollo/client";

import { useLazyQuery } from "@apollo/client";

export const useFetch = <TypeData>({
  name,
  query,
}: {
  name: string;
  query: DocumentNode;
}) => {
  const [fetchQuery, { loading, data, error, called }] = useLazyQuery<
    { [key in string]: { [key in string]: TypeData[] } },
    OperationVariables
  >(query);

  return { fetchQuery, loading, called, data: data?.[name], error };
};
