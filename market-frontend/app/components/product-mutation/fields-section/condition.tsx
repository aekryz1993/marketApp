import type { ConditionKey } from "~/types/enums";

import {
  DropdownField,
  DropdownOption,
} from "~/components/utilities/dropdown/dropdown-field";
import { Condition } from "~/types/enums";
import { useProductMutationContext } from "~/context/product-mutation";

const conditionKeys = Object.keys(Condition) as ConditionKey[];
const currenciesValues = Object.values(Condition);

export const ConditionField = () => {
  const {
    productMutationState: { condition: selected },
    toggleField,
  } = useProductMutationContext();

  const notSelectedConditionsKeys = conditionKeys.filter(
    (conditionKey) => conditionKey !== selected.key
  );

  const notSelectedConditionsValues = currenciesValues.filter(
    (conditionValue) => conditionValue !== selected.value
  );

  return (
    <DropdownField selected={selected.value} classes="w-full">
      {notSelectedConditionsKeys.map((conditionKey, index) => (
        <DropdownOption
          key={conditionKey}
          onClick={() => {
            toggleField({
              fieldName: "condition",
              fieldValue: {
                key: conditionKey,
                value: notSelectedConditionsValues[index],
              },
            });
          }}
        >
          {notSelectedConditionsValues[index]}
        </DropdownOption>
      ))}
    </DropdownField>
  );
};
