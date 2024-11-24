import { useEffect,useState } from "react";
import { useDishHook } from ".";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { useTranslation } from 'react-i18next';
import { useGlobalHook } from "@/hooks";
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";

type Props = {
  dishId: number | null,
  setDishId: (value: number | null) => void,
  setShowSidebar: (value: boolean) => void
}

const DishSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    DishLoading,
    DishSubmit,
    getSelectedDishById,
    clearDishDataHook,
    getDishByIdFromStore,
  } = useDishHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { dishId = null, setDishId = () =>{}, setShowSidebar = () =>{}} = props;
  const { t } = useTranslation();
  useEffect(() => {
    if (dishId && getDishByIdFromStore === null) {
      getSelectedDishById(dishId);
    } else {
      formik.setFieldValue(
        "dish_title",
        getDishByIdFromStore?.dish_title
          ? getDishByIdFromStore?.dish_title
          : ""
      );
    }

    return () => {
      if (dishId) {
        clearDishDataHook();
        setDishId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDishByIdFromStore]);

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
      dish_title: "",
    },
    validate: (data: any) => {
      const errors: any = {};

      if (!data.dish_title) {
        errors.dish_title = `${t('dish_title is required.')}`;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = {
        dish_title: data.dish_title,
      };

      if (dishId) {
        updateForm(dishId, formPostData, formik.resetForm,isSaveAndExit, setShowSidebar);
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
        {dishId ? `${t('Edit Dish')}` : `${t('Add New Dish')}`}
        </div>
        <div className="font-medium text-500 mb-3">
          Dish text here
        </div>
        <hr />
      
      {DishLoading ? (
        <FormSkeleton />
      ) : (
        
        <form onSubmit={formik.handleSubmit}>
          <div className="grid p-fluid">
            <div className="col-12">
              <div className="scroll-height-300 mb-5">
                <div className="field">
                  <label className="block">
                    <span className="must-required">*</span>&nbsp;<span>{t('Dish')}</span>
                  </label>
                  <InputText
                    placeholder={t('Enter Dish')}
                    id="dish_title"
                    name="dish_title"
                    value={formik.values.dish_title || ""}
                    onChange={formik.handleChange}
                    className={classNames({
                      invalid: isFormFieldValid("dish_title"),
                    })}
                  />
                  {getFormErrorMessage("dish_title")}
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
                disabled={DishSubmit}
              />
              <Button
                type="submit"
                label={dishId ? `${t('Update Dish')}` : `${t('Save & next')}`}
                className="p-button p-button-primary p-button-outlined mr-3"
                disabled={DishSubmit}
                loading={DishSubmit}
                onClick={() => {
                  if (Object.keys(formik.errors).length !== 0) {
                    validationToast();
                   
                  } else {
                    setIsSaveAndExit(false)
                  }
                  formik.handleSubmit();
                }}
              />
              {!dishId &&               
              <Button
                type="submit"
                label={dishId ? `${t('Update Dish')}` : `${t('Save & exit')}`}
                className="p-button p-button-primary"
                disabled={DishSubmit}
                loading={DishSubmit}
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

export { DishSidebar };
