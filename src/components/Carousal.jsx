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
                <div className="carousel-item active" style={{height:"91vh"}}>
                    <img src="https://static.vecteezy.com/system/resources/previews/005/454/872/original/mobile-phone-represent-of-front-of-shop-store-shopping-online-on-website-or-mobile-application-concept-marketing-and-digital-marketing-free-vector.jpg" className="d-block w-100" alt="..." style={{height:"91vh"}}/>
                </div>
                <div className="carousel-item" style={{height:"91vh"}}>
                <img src="https://img.freepik.com/free-photo/happy-kid-is-shopping-outdoors_624325-553.jpg?w=996&t=st=1687606518~exp=1687607118~hmac=0002149eec8d57a5659d834008c52c624c689507504e0815d8ff077ef5e3d404" className="d-block w-100" alt="..." style={{height:"91vh"}}/>
                <div className="carousel-caption text-dark d-none d-md-block">
                    <p className='fs-1 fw-bold'>Your One Stop Online Shopping Destination!</p>
                </div>
                </div>
                <div className="carousel-item" style={{height:"91vh"}}>
                <img src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1060&t=st=1687606712~exp=1687607312~hmac=c20b25ebd07463f68bdf4aa41ea14e861e743eb6dd14b7f010c0789e5b6601db" className="d-block w-100" alt="..." style={{height:"91vh"}}/>
                <div className="carousel-caption d-none d-md-block">
                    <p className='fs-1 fw-bold'>CASH ON DELIVERY & 100% MONEY BACK GUARANTEE</p>
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
    </div>
  )
}

export default Carousal
