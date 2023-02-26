import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import { destroyAndRedirect, getAuthSession } from "~/utils/auth.server";
import { sendMessageFromBuyer, sendMessageFromSeller } from "~/endpoints/mutation/message";

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const messageText = form.get("messageText");
  const sendFrom = form.get("sendFrom");
  const to = form.get("to");
  const productId = form.get("productId");

  const token = authSession.getToken()

  if (!token) return await destroyAndRedirect(authSession.destroy);

  if (
    typeof messageText !== 'string' ||
    typeof to !== 'string' ||
    typeof sendFrom !== 'string' ||
    (typeof sendFrom === 'string' && !['seller', 'buyer'].includes(sendFrom)) ||
    typeof productId !== 'string'
  )
    return json({ fieldErrors: "Form not submitted correctly." })

  try {
    if (sendFrom === 'seller') {
      const sendMessageResponse = await sendMessageFromSeller({ messageText, buyerId: to, productId }, token)
      if (sendMessageResponse.data?.sendMessageFromSeller.statusCode === 200) {
        return json({ message: sendMessageResponse.data.sendMessageFromSeller.message })
      }
    } else if (sendFrom === 'buyer') {
      const sendMessageResponse = await sendMessageFromBuyer({ messageText, sellerId: to, productId }, token)
      if (sendMessageResponse.data?.sendMessageFromBuyer.statusCode === 200) {
        return json({ message: sendMessageResponse.data.sendMessageFromBuyer.message })
      }
    }

    return json({ error: 'failed to send the message' })
  } catch (error: any) {
    return json({ error: error.message })
  }
};
