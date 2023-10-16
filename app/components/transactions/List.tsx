import React from "react";
import {Transaction} from "@/types/transaction";
import {useFormattedTransactions} from "@/hooks/useFormattedTransactions";
import {GroupedItems} from "@/app/components/transactions/GroupedItems";

interface ListProps {
    data: Transaction[]
}

// Additional memoization and custom compare function is needed due to the `data` prop redundant updates
const compare = (prevProps: ListProps, nextProps: ListProps): boolean =>
    // first condition is added to stick to `Fail Fast` principle cause it's a cheaper operation
    prevProps.data.length === nextProps.data.length &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);

export const List = React.memo(({ data }: ListProps): React.ReactNode => {
    const {
        pendingTransactions = [],
        settledTransactions = []
    } = useFormattedTransactions(data);

    return (
        <div className="flex flex-col justify-between gap-6">
            {pendingTransactions.length !== 0
                && <GroupedItems key='pending-transactions' label="Pending" transactions={pendingTransactions} />
            }
            {settledTransactions.length !== 0
                && settledTransactions.map(([settledTrDate, trArr], idx) =>
                    <GroupedItems key={`${idx}_${settledTrDate}`} label={settledTrDate} transactions={trArr} />
                )
            }
        </div>
    );
}, compare);

// fixing some console errors
List.displayName = 'TransactionsList'
