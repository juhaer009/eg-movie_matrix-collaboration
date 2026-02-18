"use client";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const reviews = [
  { name: "John Doe", review: "This movie is amazing! Highly recommend." },
  { name: "Jane Smith", review: "Loved the cinematography and storyline." },
  { name: "Alice Johnson", review: "Great acting and special effects!" },
  { name: "Bob Martin", review: "A must-watch for everyone!" },
];

export default function ReviewSection() {
  const settings = {
    infinite: true,   
    speed: 3000,       
    autoplay: true,
    autoplaySpeed: 0,      
    cssEase: "linear",     
    slidesToShow: 3,      
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gray-900 py-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">User Reviews</h2>
      <Slider {...settings}>
        {reviews.map((rev, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4 text-gray-300">{rev.review}</p>
              <h4 className="font-semibold text-white">{rev.name}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
