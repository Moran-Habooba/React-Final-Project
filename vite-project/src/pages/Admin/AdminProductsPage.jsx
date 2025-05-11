import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SmartTable from "../../Utils/SmartTable";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const orders = useSelector((state) => state.orders.orders);
  const users = useSelector((state) => state.auth.users);

  const [saveMessages, setSaveMessages] = useState({});
  const [editedProducts, setEditedProducts] = useState(
    products.map((p) => ({ ...p }))
  );

  const handleChange = (index, field, value) => {
    if ((field === "price" || field === "quantity") && value < 0) return;

    const updated = [...editedProducts];
    updated[index][field] = value;
    setEditedProducts(updated);
  };

  const handleSave = (product) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: product });

    setSaveMessages((prev) => ({
      ...prev,
      [product.productId]: "saved",
    }));

    setTimeout(() => {
      setSaveMessages((prev) => ({
        ...prev,
        [product.productId]: null,
      }));
    }, 1500);
  };

  const handleDelete = (productId) => {
    setEditedProducts((prev) =>
      prev.map((p) =>
        p.productId === productId ? { ...p, isDeleted: true } : p
      )
    );

    setSaveMessages((prev) => ({
      ...prev,
      [productId]: "deleted",
    }));

    setTimeout(() => {
      dispatch({ type: "DELETE_PRODUCT", payload: productId });
      setEditedProducts((prev) =>
        prev.filter((p) => p.productId !== productId)
      );
      setSaveMessages((prev) => ({
        ...prev,
        [productId]: null,
      }));
    }, 1500);
  };

  const handleAddNewProduct = () => {
    const newProduct = {
      productId: uuidv4(),
      name: "",
      price: 0,
      category: "",
      image: "",
      quantity: 0,
      unitsSold: 0,
      description: "",
    };
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    setEditedProducts((prev) => [...prev, newProduct]);
  };

  const rows = editedProducts.map((product, index) => {
    const buyers = orders
      .filter((order) =>
        order.items.some((item) => item.productId === product.productId)
      )
      .flatMap((order) =>
        order.items
          .filter((item) => item.productId === product.productId)
          .map((item) => ({
            name:
              users.find((u) => u.id === order.userId)?.firstName || "Unknown",
            quantity: item.quantity,
            date: order.date,
          }))
      );

    return {
      ...product,
      buyers,
      saveButton: () => handleSave(product),
      deleteButton: () => handleDelete(product.productId),
      showSuccess: saveMessages[product.productId],
      onChange: (field, value) => handleChange(index, field, value),
    };
  });

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>
      <SmartTable
        data={rows}
        columns={[
          {
            header: "Title",
            render: (row) => (
              <input
                className="form-control"
                value={row.name}
                onChange={(e) => row.onChange("name", e.target.value)}
              />
            ),
          },
          {
            header: "Category",
            render: (row) => (
              <select
                className="form-select"
                value={row.category}
                onChange={(e) => row.onChange("category", e.target.value)}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ),
          },
          {
            header: "Price",
            render: (row) => (
              <input
                className="form-control"
                type="number"
                value={row.price}
                onChange={(e) => row.onChange("price", +e.target.value)}
              />
            ),
          },
          {
            header: "Image",
            render: (row) => (
              <>
                <input
                  className="form-control mb-2"
                  value={row.image}
                  onChange={(e) => row.onChange("image", e.target.value)}
                />
                {row.image && (
                  <img
                    src={row.image}
                    alt={row.name}
                    style={{ width: "80px" }}
                  />
                )}
              </>
            ),
          },
          {
            header: "Quantity",
            render: (row) => (
              <input
                className="form-control"
                type="number"
                value={row.quantity}
                onChange={(e) => row.onChange("quantity", +e.target.value)}
              />
            ),
          },
          {
            header: "Sold",
            accessor: "unitsSold",
          },
          {
            header: "Buyers",
            render: (row) => (
              <ul className="list-unstyled">
                {(row.buyers || []).map((b, i) => (
                  <li key={i}>
                    {b.name} ({b.quantity}) - {b.date}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            header: "Description",
            render: (row) => (
              <textarea
                className="form-control"
                value={row.description}
                onChange={(e) => row.onChange("description", e.target.value)}
              />
            ),
          },

          {
            header: "Actions",
            render: (row) => (
              <>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={row.saveButton}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={row.deleteButton}
                >
                  Delete
                </button>
                {row.showSuccess === "saved" && (
                  <div className="text-success small mt-1">
                    Changes saved ✅
                  </div>
                )}

                {row.showSuccess === "deleted" && (
                  <div className="text-danger small mt-1">
                    Product deleted ❌
                  </div>
                )}
              </>
            ),
          },
        ]}
      />

      <button className="btn btn-primary mt-3" onClick={handleAddNewProduct}>
        Add New Product
      </button>
    </div>
  );
};

export default AdminProductsPage;
