import TitleErr from "./TitleErr";
import FooterErr from "./FooterErr";
import ContentVideo from "./ContentVideo";

const tutorials = [
  {
    id: 1,
    title: "🏷️ Mã Booking Không Phải Số",
    description:
      "Xảy ra khi Mã Booking trong File Excel không giống Mã Booking vừa tạo trên Website TMS.",
    duration: "1:10",
    views: "1K",
    category: "Booking",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1749863305/Video_Intem_Error/mabooking_Text.mp4",
    difficulty: "Nghiêm trọng",
  },
  {
    id: 2,
    title: "📦 Thiếu Số Kiện ",
    description: "Lỗi khi nhập thiếu Số Kiện trên File Excel.",
    duration: "1:01",
    views: "8.2K",
    category: "Số kiện",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748682072/Video_Intem_Error/sokien.mp4",
    difficulty: "Bình thường",
  },
  {
    id: 3,
    title: "📦 Thiếu Số Hóa Đơn",
    description: "Xảy ra lỗi khi nhập thiếu Số Hóa Đơn trên File Excel.",
    duration: "45s",
    views: "2K",
    category: "Hóa đơn",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748681134/Video_Intem_Error/sohoadon.mp4",
    difficulty: "Bình thường",
  },
  {
    id: 4,
    title: "🚚 Sai Ngày Giao Hàng",
    description:
      "Nếu là dạng '03/05/2025 hoặc công thức như =NOW()+1 thì hệ thống sẽ đọc sai Ngày Giao Hàng.",
    duration: "2:54",
    views: "15.7K",
    category: "Ngày giao",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748913216/Video_Intem_Error/err_date_false.mp4",
    difficulty: "Nghiêm trọng",
  },
  {
    id: 5,
    title: "🚚 Thiếu Ngày Giao Hàng Dự Kiến",
    description:
      "Xảy ra lỗi khi nhập thiếu Ngày Giao Hàng Dự Kiến trên File Excel.",
    duration: "47s",
    views: "12.7K",
    category: "Ngày giao",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748683180/Video_Intem_Error/err_date_null.mp4",
    difficulty: "Bình thường",
  },

  {
    id: 6,
    title: "🏷️ Thiếu Mã Siêu Thị",
    description: "Xảy ra khi nhập thiếu Mã Siêu Thị trong File Excel.",
    duration: "41s",
    views: "4k",
    category: "Siêu thị",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748681682/Video_Intem_Error/mastore_null.mp4",
    difficulty: "Bình thường",
  },
  {
    id: 7,
    title: "🏷️ Mã Siêu Thị không tồn tại",
    description:
      "Do trong hệ thống chưa có thông tin của Mã Siêu Thị, hãy liên hệ IT để xử lý.",
    duration: "26s",
    views: "9.5K",
    category: "Siêu thị",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748681523/Video_Intem_Error/mastorenot_valid.mp4",
    difficulty: "Nghiêm trọng",
  },
  {
    id: 8,
    title: "🏷️ Mã Nhà Cung Cấp Không Tồn Tại",
    description:
      "Do trong hệ thống chưa có thông tin của Mã Nhà Cung Cấp, hãy liên hệ IT để xử lý.",
    duration: "17s",
    views: "7.2K",
    category: "Nhà cung cấp",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748683208/Video_Intem_Error/maNccnot_valid.mp4",
    difficulty: "Nghiêm trọng",
  },
  {
    id: 9,
    title: "🏷️ Thiếu Mã Booking",
    description: "Lỗi thường do file Excel, cột Mã Booking bị bỏ trống.",
    duration: "53s",
    views: "7.2K",
    category: "Booking",
    videoUrl:
      "https://res.cloudinary.com/dm88fvsss/video/upload/v1748915147/Video_Intem_Error/err_booking_null.mp4",
    difficulty: "Nghiêm trọng",
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "An toàn":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Bình thường":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Nghiêm trọng":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export default function TutorialVideoGrid() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <TitleErr />
      <ContentVideo
        tutorials={tutorials}
        getDifficultyColor={getDifficultyColor}
      />
      {/* <FooterErr /> */}
    </div>
  );
}
