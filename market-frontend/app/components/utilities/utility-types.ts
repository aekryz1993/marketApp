export interface TDivProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  classes?: string;
}

export interface TMainProps extends React.ComponentPropsWithoutRef<"main"> {
  children: React.ReactNode;
  classes?: string;
}

export interface TLiProps extends React.ComponentProps<"li"> {
  children: React.ReactNode;
  classes?: string;
}
