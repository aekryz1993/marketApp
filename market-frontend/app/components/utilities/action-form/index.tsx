import { Form } from "@remix-run/react";

import { PrimaryButton } from "../button";
import { formClasses, submitBtn } from "./styled";
import clsx from "clsx";

const ActionFrom = ({
  actionType,
  action,
  buttonLabel,
  reloadDocument,
  replace,
  styledForm,
  children,
}: {
  actionType?: string;
  action?: string;
  reloadDocument?: boolean;
  buttonLabel?: string;
  replace?: boolean;
  styledForm?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Form
      method="post"
      action={action}
      className={clsx(styledForm ? formClasses : null)}
      replace={replace ? true : false}
      reloadDocument={reloadDocument ? true : false}
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
