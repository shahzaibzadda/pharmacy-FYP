// "use client";

// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// const products = [
//   {
//     id: 1,
//     name: "Vitamin C Tablets",
//     description: "Boost immunity and energy levels daily.",
//     image:
//       "https://images.unsplash.com/photo-1584017911766-d451b3d0e843",
//     oldPrice: 2500,
//     newPrice: 1800,
//     discount: "28%",
//   },
//   {
//     id: 2,
//     name: "Omega 3 Capsules",
//     description: "Supports heart and brain health.",
//     image:
//       "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
//     oldPrice: 3200,
//     newPrice: 2400,
//     discount: "25%",
//   },
//   {
//     id: 3,
//     name: "Protein Powder",
//     description: "Perfect for muscle recovery and fitness.",
//     image:
//       "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
//     oldPrice: 5000,
//     newPrice: 3999,
//     discount: "20%",
//   },
//   {
//     id: 4,
//     name: "Baby Lotion",
//     description: "Gentle moisturizing care for babies.",
//     image:
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
//     oldPrice: 1800,
//     newPrice: 1200,
//     discount: "33%",
//   },
//   {
//     id: 5,
//     name: "Skin Care Cream",
//     description: "Hydrates and brightens your skin.",
//     image:
//       "https://images.unsplash.com/photo-1612817288484-6f916006741a",
//     oldPrice: 2200,
//     newPrice: 1700,
//     discount: "22%",
//   },
//   {
//     id: 6,
//     name: "Hair Oil",
//     description: "Strengthens hair roots naturally.",
//     image:
//       "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137",
//     oldPrice: 1500,
//     newPrice: 999,
//     discount: "35%",
//   },
//   {
//     id: 7,
//     name: "Face Wash",
//     description: "Fresh and glowing skin every day.",
//     image:
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
//     oldPrice: 1400,
//     newPrice: 999,
//     discount: "29%",
//   },
//   {
//     id: 8,
//     name: "Multivitamins",
//     description: "Daily essential nutrients for health.",
//     image:
//       "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
//     oldPrice: 3000,
//     newPrice: 2100,
//     discount: "30%",
//   },
// ];

// export default function SpecialOffers() {

//   const addToCart = async (productId) => {
//     try {
//       await fetch("/api/cart", {
//         method: "POST",
//         body: JSON.stringify({ productId }),
//       });

//       alert("Product added to cart!");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bg-white py-10 px-8 md:px-30 relative">

//       {/* TOP BAR */}
//       <div className="flex items-center justify-between mb-6">

//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//           Special Offers
//         </h2>

//         <Link
//           href="/discounted-products"
//           className="text-green-600 font-semibold hover:text-green-700 transition"
//         >
//           View All →
//         </Link>
//       </div>

//       {/* ✅ FIX: extra padding for swiper + buttons */}
//       <div className="relative px-10 special-offers-slider">

//         <Swiper
//           modules={[Navigation]}
//           navigation
//           spaceBetween={14}
//           slidesPerView={2}
//           slidesPerGroup={2}
//           breakpoints={{
//             640: { slidesPerView: 3, slidesPerGroup: 3 },
//             768: { slidesPerView: 4, slidesPerGroup: 4 },
//             1024: { slidesPerView: 5, slidesPerGroup: 5 },
//           }}
//         >
//           {products.map((product) => (
//             <SwiperSlide key={product.id}>
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group h-full flex flex-col">

//                 <div className="relative overflow-hidden">

//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
//                   />

//                   <div className="absolute top-2 right-2 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md">
//                     -{product.discount}
//                   </div>
//                 </div>

//                 <div className="p-3 flex flex-col flex-1">

//                   <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
//                     {product.name}
//                   </h3>

//                   <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                     {product.description}
//                   </p>

//                   <div className="mt-2 flex items-center gap-2">

//                     <span className="text-base font-bold text-green-600">
//                       Rs. {product.newPrice}
//                     </span>

//                     <span className="text-xs text-gray-400 line-through">
//                       Rs. {product.oldPrice}
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => addToCart(product.id)}
//                     className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm font-medium transition"
//                   >
//                     Add to Cart
//                   </button>

//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }