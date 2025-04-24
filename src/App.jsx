import FileZone from "./components/landing/FileZone";
import LogoSection from "./components/landing/LogoSection";
import UploadZone from "./components/landing/UploadZone";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [maNCC, setMaNCC] = useState("");

  const uploadFiles = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(`/api/upload/${maNCC}`, formData, {
        responseType: "blob", // Nhận dữ liệu dưới dạng Blob
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      Swal.fire({
        icon: "success",
        text: "Convert Thành Công ✅",
      });
      console.log(response);

      setFiles([]);
      setMaNCC("");
    } catch (error) {
      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        console.log("📦 Lỗi từ server:", json);
        Swal.fire({
          icon: "error",
          text: json?.errors,
        });
      } else {
        console.log("❌ Lỗi không rõ:", error.message);
      }
    }
    setUploading(false);
  };
  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl mt-2">
      {/* Header với Logo */}
      <LogoSection />

      {/* Khu vực tải file */}
      <UploadZone files={files} setFiles={setFiles} />

      {/* Hiển thị file đã chọn */}
      {files.length > 0 && (
        <FileZone
          files={files}
          uploadFiles={uploadFiles}
          maNCC={maNCC}
          uploading={uploading}
          setFiles={setFiles}
          setMaNCC={setMaNCC}
        />
      )}
      <button
        onClick={uploadFiles}
        disabled={!maNCC || maNCC.length < 5 || uploading}
        className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 
        border border-black hover:border-red-800
        focus:outline-none focus:ring-4 focus:ring-red-300 
        text-black font-medium py-2 px-4 rounded-lg shadow-lg 
        transform transition-all duration-200 hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? "Đang Xử Lý..." : "Convert File"}
        <CloudUpload />
      </button>
    </div>
  );
}

export default App;
