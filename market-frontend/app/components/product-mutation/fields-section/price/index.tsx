import type { TInputProps } from "~/components/utilities/input/type";

import {
  InputField,
  numbersKeys,
} from "~/components/utilities/input/input-field";
import { useProductMutationContext } from "~/context/product-mutation";
import { Container } from "~/components/utilities";
import { CurrencyField } from "./currency";

export const Price = () => {
  const {
    productMutationState: { currentPrice },
    toggleField,
  } = useProductMutationContext();

  const handleChange: TInputProps["onChange"] = (event) => {
    const text = event.target.value.split(",").join("");
    if (text.includes(".") && text.split(".")[1].length > 2) return;

    toggleField({
      fieldName: "currentPrice",
      fieldValue: !text
        ? ""
        : text.endsWith(".")
        ? text
        : parseFloat(text).toLocaleString("en-US"),
    });
  };

  return (
    <Container classes="w-full flex items-center justify-between">
      <InputField
        value={currentPrice ?? ""}
        label="Price"
        min="0"
        onChange={handleChange}
        classes="basis-10/12"
        onKeyDown={(event) => {
          if (!event.ctrlKey && !numbersKeys.includes(event.code)) {
            event.preventDefault();
          }
        }}
      />
      <CurrencyField />
    </Container>
  );
};
