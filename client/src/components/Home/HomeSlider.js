import React from "react";
import Slider from "react-slick";
import MyButton from "./../utils/button";

const HomeSlider = props => {
  const slides = [
    {
      img: "/images/featured/image1.jpg",
      lineOne: "Mansion 1",
      lineTwo: "District 1",
      linkTitle: "View More Ads",
      linkTo: "/properties",
    },
    {
      img: "/images/featured/image2.jpg",
      lineOne: "Mansion 2",
      lineTwo: "District 2",
      linkTitle: "View More Ads",
      linkTo: "/properties",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="featured_image"
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight}px`,
              }}
            >
              <div className="featured_action">
                <div className="tag title">{item.lineOne}</div>
                <div className="tag low_title">{item.lineTwo}</div>
                <div>
                  <MyButton
                    type="default"
                    title={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{
                      margin: "10px 0 0 0",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
