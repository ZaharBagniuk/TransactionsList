import React, {useContext} from "react";
import {UpdateInfoContext} from "@/app/contexts/UpdateInfo";
import {formatCurrentDay} from "@/utils/time";

export const UpdateDate = (): React.ReactNode => {
    const { updateInfoVal } = useContext(UpdateInfoContext);
    const { loading, currentDay, fetchNextDay } = updateInfoVal;

    return (
        <div className="flex flex-col gap-1">
            <strong>
                { formatCurrentDay(currentDay) }
            </strong>
            {
                loading ?
                    <div className="flex justify-center">Loading ...</div> :
                    (
                        <button type="button" onClick={fetchNextDay}>
                            Load next day
                        </button>
                    )
            }
        </div>
    );
};
