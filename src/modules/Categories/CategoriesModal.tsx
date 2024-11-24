import React, { useEffect } from "react";
import { useCategoriesHook } from ".";
import { useTranslation } from 'react-i18next';

type Props = {
  categoriesId?: number | null;
  setCategoriesId?: (id: number | null) => void;
};

const CategoriesModal = ({
  categoriesId = null,
  setCategoriesId = () => {}
}: Props) => {
  const {
    getSelectedCategoriesById,
    clearCategoriesDataHook,
    getCategoriesByIdFromStore,
  } = useCategoriesHook();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (categoriesId && getCategoriesByIdFromStore === null) {
      getSelectedCategoriesById(categoriesId);
    }

    return () => {
      if (categoriesId) {
        clearCategoriesDataHook();
        setCategoriesId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoriesByIdFromStore]);

  return (
    <>
      <p>Create your content here</p>
    </>
  );
};

export { CategoriesModal };