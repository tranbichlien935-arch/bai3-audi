import { motion } from "motion/react";
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Bell,
  Settings,
  Menu
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { AddCarDialog } from "./components/AddCarDialog";
import { AuthPage } from "./components/AuthPage";
import { useState, useEffect } from "react";
import { carService, customerService } from "./api";
import { Car as CarType, Customer } from "./types";
import { Phone, Mail, MoreVertical, LogOut } from "lucide-react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<any>(null); // Trạng thái đăng nhập

// Dữ liệu mẫu (fallback) trong trường hợp API ASP.NET chưa chạy
  const fallbackCars: CarType[] = [
    {
      id: 1,
      model: "Audi e-tron GT",
      year: 2026,
      price: "4.250.000.000₫",
      status: "Có sẵn",
      image: "https://images.unsplash.com/photo-1761738217531-44a249d1dc87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxhdWRpJTIwbHV4dXJ5JTIwY2FyJTIwc2hvd3Jvb218ZW58MXx8fHwxNzc3MjYzODYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "Trắng Glacier"
    },
    {
      id: 2,
      model: "Audi RS e-tron GT",
      year: 2026,
      price: "5.890.000.000₫",
      status: "Có sẵn",
      image: "https://images.unsplash.com/photo-1758793247787-ea01d636512c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxhdWRpJTIwbHV4dXJ5JTIwY2FyJTIwc2hvd3Jvb218ZW58MXx8fHwxNzc3MjYzODYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "Bạc Floret"
    },
    {
      id: 3,
      model: "Audi Q8 e-tron",
      year: 2026,
      price: "3.750.000.000₫",
      status: "Đặt trước",
      image: "https://images.unsplash.com/photo-1758793248478-53e4461acedf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxhdWRpJTIwbHV4dXJ5JTIwY2FyJTIwc2hvd3Jvb218ZW58MXx8fHwxNzc3MjYzODYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "Xanh Navarra"
    },
    {
      id: 4,
      model: "Audi A8 L",
      year: 2026,
      price: "6.200.000.000₫",
      status: "Có sẵn",
      image: "https://images.unsplash.com/photo-1747000239166-4d336a458a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8YXVkaSUyMGx1eHVyeSUyMGNhciUyMHNob3dyb29tfGVufDF8fHx8MTc3NzI2Mzg2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "Đen Mythos"
    }
  ];

  const fallbackCustomers: Customer[] = [
    { id: 1, name: "Phạm Văn Minh", email: "p.minh@example.com", phone: "0901234567", interestedIn: "Audi e-tron GT", status: "Đang tư vấn", joinDate: "2026-04-20" },
    { id: 2, name: "Trần Thị Ánh", email: "anh.tran@gmail.com", phone: "0912345678", interestedIn: "Audi Q8", status: "Hẹn lái thử", joinDate: "2026-04-25" },
    { id: 3, name: "Lê Hoàng Long", email: "long.le@company.vn", phone: "0987654321", interestedIn: "Audi A8 L", status: "Khách mới", joinDate: "2026-04-28" },
    { id: 4, name: "Nguyễn Thu Hà", email: "ha.nguyen@outlook.com", phone: "0934567890", interestedIn: "Audi RS e-tron GT", status: "Đã mua xe", joinDate: "2026-03-15" }
  ];

  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getCars();
        setCars(data);
      } catch (error) {
        // Nếu không gọi được API, dùng dữ liệu giả lập (để bạn test dễ dàng)
        setCars(fallbackCars);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchCustomersData = async () => {
      try {
        const data = await customerService.getCustomers();
        setCustomers(data);
      } catch (error) {
        setCustomers(fallbackCustomers);
      } finally {
        setLoadingCustomers(false);
      }
    };
    
    fetchCars();
    fetchCustomersData();
  }, []);

  const handleCarAdded = (newCar: CarType) => {
    setCars((prev: CarType[]) => [newCar, ...prev]);
  };

  const handleUpdateCustomerStatus = async (id: string | number, newStatus: Customer['status']) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    try {
      await customerService.updateCustomer(id, { status: newStatus });
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái", error);
    }
  };

  const stats = [
    { label: "Tổng xe hiện có", value: cars.length.toString(), change: "+3", icon: Car },
    { label: "Đã bán tháng này", value: "12", change: "+18%", icon: TrendingUp },
    { label: "Khách hàng", value: "156", change: "+24", icon: Users },
    { label: "Lịch hẹn", value: "8", change: "Hôm nay", icon: Calendar }
  ];

  if (!user) {
    return <AuthPage onLoginSuccess={(u) => setUser(u)} />
  }

  return (
    <div className="min-h-screen bg-background flex font-['Inter']">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border z-50"
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.18l6 3v9.64l-6 3-6-3V7.18l6-3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-foreground tracking-tight font-['Space_Grotesk']">Showroomaudi</h1>
              <p className="text-muted-foreground text-sm">Quản lý hệ thống</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
            { id: "inventory", label: "Kho xe", icon: Car },
            { id: "customers", label: "Khách hàng", icon: Users },
            { id: "appointments", label: "Lịch hẹn", icon: Calendar },
            { id: "settings", label: "Cài đặt", icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm xe, khách hàng..."
                  className="pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg w-80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right">
                  <p className="text-foreground text-sm">{user.name}</p>
                  <p className="text-muted-foreground text-xs">{user.role === 'admin' ? 'Quản trị hệ thống' : 'Nhân viên bán hàng'}</p>
                </div>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{user.name.split(' ').slice(-2).map((n:string) => n[0]).join('').toUpperCase()}</span>
                </div>
                <button 
                  onClick={() => setUser(null)}
                  title="Đăng xuất"
                  className="ml-2 p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl text-foreground mb-2 font-['Space_Grotesk']">Tổng quan</h2>
                <p className="text-muted-foreground">Chào mừng trở lại, đây là thống kê hôm nay</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl text-foreground font-['Space_Grotesk']">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Inventory Section */}
          {(activeTab === "inventory" || activeTab === "dashboard") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: activeTab === "dashboard" ? 0.2 : 0 }}
              className="bg-card border border-border rounded-xl p-6 mt-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl text-foreground mb-1 font-['Space_Grotesk']">Kho xe hiện tại</h3>
                  <p className="text-muted-foreground text-sm">Quản lý và theo dõi tình trạng xe</p>
                </div>
                {activeTab === "inventory" && (
                  <AddCarDialog onSuccess={handleCarAdded} />
                )}
              </div>

              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group bg-muted/30 rounded-xl overflow-hidden hover:shadow-xl transition-all border border-border hover:border-primary/50"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={car.image}
                          alt={car.model}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            car.status === "Có sẵn"
                              ? "bg-green-500/90 text-white"
                              : "bg-yellow-500/90 text-white"
                          }`}>
                            {car.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-foreground mb-1 font-['Space_Grotesk']">{car.model}</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          {car.year} • {car.color}
                        </p>
                        <p className="text-primary text-lg font-['Space_Grotesk']">{car.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Customers Section */}
          {activeTab === "customers" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-xl mt-8 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl text-foreground mb-1 font-['Space_Grotesk']">Danh sách khách hàng</h3>
                  <p className="text-muted-foreground text-sm">Quản lý và liên hệ khách hàng tiềm năng</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
                  <Plus className="w-5 h-5" />
                  Thêm khách hàng
                </button>
              </div>
              
              {loadingCustomers ? (
                 <div className="flex justify-center p-8">
                   <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                 </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="bg-muted/30 text-foreground border-b border-border font-['Space_Grotesk']">
                      <tr>
                        <th className="px-6 py-4 font-medium">Khách hàng</th>
                        <th className="px-6 py-4 font-medium">Liên hệ</th>
                        <th className="px-6 py-4 font-medium">Quan tâm dòng xe</th>
                        <th className="px-6 py-4 font-medium">Trạng thái</th>
                        <th className="px-6 py-4 font-medium">Ngày thêm</th>
                        <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((cus, idx) => (
                        <motion.tr 
                          initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: idx*0.1}} 
                          key={cus.id} 
                          className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {cus.name.charAt(0)}
                              </div>
                              <span className="text-foreground font-medium">{cus.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 space-y-1">
                            <div className="flex items-center gap-2">
                               <Phone className="w-3 h-3" /> <span>{cus.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <Mail className="w-3 h-3" /> <span>{cus.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-foreground">{cus.interestedIn}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                              ${cus.status === 'Đã mua xe' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                cus.status === 'Hẹn lái thử' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                                cus.status === 'Đang tư vấn' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                                'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                              {cus.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{cus.joinDate}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Appointments Section */}
          {activeTab === "appointments" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-xl mt-8 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl text-foreground mb-1 font-['Space_Grotesk']">Yêu cầu liên hệ nội bộ</h3>
                  <p className="text-muted-foreground text-sm">Quản lý lịch hẹn lái thử và báo giá từ Khách hàng trực tuyến</p>
                </div>
              </div>
              
              {loadingCustomers ? (
                 <div className="flex justify-center p-8">
                   <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                 </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="bg-muted/30 text-foreground border-b border-border font-['Space_Grotesk']">
                      <tr>
                        <th className="px-6 py-4 font-medium">Khách hàng</th>
                        <th className="px-6 py-4 font-medium">Bản tin yêu cầu</th>
                        <th className="px-6 py-4 font-medium">Thời gian gửi</th>
                        <th className="px-6 py-4 font-medium text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.filter(c => c.status !== "Đã mua xe").map((cus, idx) => (
                        <motion.tr 
                          initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: idx*0.1}} 
                          key={cus.id} 
                          className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-foreground font-medium text-base mb-1">{cus.name}</span>
                              <div className="flex items-center gap-2 text-xs">
                                <Phone className="w-3 h-3" /> {cus.phone}
                              </div>
                              <div className="flex items-center gap-2 text-xs mt-0.5">
                                <Mail className="w-3 h-3" /> {cus.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-2 rounded-lg text-xs font-medium inline-block relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-lg"></div>
                                Yêu cầu xem xe & Nhận báo giá: <strong className="font-bold tracking-wide">{cus.interestedIn}</strong>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                               <span className="text-foreground">{cus.joinDate || "Vừa xong"}</span>
                               {cus.status === "Khách mới" && <span className="text-xs text-orange-400 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block animate-pulse"></span> Mới tiếp nhận</span>}
                               {cus.status === "Đang tư vấn" && <span className="text-xs text-blue-400 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> Đang xử lý</span>}
                               {cus.status === "Hẹn lái thử" && <span className="text-xs text-purple-400 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span> Đã hẹn lịch lái</span>}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                            {cus.status === "Khách mới" && (
                              <button onClick={() => handleUpdateCustomerStatus(cus.id, "Đang tư vấn")} className="bg-primary hover:bg-red-700 text-white font-semibold shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-none px-4 py-2 rounded-md text-xs transition-all">Nhận xử lý</button>
                            )}
                            {cus.status === "Đang tư vấn" && (
                              <>
                                <button onClick={() => handleUpdateCustomerStatus(cus.id, "Hẹn lái thử")} className="bg-muted hover:bg-white text-muted-foreground hover:text-black font-semibold px-3 py-2 rounded-md text-xs transition-colors border border-border">Đã chốt lịch hẹn</button>
                                <button onClick={() => handleUpdateCustomerStatus(cus.id, "Đã mua xe")} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md text-xs transition-all">Giao dịch thành công</button>
                              </>
                            )}
                            {cus.status === "Hẹn lái thử" && (
                              <button onClick={() => handleUpdateCustomerStatus(cus.id, "Đã mua xe")} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md text-xs transition-all">Xác nhận Đã Bán</button>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                      {customers.filter(c => c.status !== "Đã mua xe").length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                               <Calendar className="w-8 h-8 mx-auto mb-3 opacity-20" />
                               Không có lịch hẹn hoặc yêu cầu liên hệ nào mới.
                            </td>
                          </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Settings Section */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto mt-8"
            >
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-8 text-foreground">Cấu hình hệ thống</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Navigation */}
                <div className="md:col-span-3 space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium text-sm flex items-center justify-between">Thông tin Showroom <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span></button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-sm transition-colors">Tài khoản & Phân quyền</button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-sm transition-colors">Lưu trữ Đám mây (Cloud)</button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-sm transition-colors">Giao diện (Theme)</button>
                  
                  <div className="pt-8 border-t border-border mt-8">
                    <button onClick={() => {
                      if(window.confirm('Hành động này sẽ XÓA TOÀN BỘ dữ liệu khách hàng lưu cục bộ. Bạn có chắc chắn?')) {
                         localStorage.removeItem('mock_customers');
                         window.location.reload();
                      }
                    }} className="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 font-medium text-sm transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Xóa bộ nhớ cục bộ
                    </button>
                  </div>
                </div>

                {/* Right Content */}
                <div className="md:col-span-9 space-y-8">
                  {/* Store Details Form */}
                  <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                     <h3 className="text-xl font-['Space_Grotesk'] font-medium mb-6 pb-4 border-b border-border">Thông tin Đại lý Kinh doanh</h3>
                     
                     <div className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tên thương hiệu giao dịch</label>
                           <input type="text" defaultValue="Audi Showroom" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mã định danh đại lý</label>
                           <input type="text" defaultValue="AUDI-VN-001" disabled className="w-full bg-muted/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-muted-foreground cursor-not-allowed" />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Địa chỉ trụ sở (Mặc định)</label>
                         <input type="text" defaultValue="123 Nguyễn Văn Linh, Quận 7, TP.HCM" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hotline Chăm sóc KH</label>
                           <div className="relative">
                             <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                             <input type="text" defaultValue="1800 1234" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                           </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Tiếp nhận Booking</label>
                           <div className="relative">
                             <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                             <input type="email" defaultValue="contact@showroomaudi.vn" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-border">
                       <button className="px-5 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted font-medium transition-colors">Khôi phục</button>
                       <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.2)]">Lưu thay đổi</button>
                     </div>
                  </div>

                  {/* Cloud/API Integration configs */}
                  <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                     <h3 className="text-xl font-['Space_Grotesk'] font-medium mb-1">Tích hợp Lưu trữ & Server</h3>
                     <p className="text-sm text-muted-foreground mb-6 pb-4 border-b border-border">Cấu hình các dịch vụ bên thứ 3 và Endpoint kết nối.</p>
                     
                     <div className="space-y-5">
                       <div className="grid md:grid-cols-2 gap-5">
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex justify-between">Cloud Name <span className="text-blue-400">Đã kết nối</span></label>
                           <input type="text" defaultValue="de7z9kyem" readOnly className="w-full bg-muted/30 border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-mono" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex justify-between">Upload Preset (Unsigned) <span className="text-green-500">Bảo mật</span></label>
                           <input type="text" defaultValue="audi_upload" readOnly className="w-full bg-muted/30 border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-mono object-left" />
                         </div>
                       </div>
                       
                       <div className="bg-primary/5 text-primary p-4 rounded-lg text-sm border border-primary/10 flex items-start gap-3 mt-2">
                         <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex justify-center items-center font-bold shrink-0 mt-0.5">i</div>
                         <p className="leading-relaxed">Tính năng Upload ảnh tự động của Form "Thêm mới xe" đang kết nối thông qua Cổng Cloudinary với các Tham số trên. Để giới hạn quyền truy cập, vui lòng chỉnh sửa Preset "audi_upload" trên hệ thống quản trị <a href="#" className="underline font-medium hover:text-red-400">Cloudinary Dashboard</a>.</p>
                       </div>
                     </div>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== "dashboard" && activeTab !== "inventory" && activeTab !== "customers" && activeTab !== "appointments" && activeTab !== "settings" && (
             <div className="flex items-center justify-center p-20 text-muted-foreground">
               <p>Chức năng "{activeTab}" đang được phát triển...</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
