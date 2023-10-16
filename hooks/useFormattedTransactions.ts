import {Transaction, TransactionType} from "@/types/transaction";
import {useMemo} from "react";
import _ from "lodash";
import {DateTime} from "luxon";

interface FormattedTransactionsObj {
    [key: string]: Transaction[]
}

type FormattedTransactionsArrays = [string, Transaction[]];

// TODO: Configure ESLint rules to avoid manual formatting
// TODO: First and foremost need is to cover this hook file with tests. Too much pain maintaining and debugging
const sortAndConvertToArray =
    (formattedTransactionsObj: FormattedTransactionsObj): FormattedTransactionsArrays[] =>
    _.chain(formattedTransactionsObj)
    .toPairs()
    .sortBy(([, values]) => DateTime.fromISO(values[0].timestamp.toString()))
    .reverse()
    .value();

export const useFormattedTransactions =
    (transactions: Transaction[]): {
    settledTransactions: FormattedTransactionsArrays[];
    pendingTransactions: Transaction[]
} => {
    const pendingTransactions: Transaction[] = useMemo(() => _.uniqBy(transactions, 'id')
        .filter(tr => tr.type === TransactionType.Authorization)
        .filter(uniqTr => !transactions.find(tr => tr.id === uniqTr.id && tr.type !== uniqTr.type)), [transactions]);
    const rawSettledTransactions: Transaction[] = useMemo(
        () => transactions.filter(tr => tr.type === TransactionType.Settlement),
        [transactions]
    );
    const groupedSettledTransactions = useMemo(
        () => rawSettledTransactions.reduce((result: FormattedTransactionsObj, obj) => {
        const dateKey = obj.timestamp.toISODate() || '';
        if (!result[dateKey]) {
            result[dateKey] = [];
        }
        result[dateKey].push(obj);
        return result;
    }, {}), [rawSettledTransactions]);

    return {
        pendingTransactions,
        settledTransactions: sortAndConvertToArray(groupedSettledTransactions)
    };
};
