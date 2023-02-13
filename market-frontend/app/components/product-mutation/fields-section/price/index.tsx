import type { TInputProps } from "~/components/utilities/input/type";

import { InputField } from "~/components/utilities/input/custom-input";
import { useProductMutationContext } from "~/context/product-mutation";
import { Container } from "~/components/utilities";
import { CurrencyField } from "./currency";

export const Price = () => {
  const {
    productMutationState: { currentPrice },
    toggleField,
  } = useProductMutationContext();

  const handleChange: TInputProps["onChange"] = (event) => {
    const text = event.target.value;
    toggleField({ fieldName: "currentPrice", fieldValue: text });
  };

  return (
    <Container classes="w-full flex items-center justify-between">
      <InputField
        type="number"
        value={currentPrice}
        label="Price"
        onChange={handleChange}
        classes="basis-10/12"
      />
      <CurrencyField />
    </Container>
  );
};
