import { Container } from "~/components/utilities";
import { productInfoPreviewContainerClasses } from "../styled";
import { Title } from "./title";
import { Price } from "./price";
import { Location } from "./location";
import { Condition } from "./condition";
import { Description } from "./description";
import { LocationMap } from "./location-map";
import { Tags } from "./tags";
import { DetailHeader } from "./detail-header";

export const PreviewItems = () => (
  <Container classes={productInfoPreviewContainerClasses}>
    <Container>
      <Title />
      <Price />
      <Location />
    </Container>
    <Container>
      <DetailHeader />
      <Condition />
      <Description />
      <Tags />
      <LocationMap />
    </Container>
  </Container>
);
