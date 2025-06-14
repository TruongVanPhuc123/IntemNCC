import React from "react";

export default function FooterErr() {
  return (
    <div className="mt-12 text-center flex flex-col items-center">
      <p className="text-gray-600 mb-4">
        Không tìm thấy video phù hợp? Hãy cho chúng tôi biết lỗi bạn đang gặp
        phải!
      </p>
      <button
        variant={"link"}
        className="md:w-[30%] flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 
        border border-black hover:border-red-800
        focus:outline-none focus:ring-4 focus:ring-red-300 
        text-black font-medium py-2 px-4 rounded-lg shadow-lg 
        transform transition-all duration-200 hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Yêu cầu video mới
      </button>
    </div>
  );
}
