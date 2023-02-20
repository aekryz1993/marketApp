import ReactDOM from "react-dom";
import { usePortal } from "~/hooks/usePortal";

export const Portal = ({
  id,
  children,
  rootClasses,
  containerClasses,
  handleClose,
  rootStyle,
}: {
  id: string;
  children: React.ReactNode;
  rootClasses?: string;
  containerClasses?: string;
  handleClose?: () => void;
  rootStyle?: { [key: string]: string };
}) => {
  const target = usePortal({
    id,
    rootClasses,
    containerClasses,
    handleClose,
    rootStyle,
  });
  
  return ReactDOM.createPortal(children, target);
};

export function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}
