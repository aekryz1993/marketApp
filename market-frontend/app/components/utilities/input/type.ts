export interface TInputProps extends React.ComponentPropsWithoutRef<"input"> {
  classes?: string;
  label?: string;
}

export interface TUlProps extends React.ComponentPropsWithoutRef<"ul"> {
  classes?: string;
}
export interface TLi extends React.ComponentPropsWithoutRef<"li"> {}

export interface TTextareaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  classes?: string;
  label?: string;
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

export interface TInputState {
  isFocus: boolean;
  isEmpty: boolean;
}
