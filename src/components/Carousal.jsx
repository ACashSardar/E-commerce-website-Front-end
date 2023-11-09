import React from "react";

const Carousal = () => {
  return (
    <div className="mt-4 pt-2 px-1 mb-0">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="image/great_indian_sale.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "15rem" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="image/fashion.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "15rem" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="image/chocolates.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "15rem" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="image/phone.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "15rem" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;
