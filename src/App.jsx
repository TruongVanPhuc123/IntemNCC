import FileZone from "./components/landing/FileZone";
import LogoSection from "./components/landing/LogoSection";
import UploadZone from "./components/landing/UploadZone";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [maNCC, setMaNCC] = useState("");

  const uploadFiles = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(`api/upload/${maNCC}`, formData, {
        responseType: "blob", // Nhận dữ liệu dưới dạng Blob (PDF)
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
      console.log(error.message);
      Swal.fire({
        icon: "error",
        text:
          error.response?.status === 400
            ? "⚠️ Hãy kiểm tra lại mã nhà cung cấp!"
            : "Lỗi kết nối đến server ❌",
      });
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
    </div>
  );
}

export default App;
