// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useVendorsHook } from ".";
import { useTranslation } from 'react-i18next';

type Props = {
  vendorsId: number | null,
  setVendorsId: (id:number) => void
}
const VendorsModal = (props: Props) => {
  const {

    getSelectedVendorsById,
    clearVendorsDataHook,
    getVendorsByIdFromStore,
  } = useVendorsHook();

  const { vendorsId = null, setVendorsId = () =>{} } = props;
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (vendorsId && getVendorsByIdFromStore === null) {
      getSelectedVendorsById(vendorsId);
    } 

    return () => {
      if (vendorsId) {
        clearVendorsDataHook();
        setVendorsId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVendorsByIdFromStore]);





  return (
    <>
      <p>Create your content here</p>
    </>
  );
};

export { VendorsModal };
