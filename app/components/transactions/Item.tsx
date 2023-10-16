import React from "react";
import {Transaction} from "@/types/transaction";
import styled from "styled-components";
import {stringToColorHex} from "@/utils/string";
import {Circle} from "@/app/components/transactions/Circle";

const TransactionItem = styled.div`
    display: flex;
    justify-content: space-between;
  
    .description {
      width: 12rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media (max-width: 600px) {
        width: 6rem;
      }
    }
  
    .generalInfoContainer {
      display: flex;
      gap: 15px;
      align-items: center;
    }
  
    .amountContainer {
      align-items: center;
      display: flex;
      gap: 20px;
    }
`;

export const Item = ({ transaction: {
    description, amount, pointAmount
} }: { transaction: Transaction }): React.ReactNode => (
    <TransactionItem>
        <div className="generalInfoContainer">
            <Circle color={stringToColorHex(description)} />
            <span className="description">{description}</span>
        </div>
        <div className="amountContainer">
            <span className="amount">{`$${amount}`}</span>
            &#8226;
            <span className="pointAmount">{`${pointAmount} ${pointAmount > 1 ? 'points' : 'point'}`}</span>
        </div>
    </TransactionItem>
);
