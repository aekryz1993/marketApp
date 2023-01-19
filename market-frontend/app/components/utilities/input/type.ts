export interface TInputProps extends React.ComponentPropsWithoutRef<"input"> {
  classes?: string;
}

export interface TTextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  classes?: string;
}

export interface TLabelProps extends React.ComponentPropsWithoutRef<"label"> {
  classes?: string;
}

export interface TFieldProps extends TInputProps {
  id: string;
  fieldError?: string;
}

export interface TTextAreaFieldProps extends TTextareaProps {
  id: string;
  fieldError?: string;
}
