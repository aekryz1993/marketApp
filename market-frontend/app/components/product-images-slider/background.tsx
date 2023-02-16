import { useProductMutationContext } from "~/context/product-mutation";
import { Container } from "../utilities";

export const Background = () => {
  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  return (
    <Container classes="absolute top-0 bottom-0 left-0 right-0 opacity-70 z-0">
      <span className="blur-sm">
        <img
          alt={imagesPreview[0].alt}
          src={imagesPreview[0].src}
          className="overflow-clip-m-box h-full w-full overflow-clip object-cover"
        />
      </span>
    </Container>
  );
};
