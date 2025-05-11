import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import SmartTable from "../../Utils/SmartTable";

const MyOrdersPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allOrders = useSelector((state) => state.orders.orders);

  const myOrders = useMemo(() => {
    if (!currentUser) return [];
    return allOrders.filter((order) => order.userId === currentUser.id);
  }, [allOrders, currentUser]);

  const rows = myOrders.flatMap((order) =>
    order.items.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
      totalPrice: item.quantity * item.price,
      orderDate: order.date,
    }))
  );

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>

      <SmartTable
        data={rows}
        columns={[
          { header: "Product Name", accessor: "productName" },
          { header: "Quantity", accessor: "quantity" },
          {
            header: "Total Price",
            render: (row) => `${row.totalPrice.toLocaleString()} ₪`,
          },
          { header: "Order Date", accessor: "orderDate" },
        ]}
      />
    </div>
  );
};

export default MyOrdersPage;
