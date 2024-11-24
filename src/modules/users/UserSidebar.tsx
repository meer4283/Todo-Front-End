
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useGlobalHook } from "@/hooks";
import { FormSkeleton } from "../../component/Skeleton/FormSkeleton";
import { InputNumber } from "primereact/inputnumber";
import { useUserHook } from "@/hooks";
import { Dropdown } from "primereact/dropdown";
import { VALIDITY_TYPES } from "@/utils/constants";
import { useHttp } from "@/hooks/useHttp";
type Props = {
  userId?: number | null;
  setUserId?: (value: number | null) => void;
  setShowSidebar: (value: boolean | null | any) => void;
};
const USER = 3
const ADMIN = 2
const SUPER_ADMIN =1
const userTypes = [
  {
    label: "Super Admin",
    value: SUPER_ADMIN
  },
  {
    label: "Admin",
    value: ADMIN
  },
  {
    label: "User",
    value: USER
  }
]


const UserSidebar = (props: Props) => {
  const {
    saveForm,
    updateForm,
    UserLoading,
    UserSubmit,
    getSelectedUserById,
    clearUserDataHook,
    getUserByIdFromStore,
  } = useUserHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState(false);
  const [productsList, setProductsList] = useState({
    loading: false,
    list: [],
  });

  const [planList, setPlanList] = useState({
    loading: false,
    list: [],
  });

  const { userId, setUserId, setShowSidebar } = props;

  const { updateGlobalToast } = useGlobalHook();
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d; // "Tue Sep 29 2020 20:00:00 GMT-0400 (Eastern Daylight Time)"
  };

  useEffect(() => {
    // CLEARING DATA IN ADD NEW
    if (!userId) {
      clearUserDataHook();
    }
    if (userId && getUserByIdFromStore === null) {
      getSelectedUserById(userId);
    } else {
      formik.setFieldValue(
        "name",
        getUserByIdFromStore?.name ? getUserByIdFromStore?.name : ""
      );

      formik.setFieldValue(
        "email",
        getUserByIdFromStore?.email ? getUserByIdFromStore?.email : ""
      );

      formik.setFieldValue(
        "user_type",
        getUserByIdFromStore?.user_type ? getUserByIdFromStore?.user_type : ""
      );

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserByIdFromStore]);


  const formik: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      user_type: USER
    },
    validate: (data: any) => {
      const errors: any = {};

      if (!data.name) {
        errors.name = `${"Name is required."}`;
      }

      if (!data.email) {
        errors.email = `${"Email is required."}`;
      }

      if (!data.password) {
        errors.password = `${"Password is required."}`;
      }

      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        user_type: data?.user_type,  //general user
      };

      if (userId) {
        updateForm(
          userId,
          formPostData,
          formik.resetForm,
          isSaveAndExit,
          setShowSidebar
        );
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
        <small className="block text-red-500 font-semibold">
          {formik.errors[name]}
        </small>
      )
    );
  };

  const validationToast = () => {
    updateGlobalToast({
      showToast: true,
      toastMessage: "Error! Please fill in all the fields with * before them.",
      toastDetail: null,
      toastType: "error",
    });
  };

  return (
    <>
      <h1 className="text-2xl border-bottom-1 border-gray-200 pb-2">
        {userId ? `${"Edit User"}` : `${"Add New User"}`}
      </h1>
      <div style={{ padding: 30 }}>
        {!UserLoading ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid p-fluid">
              <div className="col-12">
                <div className="scroll-height-300 mb-5">

                  <div className="field">
                    <label className="block">
                      <span className="text-red-500">*</span>&nbsp;
                      {"Name"}
                    </label>
                    <InputText
                      placeholder={"Enter Name"}
                      id="name"
                      name="name"
                      value={formik.values.name || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("name"),
                      })}
                    />
                    {getFormErrorMessage("name")}
                  </div>
                  <div className="field">
                    <label className="block">
                      <span className="text-red-500">*</span>&nbsp;
                      {"User Type"}
                    </label>
                    <Dropdown
                      placeholder={"Enter Email"}
                      id="user_type"
                      name="user_type"
                      options={userTypes}
                      value={formik.values.user_type || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("user_type"),
                      })}
                    />
                    {getFormErrorMessage("user_type")}
                  </div>
                  <div className="field">
                    <label className="block">
                      <span className="text-red-500">*</span>&nbsp;
                      {"Email"}
                    </label>
                    <InputText
                      placeholder={"Enter Email"}
                      id="email"
                      name="email"
                      value={formik.values.email || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("email"),
                      })}
                      type="email"
                    />
                    {getFormErrorMessage("email")}
                  </div>
                  <div className="field">
                    <label className="block">
                      <span className="text-red-500">*</span>&nbsp;
                      {"Password"}
                    </label>
                    <InputText
                      placeholder={"Enter Password"}
                      id="password"
                      name="password"
                      value={formik.values.password || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("password"),
                      })}
                    // minFractionDigits={1}
                    // maxFractionDigits={2}
                    />
                    {getFormErrorMessage("password")}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  text-right">
              <div className="text-right">
                <Button
                  text
                  onClick={() => {
                    setShowSidebar(false);
                    clearUserDataHook();
                  }}
                  icon="pi pi-times"
                  type="button"
                  label={"Cancel"}
                  className=" p-button-danger p-component mr-3"
                  disabled={UserSubmit}
                />
                <Button
                  type="submit"
                  label={
                    userId
                      ? `${"Update User"}`
                      : `${"Create User"}`
                  }
                  className="mt-2 p-button p-button-primary p-button-outlined"
                  disabled={UserSubmit}
                  loading={UserSubmit}
                />
              </div>
            </div>
          </form>
        ) : (
          <FormSkeleton />
        )}
      </div>
    </>
  );
};

export { UserSidebar };
