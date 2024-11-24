import { useEffect,useState } from "react";
import { useOrdersHook } from ".";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import { useGlobalHook } from "@/hooks";
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";

type Props = {
  ordersId: number | null,
  setOrdersId: (value: number | null) => void,
  setShowSidebar: (value: boolean) => void
}

const OrdersSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    OrdersLoading,
    OrdersSubmit,
    getSelectedOrdersById,
    clearOrdersDataHook,
    getOrdersByIdFromStore,
  } = useOrdersHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { ordersId = null, setOrdersId = () =>{}, setShowSidebar = () =>{}} = props;
  const { t } = useTranslation();
  useEffect(() => {
    if (ordersId && getOrdersByIdFromStore === null) {
      getSelectedOrdersById(ordersId);
    } else {
      formik.setFieldValue(
        "orders_title",
        getOrdersByIdFromStore?.orders_title
          ? getOrdersByIdFromStore?.orders_title
          : ""
      );
    }

    return () => {
      if (ordersId) {
        clearOrdersDataHook();
        setOrdersId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOrdersByIdFromStore]);

  const validationToast = () => {
    updateGlobalToast({
      showToast: true,
      toastMessage: "Error! Please fill in all the fields with * before them.",
      toastDetail: null,
      toastType: "error",
    });
  };

  const formik: any = useFormik({
    initialValues: {
      orders_title: "",
    },
    validate: (data: any) => {
      const errors: any = {};

      if (!data.orders_title) {
        errors.orders_title = `${t('orders_title is required.')}`;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = {
        orders_title: data.orders_title,
      };

      if (ordersId) {
        updateForm(ordersId, formPostData, formik.resetForm,isSaveAndExit, setShowSidebar);
      } else {
        saveForm(formPostData, formik.resetForm,isSaveAndExit, setShowSidebar);
      }
    },
  });

  const isFormFieldValid = (name: any) => {
    return !!(formik.touched[name] && formik.errors[name]);
  };
  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name) && (
        <small className="block error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <>
    
    <div className="card">
        <div className="text-3xl font-medium text-900 mb-3">
        {ordersId ? `${t('Edit Orders')}` : `${t('Add New Orders')}`}
        </div>
        <div className="font-medium text-500 mb-3">
          Orders text here
        </div>
        <hr />
      
      {OrdersLoading ? (
        <FormSkeleton />
      ) : (
        
        <form onSubmit={formik.handleSubmit}>
          <div className="grid p-fluid">
            <div className="col-12">
              <div className="scroll-height-300 mb-5">
                <div className="field">
                  <label className="block">
                    <span className="must-required">*</span>&nbsp;<span>{t('Orders')}</span>
                  </label>
                  <InputText
                    placeholder={t('Enter Orders')}
                    id="orders_title"
                    name="orders_title"
                    value={formik.values.orders_title || ""}
                    onChange={formik.handleChange}
                    className={classNames({
                      invalid: isFormFieldValid("orders_title"),
                    })}
                  />
                  {getFormErrorMessage("orders_title")}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 py-3 surface-100 text-right sidebar-footer">
            <div className="text-right">
              <Button
              text
                onClick={() => setShowSidebar(false)}
                icon="pi pi-times"
                type="button"
                label={t('Cancel')}
                className=" p-button-danger p-component mr-3"
                disabled={OrdersSubmit}
              />
              <Button
                type="submit"
                label={ordersId ? `${t('Update Orders')}` : `${t('Save & next')}`}
                className="p-button p-button-primary p-button-outlined mr-3"
                disabled={OrdersSubmit}
                loading={OrdersSubmit}
                onClick={() => {
                  if (Object.keys(formik.errors).length !== 0) {
                    validationToast();
                   
                  } else {
                    setIsSaveAndExit(false)
                  }
                  formik.handleSubmit();
                }}
              />
              {!ordersId &&               
              <Button
                type="submit"
                label={ordersId ? `${t('Update Orders')}` : `${t('Save & exit')}`}
                className="p-button p-button-primary"
                disabled={OrdersSubmit}
                loading={OrdersSubmit}
                onClick={() => {
                  if (Object.keys(formik.errors).length !== 0) {
                    validationToast();
                    
                  } else {
                    setIsSaveAndExit(true)
                  }
                  formik.handleSubmit();
                }}
              />
              }
            </div>
          </div>
        </form>
      )}
    </div>
    </>
  );
};

export { OrdersSidebar };
