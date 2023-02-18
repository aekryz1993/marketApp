import { Container } from "~/components/utilities";
import { Title } from "./title";
import { Price } from "./price";
import { Location } from "./location";
import { Condition } from "./condition";
import { Description } from "./description";
import { LocationMap } from "./location-map";
import { Tags } from "./tags";
import { DetailHeader } from "./detail-header";

export const PreviewItems = ({product}: {product: }) => (
  <>
    <Container>
      <Title />
      <Price />
      <Location />
    </Container>
    <Container>
      <DetailHeader />
      <Condition condition={product.condition} />
      <Description />
      <Tags />
      <LocationMap />
    </Container>
  </>
);
