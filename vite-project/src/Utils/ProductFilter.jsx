import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductFilter = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  allCategories,
}) => {
  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setMinPrice(0);
    setMaxPrice(5000);
  };

  return (
    <div className="mb-4 row">
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {allCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">
          Price: {minPrice}₪ - {maxPrice}₪
        </label>

        <Slider
          range
          min={0}
          max={5000}
          step={50}
          value={[minPrice, maxPrice]}
          onChange={([newMin, newMax]) => {
            setMinPrice(newMin);
            setMaxPrice(newMax);
          }}
        />
      </div>

      <button
        className="btn btn-success btn-sm w-auto"
        onClick={handleClearFilters}
      >
        Clear
      </button>
    </div>
  );
};

export default ProductFilter;
