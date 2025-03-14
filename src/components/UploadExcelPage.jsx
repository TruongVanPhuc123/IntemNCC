import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, CloudUpload } from "lucide-react";
import Swal from "sweetalert2";
import { Input } from "./ui/input";
import axios from "axios";
import LogoSection from "./LogoSection";

export default function UploadExcelPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [maNCC, setMaNCC] = useState("");
  const [uploadHistory, setUploadHistory] = useState([]);

  useEffect(() => {
    // Load lịch sử upload từ localStorage (hoặc có thể từ API nếu cần)
    const history = JSON.parse(localStorage.getItem("uploadHistory")) || [];
    setUploadHistory(history);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx, .xls",
    onDrop,
    disabled: files.length > 0,
  });

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const uploadFiles = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(
        `http://localhost:3000/upload/${maNCC}`,
        formData,
        {
          responseType: "blob", // Nhận dữ liệu dưới dạng Blob (PDF)
        }
      );

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

      const newHistory = [
        { name: files[0].name, time: new Date().toLocaleString() },
        ...uploadHistory,
      ];
      setUploadHistory(newHistory);
      localStorage.setItem("uploadHistory", JSON.stringify(newHistory));

      setFiles([]);
      setMaNCC("");
    } catch (error) {
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
      <motion.div
        whileHover={!files.length ? { scale: 1.05 } : {}}
        whileTap={!files.length ? { scale: 0.95 } : {}}
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl text-center transition-all ${
          files.length
            ? "border-gray-400 bg-gray-100 cursor-not-allowed"
            : "cursor-pointer border-gray-300 hover:border-rose-400"
        }`}
      >
        <input {...getInputProps()} disabled={files.length > 0} />
        <Upload className="mx-auto h-12 w-12 text-red-500" />
        <p className="mt-2 text-gray-700 font-medium">
          {files.length > 0
            ? "Đã chọn file, không thể tải thêm"
            : "Kéo & Thả hoặc Bấm để chọn file Excel"}
        </p>
      </motion.div>

      {/* Hiển thị file đã chọn */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <Card key={file.name} className="shadow-md">
              <CardContent className="flex justify-between items-center p-3">
                <div>
                  <span className="text-sm font-medium">{file.name}</span>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  className="cursor-pointer"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(file.name)}
                >
                  <Trash2 className="h-5 w-5 text-red-500 " />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Input
            type="number"
            placeholder="Nhập mã nhà cung cấp"
            value={maNCC}
            onChange={(e) => setMaNCC(e.target.value)}
          />
          <Button
            onClick={uploadFiles}
            disabled={!maNCC || maNCC.length < 3 || uploading}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 cursor-pointer text-white"
          >
            {uploading ? "Đang Xử Lý..." : "Convert File"}{" "}
            <CloudUpload className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
