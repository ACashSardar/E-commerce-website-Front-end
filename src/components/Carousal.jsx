import React from 'react'

const Carousal = () => {
  return (
    <div>
        <div id="carouselExampleCaptions" className="carousel slide shadow" data-bs-ride="carousel" >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" >
                <div className="carousel-item active" style={{height:"80vh"}}>
                <img src="https://segwitz.com/wp-content/uploads/2021/09/why-ecommerce-need-mobile-apps.jpg" className="d-block w-100" alt="..." style={{height:"80vh"}}/>
                <div className="carousel-caption d-none d-md-block">
                    <p className='fs-1 fw-bold'>Your One Stop Online Shopping Destination 🎉🛍️</p>
                </div>
                </div>
                <div className="carousel-item" style={{height:"80vh"}}>
                <img src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-dark-street-double-eleven-global-carnival-e-commerce-banner-image_174101.jpg" className="d-block w-100" alt="..." style={{height:"80vh"}}/>
                <div className="carousel-caption d-none d-md-block">
                    <p className='fs-1 fw-bold'>WINTER SALE IS HERE !!!!!</p>
                </div>
                </div>
                <div className="carousel-item" style={{height:"80vh"}}>
                <img src="https://img.lovepik.com/background/20211021/large/lovepik-black-e-commerce-background-image_400147870.jpg" className="d-block w-100" alt="..." style={{height:"80vh"}}/>
                <div className="carousel-caption d-none d-md-block">
                    <p className='fs-1 fw-bold'>CASH ON DELIVERY &</p>
                    <p className='fs-1 fw-bold'>100% MONEY BACK GUARANTEE</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className='text-center mb-4 mx-0 bg-dark p-2'>
            <p className='fs-3 fw-light text-light'>Shopping Now  <i className='fa fa-shopping-bag'></i></p>
        </div>
    </div>
  )
}

export default Carousal
