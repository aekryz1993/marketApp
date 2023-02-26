import { useCallback, useState } from "react";


export type TMouseClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export const useEventHandlers = ({
  handleClose
}: {
  handleClose: () => void
}) => {
  const [isOpenPortal, setIsOpenPortal] = useState(false);

  const eventHandlers = {
    openMessages: (event: TMouseClickEvent) => {
      setIsOpenPortal(true);
      handleClose();
    },
    copyProductLink: (event: TMouseClickEvent) => {
      console.log("copyProductLink");
      handleClose();
    },
    deleteProduct: (event: TMouseClickEvent) => {
      console.log("deleteProduct");
      handleClose();
    },
  };

  const handleModalClose = useCallback(() => {
    setIsOpenPortal(false)
  }, [])

  return { isOpenPortal, setIsOpenPortal, eventHandlers, handleModalClose }
}