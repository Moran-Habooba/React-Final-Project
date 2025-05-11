import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SmartTable from "../../Utils/SmartTable";

const AdminCategoriesPage = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedCategory, setEditedCategory] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      dispatch({ type: "ADD_CATEGORY", payload: newCategory.trim() });
      setNewCategory("");
    }
  };

  const handleDelete = (index) => {
    dispatch({ type: "DELETE_CATEGORY", payload: index });
  };

  const handleUpdate = (index) => {
    if (editIndex === index) {
      dispatch({
        type: "UPDATE_CATEGORY",
        payload: { index, name: editedCategory },
      });
      setEditIndex(null);
      setEditedCategory("");
    } else {
      setEditIndex(index);
      setEditedCategory(categories[index]);
    }
  };
  const categoryData = categories.map((cat) => ({ name: cat }));

  return (
    <div className="container mt-4">
      <h2>Manage Categories</h2>
      <br />
      <br />
      <div className="input-group mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAdd}>
          Add
        </button>
      </div>

      <SmartTable
        data={categoryData}
        columns={[
          {
            header: "Category Name",
            render: (row, i) =>
              editIndex === i ? (
                <input
                  className="form-control"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
              ) : (
                row.name
              ),
          },
          {
            header: "Actions",
            render: (_, i) => (
              <>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleUpdate(i)}
                >
                  {editIndex === i ? "Save" : "Update"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminCategoriesPage;
