import { useRef } from "react";

import { ProductMutationProvider } from "~/context/product-mutation";
import { Container } from "../utilities";
import { formContainerClasses, leftContainerClasses } from "./styled";
import { ImagesSection } from "./images-section";
import { FieldsSection } from "./fields-section";
import { ContainerElementProvider } from "~/context/container-element-context";
import { PreviewSection } from "./preview-section";
import { SubmissionSection } from "./Submission-section";

export const ProductMutation = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ProductMutationProvider>
      <ContainerElementProvider containerElement={formContainerRef}>
        <Container classes="flex w-full">
          <Container classes={leftContainerClasses}>
            <Container classes="basis-1/12 pl-2">
              <h1 className="pt-4 pb-2 text-3xl font-black">Item For Sell</h1>
            </Container>
            <div className={formContainerClasses} ref={formContainerRef}>
              <ImagesSection />
              <FieldsSection />
            </div>
            <Container classes="basis-1/12 shrink-0 border-t border-t-gray-300 dark:border-t-gray-50 px-4 py-2">
              <SubmissionSection />
            </Container>
          </Container>
          <PreviewSection />
        </Container>
      </ContainerElementProvider>
    </ProductMutationProvider>
  );
};
