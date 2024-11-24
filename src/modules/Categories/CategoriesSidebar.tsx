import { useEffect, useState } from "react";
import { useCategoriesHook } from ".";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import { useGlobalHook } from "@/hooks";
import { FileUpload } from "primereact/fileupload";
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";

type Props = {
  categoriesId: number | null,
  setCategoriesId: (value: number | null) => void,
  setShowSidebar: (value: boolean) => void
}

const CategoriesSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    CategoriesLoading,
    CategoriesSubmit,
    getSelectedCategoriesById,
    clearCategoriesDataHook,
    getCategoriesByIdFromStore,
  } = useCategoriesHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { categoriesId, setCategoriesId, setShowSidebar } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (categoriesId && getCategoriesByIdFromStore === null) {
      getSelectedCategoriesById(categoriesId);
    } else {
      formik.setFieldValue("category_name", getCategoriesByIdFromStore?.category_name || "");
      // formik.setFieldValue("slug", getCategoriesByIdFromStore?.slug || "");
      formik.setFieldValue("description", getCategoriesByIdFromStore?.description || "");
      formik.setFieldValue("category_image", getCategoriesByIdFromStore?.category_image || "");
      formik.setFieldValue("category_banner", getCategoriesByIdFromStore?.category_banner || "");
      formik.setFieldValue("parent_id", getCategoriesByIdFromStore?.parent_id || "");
    }

    return () => {
      if (categoriesId) {
        clearCategoriesDataHook();
        setCategoriesId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoriesByIdFromStore]);

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
      category_name: "",
      // slug: "",
      description: "",
      category_image: "",
      category_banner: "",
      parent_id: "",
    },
    validate: (data: any) => {
      const errors: any = {};
      if (!data.category_name) {
        errors.category_name = `${t('Category Name is required.')}`;
      }
      // if (!data.slug) {
      //   errors.slug = `${t('Slug is required.')}`;
      // }
      if (!data.description) {
        errors.description = `${t('Description is required.')}`;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = new FormData();

      formPostData.append("category_name", data.category_name);
      // formPostData.append("slug", data.slug);
      formPostData.append("description", data.description);

      if (data.category_image) {
        formPostData.append("category_image", data.category_image); // Assuming it's a URL or File
      }

      if (data.category_banner) {
        formPostData.append("category_banner", data.category_banner); // Assuming it's a URL or File
      }

      if (data.parent_id) {
        formPostData.append("parent_id", data.parent_id);
      }
      if (categoriesId) {
        updateForm(categoriesId, formPostData, formik.resetForm, isSaveAndExit, setShowSidebar);
      } else {
        saveForm(formPostData, formik.resetForm, isSaveAndExit, setShowSidebar);
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
  const handleCategoryImageUpload = ({ files }: any) => {
    const [file] = files;
    formik.setFieldValue('category_image', file); // Set Category Image file in Formik state
  };

  const handleCategoryBannerUpload = ({ files }: any) => {
    const [file] = files;
    formik.setFieldValue('category_banner', file); // Set Category Banner file in Formik state
  };
  return (
    <>
      <div className="card">
        <div className="text-3xl font-medium text-900 mb-3">
          {categoriesId ? `${t('Edit Categories')}` : `${t('Add New Categories')}`}
        </div>


        {CategoriesLoading ? (
          <FormSkeleton />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid p-fluid">
              <div className="col-12">
                <div className="scroll-height-300 mb-5">
                  <div className="field">
                    <label className="block">
                      <span className="must-required">*</span>&nbsp;<span>{t('Category Name')}</span>
                    </label>
                    <InputText
                      placeholder={t('Enter Category Name')}
                      id="category_name"
                      name="category_name"
                      value={formik.values.category_name || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("category_name"),
                      })}
                    />
                    {getFormErrorMessage("category_name")}
                  </div>

                  {/* <div className="field">
                    <label className="block">
                      <span className="must-required">*</span>&nbsp;<span>{t('Slug')}</span>
                    </label>
                    <InputText
                      placeholder={t('Enter Slug')}
                      id="slug"
                      name="slug"
                      value={formik.values.slug || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("slug"),
                      })}
                    />
                    {getFormErrorMessage("slug")}
                  </div> */}

                  <div className="field">
                    <label className="block">
                      <span className="must-required">*</span>&nbsp;<span>{t('Description')}</span>
                    </label>
                    <InputText
                      placeholder={t('Enter Description')}
                      id="description"
                      name="description"
                      value={formik.values.description || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("description"),
                      })}
                    />
                    {getFormErrorMessage("description")}
                  </div>

                  <div className="p-field p-fluid my-5">
                    <label htmlFor="category_image">
                      Category Image ({formik.values.category_image?.name ?? "No file Selected"})
                    </label>
                    <FileUpload
                      className="mt-2"
                      name="category_image"
                      accept="image/*"
                      customUpload
                      uploadHandler={handleCategoryImageUpload}
                      mode="basic"
                      auto
                      chooseLabel="Upload Image"
                    />
                    {getFormErrorMessage('category_image')}
                  </div>

                  <div className="p-field p-fluid my-5">
                    <label htmlFor="category_banner">
                      Category Banner ({formik.values.category_banner?.name ?? "No file Selected"})
                    </label>
                    <FileUpload
                      className="mt-2"
                      name="category_banner"
                      accept="image/*"
                      customUpload
                      uploadHandler={handleCategoryBannerUpload}
                      mode="basic"
                      auto
                      chooseLabel="Upload Banner"
                    />
                    {getFormErrorMessage('category_banner')}
                  </div>

                  {/* <div className="field">
                    <label className="block">
                      <span>{t('Parent ID')}</span>
                    </label>
                    <InputText
                      placeholder={t('Enter Parent ID')}
                      id="parent_id"
                      name="parent_id"
                      value={formik.values.parent_id || ""}
                      onChange={formik.handleChange}
                    />
                  </div> */}
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
                  className="p-button-danger p-component mr-3"
                  disabled={CategoriesSubmit}
                />
                <Button
                  type="submit"
                  label={categoriesId ? `${t('Update Category')}` : `${t('Save & Next')}`}
                  className="p-button p-button-primary p-button-outlined mr-3"
                  disabled={CategoriesSubmit}
                  loading={CategoriesSubmit}
                  onClick={() => {
                    if (Object.keys(formik.errors).length !== 0) {
                      validationToast();
                    } else {
                      setIsSaveAndExit(false);
                    }
                    formik.handleSubmit();
                  }}
                />
                {!categoriesId && (
                  <Button
                    type="submit"
                    label={`${t('Save & Exit')}`}
                    className="p-button p-button-primary"
                    disabled={CategoriesSubmit}
                    loading={CategoriesSubmit}
                    onClick={() => {
                      if (Object.keys(formik.errors).length !== 0) {
                        validationToast();
                      } else {
                        setIsSaveAndExit(true);
                      }
                      formik.handleSubmit();
                    }}
                  />
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};



export { CategoriesSidebar };
