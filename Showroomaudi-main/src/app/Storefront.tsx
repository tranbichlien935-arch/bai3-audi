import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Car as CarType } from "./types";
import { carService } from "./api";
import { BookingDialog } from "./components/BookingDialog";
import { CarDetailOverlay } from "./components/CarDetailOverlay";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Car, MapPin, Phone, ArrowRight, Star } from "lucide-react";

export function Storefront() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingCar, setViewingCar] = useState<CarType | null>(null);
  const [bookingCar, setBookingCar] = useState<CarType | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getCars();
        // Chỉ lấy xe có trạng thái Có sẵn hoặc Đặt trước
        setCars(data.filter((c: CarType) => c.status !== "Hết hàng"));
      } catch (error) {
        // Fallback cars in case backend is offline
        setCars([
          { id: 1, model: "Audi e-tron GT", year: 2026, price: "4.250.000.000₫", status: "Có sẵn", image: "https://images.unsplash.com/photo-1761738217531-44a249d1dc87?w=1080", color: "Trắng Glacier" },
          { id: 2, model: "Audi RS e-tron GT", year: 2026, price: "5.890.000.000₫", status: "Có sẵn", image: "https://images.unsplash.com/photo-1758793247787-ea01d636512c?w=1080", color: "Bạc Floret" },
          { id: 3, model: "Audi Q8 e-tron", year: 2026, price: "3.750.000.000₫", status: "Đặt trước", image: "https://images.unsplash.com/photo-1758793248478-53e4461acedf?w=1080", color: "Xanh Navarra" },
          { id: 4, model: "Audi A8 L", year: 2026, price: "6.200.000.000₫", status: "Có sẵn", image: "https://images.unsplash.com/photo-1747000239166-4d336a458a18?w=1080", color: "Đen Mythos" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Inter'] text-zinc-100 selection:bg-primary/30">
      <BookingDialog 
        car={bookingCar} 
        open={!!bookingCar} 
        onOpenChange={(open) => !open && setBookingCar(null)} 
      />

      {viewingCar && (
        <CarDetailOverlay 
           car={viewingCar} 
           onBack={() => setViewingCar(null)} 
           onBook={() => setBookingCar(viewingCar)} 
        />
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-['Space_Grotesk'] font-bold tracking-widest uppercase">Audi Showroom</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <a href="#" className="text-white hover:text-primary transition-colors">Trang chủ</a>
            <a href="#models" className="text-zinc-400 hover:text-white transition-colors">Dòng xe</a>
            <a href="#services" className="text-zinc-400 hover:text-white transition-colors">Dịch vụ</a>
            <a href="/admin" className="text-zinc-400 hover:text-primary transition-colors border border-white/10 px-4 py-2 rounded-full hover:border-primary/50">Đăng nhập Admin</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1920&fm=jpg" 
            alt="Audi" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">Tương lai của sự di chuyển</span>
            <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white mb-6 tracking-tight">Kỷ Nguyên Xe Điện <br/> Audi Cao Cấp</h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Khám phá sự hoàn hảo từ thiết kế khí động học, công nghệ hiện đại và sức mạnh bức phá trong từng mẫu xe Audi mới nhất.
            </p>
            <a href="#models" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-semibold hover:bg-zinc-200 transition-all rounded-sm uppercase tracking-wide text-sm">
              Xem chi tiết các dòng xe <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="models" className="py-32 relative z-10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold text-white mb-4">Các mẫu xe nổi bật</h2>
              <p className="text-zinc-400 max-w-xl">Trải nghiệm những mẫu xe hiệu suất cao và đẳng cấp nhất, có sẵn ngay tại Showroom.</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-sm text-zinc-400"><Star className="w-4 h-4 text-primary" /> Tiêu chuẩn Châu Âu</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
               <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {cars.map((car, index) => (
                <motion.div 
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative bg-zinc-900 overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <ImageWithFallback 
                      src={car.image} 
                      alt={car.model} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-black/60 backdrop-blur px-3 py-1 text-xs text-white uppercase tracking-wider">{car.status}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-1">{car.model}</h3>
                        <p className="text-zinc-400 text-sm">{car.year} • {car.color}</p>
                      </div>
                      <p className="text-primary font-['Space_Grotesk'] text-xl">{car.price}</p>
                    </div>
                    <button 
                      onClick={() => setViewingCar(car)}
                      className="w-full mt-6 border border-white/20 text-white py-3 font-medium hover:bg-white hover:text-black transition-colors uppercase text-sm tracking-wide"
                    >
                      Xem chi tiết xe
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Car className="w-8 h-8 text-primary" />
              <span className="text-xl font-['Space_Grotesk'] font-bold tracking-widest uppercase">Audi Showroom</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
               Đại lý phân phối và bảo hành hệ thống xe hơi Audi chính hãng. Mang tới trải nghiệm dịch vụ ô tô xuất sắc nhất.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium uppercase tracking-wider mb-6">Liên hệ</h4>
            <div className="space-y-4 text-zinc-400 text-sm">
              <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> 123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> Hotline: 1800 1234</p>
            </div>
          </div>
          <div>
           <h4 className="text-white font-medium uppercase tracking-wider mb-6">Quản trị</h4>
            <a href="/admin" className="text-zinc-400 text-sm hover:text-white transition-colors flex items-center gap-2">
              Chuyển tới trang đăng nhập hệ thống nội bộ <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-600 text-sm border-t border-white/5 pt-8">
          © 2026 Showroomaudi. Đã bảo hộ bản quyền.
        </div>
      </footer>
    </div>
  );
}
