import { useEffect, useState } from "react";
import { useAdminUserHook } from ".";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import { useGlobalHook } from "@/hooks";
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";

type Props = {
  adminUserId: number | null;
  setAdminUserId: (value: number | null) => void;
  setShowSidebar: (value: boolean) => void;
};

const AdminUserSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    AdminUserLoading,
    AdminUserSubmit,
    getSelectedAdminUserById,
    clearAdminUserDataHook,
    getAdminUserByIdFromStore,
  } = useAdminUserHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { adminUserId = null, setAdminUserId = () => {}, setShowSidebar = () => {} } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (adminUserId && getAdminUserByIdFromStore === null) {
      getSelectedAdminUserById(adminUserId);
    } else {
      formik.setFieldValue("admin_user_title", getAdminUserByIdFromStore?.admin_user_title || "");
      formik.setFieldValue("login_name", getAdminUserByIdFromStore?.login_name || "");
      formik.setFieldValue("user_name", getAdminUserByIdFromStore?.user_name || "");
      formik.setFieldValue("user_type", getAdminUserByIdFromStore?.user_type || "");
      formik.setFieldValue("email", getAdminUserByIdFromStore?.email || "");
      formik.setFieldValue("phonenumber", getAdminUserByIdFromStore?.phonenumber || "");
      formik.setFieldValue("password", getAdminUserByIdFromStore?.password || "");
    }

    return () => {
      if (adminUserId) {
        clearAdminUserDataHook();
        setAdminUserId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAdminUserByIdFromStore]);

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
      admin_user_title: "",
      login_name: "",
      user_name: "",
      user_type: "",
      email: "",
      phonenumber: "",
      password: "",
    },
    validate: (data: any) => {
      const errors: any = {};


      if (!data.login_name) {
        errors.login_name = `${t('Login Name is required.')}`;
      }
      if (!data.user_name) {
        errors.user_name = `${t('User Name is required.')}`;
      }
      if (!data.email) {
        errors.email = `${t('Email is required.')}`;
      }
      if (!data.password) {
        errors.password = `${t('Password is required.')}`;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = { ...data };

      if (adminUserId) {
        updateForm(adminUserId, formPostData, formik.resetForm, isSaveAndExit, setShowSidebar);
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

  return (
    <div className="card pb-8">
      <div className="text-3xl font-medium text-900 mb-3">
        {adminUserId ? `${t('Edit Admin User')}` : `${t('Add New Admin User')}`}
      </div>
   
      {AdminUserLoading ? (
        <FormSkeleton />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid p-fluid pt-5">

            <div className="col-6 field">
              <label>
                <span className="must-required">*</span>&nbsp;{t('Login Name')}
              </label>
              <InputText
                id="login_name"
                name="login_name"
                value={formik.values.login_name || ""}
                onChange={formik.handleChange}
                className={classNames({ invalid: isFormFieldValid("login_name") })}
              />
              {getFormErrorMessage("login_name")}
            </div>

            <div className="col-6 field">
              <label>
                <span className="must-required">*</span>&nbsp;{t('User Name')}
              </label>
              <InputText
                id="user_name"
                name="user_name"
                value={formik.values.user_name || ""}
                onChange={formik.handleChange}
                className={classNames({ invalid: isFormFieldValid("user_name") })}
              />
              {getFormErrorMessage("user_name")}
            </div>



            <div className="col-12 field">
              <label>
                <span className="must-required">*</span>&nbsp;{t('Email')}
              </label>
              <InputText
                id="email"
                name="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                className={classNames({ invalid: isFormFieldValid("email") })}
              />
              {getFormErrorMessage("email")}
            </div>

            <div className="col-12 field">
              <label>{t('Phone Number')}</label>
              <InputText
                id="phonenumber"
                name="phonenumber"
                value={formik.values.phonenumber || ""}
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 field">
              <label>
                <span className="must-required">*</span>&nbsp;{t('Password')}
              </label>
              <InputText
                type="password"
                id="password"
                name="password"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                className={classNames({ invalid: isFormFieldValid("password") })}
              />
              {getFormErrorMessage("password")}
            </div>
          </div>

          <div className="w-full px-4 py-3 surface-100 text-right sidebar-footer">
            <Button
              text
              onClick={() => setShowSidebar(false)}
              icon="pi pi-times"
              type="button"
              label={t('Cancel')}
              className="p-button-danger p-component mr-3"
              disabled={AdminUserSubmit}
            />
            <Button
              type="submit"
              label={adminUserId ? `${t('Update Admin User')}` : `${t('Save & Next')}`}
              className="p-button p-button-primary p-button-outlined mr-3"
              disabled={AdminUserSubmit}
              loading={AdminUserSubmit}
              onClick={() => {
                if (Object.keys(formik.errors).length !== 0) {
                  validationToast();
                } else {
                  setIsSaveAndExit(false);
                }
                formik.handleSubmit();
              }}
            />
            {!adminUserId && (
              <Button
                type="submit"
                label={t('Save & Exit')}
                className="p-button p-button-primary"
                disabled={AdminUserSubmit}
                loading={AdminUserSubmit}
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
        </form>
      )}
    </div>
  );
};

export  {AdminUserSidebar};
