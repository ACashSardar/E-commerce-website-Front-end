import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/ServerBaseURL";

const MainBody = ({
  products,
  setProducts,
  categories,
  setSelectedProductId,
  keyword,
  handleSearch,
}) => {
  const chunkSize = 8;
  const [startIndx, setStartIndx] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const priceRanges = [
    [100, 500],
    [500, 1000],
    [1000, 5000],
    [5000, 15000],
    [15000, 25000],
    [25000, 40000],
  ];
  const [catId, setCatId] = useState(0);
  const [priceId, setPriceId] = useState(-1);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(1000000);

  const searchByCategory = (catId) => {
    axios.get(BASE_URL + "/api/v1/products", userInfo).then((res) => {
      let temp = res.data
        .filter(
          (item, index) => catId === 0 || item.category.categoryId === catId
        )
        .filter((item, index) => item.price >= low && item.price <= high);
      setProducts(temp);
      setCatId(catId);
      categories
        .map((catg) => catg.categoryId)
        .forEach((id) => {
          if (id === catId) {
            document.getElementById(id).style.backgroundColor = "sandybrown";
            document.getElementById(id).style.color = "white";
          } else {
            document.getElementById(id).style.backgroundColor = "white";
            document.getElementById(id).style.color = "black";
          }
        });
      priceRanges.forEach((price, index) => {
        if (priceId === "price" + index) {
          document.getElementById(priceId).style.backgroundColor = "sandybrown";
          document.getElementById(priceId).style.color = "white";
        } else {
          document.getElementById("price" + index).style.backgroundColor =
            "white";
          document.getElementById("price" + index).style.color = "black";
        }
      });
    });
  };

  const searchByPriceRange = (priceId, low, high) => {
    axios.get(BASE_URL + "/api/v1/products", userInfo).then((res) => {
      let temp = res.data
        .filter(
          (item, index) => catId === 0 || item.category.categoryId === catId
        )
        .filter((item, index) => item.price >= low && item.price <= high);
      setProducts(temp);
      setPriceId(priceId);
      setLow(low);
      setHigh(high);
      priceRanges.forEach((price, index) => {
        if (priceId === "price" + index) {
          document.getElementById(priceId).style.backgroundColor = "sandybrown";
          document.getElementById(priceId).style.color = "white";
        } else {
          document.getElementById("price" + index).style.backgroundColor =
            "white";
          document.getElementById("price" + index).style.color = "black";
        }
      });
      categories
        .map((catg) => catg.categoryId)
        .forEach((id) => {
          if (id === catId) {
            document.getElementById(id).style.backgroundColor = "sandybrown";
            document.getElementById(id).style.color = "white";
          } else {
            document.getElementById(id).style.backgroundColor = "white";
            document.getElementById(id).style.color = "black";
          }
        });
    });
  };

  const handlePagination = (indx) => {
    if (indx < 0 || indx >= products.length) return;
    setStartIndx(indx);
  };

  const calculateRatings = (reviews) => {
    const numOfRatings = reviews.length;

    if (numOfRatings === 0) return 0;

    let totalRatings = 0;

    reviews.forEach((review) => {
      totalRatings += review.rating;
    });

    return parseInt(totalRatings / numOfRatings);
  };

  return (
    <div className="py-2 ps-5" id="products">
      <div className="row m-0">
        <div className="col-md-2 filters">
          <div className="overflow-auto mb-2" style={{ height: "12rem" }}>
            <div class="list-group me-1 rounded-0">
              <Link
                className="list-group-item py-0 px-3 fs-6 border-0"
                id={0}
                onClick={() => searchByCategory(0)}
              >
                <b>All Categories</b>
              </Link>
              {categories.map((category, index) => (
                <Link
                  className="list-group-item py-0 px-3 fs-6 fw-light border-0"
                  id={category.categoryId}
                  onClick={() => searchByCategory(category.categoryId)}
                >
                  {index + 1}. {category.categoryName}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ height: "12rem" }}>
            <div class="list-group me-1 rounded-0">
              <Link
                className="list-group-item py-0 px-3 fs-6 border-0"
                onClick={() => searchByPriceRange("price" + -1, 0, 50000)}
              >
                <b>Any Price Range</b>
              </Link>
              {priceRanges.map((price, index) => (
                <Link
                  className="list-group-item py-0 px-3 fs-6 fw-light border-0"
                  id={"price" + index}
                  onClick={() =>
                    searchByPriceRange("price" + index, price[0], price[1])
                  }
                >
                  {index + 1}. ₹{price[0]} to {price[1]}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row m-0">
            {products.length > 0 ? (
              <>
                {products
                  .slice(startIndx, startIndx + chunkSize)
                  .map((product, index) => (
                    <div
                      className="card col-md-3 p-0 m-2 rounded-1 border"
                      style={{ width: "15rem", height: "23rem" }}
                    >
                      <Link
                        className="selected-item link-dark"
                        onClick={() => {
                          setSelectedProductId(product.productId);
                        }}
                      >
                        <div className="card-body rounded-0 p-0">
                          <img
                            src={
                              BASE_URL +
                              `/api/v1/products/image/${product.imageURL}`
                            }
                            className="card-img-top rounded-1"
                            alt="..."
                            style={{ height: "15rem" }}
                          />
                        </div>

                        <div
                          className="card-body rounded-0"
                          style={{ height: "8rem" }}
                        >
                          <label className="card-text fw-light fs-6 text-dark">
                            {product.productName}
                          </label>
                          <br />
                          <div className="d-flex justify-content-between">
                            <b className="fs-5">₹{product.price}</b>
                            <p className="fs-5">
                              {"★★★★★".slice(
                                0,
                                calculateRatings(product.reviews)
                              ) +
                                "☆☆☆☆☆".slice(
                                  calculateRatings(product.reviews),
                                  5
                                )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </>
            ) : (
              <div>
                <span
                  className="fs-5"
                  style={{ position: "relative", left: "16rem" }}
                >
                  <b>No items found</b>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-4">
        <nav aria-label="Page navigation example">
          <ul class="pagination mb-0">
            <li class="page-item">
              <Link
                class="page-link link-dark custom-btn3 rounded-1 me-1"
                href=""
                onClick={() => handlePagination(startIndx - chunkSize)}
              >
                <label>&laquo; Previous</label>
              </Link>
            </li>
            <li class="page-item">
              <Link
                class="page-link link-dark custom-btn3 rounded-1"
                href=""
                onClick={() => handlePagination(startIndx + chunkSize)}
              >
                <label>Next &raquo;</label>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainBody;
