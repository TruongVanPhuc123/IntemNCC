import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, CloudUpload } from "lucide-react";
import { Input } from "../ui/input";

export default function FileZone({
  files,
  setFiles,
  uploadFiles,
  maNCC,
  uploading,
  setMaNCC,
}) {
  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };
  return (
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
        disabled={!maNCC || maNCC.length < 5 || uploading}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 cursor-pointer text-white"
      >
        {uploading ? "Đang Xử Lý..." : "Convert File"}{" "}
        <CloudUpload className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
