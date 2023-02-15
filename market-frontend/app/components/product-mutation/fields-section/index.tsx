import { Container } from "~/components/utilities";
import { Title } from "./title";
import { fieldsSectionContainerClasses } from "../styled";
import { Price } from "./price";
import { CategoryField as Category } from "./category";
import { ConditionField as Condition } from "./condition";
import { Brand } from "./brand";
import { Description } from "./description";
import { TagsField as Tags } from "./tags";
import { LocationField as Location } from "./location";

export const FieldsSection = () => {
  return (
    <Container classes={fieldsSectionContainerClasses}>
      <Title />
      <Description />
      <Price />
      <Category />
      <Condition />
      <Location />
      <Brand />
      <Tags />
    </Container>
  );
};
