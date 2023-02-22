import { useContext } from 'react';

import { ConversationSectionContext } from "./provider";

export { ConversationSectionProvider } from "./provider";

export const useConversationSectionContext = () => {
  const context = useContext(ConversationSectionContext)

  if (typeof context === "undefined")
    throw new Error(
      "useProductSliderContext must be used within the ProductSliderProvider"
    );

  return context;
}
