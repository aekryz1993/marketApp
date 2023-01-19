import { useCallback, useState } from "react";

import { inputClasses } from "~/components/utilities/action-form/styled";

const useFields = (initialFields: () => { [key: string]: string }) => {
  const [fields, setFields] = useState(initialFields);

  const fieldProps = useCallback(
    ({
      name,
      value,
      defaultValue,
      error,
    }: {
      name: string;
      value?: string;
      defaultValue?: string;
      error?: string;
    }) => ({
      classes: inputClasses,
      type: "text",
      id: `${name}-input`,
      name,
      defaultValue,
      value,
      "aria-invalid": Boolean(value),
      "aria-errormessage": error ? "title-error" : undefined,
      fieldError: error,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setFields((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      },
    }),
    [setFields]
  );

  return { fieldProps, fields, setFields };
};

const useFieldsWithoutState = () => {
  const fieldProps = useCallback(
    ({
      name,
      type,
      defaultValue,
      error,
    }: {
      name: string;
      type: string;
      defaultValue?: string;
      error?: string;
    }) => ({
      classes: inputClasses,
      type,
      id: `${name}-input`,
      name,
      defaultValue,
      "aria-invalid": Boolean(error),
      "aria-errormessage": error ? "title-error" : undefined,
      fieldError: error,
    }),
    []
  );

  return { fieldProps };
};

export { useFieldsWithoutState, useFields };
