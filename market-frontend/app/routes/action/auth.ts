import type { ActionFunction } from "@remix-run/node";

import { authAction } from "~/ssr/actions/auth.service";

export const action: ActionFunction = async ({ request }) => authAction({ request })