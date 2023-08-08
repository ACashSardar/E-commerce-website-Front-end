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
                    <img src="https://d2pyicwmjx3wii.cloudfront.net/s/5fd0cc8564ed061d6f063d73/6482f25da79adb0839e2bb37/webp/cotton-lurex-2038x700.jpg" className="d-block w-100" alt="..." style={{height:"93vh"}}/>
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
