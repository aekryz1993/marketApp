import { Form } from "@remix-run/react";

import { PrimaryButton } from "../button";
import { formClasses, submitBtn } from "./styled";
import clsx from "clsx";

const ActionFrom = ({
  actionType,
  buttonLabel,
  replace,
  styledForm,
  children,
}: {
  actionType?: string;
  reloadDocument?: boolean;
  buttonLabel?: string;
  replace?: boolean;
  styledForm?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Form
      method="post"
      className={clsx(styledForm ? formClasses : null)}
      replace={replace ? true : false}
    >
      {actionType ? (
        <input type="hidden" name="actionType" value={actionType} />
      ) : null}
      {children}
      {buttonLabel ? (
        <PrimaryButton type="submit" classes={submitBtn}>
          {buttonLabel}
        </PrimaryButton>
      ) : null}
    </Form>
  );
};

export { ActionFrom };
