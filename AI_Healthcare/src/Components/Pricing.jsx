import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
export const Pricing = () => {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "500px" }}
          >
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Medical Packages
            </h5>
            <h1 className="display-4">Awesome Medical Programs</h1>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <div
              className="owl-carousel price-carousel position-relative"
              style={{ padding: "0 45px 45px 45px" }}
            >
              <SwiperSlide>
                <div className="bg-light rounded text-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid rounded-top"
                      src="img/price-1.jpg"
                      alt=""
                    />
                    <div
                      className="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                      style={{ background: "rgba(29, 42, 77, .8)" }}
                    >
                      <h3 className="text-white">Pregnancy Care</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top fw-normal"
                          style={{ fontSize: "22px", lineHeight: " 45px" }}
                        >
                          $
                        </small>
                        49
                        <small
                          className="align-bottom fw-normal"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Year
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="text-center py-5">
                    <p>Emergency Medical Treatment</p>
                    <p>Highly Experienced Doctors</p>
                    <p>Highest Success Rate</p>
                    <p>Telephone Service</p>
                    <a
                      href="#!"
                      className="btn btn-primary rounded-pill py-3 px-5 my-2"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-light rounded text-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid rounded-top"
                      src="img/price-2.jpg"
                      alt=""
                    />
                    <div
                      className="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                      style={{ background: "rgba(29, 42, 77, .8)" }}
                    >
                      <h3 className="text-white">Health Checkup</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top fw-normal"
                          style={{ fontSize: "22px", lineHeight: " 45px" }}
                        >
                          $
                        </small>
                        99
                        <small
                          className="align-bottom fw-normal"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Year
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="text-center py-5">
                    <p>Emergency Medical Treatment</p>
                    <p>Highly Experienced Doctors</p>
                    <p>Highest Success Rate</p>
                    <p>Telephone Service</p>
                    <a
                      href="#!"
                      className="btn btn-primary rounded-pill py-3 px-5 my-2"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-light rounded text-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid rounded-top"
                      src="img/price-3.jpg"
                      alt=""
                    />
                    <div
                      className="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                      style={{ background: "rgba(29, 42, 77, .8)" }}
                    >
                      <h3 className="text-white">Dental Care</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top fw-normal"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          $
                        </small>
                        149
                        <small
                          className="align-bottom fw-normal"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Year
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="text-center py-5">
                    <p>Emergency Medical Treatment</p>
                    <p>Highly Experienced Doctors</p>
                    <p>Highest Success Rate</p>
                    <p>Telephone Service</p>
                    <a
                      href="#!"
                      className="btn btn-primary rounded-pill py-3 px-5 my-2"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-light rounded text-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid rounded-top"
                      src="img/price-4.jpg"
                      alt=""
                    />
                    <div
                      className="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                      style={{ background: "rgba(29, 42, 77, .8)" }}
                    >
                      <h3 className="text-white">Operation & Surgery</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top fw-normal"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          $
                        </small>
                        199
                        <small
                          className="align-bottom fw-normal"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Year
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="text-center py-5">
                    <p>Emergency Medical Treatment</p>
                    <p>Highly Experienced Doctors</p>
                    <p>Highest Success Rate</p>
                    <p>Telephone Service</p>
                    <a
                      href="#!"
                      className="btn btn-primary rounded-pill py-3 px-5 my-2"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};
