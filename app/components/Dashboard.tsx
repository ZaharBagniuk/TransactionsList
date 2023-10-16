import React, {useContext, useEffect} from "react";
import {useTransactions} from "@/hooks/useTransactions";
import {Header} from "@/app/components/updateBar/Header";
import {List} from "@/app/components/transactions/List";
import {UpdateInfoContext} from "@/app/contexts/UpdateInfo";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 37.5rem;
  gap: 1.125rem;
  @media (max-width: 600px) {
    width: 18.75rem;
    font-size: 12px;
  }
`;

export const Dashboard = (): React.ReactNode => {
    const {
        // TODO: fix: data is updated four times per one `Load next day` action
        data,
        loading,
        fetchNextDay,
        currentDay,
        lastFetchedTime
    } = useTransactions();
    const { changeUpdateInfo } = useContext(UpdateInfoContext);

    useEffect(() => {
        changeUpdateInfo({
            loading,
            currentDay,
            fetchNextDay,
            lastFetchedTime
        });
    }, [loading, lastFetchedTime, currentDay, changeUpdateInfo, fetchNextDay]);

    return (
        <DashboardContainer>
            <Header />
            <List data={data} />
        </DashboardContainer>
    );
};
