import React, {useCallback, useContext, useEffect, useState} from "react";
import {UpdateInfoContext} from "@/app/contexts/UpdateInfo";
import {formatTimeDifference} from "@/utils/time";
import styled from "styled-components";

const UPDATE_DELAY = 15000;

const UpdateStatusContainer = styled.div`
  display: flex;
  align-items: center;
  border-width: 1px;
  border-radius: 15px;
  padding: 10px 10px;
  background: white;
`;

// TODO: remove weird plain texts and use react-i18next throughout the app
// TODO: fix timer `~0ms` during first 15 seconds
export const UpdateStatus = (): React.ReactNode => {
    const { updateInfoVal } = useContext(UpdateInfoContext);
    const [lastUpdated, setLastUpdated] = useState('');
    const { lastFetchedTime } = updateInfoVal;

    const updateStatusValue = useCallback(() => {
        const formattedTimeDiff = formatTimeDifference(new Date(), lastFetchedTime);
        setLastUpdated(formattedTimeDiff);
    }, [lastFetchedTime]);

    useEffect(() => {
        updateStatusValue();

        const interval = setInterval(() => {
            updateStatusValue();
        }, UPDATE_DELAY);
        return () => {
            clearInterval(interval);
        };
    }, [lastFetchedTime, updateStatusValue]);

    return (
        <UpdateStatusContainer>
            Last updated&nbsp;<strong>{ `~${lastUpdated}` }</strong>&nbsp;ago
        </UpdateStatusContainer>
    );
};
