import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, CloudUpload } from "lucide-react";
import Swal from "sweetalert2";
import { Input } from "./ui/input";
import axios from "axios";

export default function UploadExcelPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [maNCC, setMaNCC] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx, .xls",
    onDrop,
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

      // Chuyển response thành file Blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Tạo link download và tự động click
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

      setFiles([]);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text:
          error.response?.status === 400
            ? "⚠️ Hãy kiểm tra lại mã!"
            : "Lỗi kết nối đến server ❌",
      });
    }

    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <motion.div
        whileHover={files.length === 0 ? { scale: 1.05 } : {}}
        whileTap={files.length === 0 ? { scale: 0.95 } : {}}
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl text-center ${
          files.length > 0
            ? "border-gray-400 bg-gray-100 cursor-not-allowed"
            : "cursor-pointer border-gray-300"
        }`}
      >
        <input {...getInputProps()} disabled={files.length > 0} />
        <Upload className="mx-auto h-10 w-10 text-gray-500" />
        <p className="mt-2 text-gray-600">
          {files.length > 0
            ? "Đã chọn file, không thể tải thêm"
            : "Kéo & Thả hoặc Bấm để chọn file Excel"}
        </p>
      </motion.div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <Card key={file.name}>
              <CardContent className="flex justify-between items-center p-3">
                <div>
                  <span className="text-sm font-medium">{file.name}</span>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(file.name)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Input
            type="number"
            placeholder="Mã nhà cung cấp"
            value={maNCC}
            onChange={(e) => setMaNCC(e.target.value)}
          />
          {maNCC && String(maNCC).length >= 3 && (
            <Button
              onClick={uploadFiles}
              disabled={uploading}
              className="w-full mt-4"
            >
              {uploading ? "File Đang Xử Lý..." : "Import"}{" "}
              <CloudUpload className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
