import type { TLocation, TProductBody } from "~/types/endpoints/product";
import type {
  TConditionState,
  TCurrencyState,
} from "~/context/product-mutation/types";
import type { TUser } from "~/types/endpoints/user";

import { Container } from "~/components/utilities";
import { Title } from "./title";
import { Price } from "./price";
import { Location } from "./location";
import { Condition } from "./condition";
import { Description } from "./description";
import { LocationMap } from "./location-map";
import { Tags } from "./tags";
import { DetailHeader } from "./detail-header";
import { Brand } from "./brand";
import { MessageSection } from "../product-layout/message-section";

export type TProductProp = Required<Pick<TProductBody, "title">> &
  Pick<TProductBody, "brand" | "description"> & {
    currency: TCurrencyState;
    location?: TLocation;
    condition: TConditionState;
    tags: string[];
    currentPrice: number | undefined;
    owner?: TUser | undefined | null
  };

export const ProductItems = ({ product }: { product: TProductProp }) => (
  <>
    <Container classes="py-4 border-b border-b-gray-200 dark:border-b-gray-700 md:overflow-y-auto md:overscroll-y-contain">
      <div>
        <Title title={product.title} />
        <Price price={product.currentPrice} currency={product.currency} />
        <Location location={product.location} />
      </div>
      <div>
        <DetailHeader
          condition={product.condition}
          location={product.location}
          tags={product.tags}
          brand={product.brand}
        />
        <Condition condition={product.condition} />
        <Brand brand={product.brand} />
        <Description description={product.description} />
        <Tags tags={product.tags} />
        <LocationMap location={product.location} />
      </div>
    </Container>
    <MessageSection product={product} />
  </>
);
