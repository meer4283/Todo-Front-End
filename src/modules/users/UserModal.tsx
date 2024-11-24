
import React, { useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useUserHook } from "@/hooks/UserHook";

type Props = {
  userId: number | null;
  setUserId: (id: number | null) => void;
};
const UserModal = (props: Props) => {
  const {
    getSelectedUserById,
    clearUserDataHook,
    getUserByIdFromStore,
  } = useUserHook();

  const { userId, setUserId } = props;
  
  useEffect(() => {
    if (userId && getUserByIdFromStore === null) {
      getSelectedUserById(userId);
    }

    return () => {
      if (userId) {
        clearUserDataHook();
        setUserId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserByIdFromStore]);

  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <TabView>
              <TabPanel header="Employee Details"></TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};


export { UserModal };
