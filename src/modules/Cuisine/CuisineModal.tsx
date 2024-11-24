// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useCuisineHook } from ".";
import { useTranslation } from 'react-i18next';

type Props = {
  cuisineId: number | null,
  setCuisineId: (id:number) => void
}
const CuisineModal = (props: Props) => {
  const {

    getSelectedCuisineById,
    clearCuisineDataHook,
    getCuisineByIdFromStore,
  } = useCuisineHook();

  const { cuisineId = null, setCuisineId = () =>{} } = props;
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (cuisineId && getCuisineByIdFromStore === null) {
      getSelectedCuisineById(cuisineId);
    } 

    return () => {
      if (cuisineId) {
        clearCuisineDataHook();
        setCuisineId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCuisineByIdFromStore]);





  return (
    <>
      <p>Create your content here</p>
    </>
  );
};

export { CuisineModal };
