import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";

import { fetchLocations } from "~/endpoints/query/locations";

export const loader: LoaderFunction = async ({ request }) => {
  let { searchParams } = new URL(request.url)
  const search = searchParams.get("search")

  if (typeof search !== "string")
    return json({ formError: "search is not provided" }, { status: 400 });

  const response = await fetchLocations({
    pagination: { skip: 0, take: 5 },
    search,
  });

  if (response.data) return json({ locations: response.data.locations });

  throw new Error("Failed to retrieve locations");
};
