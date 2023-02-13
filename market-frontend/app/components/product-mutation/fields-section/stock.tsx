import type { TInputProps } from "~/components/utilities/input/type";

import { InputField } from "~/components/utilities/input/custom-input";
import { useProductMutationContext } from "~/context/product-mutation";

export const Stock = () => {
  const {
    productMutationState: { stock },
    toggleField,
  } = useProductMutationContext();

  const handleChange: TInputProps["onChange"] = (event) => {
    const text = event.target.value;
    toggleField({ fieldName: "stock", fieldValue: text });
  };

  return (
    <InputField
      type="number"
      value={stock}
      label="Stock"
      onChange={handleChange}
    />
  );
};
