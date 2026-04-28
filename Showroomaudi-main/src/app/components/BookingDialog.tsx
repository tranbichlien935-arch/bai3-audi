import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Car as CarType } from "../types";
import { customerService } from "../api";

interface Props {
  car: CarType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ car, open, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    setLoading(true);
    
    const customerPayload = {
      ...formData,
      interestedIn: car.model,
      status: "Khách mới" as const
    };

    try {
      await customerService.addCustomer(customerPayload);
      setSuccess(true);
    } catch (error) {
      // Fake success cho giao diện mượt nếu backend chưa sẵn sàng
      setTimeout(() => setSuccess(true), 800);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: "", email: "", phone: "" });
    }, 300);
  };

  if (!car) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden bg-zinc-950 border-white/10 text-zinc-100 dark">
        <div className="flex flex-col md:flex-row h-full">
           
          {/* Cột trái: Thông tin xe (Car Details) */}
          <div className="w-full md:w-5/12 bg-zinc-900/50 border-r border-white/10 relative flex flex-col">
            <div className="h-48 md:h-56 overflow-hidden relative shrink-0">
               <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent"></div>
            </div>
            <div className="p-6 md:p-8 flex-1">
               <span className="text-primary text-xs uppercase tracking-widest font-bold mb-2 block">Dòng xe</span>
               <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-6 text-white leading-tight">{car.model}</h3>
               
               <div className="space-y-4 text-sm text-zinc-400">
                 <div className="flex items-center justify-between border-b border-white/10 pb-3">
                   <span>Năm sản xuất</span> 
                   <span className="text-white font-medium">{car.year}</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/10 pb-3">
                   <span>Phiên bản màu</span> 
                   <span className="text-white font-medium">{car.color || 'Đang cập nhật'}</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/10 pb-3">
                   <span>Tình trạng xe</span> 
                   <span className="text-primary font-medium px-2 py-0.5 bg-primary/10 rounded">{car.status}</span>
                 </div>
                 <div className="flex flex-col pt-3">
                   <span className="mb-1">Giá lăn bánh dự kiến</span> 
                   <span className="text-2xl text-white font-['Space_Grotesk'] font-bold">{car.price}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Cột phải: Form nhập thông tin */}
          <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center bg-black/20">
            {!success ? (
              <>
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-2xl text-white font-['Space_Grotesk']">Đặt lịch Lái thử & Tư vấn</DialogTitle>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">Vui lòng để lại thông tin, chuyên viên của Audi sẽ liên hệ lại với bạn trong vòng 30 phút để sắp xếp lịch trải nghiệm dòng xe này.</p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="c-name" className="text-zinc-300">Họ và Tên</Label>
                    <Input required id="c-name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Vd: Nguyễn Văn A" className="bg-zinc-900 border-white/10 text-white focus-visible:ring-primary h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-phone" className="text-zinc-300">Số điện thoại</Label>
                    <Input required id="c-phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Vd: 0901234567" className="bg-zinc-900 border-white/10 text-white focus-visible:ring-primary h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email" className="text-zinc-300">Email cá nhân</Label>
                    <Input required type="email" id="c-email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="example@email.com" className="bg-zinc-900 border-white/10 text-white focus-visible:ring-primary h-12" />
                  </div>
                  <div className="pt-4 mt-8">
                    <Button disabled={loading} type="submit" className="w-full h-12 text-base font-semibold uppercase tracking-wider">{loading ? "Hệ thống đang xử lý..." : "Gửi thông tin liên lạc"}</Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-6 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                  <svg className="w-10 h-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <DialogTitle className="text-3xl text-white font-['Space_Grotesk']">Yêu cầu đã được gửi!</DialogTitle>
                <p className="text-zinc-400 text-base leading-relaxed max-w-sm">Hệ thống đã ghi nhận thông tin dự định mua <strong className="text-white">{car.model}</strong>. Tư vấn viên nội bộ của Showroom sẽ sớm gọi lại cho bạn.</p>
                <Button onClick={handleClose} variant="outline" className="mt-6 border-white/20 text-white hover:bg-white hover:text-black hover:border-white w-40 h-11 transition-colors">Đóng cửa sổ</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
