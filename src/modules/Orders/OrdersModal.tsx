// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useOrdersHook } from ".";
import { useTranslation } from 'react-i18next';

type Props = {
  ordersId: number | null,
  setOrdersId: (id:number) => void
}
const OrdersModal = (props: Props) => {
  const {

    getSelectedOrdersById,
    clearOrdersDataHook,
    getOrdersByIdFromStore,
  } = useOrdersHook();

  const { ordersId = null, setOrdersId = () =>{} } = props;
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (ordersId && getOrdersByIdFromStore === null) {
      getSelectedOrdersById(ordersId);
    } 

    return () => {
      if (ordersId) {
        clearOrdersDataHook();
        setOrdersId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOrdersByIdFromStore]);





  return (
    <>
      <p>Create your content here</p>
    </>
  );
};

export { OrdersModal };
