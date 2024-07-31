import { Outlet } from "react-router-dom";

import BottomNavigation from "@/components/BottomNavigation";
export default function HomeLayout() {
  return (
    <>
      {/* Add padding-top to ensure content doesn't overlap with Header */}
      <div className=" pb-16 hide-scrollbar">
        {" "}
        {/* Adjust the padding-top based on Header height */}
        <Outlet />
      </div>
      <BottomNavigation />
</>
  );
}
