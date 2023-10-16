import React from "react";
import {UpdateStatus} from "@/app/components/updateBar/UpdateStatus";
import {UpdateDate} from "@/app/components/updateBar/UpdateDate";

export const Header = (): React.ReactNode => (
    <div className="flex justify-between">
        <UpdateStatus />
        <UpdateDate />
    </div>
);
