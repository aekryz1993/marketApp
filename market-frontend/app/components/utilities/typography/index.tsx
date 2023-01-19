import type { TP, TSpan } from "./type";

import clsx from "clsx";

import { errorMessageClasses, labelButtonClasses, pClasses } from "./styled";

const ButtonLabel = (props: TSpan) => {
  const { className, classes, children, ...sentenceProps } = props;
  return (
    <span
      {...sentenceProps}
      className={clsx(classes, labelButtonClasses, className)}
    >
      {children}
    </span>
  );
};

const ErrorMessage = (props: TP) => {
  const { className, classes, children, ...errorMessageProps } = props;
  return (
    <p
      {...errorMessageProps}
      className={clsx(classes, pClasses, errorMessageClasses, className)}
    >
      {children}
    </p>
  );
};

const ErrorMessageField = (props: TP) => {
  const { classes, className, children, ...errorMessageProps } = props;
  return (
    <ErrorMessage {...errorMessageProps} className={clsx(classes, className)}>
      {children}
    </ErrorMessage>
  );
};

export { ButtonLabel, ErrorMessage, ErrorMessageField };
