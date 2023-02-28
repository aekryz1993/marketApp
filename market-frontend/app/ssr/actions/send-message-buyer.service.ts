import type { LoaderArgs } from "@remix-run/node";

import { sendMessageFromBuyer } from './../../endpoints/mutation/message';

import {
  json,
} from "@remix-run/node";

import { getAuthSession } from "~/utils/auth.server";

export const sendMessageFromBuyerAction = async ({
  request,
  params,
  formData
}: Pick<LoaderArgs, "request" | "params"> & { formData?: FormData }) => {
  const authSession = await getAuthSession(request);
  const form = formData ?? await request.formData();
  const sellerId = form.get("sellerId");
  const messageText = form.get("messageText");
  const productIdField = form.get("productId");

  const productId = params.productId ?? productIdField

  if (typeof sellerId !== "string" || typeof messageText !== "string" || typeof productId !== "string") return json({ formError: "Form not submitted correctly." })

  const token = authSession.getToken();

  try {
    const messageResponse = await sendMessageFromBuyer({ sellerId, productId, messageText }, token)

    if (messageResponse?.data?.sendMessageFromBuyer.statusCode === 200) {
      return json({ message: messageResponse.data.sendMessageFromBuyer.message })
    }
    throw new Error("failed to send the message")
  } catch (error: any) {
    console.log(error)
    throw new Response(null, { status: 500, statusText: error.message })
  }
};
