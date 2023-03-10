import type { DocumentNode, OperationVariables } from "@apollo/client";

import { useLazyQuery } from "@apollo/client";
import { setContext } from "~/utils/helpers";
import { useAuthInfo } from "~/hooks/useAuthInfo";

export const useFetch = <TypeData>({
  name,
  query,
}: {
  name: string;
  query: DocumentNode;
}) => {
  const authInfo = useAuthInfo();

  const token = authInfo?.token;

  const [fetchQuery, { loading, data, error, called }] = useLazyQuery<
    { [key in string]: { [key in string]: TypeData[] } },
    OperationVariables
  >(query, { context: setContext(token) });

  return { fetchQuery, loading, called, data: data?.[name], error };
};
