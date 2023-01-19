import { XMarkIcon } from "@heroicons/react/24/outline";
import { Box } from "../layout";
import { closeBtnContainer, closeBtnIcon } from "./styled";

export const ClosePortalBtn = ({
  handleCloseEvent,
}: {
  handleCloseEvent: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}) => {
  return (
    <Box classes={closeBtnContainer} onClick={handleCloseEvent}>
      <XMarkIcon className={closeBtnIcon} />
    </Box>
  );
};
