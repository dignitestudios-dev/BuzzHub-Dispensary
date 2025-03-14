import React from 'react'
import OrderTrackingTable from '../../components/ordertracking/OrderTrackingTable'

const TrackOrders = () => {
  return (
    <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-white">
      <h1 className="text-black text-3xl font-bold">Order Tracking</h1>
      
        <OrderTrackingTable />
    </div>
  )
}

export default TrackOrders;
