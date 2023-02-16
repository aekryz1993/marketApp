import { useProductMutationContext } from "~/context/product-mutation";
import { Container } from "../utilities";

export const Slide = () => {
  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  return <Container classes="shrink-0 max-w-[calc(100% + 140px)]">
    <Container classes="h-12 max-w-full py-2 flex items-center">
      
    </Container>
    {/* <div className="p-"></div> */}
  </Container>
}