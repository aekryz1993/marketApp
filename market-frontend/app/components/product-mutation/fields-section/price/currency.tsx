import type { Currency } from "~/types/enums";

import {
  DropdownField,
  DropdownOption,
} from "~/components/utilities/dropdown/dropdown-field";
import { CurrencySymbol } from "~/types/enums";
import { useProductMutationContext } from "~/context/product-mutation";

const currenciesKeys = Object.keys(CurrencySymbol) as Currency[];
const currenciesValues = Object.values(CurrencySymbol);

export const CurrencyField = () => {
  const {
    productMutationState: { currency: selected },
    toggleField,
  } = useProductMutationContext();

  const notSelectedCurrenciesKeys = currenciesKeys.filter(
    (currencyKey) => currencyKey !== selected.key
  );

  const notSelectedCurrenciesValues = currenciesValues.filter(
    (currencyValue) => currencyValue !== selected.value
  );

  return (
    <DropdownField selected={selected.value} classes="w-2/12 ml-1">
      {notSelectedCurrenciesKeys.map((currencyKey, index) => (
        <DropdownOption
          key={currencyKey}
          onClick={() => {
            toggleField({
              fieldName: "currency",
              fieldValue: {
                key: currencyKey,
                value: notSelectedCurrenciesValues[index],
              },
            });
          }}
        >
          {notSelectedCurrenciesValues[index]}
        </DropdownOption>
      ))}
    </DropdownField>
  );
};
