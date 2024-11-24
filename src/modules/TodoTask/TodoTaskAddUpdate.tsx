import { useEffect, useState } from "react";
import { useTodoTaskHook } from ".";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import { FormSkeleton } from "@/component/Skeleton/FormSkeleton";
import { useGlobalHook } from "@/hooks";
import ColorCircle from "@/component/ColorCircle";
import { useRouter } from "next/navigation";

type Props = {
  todoTaskId?: number | null,
  setTodoTaskId?: (value: number | null) => void,
}

const TodoTaskAddUpdate = (props: Props) => {
  const router = useRouter()

  const {
    saveForm,
    updateForm,
    TodoTaskLoading,
    TodoTaskSubmit,
    getSelectedTodoTaskById,
    clearTodoTaskDataHook,
    getTodoTaskByIdFromStore,
  } = useTodoTaskHook();
  const { updateGlobalToast } = useGlobalHook();
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const { todoTaskId = null, setTodoTaskId = () => { }, } = props;
  const { t } = useTranslation();

  const colors = [
    "red-500",
    "orange-500",
    "yellow-500",
    "green-500",
    "blue-500",
    "purple-500",
    "pink-500",
    "brown-500",
  ];

  useEffect(() => {
    if (todoTaskId && getTodoTaskByIdFromStore === null) {
      getSelectedTodoTaskById(todoTaskId);
    } else {
      formik.setFieldValue(
        "title",
        getTodoTaskByIdFromStore?.title
          ? getTodoTaskByIdFromStore?.title
          : ""
      );
      formik.setFieldValue(
        "color",
        getTodoTaskByIdFromStore?.color
          ? getTodoTaskByIdFromStore?.color
          : ""
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTodoTaskByIdFromStore]);

  const validationToast = () => {
    updateGlobalToast({
      showToast: true,
      toastMessage: "Error! Please fill in all the fields with * before them.",
      toastDetail: null,
      toastType: "error",
    });
  };

  const validate = (data: any) => {
    const errors: any = {};
    if (!data.title) {
      errors.title = `${t("Title is required.")}`;
    }
    if (!data.color) {
      errors.color = `${t("Please select a color.")}`;
    }
    return errors;
  }

  const formik: any = useFormik({
    initialValues: {
      title: "",
      color: "",
    },
    validate: validate,
    onSubmit: (data: any) => {


      if (todoTaskId) {
        updateForm(todoTaskId, data, () => {
          formik.resetForm()
          router.back()

        }, isSaveAndExit, () => { });
      } else {
        saveForm(data, () => {
          formik.resetForm()
          router.back()

        }, isSaveAndExit, () => { });
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
        {TodoTaskLoading ? (
          <FormSkeleton />
        ) : (

          <form onSubmit={formik.handleSubmit}>
            <div className="grid p-fluid">
              <div className="col-12">
                <div className="scroll-height-300 mb-5">


                  <div className="field">
                    <label htmlFor="title" className="block text-sm mb-2 text-gray-300">
                      {t("Title")}
                    </label>
                    <InputText
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      placeholder={t("Ex. Brush your teeth")}

                      invalid={isFormFieldValid("title") || false}
                    />
                    {getFormErrorMessage("title")}
                  </div>

                  {/* Color Selector */}
                  <div className="field">
                    <label className="block text-sm mb-2 text-gray-300">
                      {t("Color")}
                    </label>
                    <div className="flex gap-3">
                      {colors.map((color, index) => (
                        <ColorCircle key={color} color={color} index={index} selectedColor={formik.values.color} onClick={() => {
                          formik.setFieldValue("color", color);
                        }} />

                      ))}
                    </div>
                    {getFormErrorMessage("color")}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full ">


              <Button
                type="submit"
                label={todoTaskId ? `${'Save'}` : `${'Add Task'}`}
                className="p-button p-button-primary w-full text-white"
                disabled={TodoTaskSubmit}
                loading={TodoTaskSubmit}
                onClick={() => {
                  if (Object.keys(validate(formik.values)).length > 0) {
                    validationToast();

                  } else {
                    setIsSaveAndExit(true)
                  }
                  formik.handleSubmit();
                }}
              />

            </div>
          </form>
        )}
      </div>
    </>
  );
};

export { TodoTaskAddUpdate };
