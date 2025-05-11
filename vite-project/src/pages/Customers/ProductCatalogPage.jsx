import React from "react";
import Cart from "../../components/Cart";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProductFilter from "../../Utils/ProductFilter";

const ProductCatalogPage = () => {
  const products = useSelector((state) => state.products.products);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const rawCategories = useSelector((state) => state.categories.categories);
  const allCategories = ["All", ...new Set(rawCategories)];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesTitle = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMinPrice = product.price >= minPrice;
    const matchesMaxPrice = product.price <= maxPrice;

    return (
      matchesCategory && matchesTitle && matchesMinPrice && matchesMaxPrice
    );
  });

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-9">
          <h2>Products</h2>

          <ProductFilter
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            allCategories={allCategories}
          />
          <br />
          <br />

          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.productId}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3 border-start">
          <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogPage;
