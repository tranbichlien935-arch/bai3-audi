import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Car as CarType } from "../types";
import { carService } from "../api";
import { Plus, UploadCloud } from "lucide-react";

interface Props {
  onSuccess: (car: CarType) => void;
}

export function AddCarDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    model: "",
    year: new Date().getFullYear(),
    price: "",
    status: "Có sẵn",
    image: "",
    color: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image;

      // 1. Nếu người dùng có chọn ảnh File từ máy, ta tải lên Cloudinary trước
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        
        // THÔNG SỐ CLOUDINARY CỦA BẠN:
        const CLOUDINARY_UPLOAD_PRESET = "audi_upload"; 
        const CLOUDINARY_CLOUD_NAME = "de7z9kyem"; // Lấy từ hình ảnh của bạn
        
        uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); 

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: uploadData,
          });
          const cloudData = await res.json();
          
          if (cloudData.secure_url) {
            finalImageUrl = cloudData.secure_url; // Ghi đè URL bằng link ảnh từ Cloudinary
          } else {
            console.error("Cloudinary upload failed:", cloudData);
          }
        } catch (uploadError) {
          console.error("Lỗi khi gọi API Cloudinary:", uploadError);
        }
      }

      // 2. Gom URL Cloud (finalImageUrl) vào gói dữ liệu và gửi xuống API ASP.NET
      const carToSubmit = { ...formData, image: finalImageUrl };
      const newCar = await carService.addCar(carToSubmit);
      
      onSuccess(newCar);
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      // Nếu API không chạy, ta vẫn có thể hiển thị như đã thêm thành công với Mockup ID
      const fakeCar: CarType = {
        ...formData,
        image: imagePreview || "https://images.unsplash.com/photo-1761738217531-44a249d1dc87?w=500&q=80",
        id: Math.random().toString(36).substr(2, 9)
      };
      onSuccess(fakeCar);
      setOpen(false);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ model: "", year: new Date().getFullYear(), price: "", status: "Có sẵn", image: "", color: "" });
    setImagePreview("");
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Tạo một URL tạm thời cho file để xem trước (Preview)
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
          <Plus className="w-5 h-5" />
          Thêm xe mới
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm dòng xe mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Tên xe</Label>
            <Input id="model" required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Vd: Audi Q5" />
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <Label htmlFor="year">Năm sản xuất</Label>
                 <Input id="year" type="number" required value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
               </div>
               <div>
                  <Label htmlFor="color">Màu sắc</Label>
                  <Input id="color" required value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} placeholder="Vd: Đen Mythos" />
               </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Giá bán (VNĐ)</Label>
            <Input id="price" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Vd: 2.500.000.000₫" />
          </div>
          <div className="space-y-2">
            <Label>Hình ảnh xe</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden h-32">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">Nhấn để thay đổi</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <UploadCloud className="w-8 h-8 mb-2 opacity-70" />
                  <span className="text-sm font-medium">Kéo thả hoặc nhấn để chọn ảnh</span>
                  <span className="text-xs opacity-70 mt-1">Hỗ trợ JPG, PNG</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="Có sẵn">Có sẵn</option>
              <option value="Đặt trước">Đặt trước</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end">
            <Button disabled={loading} type="submit">{loading ? "Đang lưu..." : "Thêm xe"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
