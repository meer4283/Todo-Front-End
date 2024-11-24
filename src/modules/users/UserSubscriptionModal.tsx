
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useUserHook, useGlobalHook, useHttp } from "@/hooks";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

type Props = {
  userId: number | null;
  setShowUserSubscription: (id: boolean) => void;
  showUserSubscription: boolean
};
const UserSubscriptionModal = (props: Props) => {
  const {
    getSelectedUserById,
    clearUserDataHook,
    getUserByIdFromStore,
    userSubscribe
  } = useUserHook();
  const { userId, setShowUserSubscription } = props;
  const { updateGlobalToast } = useGlobalHook();

  console.log("userId", userId);
  const [planList, setPlanList] = useState({
    loading: false,
    list: []
  })
  const fetchPlans = async (parent_id: number | null = null) => {

    try {
      setPlanList(prev => ({ ...prev, loading: true }));

      const db = new useHttp();
      const response: any = await db.get(`/product-plans/all/fetch`);
      const planListData: any = response.data.data;

      setPlanList(prev => ({ ...prev, list: planListData, loading: false }));

    } catch (error) {
      console.error('Error fetching products:', error);
      setPlanList(prev => ({ ...prev, loading: false }));
    }

  };
  useEffect(() => {
    fetchPlans(null);

    return () => {

    }
  }, [])

  useEffect(() => {
    if (userId && getUserByIdFromStore === null) {
      getSelectedUserById(userId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserByIdFromStore]);
  const formik: any = useFormik({
    initialValues: {
      plan: "",
    },
    validate: (data: any) => {
      const errors: any = {};

      if (!data.plan) {
        errors.plan = `${"Title is required."}`;
      }

      return errors;
    },
    onSubmit: (data: any) => {
      const formPostData = {
        product_plan_id: data?.plan?.product_plan_id,
        user_id: userId
      };
      userSubscribe(formPostData, formik.resetForm)

    },
  });

  const isFormFieldValid = (name: any) => {
    return !!(formik.touched[name] && formik.errors[name]);
  };
  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name) && (
        <small className="block text-red-500 font-semibold">{formik.errors[name]}</small>
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
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <TabView>
              <TabPanel header="New Subscription">
                <form onSubmit={formik.handleSubmit}>

                  <div className="field p-fluid">
                    <label>Plan</label>
                    <Dropdown
                      filter
                      placeholder={"Select Plan"}
                      id="plan"
                      name="plan"

                      options={planList.list}
                      optionLabel="title"
                      valueTemplate={(e) => <>{e?.title} | {e?.product?.name}</>}
                      itemTemplate={(e) => <>{e?.title} | {e?.product?.name}</>}
                      value={formik.values.plan || ""}
                      onChange={formik.handleChange}
                      className={classNames({
                        invalid: isFormFieldValid("plan"),
                      })}
                    />
                    {getFormErrorMessage("plan")}
                  </div>
                  <Button
                    type="submit"
                    label={"Subscribe"}
                    className="mt-2 p-button p-button-primary p-button-outlined"
                    disabled={planList.loading}
                    loading={planList.loading}
                  />
                </form>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};


export { UserSubscriptionModal };
