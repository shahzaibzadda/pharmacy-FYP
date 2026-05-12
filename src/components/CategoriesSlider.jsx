// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Pagination } from "swiper/modules";
// import "swiper/css/pagination";

// export default function CategoriesSlider() {
//   const categories = [
//     {
//       name: "Medicines",
//       img: "/asset/article/Medicines_1.webp",
//     },
//     {
//       name: "Baby & Child",
//       img: "https://www.myvitaminstore.pk/cdn/shop/files/Sports_Nutrition.jpg",
//     },
//     {
//       name: "Electronics",
//       img: "https://www.myvitaminstore.pk/cdn/shop/files/Banner-3-Homeopathy.jpg",
//     },
//     {
//       name: "Vitamins & Supplements",
//       img: "https://www.myvitaminstore.pk/cdn/shop/files/Banner-6-Home_Sense.jpg",
//     },
//     {
//       name: "Skin Care",
//       img: "https://www.myvitaminstore.pk/cdn/shop/files/Banner-2-Personal-Care.jpg",
//     },
//     {
//       name: "Skin Care",
//       img: "https://www.myvitaminstore.pk/cdn/shop/files/Banner-4-Food-_-Snacks.jpg",
//     },
//   ];

//   return (
//     <div className="px-30 py-10 ">
//       <Swiper

//         modules={[Pagination]}
//         pagination={{ clickable: true }} 
//         spaceBetween={15}
//         slidesPerView={2}
//         breakpoints={{
//           640: { slidesPerView: 3 },
//           1024: { slidesPerView: 5 },
//         }}
//       >
//         {categories.map((cat, i) => (
//           <SwiperSlide key={i}>
//            <div className="flex flex-col items-center group cursor-pointer overflow-visible">
//               {/* IMAGE */}
//               <div className="w-32 h-32 rounded-full overflow-hidden  shadow-md">
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                 />
//               </div>

//               {/* TEXT */}
//               <h3 className="mt-3 text-sm font-semibold text-white text-center group-hover:text-green-800 transition">
//                 {cat.name}
//               </h3>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
