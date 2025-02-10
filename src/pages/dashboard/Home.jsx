import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/dashboard/DashboardStats";
import OrdersTable from "../../components/orders/OrdersTable";
import ReviewSection from "../../components/dashboard/ReviewSection";
import DashboardOrders from "../../components/dashboard/DashboardOrders";

const Home = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-white">
        <h1 className="text-black text-3xl font-bold">Dashboard</h1>

        {/* Stats Section */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <DashboardStats />
        </div>
        {/* <h1 className="text-black text-3xl font-bold">Orders</h1>
        <div className="w-full flex flex-col lg:flex-row gap-6">

          <OrdersTable />
        </div> */}

        <h1 className="text-black text-3xl font-bold">Orders</h1>
        <div className="w-full flex flex-col lg:flex-row gap-6">

          <DashboardOrders />
        </div>

        {/* <h1 className="text-black text-3xl font-bold">Reviews</h1> */}

        <div className="w-full flex flex-col lg:flex-row gap-6">
          <ReviewSection />
        </div>

        
      
      </div>
    </>
  );
};

export default Home;
