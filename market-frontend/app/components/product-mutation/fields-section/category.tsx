import { useProductMutationContext } from "~/context/product-mutation";
import {
  DropdownField,
  DropdownOption,
} from "~/components/utilities/dropdown/dropdown-field";
import { Category } from "~/types/enums";

const categoriesValues = Object.values(Category);

export const CategoryField = () => {
  const {
    productMutationState: { category: selected },
    toggleField,
  } = useProductMutationContext();

  const notSelectedCategory = categoriesValues.filter(
    (categoryValue) =>
      categoryValue !== selected && categoryValue !== Category.NOT_FOUND
  );

  return (
    <DropdownField selected={selected} classes="w-full">
      {notSelectedCategory.map((categoryValue) => (
        <DropdownOption
          key={categoryValue}
          onClick={() => {
            toggleField({
              fieldName: "category",
              fieldValue: categoryValue,
            });
          }}
        >
          {categoryValue}
        </DropdownOption>
      ))}
    </DropdownField>
  );
};
