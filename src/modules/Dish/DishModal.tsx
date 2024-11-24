// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useDishHook } from ".";
import { useTranslation } from 'react-i18next';

type Props = {
  dishId: number | null,
  setDishId: (id:number) => void
}
const DishModal = (props: Props) => {
  const {

    getSelectedDishById,
    clearDishDataHook,
    getDishByIdFromStore,
  } = useDishHook();

  const { dishId = null, setDishId = () =>{} } = props;
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (dishId && getDishByIdFromStore === null) {
      getSelectedDishById(dishId);
    } 

    return () => {
      if (dishId) {
        clearDishDataHook();
        setDishId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDishByIdFromStore]);





  return (
    <>
      <p>Create your content here</p>
    </>
  );
};

export { DishModal };
