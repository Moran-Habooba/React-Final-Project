import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminStatisticsPage = () => {
  const users = useSelector((state) => state.auth.users);
  const orders = useSelector((state) => state.orders.orders);
  const products = useSelector((state) => state.products.products);

  const [selectedUserId, setSelectedUserId] = useState("");

  const generateColors = (count) => {
    const usedHues = new Set();
    const colors = [];

    while (colors.length < count) {
      const hue = Math.floor(Math.random() * 360);
      if (!usedHues.has(hue)) {
        usedHues.add(hue);
        colors.push(`hsl(${hue}, 70%, 60%)`);
      }
    }

    return colors;
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 20,
          usePointStyle: true,
        },
        onClick: null,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 20,
        },
        formatter: (value) => value,
      },
    },
    layout: {
      padding: 10,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const productUnitsSold = products.map((product) => {
    const totalSold = orders
      .flatMap((order) => order.items)
      .filter((item) => item.productId === product.productId)
      .reduce((sum, item) => sum + item.quantity, 0);
    return totalSold;
  });

  const hasSales = productUnitsSold.some((qty) => qty > 0);

  const pieData = hasSales
    ? {
        labels: products.map(
          (p, idx) => `${p.name} (${productUnitsSold[idx]})`
        ),
        datasets: [
          {
            data: productUnitsSold,
            backgroundColor: generateColors(products.length),
          },
        ],
      }
    : {
        labels: ["No Sales Yet"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["lightgray"],
          },
        ],
      };

  const selectedOrders =
    selectedUserId === ""
      ? orders
      : orders.filter((order) => order.userId === selectedUserId);

  const productQuantities = products.map((product) => {
    const totalQty = selectedOrders
      .flatMap((order) => order.items)
      .filter((item) => item.productId === product.productId)
      .reduce((sum, item) => sum + item.quantity, 0);

    return totalQty;
  });

  const productWithQuantities = products.map((product, index) => ({
    name: product.name,
    quantity: productQuantities[index],
  }));

  productWithQuantities.sort((a, b) => a.quantity - b.quantity);

  const barData = {
    labels: productWithQuantities.map((p) => p.name),
    datasets: [
      {
        label: "QTY",
        data: productWithQuantities.map((p) => p.quantity),
        backgroundColor: generateColors(productWithQuantities.length),
      },
    ],
  };

  return (
    <>
      <div
        style={{ width: "400px", height: "400px", margin: "auto" }}
        className="container mt-4 "
      >
        <h2> Products Sold - Pie Chart</h2>
        <br />
        <Pie data={pieData} options={options} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{ width: "700px", height: "700px", margin: "auto" }}
        className="container mt-5"
      >
        <h2>📦 Products Purchased per Customer</h2>
        <select
          className="form-select my-3"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">All Customers</option>
          {users
            .filter((u) => u.role === "customer")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
        </select>

        <Bar data={barData} options={options} />
      </div>
    </>
  );
};

export default AdminStatisticsPage;
