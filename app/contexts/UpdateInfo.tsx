import React, {createContext, useState} from "react";

interface UpdateInfo {
    loading: boolean,
    currentDay: string,
    fetchNextDay: () => {},
    lastFetchedTime: Date,
}

const initialUpdateInfoState = {
    loading: false,
    currentDay: '',
    fetchNextDay: () => {},
    lastFetchedTime: new Date()
};

export const UpdateInfoContext = createContext({
    updateInfoVal: initialUpdateInfoState,
    changeUpdateInfo: (_newState: Partial<UpdateInfo>) => {}
});

export const UpdateInfoProvider = ({children}: { children: React.ReactNode }) => {
    const changeUpdateInfo = (newState: Partial<UpdateInfo>) =>
        setUpdateInfo((prevState) => ({
            changeUpdateInfo: prevState.changeUpdateInfo,
            updateInfoVal: {
                ...prevState.updateInfoVal,
                ...newState,
            }
        }));

    const [updateInfo, setUpdateInfo] = useState({
        updateInfoVal: initialUpdateInfoState,
        changeUpdateInfo
    });

    return (
        <UpdateInfoContext.Provider value={updateInfo}>
            {children}
        </UpdateInfoContext.Provider>
    );
};
