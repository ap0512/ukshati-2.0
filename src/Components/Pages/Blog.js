// import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
// import Layout from '../Layouts/Layout';

// const Blog = () => {
//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-16 mt-8">
//         <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mt-10 mb-3">
//           <MdOutlineKeyboardArrowRight className='text-green-600' />
//           <span>Latest Articles</span>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
//             <img 
//               src="https://www.gogreendrip.com/GoGreen/GoGreen/images/adviti1.jpg" 
//               alt="Wifi Drip Controller" 
//               className="w-full md:w-1/3 object-cover h-48 md:h-auto"
//             />
//             <div className="p-5 flex flex-col justify-between">
//               <h5 className="text-xl font-bold text-gray-900">WiFi Drip Controller</h5>
//               <p className="text-gray-600 text-sm my-3">
//                 Our project envisions sustainable urban living by enabling families to grow pesticide-free food using biodegradable waste while enhancing city greenery...
//               </p>
//               <a href="" target="_blank" rel="noopener noreferrer" 
//                 className="text-green-600 hover:text-green-800 flex items-center gap-1">
//                 Read more <MdOutlineKeyboardDoubleArrowRight />
//               </a>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
//             <img 
//               src="https://www.gogreendrip.com/GoGreen/GoGreen/images/adviti1.jpg" 
//               alt="Terrace or Balcony Garden Benefits" 
//               className="w-full md:w-1/3 object-cover h-48 md:h-auto"
//             />
//             <div className="p-5 flex flex-col justify-between">
//               <h5 className="text-xl font-bold text-gray-900">Terrace or Balcony Garden Benefits</h5>
//               <p className="text-gray-600 text-sm my-3">
//                 A terrace or balcony garden offers fresh, organic produce, reduces pollution by increasing oxygen levels, and filters toxic gases...
//               </p>
//               <a href="" target="_blank" rel="noopener noreferrer" 
//                 className="text-green-600 hover:text-green-800 flex items-center gap-1">
//                 Read more <MdOutlineKeyboardDoubleArrowRight />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Watch Our YouTube Video</h2>
//           <div className="w-full max-w-2xl mx-auto">
//             <iframe 
//               className="w-full aspect-video rounded-lg shadow-lg" 
//               src="https://www.youtube.com/embed/VLSPHFUg3pU?si=szxPQ37LrcsRN2os" 
//               title="YouTube video player" 
//               frameBorder="0" 
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//               referrerPolicy="strict-origin-when-cross-origin" 
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Blog;

import { useState } from "react";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Layout from "../Layouts/Layout";

const blogPosts = [
  {
    id: 1,
    title: "Smart WiFi Drip Controller",
    description:
      "A revolutionary system that automates plant irrigation using IoT, optimizing water usage while ensuring plant health.",
    content:
      "The Smart WiFi Drip Controller provides automated irrigation management via a mobile app. It ensures plants receive optimal water, reducing waste and enhancing efficiency. Ideal for small gardens and large farms alike.",
    imageUrl: "https://www.gogreendrip.com/GoGreen/GoGreen/images/adviti1.jpg",
  },
  {
    id: 2,
    title: "Water-Efficient Solutions for Every Space",
    description:
      "Our devices cater to gardens of all sizes, offering solutions like water tank-based systems for balconies and waterproof models for outdoor use.",
    content:
      "These water-efficient solutions are designed for diverse spaces, ensuring plants receive the right amount of hydration. Whether for a home balcony or commercial farm, they improve water conservation and productivity.",
    imageUrl: "https://www.gogreendrip.com/GoGreen/GoGreen/images/adviti2.jpg",
  },
];

const Blog = () => {
  const [expandedPosts, setExpandedPosts] = useState({});

  const toggleReadMore = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mt-8 mb-4">Articles</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
            >
              <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6 flex flex-col justify-between min-h-[180px]">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.description}</p>

                {expandedPosts[post.id] && (
                  <p className="text-gray-700 text-sm mt-2">{post.content}</p>
                )}

                <button
                  onClick={() => toggleReadMore(post.id)}
                  className="text-green-600 flex items-center gap-1 font-medium mt-2"
                >
                  {expandedPosts[post.id] ? "Show less" : "Learn more"}
                  {expandedPosts[post.id] ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardDoubleArrowRight />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Watch Our Feature Video</h2>
          <div className="w-full max-w-3xl mx-auto">
            <iframe
              className="w-full aspect-video rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/VLSPHFUg3pU?si=szxPQ37LrcsRN2os"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

