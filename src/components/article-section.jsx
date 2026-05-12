"use client";

import ArticleCard from "./medicincard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const ArticlesSection = () => {
  const articles = [
    {
      title: "Medicines",
      imageUrl: "/asset/article/med6.png",
      slug: "medicines",
    },
    {
      title: "Baby & Child",
      imageUrl: "/asset/article/babychild3.png",
      slug: "baby-child",
    },
    {
      title: "Electronics",
      imageUrl: "/asset/article/electronics1.png",
      slug: "electronics",
    },
    {
      title: "Vitamins & Supplements",
      imageUrl: "/asset/article/vitamins.png",
      slug: "vitamins-supplements",
    },
    {
      title: "Skin Care",
      imageUrl: "/asset/article/skincare.png",
      slug: "skin-care",
    },
    {
      title: "Medicated Cosmetics",
      imageUrl: "/asset/article/medicated.png",
      slug: "medicated-cosmetics",
    },
    {
      title: "Personal Care",
      imageUrl: "/asset/article/personalcare.png",
      slug: "personal-care",
    },
  ];

  return (
    <div className="bg-primary py-12 md:px-40  relative">
      <h2 className="text-white text-center text-2xl md:text-3xl font-semibold mb-4 tracking-wide">
        Quick Shop
      </h2>

      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={1}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        className="pb-12 px-6"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center px-10 cursor-pointer">
              <ArticleCard
                title={article.title}
                imageUrl={article.imageUrl}
                slug={article.slug}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 0px !important;
          z-index: 50;
        }
       
        .swiper-pagination-bullet {
          background: #ffffff !important;
          opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          font-weight: bold;
          background: rgba(255, 255, 255, 0.15);
          width: 45px !important;
          height: 45px !important;
          border-radius: 9999px;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.08);
        }

        .swiper-button-next {
          right: 5px !important;
        }

        .swiper-button-prev {
          left: 5px !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
};

export default ArticlesSection;
