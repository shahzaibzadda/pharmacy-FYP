'use client';
import React from "react";
import Link from "next/link";

const ArticleCard = ({ title, imageUrl, date, className = "", slug }) => {

  return (
    <Link href={`/store/${slug}`}>
      <div className={`relative w-[220px] h-[200px] flex items-center justify-center font-sans group cursor-pointer ${className}`}>

        {/* CIRCLE IMAGE */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 relative group-hover:shadow-xl">

          <img
            src={imageUrl}
            alt="article-cover"
            className="w-27 h-27 object-contain transition duration-300 group-hover:scale-110 relative z-10 "
          />

        </div>

        {/* HEADING BELOW IMAGE */}
        <p className="absolute -bottom-3 left-1/2 -translate-x-1/2 mt-3 text-sm font-medium text-white text-center whitespace-nowrap tracking-wide group-hover:text-gray-300 transition">
          {title}
        </p>

      </div>
    </Link>
  );
};

export default ArticleCard;