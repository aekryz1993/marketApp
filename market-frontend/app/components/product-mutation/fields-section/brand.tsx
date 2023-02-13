import type { TInputProps } from "../../utilities/input/type";

import { InputField } from "~/components/utilities/input/custom-input";
import { useProductMutationContext } from "~/context/product-mutation";

export const Brand = () => {
  const {
    productMutationState: { brand },
    toggleField,
  } = useProductMutationContext();

  const handleChange: TInputProps["onChange"] = (event) => {
    const text = event.target.value;
    toggleField({ fieldName: "brand", fieldValue: text });
  };

  return (
    <InputField
      type="text"
      value={brand}
      label="Brand"
      onChange={handleChange}
    />
  );
};
