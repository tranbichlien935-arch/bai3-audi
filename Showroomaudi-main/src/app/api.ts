import { Car, Customer } from './types';

// Sử dụng URL backend ASP.NET của bạn. Mặc định là /api/Cars.
const API_BASE_URL = 'https://localhost:7264/api';

export const carService = {
  getCars: async (): Promise<Car[]> => {
    try {
      // Gọi fetch tới ASP.NET
      const response = await fetch(`${API_BASE_URL}/Cars`);
      if (!response.ok) {
        throw new Error('API request failed: ' + response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cars (Using fallback data):', error);
      throw error;
    }
  },
  addCar: async (car: Omit<Car, "id">): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/Cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    if (!response.ok) {
      throw new Error('API request failed: ' + response.statusText);
    }
    return await response.json();
  }
};

const initialFallbackCustomers: Customer[] = [
  { id: 1, name: "Phạm Văn Minh", email: "p.minh@example.com", phone: "0901234567", interestedIn: "Audi e-tron GT", status: "Đang tư vấn", joinDate: "2026-04-20" },
  { id: 2, name: "Trần Thị Ánh", email: "anh.tran@gmail.com", phone: "0912345678", interestedIn: "Audi Q8", status: "Hẹn lái thử", joinDate: "2026-04-25" },
  { id: 3, name: "Lê Hoàng Long", email: "long.le@company.vn", phone: "0987654321", interestedIn: "Audi A8 L", status: "Khách mới", joinDate: "2026-04-28" },
  { id: 4, name: "Nguyễn Thu Hà", email: "ha.nguyen@outlook.com", phone: "0934567890", interestedIn: "Audi RS e-tron GT", status: "Đã mua xe", joinDate: "2026-03-15" }
];

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Customers`);
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return await response.json();
    } catch (error) {
      console.log('Backend offline, using LocalStorage for customers');
      const localData = localStorage.getItem('mock_customers');
      if (localData) {
        return JSON.parse(localData);
      } else {
        localStorage.setItem('mock_customers', JSON.stringify(initialFallbackCustomers));
        return initialFallbackCustomers;
      }
    }
  },
  addCustomer: async (customer: Omit<Customer, "id" | "joinDate">): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return await response.json();
    } catch (error) {
      // Lưu tạm vào LocalStorage nếu không có backend
      const newCustomer = { 
        ...customer, 
        id: Math.random().toString(36).substr(2, 9),
        joinDate: new Date().toISOString().split('T')[0]
      };
      const localData = localStorage.getItem('mock_customers');
      const currentCustomers = localData ? JSON.parse(localData) : initialFallbackCustomers;
      currentCustomers.unshift(newCustomer); // Thêm lên đầu danh sách
      localStorage.setItem('mock_customers', JSON.stringify(currentCustomers));
      return newCustomer as Customer;
    }
  },
  updateCustomer: async (id: string | number, payload: Partial<Customer>): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('API request failed');
      return await response.json();
    } catch (error) {
      // Mock update to localStorage
      const localData = localStorage.getItem('mock_customers');
      let currentCustomers = localData ? JSON.parse(localData) : initialFallbackCustomers;
      currentCustomers = currentCustomers.map((c: Customer) => c.id === id ? { ...c, ...payload } : c);
      localStorage.setItem('mock_customers', JSON.stringify(currentCustomers));
      return currentCustomers.find((c: Customer) => c.id === id) || ({} as Customer);
    }
  }
};
