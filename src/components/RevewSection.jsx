"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Quote } from "lucide-react"; // আইকন এর জন্য (ঐচ্ছিক)

const reviews = [
  {
    name: "John Doe",
    review:
      "This movie is amazing! Highly recommend the storytelling and the visual effects were top notch.",
  },
  {
    name: "Jane Smith",
    review:
      "Loved the cinematography and storyline. MovieMatrix has the best collection I've seen so far.",
  },
  {
    name: "Alice Johnson",
    review:
      "Great acting and special effects! A true masterpiece for the fans of this genre.",
  },
  {
    name: "Bob Martin",
    review:
      "A must-watch for everyone! The user experience on this platform is just seamless.",
  },
];

export default function ReviewSection() {
  const settings = {
    infinite: true,
    speed: 6000, // আরও স্মুথ মুভমেন্টের জন্য স্পিড বাড়ানো হয়েছে
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
    <section className="py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <span className="w-2 h-8 bg-red-600 rounded-full"></span>
          User Reviews
        </h2>

        <Slider {...settings} className="review-slider">
          {reviews.map((rev, index) => (
            <div key={index} className="px-3 py-6">
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#191638] to-[#0a0510] border border-gray-800/50 min-h-[220px] flex flex-col justify-between transition-all duration-500 hover:border-red-600/50 hover:-translate-y-2">
             
                <div className="absolute top-4 right-6 text-gray-700 group-hover:text-red-600/20 transition-colors">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9125 16 16.0171 16H19.0171C19.5694 16 20.0171 15.5523 20.0171 15V9C20.0171 8.44772 19.5694 8 19.0171 8H15.0171C14.4648 8 14.0171 7.55228 14.0171 7V5C14.0171 4.44772 14.4648 4 15.0171 4H20.0171C21.1217 4 22.0171 4.89543 22.0171 6V15C22.0171 18.3137 19.3308 21 16.0171 21H14.0171ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709C8.56937 16 9.01709 15.5523 9.01709 15V9C9.01709 8.44772 8.56937 8 8.01709 8H4.01709C3.46481 8 3.01709 7.55228 3.01709 7V5C3.01709 4.44772 3.46481 4 4.01709 4H9.01709C10.1217 4 11.0171 4.89543 11.0171 6V15C11.0171 18.3137 8.33081 21 5.01709 21H3.01709Z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="italic text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    {rev.review}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center font-bold text-sm">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-red-500 transition-colors">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Verified User
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider Custom CSS (Inline) */}
      <style jsx global>{`
        .review-slider .slick-track {
          display: flex !important;
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
