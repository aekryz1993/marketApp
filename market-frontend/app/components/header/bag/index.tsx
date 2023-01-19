import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import { Box, Container } from "~/components/utilities";
import { iconBoxClasses, iconClasses } from "~/components/utilities";
import { headerItemBoxClasses } from "../styled";

export const Bag = () => {
  return (
    <Container classes={iconBoxClasses}>
      <Box classes={headerItemBoxClasses}>
        <ShoppingCartIcon className={iconClasses} />
      </Box>
    </Container>
  );
};
