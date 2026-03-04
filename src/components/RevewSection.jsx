"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const reviews = [
  {
    name: "John Doe",
    review: "This movie is amazing! Highly recommend the storytelling and the visual effects were top notch.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review: "Loved the cinematography and storyline. MovieMatrix has the best collection I've seen so far.",
    rating: 5,
  },
  {
    name: "Alice Johnson",
    review: "Great acting and special effects! A true masterpiece for the fans of this genre.",
    rating: 4,
  },
  {
    name: "Bob Martin",
    review: "A must-watch for everyone! The user experience on this platform is just seamless.",
    rating: 5,
  },
];

export default function ReviewSection() {
  const settings = {
    infinite: true,
    speed: 6000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              What Our Users Say
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-lg ml-8">Real reviews from real movie lovers</p>
        </div>

        {/* Reviews Slider */}
        <Slider {...settings} className="review-slider">
          {reviews.map((rev, index) => (
            <div key={index} className="px-3 py-6">
              <div className="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 min-h-[280px] flex flex-col justify-between transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)]">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-purple-500/20 group-hover:text-purple-400/30 transition-colors">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9125 16 16.0171 16H19.0171C19.5694 16 20.0171 15.5523 20.0171 15V9C20.0171 8.44772 19.5694 8 19.0171 8H15.0171C14.4648 8 14.0171 7.55228 14.0171 7V5C14.0171 4.44772 14.4648 4 15.0171 4H20.0171C21.1217 4 22.0171 4.89543 22.0171 6V15C22.0171 18.3137 19.3308 21 16.0171 21H14.0171ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709C8.56937 16 9.01709 15.5523 9.01709 15V9C9.01709 8.44772 8.56937 8 8.01709 8H4.01709C3.46481 8 3.01709 7.55228 3.01709 7V5C3.01709 4.44772 3.46481 4 4.01709 4H9.01709C10.1217 4 11.0171 4.89543 11.0171 6V15C11.0171 18.3137 8.33081 21 5.01709 21H3.01709Z" />
                  </svg>
                </div>

                {/* Review Content */}
                <div className="relative z-10 mb-6">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < rev.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors">
                    "{rev.review}"
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all">
                      {rev.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Verified User</span>
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Glossy Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider Custom CSS */}
      <style jsx global>{`
        .review-slider .slick-track {
          display: flex !important;
          transition-timing-function: linear !important;
        }
        .review-slider .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
}
