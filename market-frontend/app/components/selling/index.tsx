import { ContainerElementProvider } from "~/context/container-element-context";
import { Container } from "../utilities/layout";
import { SellingHeader } from "./selling-header";
import { SellingItem } from "./selling-item";
import { useProducts } from "~/context/products";
import { useRef } from "react";
import { mainClasses } from "../utilities/layout/styled";

export const Selling = () => {
  const {
    productsState: { products },
  } = useProducts();

  const containerElement = useRef(null);

  return (
    <ContainerElementProvider containerElement={containerElement}>
      <main className={mainClasses} ref={containerElement}>
        <Container classes="relative w-full max-w-[800px] mx-auto flex flex-col">
          <SellingHeader />
          <Container classes="mt-4 flex flex-col gap-4 pb-4">
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => (
                <SellingItem key={product.id} product={product} />
              ))}
          </Container>
        </Container>
      </main>
    </ContainerElementProvider>
  );
};
