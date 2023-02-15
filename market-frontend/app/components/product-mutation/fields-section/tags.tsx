import { TagsInput } from "~/components/utilities/tags-input";
import { useProductMutationContext } from "~/context/product-mutation";

export const TagsField = () => {
  const {
    productMutationState: { tags },
    toggleField,
  } = useProductMutationContext();

  const handleAddTag = (tag: string) => {
    const isExistTag = tags.find((_tag) => _tag === tag);

    if (!isExistTag)
      toggleField({
        fieldName: "tags",
        fieldValue: tags.length > 0 ? [...tags, tag] : [tag],
      });
  };

  const handleRemoveTag = (tag: string) => {
    const filteredTags = tags.filter((_tag) => _tag !== tag);

    toggleField({ fieldName: "tags", fieldValue: filteredTags });
  };

  return (
    <TagsInput
      tags={tags}
      label='Product tags'
      handleAddTag={handleAddTag}
      handleRemoveTag={handleRemoveTag}
    />
  );
};
