import React from 'react'

const Carousal = () => {
  return (
    <div>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" >
                <div className="carousel-item active" style={{height:"93vh"}}>
                    <img src="https://cdn.shopify.com/s/files/1/0126/3239/1744/collections/collection_banner-rtw_bb982a49-5b97-4a1b-a96a-784e65094681.jpg?v=1687870457" className="d-block w-100" alt="..." style={{height:"93vh"}}/>
                </div>
            </div>
            <button className='btn btn-light fw-bold fs-4' id="shop-now" onClick={() => window.location.replace("#products")}>SHOP NOW</button>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
  )
}

export default Carousal
