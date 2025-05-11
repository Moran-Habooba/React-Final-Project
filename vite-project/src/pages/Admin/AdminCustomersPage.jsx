import React, { useState } from "react";
import { useSelector } from "react-redux";
import SmartTable from "../../Utils/SmartTable";

const AdminCustomersPage = () => {
  const users = useSelector((state) => state.auth.users);
  const orders = useSelector((state) => state.orders.orders);

  const customers = users.filter((user) => user.role === "customer");
  const [openUserId, setOpenUserId] = useState(null);

  const rows = customers.map((customer) => {
    const customerOrders = orders.filter(
      (order) => order.userId === customer.id
    );

    return {
      ...customer,
      orders: customerOrders,
      toggleOrders: () =>
        setOpenUserId((prev) => (prev === customer.id ? null : customer.id)),
      isOpen: openUserId === customer.id,
    };
  });

  return (
    <div className="container mt-5">
      <h2>Customers List</h2>

      <SmartTable
        data={rows}
        columns={[
          { header: "First Name", accessor: "firstName" },
          { header: "Last Name", accessor: "lastName" },
          { header: "User Name", accessor: "userName" },
          {
            header: "Joined At",
            render: (row) => new Date(row.joinedAt).toLocaleDateString("en-GB"),
          },
          {
            header: "Orders",
            render: (row) => (
              <button
                className="btn btn-info btn-sm"
                onClick={row.toggleOrders}
              >
                {row.isOpen ? "Hide Orders" : "View Orders"}
              </button>
            ),
          },
        ]}
      />

      {openUserId && (
        <div className="mt-4">
          {rows
            .filter((row) => row.id === openUserId)
            .map((row) =>
              row.orders.length === 0 ? (
                <p key={row.id}>No orders found.</p>
              ) : (
                row.orders.map((order) => (
                  <div key={order.orderId} className="mb-4 border p-2">
                    <strong>
                      {order.date} – {order.items.length} items – Total:{" "}
                      {order.totalPrice.toLocaleString()} ₪
                    </strong>

                    <table className="table table-sm table-bordered mt-2">
                      <thead className="table-light">
                        <tr>
                          <th>Product Name</th>
                          <th>Qty</th>
                          <th>Price per unit</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, i) => (
                          <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toLocaleString()} ₪</td>
                            <td>
                              {(item.quantity * item.price).toLocaleString()} ₪
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )
            )}
        </div>
      )}
    </div>
  );
};

export default AdminCustomersPage;
