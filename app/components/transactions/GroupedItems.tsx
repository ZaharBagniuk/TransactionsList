import React from "react";
import styled from "styled-components";
import {Transaction} from "@/types/transaction";
import {Item} from "@/app/components/transactions/Item";

const GroupedItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 15px;
  border-width: 2px;
  padding: 10px 10px;
  
  .itemsList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const GroupedItems = ({ label, transactions }: { label: string, transactions: Transaction[] }): React.ReactNode => (
    <GroupedItemsWrapper>
        <strong className='label'>{label}</strong>
        <div className="itemsList">
            {transactions && transactions.map(tr => <Item key={tr.id} transaction={tr}></Item>)}
        </div>
    </GroupedItemsWrapper>
);
