import { Outlet, useNavigate } from "react-router-dom";

import SideBar from "../../../components/SideBar";

export default function AdminBasePage() {

  return (
    <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
            <main className="px-10 py-12 h-full">
                <Outlet />
            </main>
        </div>
    </div>
  );
}
