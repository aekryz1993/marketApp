import type {
  TContext,
  TDeletePhotoPayload,
  TFieldPayload,
  TImagesPayload,
} from "./types";
import type { TAuthInfo } from "~/types/data";

import { createContext, useCallback, useReducer } from "react";
import { useOutletContext } from "@remix-run/react";

import { initialState } from "./helper";
import { reducer } from "./reducer";

const ProductMutationContext = createContext<TContext | undefined>(undefined);

const ProductMutationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authInfo } = useOutletContext<{ authInfo: TAuthInfo | undefined }>();

  const userCurrency = authInfo?.user?.currency;

  const [state, dispatch] = useReducer(reducer, initialState({ userCurrency }));

  const toggleField = useCallback(
    ({ fieldName, fieldValue }: TFieldPayload) => {
      dispatch({ type: "TOGGLE_FIELD", payload: { fieldName, fieldValue } });
    },
    []
  );

  const toggleImages = useCallback(({ uploadedImages }: TImagesPayload) => {
    dispatch({ type: "TOGGLE_PHOTOS", payload: { uploadedImages } });
  }, []);

  const deleteImage = useCallback(({ id }: TDeletePhotoPayload) => {
    dispatch({ type: "DELETE_PHOTO", payload: { id } });
  }, []);

  const value = {
    productMutationState: { ...state },
    toggleField,
    toggleImages,
    deleteImage,
  };

  return (
    <ProductMutationContext.Provider value={value}>
      {children}
    </ProductMutationContext.Provider>
  );
};

export { ProductMutationContext, ProductMutationProvider };
