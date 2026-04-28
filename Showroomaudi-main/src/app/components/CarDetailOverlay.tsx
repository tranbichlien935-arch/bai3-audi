import { Car as CarType } from "../types";
import { ArrowLeft, CheckCircle2, Zap, Shield, BatteryCharging, Gauge } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface Props {
  car: CarType;
  onBack: () => void;
  onBook: () => void;
}

export function CarDetailOverlay({ car, onBack, onBook }: Props) {
  // Tính năng giả lập (Bởi vì Server hiện chỉ lưu các trường cơ bản)
  const features = [
    { title: "Không gian kỹ thuật số", desc: "Khoang lái ảo Audi virtual cockpit plus kết hợp màn hình 14.5 inch OLED tích hợp mượt mà, tạo ra không gian điều khiển tập trung và rành mạch.", img: "https://images.unsplash.com/photo-1620882813898-a61195d8cb9a?w=800&q=80" },
    { title: "Công nghệ đèn OLED", desc: "Hệ thống đèn hậu OLED mang lại diện mạo độc bản cho Audi. Ứng dụng công nghệ chiếu sáng tiên phong, hệ thống đèn mang lại độ tương phản sắc nét và thông minh.", img: "https://images.unsplash.com/photo-1655169229007-8e6ff3c2bc6a?w=800&q=80" },
    { title: "Khí động học tối ưu", desc: "Sự kết hợp hoàn hảo giữa hiệu năng và thiết kế. Mọi đường nét đều được vuốt tỉ mỉ để tối giản lực cản gió, tăng tốc độ và tiết kiệm năng lượng vượt trội.", img: "https://images.unsplash.com/photo-1614026480418-f29910d6e6ab?w=800&q=80" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-y-auto font-['Inter'] text-zinc-100"
    >
      {/* Thanh điều hướng dính (Sticky Header) giống hình mẫu */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#111111]/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] tracking-wide">{car.model}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={onBook} 
            className="bg-[#333333] hover:bg-[#444444] text-white rounded-full px-4 md:px-6 h-10 border border-white/10 font-medium"
          >
            Nhận báo giá chi tiết
          </Button>
          <Button 
            onClick={onBook} 
            className="hidden md:flex bg-white hover:bg-zinc-200 text-black rounded-full px-6 h-10 font-medium"
          >
            Đặt lịch Lái thử
          </Button>
        </div>
      </div>

      {/* Hero Banner Chính */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <img 
          src={car.image} 
          alt={car.model} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent p-8 md:p-16 flex flex-col justify-end">
          <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1,y:0}} transition={{delay: 0.3}}>
            <span className="text-primary font-bold tracking-widest uppercase mb-2 block">{car.status}</span>
            <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white mb-4">{car.model}</h1>
            <p className="text-2xl text-zinc-300 font-light mb-8">Giá từ <strong className="text-white font-['Space_Grotesk']">{car.price}</strong></p>
          </motion.div>
        </div>
      </div>

      {/* Grid Thông số kĩ thuật Nhanh */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <div className="px-4 text-center">
            <Gauge className="w-8 h-8 text-primary mx-auto mb-4 opacity-80" />
            <h4 className="text-3xl font-['Space_Grotesk'] font-medium mb-1">3.3s</h4>
            <p className="text-zinc-500 text-sm">Tăng tốc 0-100 km/h</p>
          </div>
          <div className="px-4 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-4 opacity-80" />
            <h4 className="text-3xl font-['Space_Grotesk'] font-medium mb-1">488km</h4>
            <p className="text-zinc-500 text-sm">Quãng đường tối đa (WLTP)</p>
          </div>
          <div className="px-4 text-center">
            <BatteryCharging className="w-8 h-8 text-primary mx-auto mb-4 opacity-80" />
            <h4 className="text-3xl font-['Space_Grotesk'] font-medium mb-1">22.5m</h4>
            <p className="text-zinc-500 text-sm">Sạc 5% - 80% (Siêu tốc)</p>
          </div>
          <div className="px-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-4 opacity-80" />
            <h4 className="text-3xl font-['Space_Grotesk'] font-medium mb-1">5 Sao</h4>
            <p className="text-zinc-500 text-sm">Chuẩn an toàn Euro NCAP</p>
          </div>
        </div>
      </div>

      {/* Grid Tính năng chi tiết (Bố cục như hình mẫu) */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-16">Nâng tầm trải nghiệm.</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={feature.img} 
                  alt={feature.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h4 className="text-2xl font-['Space_Grotesk'] font-medium text-white mb-3">{feature.title}</h4>
              <p className="text-zinc-400 text-base leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Khối gọi Hành Động cuối Trang */}
      <div className="py-24 bg-zinc-900 border-t border-white/5 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold mb-6">Sẵn sàng để sở hữu {car.model}?</h2>
        <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Thiết kế xe và nhận báo giá chi tiết, hoặc trò chuyện trực tiếp cùng chuyên viên của chúng tôi.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onBook} className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 h-14 px-8 text-base font-semibold uppercase tracking-wide">Tiếp tục đặt lịch</Button>
          <Button onClick={onBack} variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-black h-14 px-8 text-base uppercase tracking-wide">Quay lại danh mục</Button>
        </div>
      </div>
    </motion.div>
  );
}
