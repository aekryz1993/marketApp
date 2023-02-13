import { Container } from "~/components/utilities";
import { Title } from "./title";
import { fieldsSectionContainerClasses } from "../styled";
import { Price } from "./price";
import { CategoryField as Category } from "./category";
import { ConditionField as Condition } from "./condition";
import { Brand } from "./brand";
import { Stock } from "./stock";
import { Description } from "./description";

export const FieldsSection = () => {
  return (
    <Container classes={fieldsSectionContainerClasses}>
      <Title />
      <Description />
      <Price />
      <Category />
      <Condition />
      <Brand />
      <Stock />
    </Container>
  );
};
