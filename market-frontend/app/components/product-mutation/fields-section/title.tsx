import type { TInputProps } from "../../utilities/input/type";

import { InputField } from "~/components/utilities/input/input-field";
import { useProductMutationContext } from "~/context/product-mutation";

export const Title = () => {
  const {
    productMutationState: { title },
    toggleField,
  } = useProductMutationContext();

  const handleChange: TInputProps["onChange"] = (event) => {
    const text = event.target.value;
    toggleField({ fieldName: "title", fieldValue: text });
  };

  return (
    <InputField
      type="text"
      value={title}
      label="Title"
      onChange={handleChange}
    />
  );
};
