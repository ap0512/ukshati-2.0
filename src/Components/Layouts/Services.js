import React from "react";
import { services } from "../Utils/Data";
import Slider from "react-slick";
import Card from "react-bootstrap/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "50px",
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    cssEase: "linear",
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <h1 className="text-center text-4xl font-extrabold text-blue-800 mb-12">
        Our Services
      </h1>
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {services.map((item, index) => (
            <div key={index} className="px-4">
              <Card className="bg-white shadow-lg rounded-lg flex flex-col transition-all duration-300 transform hover:scale-105 hover:shadow-2xl h-full min-h-[350px]">
                
                {/* Image Container */}
                <div className="w-full h-56 flex items-center justify-center bg-gray-200 rounded-t-lg">
                  <Card.Img
                    className="object-contain w-full h-full rounded-t-lg"
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                {/* Card Content */}
                <Card.Body className="p-6 flex flex-col justify-between text-center flex-grow">
                  <Card.Title className="text-lg font-bold text-blue-600 hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Services;
