import { useProductMutationContext } from "~/context/product-mutation";
import { Container } from "../utilities";
import { useProductSliderContext } from "~/context/product-slider";

export const Background = () => {
  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  const { productSliderState: {selected}} = useProductSliderContext();

  return (
    <Container classes="absolute top-0 bottom-0 left-0 right-0 opacity-70 z-0">
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <div className="h-[10%] w-[10%] scale-[11]">
          <span className="blur-[2px]">
            <img
              alt={imagesPreview[selected].alt}
              src={imagesPreview[selected].src}
              className="overflow-clip-m-box h-full w-full overflow-clip object-cover"
            />
          </span>
        </div>
      </div>
    </Container>
  );
};
