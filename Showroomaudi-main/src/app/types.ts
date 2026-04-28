export interface Car {
  id: number | string;
  model: string;
  year: number;
  price: string | number;
  status: string;
  image: string;
  color: string;
}

export interface Customer {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  interestedIn: string;
  status: "Khách mới" | "Đang tư vấn" | "Đã mua xe" | "Hẹn lái thử";
}
