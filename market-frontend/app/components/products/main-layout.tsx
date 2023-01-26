import { Box, Container, Main } from "~/components/utilities/layout";
import { useProducts } from "~/context/products";
import { ProductItem } from "./product-item";
import {
  headerContainerClasses,
  headerTitleClasses,
  productsContainerClasses,
} from "./styles";
import { useFetchProductsOnScroll } from "~/hooks/products/useFetchProductsOnScroll";
import { useBreakPoints } from "~/hooks/useBreakpoints";
import { cardStyle } from "../utilities/card/styled";
import { Loader } from "../loader";

export const MainLayout = () => {
  const {
    productsState: { products, loading },
  } = useProducts();

  const breakPoint = useBreakPoints();

  const handleScroll = useFetchProductsOnScroll();

  return (
      <Main onScroll={handleScroll}>
        <Container>
          <Container className={headerContainerClasses}>
            <Box>
              <h1 className={headerTitleClasses}>Today's picks</h1>
            </Box>
          </Container>
          {loading ? (
            <Loader dimensions="w-20 h-20" />
          ) : (
            <Container classes={productsContainerClasses}>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  itemWidth={cardStyle(breakPoint.breakPoint)}
                />
              ))}
            </Container>
          )}
        </Container>
      </Main>
  );
};
