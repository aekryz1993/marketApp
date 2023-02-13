import type { TTextareaProps } from "../../utilities/input/type";

import { TextareaField } from "~/components/utilities/input/custom-textarea";
import { useProductMutationContext } from "~/context/product-mutation";

export const Description = () => {
  const {
    productMutationState: { description },
    toggleField,
  } = useProductMutationContext();

  const handleChange: TTextareaProps["onChange"] = (event) => {
    const text = event.target.value;
    toggleField({ fieldName: "description", fieldValue: text });
  };

  return (
    <TextareaField
      value={description}
      label="Description"
      onChange={handleChange}
    />
  );
};
