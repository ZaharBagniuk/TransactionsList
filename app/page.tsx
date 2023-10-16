'use client'

import {UpdateInfoProvider} from "@/app/contexts/UpdateInfo";
import {Dashboard} from "@/app/components/Dashboard";

export default function Home() {
  return (
    <main
        className="flex flex-col items-center p-24"
    >
      <UpdateInfoProvider>
        <Dashboard />
      </UpdateInfoProvider>
    </main>
  );
}
