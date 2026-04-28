import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Car, Eye, EyeOff } from "lucide-react";

type AuthType = "login" | "register" | "forgot";

interface Props {
  onLoginSuccess: (user: any) => void;
}

export function AuthPage({ onLoginSuccess }: Props) {
  const [authType, setAuthType] = useState<AuthType>("login");
  const [loading, setLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState("admin@showroomaudi.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập độ trễ gọi API
    setTimeout(() => {
      setLoading(false);
      if (authType === "login") {
        if (email && password) {
          // Trích xuất Tên hiển thị từ phần đầu của Email (Ví dụ: pham.minh@... -> Pham Minh)
          const prefix = email.split('@')[0];
          const derivedName = prefix.split(/[._-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Admin";
          
          onLoginSuccess({ name: derivedName, email, role: "admin" });
        } else {
          alert("Vui lòng điền đủ thông tin!");
        }
      } else if (authType === "register") {
        alert("Đăng ký thành công! Vui lòng đăng nhập lại.");
        setAuthType("login");
      } else if (authType === "forgot") {
        alert("Đã gửi link khôi phục mật khẩu vào Email của bạn. Hãy kiểm tra!");
        setAuthType("login");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-background font-['Inter'] relative overflow-hidden">
      {/* Cột trái: Hình ảnh Branding cho Audi Showroom */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900 border-r border-border items-center justify-center">
        {/* Lớp mờ đen nhẹ trên ảnh */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1920&fm=jpg" 
          alt="Audi Showroom Experience"
          className="absolute inset-0 w-full h-full object-cover zoom-in-105 duration-[30s]"
        />
        
        <div className="z-20 p-16 flex flex-col justify-end h-full w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <div className="text-white space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-['Space_Grotesk'] font-bold tracking-tight">Showroomaudi</h1>
              </div>
              <h2 className="text-4xl font-['Space_Grotesk'] font-medium leading-tight">Quản trị hệ thống<br/>Điều hành doanh nghiệp</h2>
              <p className="text-zinc-300 text-lg max-w-lg">
                Theo dõi tình trạng đơn đặt hàng, lịch hẹn lái thử và quản lý kho xe Audi phân khúc cao cấp chuyên nghiệp và dễ dàng nhất.
              </p>
            </div>
        </div>
      </div>

      {/* Cột phải: Form Đăng nhập / Đăng ký */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-card relative z-20">
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8"
         >
            <div className="text-center">
               <h2 className="text-3xl font-bold font-['Space_Grotesk'] text-foreground mb-2">
                 {authType === "login" ? "Đăng nhập hệ thống" : authType === "register" ? "Đăng ký thành viên mới" : "Khôi phục mật khẩu"}
               </h2>
               <p className="text-muted-foreground">
                 {authType === "login" && "Chào mừng trở lại quản trị Showroomaudi"}
                 {authType === "register" && "Hãy tạo tài khoản để quản trị hệ thống"}
                 {authType === "forgot" && "Nhập email của bạn để nhận liên kết đổi mật khẩu tĩnh"}
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-4">
                  {authType === "register" && (
                    <div className="space-y-2">
                       <Label>Họ và Tên</Label>
                       <Input required type="text" placeholder="Vd: Nguyễn Minh Anh" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input required type="email" placeholder="admin@showroomaudi.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  {authType !== "forgot" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Mật khẩu</Label>
                        {authType === "login" && (
                          <button type="button" onClick={() => setAuthType("forgot")} className="text-xs text-primary hover:underline font-medium">Quên mật khẩu?</button>
                        )}
                      </div>
                      <div className="relative">
                        <Input 
                          required 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={password} 
                          onChange={e => setPassword(e.target.value)} 
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
               </div>

               <Button className="w-full h-11 text-base font-medium" type="submit" disabled={loading}>
                 {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>}
                 {authType === "login" ? "Đăng nhập" : authType === "register" ? "Đăng ký ngay" : "Gửi liên kết"}
               </Button>
            </form>

            <div className="pt-4 text-center text-sm text-muted-foreground border-t border-border mt-6">
                {authType === "login" ? (
                   <p>Chưa có tài khoản? <button onClick={() => setAuthType("register")} className="text-primary hover:underline font-semibold">Đăng ký mới</button></p>
                ) : (
                   <p>Đã nhớ mật khẩu? <button onClick={() => setAuthType("login")} className="text-primary hover:underline font-semibold">Quay lại Đăng nhập</button></p>
                )}
            </div>
         </motion.div>
      </div>
    </div>
  );
}
