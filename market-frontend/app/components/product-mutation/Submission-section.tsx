import { useSubmit, useTransition } from "@remix-run/react";

import { PrimaryButton } from "../utilities/button";
import { useProductMutationContext } from "~/context/product-mutation";
import { Loader } from "../loader";

export const SubmissionSection = () => {
  const {
    productMutationState: {
      imagesPreview,
      category,
      condition,
      currency,
      currentPrice,
      tags,
      title,
      description,
      brand,
      location,
    },
  } = useProductMutationContext();

  const submit = useSubmit();
  const transition = useTransition();

  const handleSubmit = () => {
    const formData = new FormData();
    for (let imagePreview of imagesPreview) {
      formData.append(`images`, imagePreview.file);
    }
    for (let tag of tags) {
      formData.append(`tags`, tag);
    }
    formData.append(`title`, title);
    if (description) formData.append(`description`, description);
    if (brand) formData.append(`brand`, brand);
    if (location) formData.append(`locationId`, location.id);
    if (category !== "Category") formData.append(`category`, category);
    if (condition.key !== "NOT_SELECTED")
      formData.append(`condition`, condition.key);
    formData.append(`currency`, currency.key);
    if (currentPrice) formData.append(`currentPrice`, currentPrice.toString());
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <PrimaryButton classes="rounded-md py-2.5 w-full" onClick={handleSubmit}>
      {transition.submission ? (
        <Loader dimensions="w-5 h-5" />
      ) : (
        <span className="text tracking-wider">Publish</span>
      )}
    </PrimaryButton>
  );
};
