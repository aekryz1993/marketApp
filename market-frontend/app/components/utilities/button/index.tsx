import type { TButtonProps } from "./type";

import clsx from "clsx";

import {
  cancelBtnDarkClasses,
  cancelBtnLightClasses,
  deemphasizedBtnDarkClasses,
  deemphasizedBtnLightClasses,
  buttonClasses,
  primaryBtnDarkClasses,
  primaryBtnLightClasses,
} from "./styled";

const PrimaryButton = (props: TButtonProps) => {
  const { children, classes, className, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        classes ? classes : buttonClasses,
        primaryBtnLightClasses,
        primaryBtnDarkClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

const DeemphasizedButton = (props: TButtonProps) => {
  const { children, classes, className, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        classes ? classes : buttonClasses,
        deemphasizedBtnLightClasses,
        deemphasizedBtnDarkClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

const CancelButton = (props: TButtonProps) => {
  const { children, className, classes, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        classes,
        cancelBtnLightClasses,
        cancelBtnDarkClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, CancelButton, DeemphasizedButton };
