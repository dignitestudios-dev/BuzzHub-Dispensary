import React from 'react'
import OrdersTable from '../../components/orders/OrdersTable'

const Orders = () => {
  return (
    <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-white">
      <h1 className="text-black text-3xl font-bold">Order Management</h1>
      
        <OrdersTable />
    </div>
  )
}

export default Orders
