import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function UploadZone({ files, setFiles }) {
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
  return (
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
  );
}
