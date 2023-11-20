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
      if (catId === 0) {
        document.getElementById("catg0").checked = true;
      } else {
        document.getElementById("catg0").checked = false;
      }
      categories
        .map((catg) => catg.categoryId)
        .forEach((id) => {
          console.log(id);
          if (id === catId) {
            document.getElementById("catg" + id).checked = true;
          } else {
            document.getElementById("catg" + id).checked = false;
          }
        });

      priceRanges.forEach((price, id) => {
        if (priceId === "price" + id) {
          console.log(document.getElementById(priceId).checked);
          document.getElementById("price" + id).checked = true;
        } else {
          document.getElementById("price" + id).checked = false;
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
      if (priceId === "price-1") {
        document.getElementById("price-1").checked = true;
      } else {
        document.getElementById("price-1").checked = false;
      }

      priceRanges.forEach((price, id) => {
        if (priceId === "price" + id) {
          document.getElementById("price" + id).checked = true;
        } else {
          document.getElementById("price" + id).checked = false;
        }
      });

      categories
        .map((catg) => catg.categoryId)
        .forEach((id) => {
          if (id === catId) {
            document.getElementById("catg" + id).checked = true;
          } else {
            document.getElementById("catg" + id).checked = false;
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
          <h4 className="ms-5">Filters</h4>
          <hr />
          <div className="overflow-auto mb-2" style={{ height: "12rem" }}>
            <div class="list-group me-1 rounded-0">
              <Link
                className="list-group-item py-0 px-3 fs-6 border-0"
                id={0}
                onClick={() => searchByCategory(0)}
              >
                <input type="checkbox" id={`catg${0}`} className="me-2" />
                <b>All Categories</b>
              </Link>
              {categories.map((category, index) => (
                <Link
                  className="list-group-item py-0 px-3 fs-6 fw-light border-0"
                  onClick={() => searchByCategory(category.categoryId)}
                >
                  <input
                    type="checkbox"
                    id={`catg${category.categoryId}`}
                    className="me-2"
                  />
                  <label> {category.categoryName}</label>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ height: "12rem" }}>
            <div class="list-group me-1 rounded-0">
              <Link
                className="list-group-item py-0 px-3 fs-6 border-0"
                onClick={() => searchByPriceRange(`price${-1}`, 0, 50000)}
              >
                <input type="checkbox" id={`price${-1}`} className="me-2" />
                <b>Any Price Range</b>
              </Link>
              {priceRanges.map((price, index) => (
                <Link
                  className="list-group-item py-0 px-3 fs-6 fw-light border-0"
                  onClick={() =>
                    searchByPriceRange(`price${index}`, price[0], price[1])
                  }
                >
                  <input
                    type="checkbox"
                    id={`price${index}`}
                    className="me-2"
                  />
                  <label>
                    ₹{price[0]} to {price[1]}
                  </label>
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
