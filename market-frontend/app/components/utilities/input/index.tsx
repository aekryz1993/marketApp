import type {
  TFieldProps,
  TInputProps,
  TLabelProps,
  TTextAreaFieldProps,
  TTextareaProps,
} from "./type";
import type { TDivProps } from "../utility-types";

import clsx from "clsx";

import {
  labelClasses,
  primaryInputDarkClasses,
  primaryInputLightClasses,
} from "./styled";
import { Box } from "../layout";
import { ErrorMessageField } from "../typography";
import { forwardRef } from "react";

const Input = (props: TInputProps) => {
  const { classes, className, ...inputProps } = props;
  return (
    <input
      {...inputProps}
      className={clsx(
        classes ? classes : primaryInputLightClasses,
        classes ? classes : primaryInputDarkClasses,
        className
      )}
    />
  );
};

const InputWithRef = forwardRef(
  (props: TInputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
    const { classes, className, ...inputProps } = props;
    return (
      <input
        {...inputProps}
        ref={ref}
        className={clsx(
          classes ? classes : primaryInputLightClasses,
          classes ? classes : primaryInputDarkClasses,
          className
        )}
      />
    );
  }
);

InputWithRef.displayName = "InputWithRef";

const Textarea = (props: TTextareaProps) => {
  const { classes, className, ...inputProps } = props;
  return (
    <textarea
      {...inputProps}
      className={clsx(
        classes,
        primaryInputLightClasses,
        primaryInputDarkClasses,
        className
      )}
    />
  );
};

const FormInputItem = (props: TDivProps) => {
  const { children, className, classes, ...divProps } = props;
  return (
    <div {...divProps} className={clsx(classes, className)}>
      {children}
    </div>
  );
};

const Label = (props: TLabelProps) => {
  const { classes, className, children, ...labelProps } = props;
  return (
    <label {...labelProps} className={clsx(classes, labelClasses, className)}>
      {children}
    </label>
  );
};

const Field = (props: TFieldProps) => {
  const { fieldError, ...fieldProps } = props;
  return (
    <Box>
      <Label htmlFor={fieldProps.id}>
        {fieldProps.name
          ? `${fieldProps.name.charAt(0).toUpperCase()}${fieldProps.name.slice(
              1
            )}`
          : null}
      </Label>
      <Input {...fieldProps} />
      {fieldError ? <ErrorMessageField>{fieldError}</ErrorMessageField> : null}
    </Box>
  );
};

const TextareaField = (props: TTextAreaFieldProps) => {
  const { fieldError, ...fieldProps } = props;
  return (
    <Box>
      <Label htmlFor={fieldProps.id}>
        {fieldProps.name
          ? `${fieldProps.name.charAt(0).toUpperCase()}${fieldProps.name.slice(
              1
            )}`
          : null}
      </Label>
      <Textarea {...fieldProps} />
      {fieldError ? <ErrorMessageField>{fieldError}</ErrorMessageField> : null}
    </Box>
  );
};

export {
  Input,
  InputWithRef,
  Textarea,
  FormInputItem,
  Label,
  Field,
  TextareaField,
};
