import { useEffect,useState } from "react";
import { useCuisineHook } from ".";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import { useGlobalHook } from "@/hooks";
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";

type Props = {
  cuisineId: number | null,
  setCuisineId: (value: number | null) => void,
  setShowSidebar: (value: boolean) => void
}

const CuisineSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    CuisineLoading,
    CuisineSubmit,
    getSelectedCuisineById,
    clearCuisineDataHook,
    getCuisineByIdFromStore,
  } = useCuisineHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { cuisineId = null, setCuisineId = () =>{}, setShowSidebar = () =>{}} = props;
  const { t } = useTranslation();
  useEffect(() => {
    if (cuisineId && getCuisineByIdFromStore === null) {
      getSelectedCuisineById(cuisineId);
    } else {
      formik.setFieldValue(
        "cuisine_title",
        getCuisineByIdFromStore?.cuisine_title
          ? getCuisineByIdFromStore?.cuisine_title
          : ""
      );
    }

    return () => {
      if (cuisineId) {
        clearCuisineDataHook();
        setCuisineId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCuisineByIdFromStore]);

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
      cuisine_title: "",
    },
    validate: (data: any) => {
      const errors: any = {};

      if (!data.cuisine_title) {
        errors.cuisine_title = `${t('cuisine_title is required.')}`;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = {
        cuisine_title: data.cuisine_title,
      };

      if (cuisineId) {
        updateForm(cuisineId, formPostData, formik.resetForm,isSaveAndExit, setShowSidebar);
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
        {cuisineId ? `${t('Edit Cuisine')}` : `${t('Add New Cuisine')}`}
        </div>
        <div className="font-medium text-500 mb-3">
          Cuisine text here
        </div>
        <hr />
      
      {CuisineLoading ? (
        <FormSkeleton />
      ) : (
        
        <form onSubmit={formik.handleSubmit}>
          <div className="grid p-fluid">
            <div className="col-12">
              <div className="scroll-height-300 mb-5">
                <div className="field">
                  <label className="block">
                    <span className="must-required">*</span>&nbsp;<span>{t('Cuisine')}</span>
                  </label>
                  <InputText
                    placeholder={t('Enter Cuisine')}
                    id="cuisine_title"
                    name="cuisine_title"
                    value={formik.values.cuisine_title || ""}
                    onChange={formik.handleChange}
                    className={classNames({
                      invalid: isFormFieldValid("cuisine_title"),
                    })}
                  />
                  {getFormErrorMessage("cuisine_title")}
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
                disabled={CuisineSubmit}
              />
              <Button
                type="submit"
                label={cuisineId ? `${t('Update Cuisine')}` : `${t('Save & next')}`}
                className="p-button p-button-primary p-button-outlined mr-3"
                disabled={CuisineSubmit}
                loading={CuisineSubmit}
                onClick={() => {
                  if (Object.keys(formik.errors).length !== 0) {
                    validationToast();
                   
                  } else {
                    setIsSaveAndExit(false)
                  }
                  formik.handleSubmit();
                }}
              />
              {!cuisineId &&               
              <Button
                type="submit"
                label={cuisineId ? `${t('Update Cuisine')}` : `${t('Save & exit')}`}
                className="p-button p-button-primary"
                disabled={CuisineSubmit}
                loading={CuisineSubmit}
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

export { CuisineSidebar };
