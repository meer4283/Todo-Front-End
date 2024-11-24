import { useEffect,useState } from "react";
import { useVendorsHook } from ".";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import { useGlobalHook } from "@/hooks";
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";

type Props = {
  vendorsId: number | null,
  setVendorsId: (value: number | null) => void,
  setShowSidebar: (value: boolean) => void
}

const VendorsSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    VendorsLoading,
    VendorsSubmit,
    getSelectedVendorsById,
    clearVendorsDataHook,
    getVendorsByIdFromStore,
  } = useVendorsHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { vendorsId = null, setVendorsId = () =>{}, setShowSidebar = () =>{}} = props;
  const { t } = useTranslation();
  useEffect(() => {
    if (vendorsId && getVendorsByIdFromStore === null) {
      getSelectedVendorsById(vendorsId);
    } else {
      formik.setFieldValue(
        "vendors_title",
        getVendorsByIdFromStore?.vendors_title
          ? getVendorsByIdFromStore?.vendors_title
          : ""
      );
    }

    return () => {
      if (vendorsId) {
        clearVendorsDataHook();
        setVendorsId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVendorsByIdFromStore]);

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
      vendors_title: "",
    },
    validate: (data: any) => {
      const errors: any = {};

      if (!data.vendors_title) {
        errors.vendors_title = `${t('vendors_title is required.')}`;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = {
        vendors_title: data.vendors_title,
      };

      if (vendorsId) {
        updateForm(vendorsId, formPostData, formik.resetForm,isSaveAndExit, setShowSidebar);
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
        {vendorsId ? `${t('Edit Vendors')}` : `${t('Add New Vendors')}`}
        </div>
        <div className="font-medium text-500 mb-3">
          Vendors text here
        </div>
        <hr />
      
      {VendorsLoading ? (
        <FormSkeleton />
      ) : (
        
        <form onSubmit={formik.handleSubmit}>
          <div className="grid p-fluid">
            <div className="col-12">
              <div className="scroll-height-300 mb-5">
                <div className="field">
                  <label className="block">
                    <span className="must-required">*</span>&nbsp;<span>{t('Vendors')}</span>
                  </label>
                  <InputText
                    placeholder={t('Enter Vendors')}
                    id="vendors_title"
                    name="vendors_title"
                    value={formik.values.vendors_title || ""}
                    onChange={formik.handleChange}
                    className={classNames({
                      invalid: isFormFieldValid("vendors_title"),
                    })}
                  />
                  {getFormErrorMessage("vendors_title")}
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
                disabled={VendorsSubmit}
              />
              <Button
                type="submit"
                label={vendorsId ? `${t('Update Vendors')}` : `${t('Save & next')}`}
                className="p-button p-button-primary p-button-outlined mr-3"
                disabled={VendorsSubmit}
                loading={VendorsSubmit}
                onClick={() => {
                  if (Object.keys(formik.errors).length !== 0) {
                    validationToast();
                   
                  } else {
                    setIsSaveAndExit(false)
                  }
                  formik.handleSubmit();
                }}
              />
              {!vendorsId &&               
              <Button
                type="submit"
                label={vendorsId ? `${t('Update Vendors')}` : `${t('Save & exit')}`}
                className="p-button p-button-primary"
                disabled={VendorsSubmit}
                loading={VendorsSubmit}
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

export { VendorsSidebar };
