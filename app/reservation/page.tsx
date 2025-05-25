'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import cars from '@/data/cars.json';

// Initial form state
const initialForm = {
  name: '',
  phone: '',
  email: '',
  license: '',
  startDate: '',
  days: 0,
};

export default function ReservationPage() {
  const [form, setForm] = useState(initialForm);         // Form state
  const [total, setTotal] = useState(0);                 // Total rental cost
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  const car = cars.find((c) => c.id.toString() === carId);  // Get selected car by ID

  // Load draft from localStorage on first load
  useEffect(() => {
    const draft = localStorage.getItem('reservationDraft');
    if (draft) {
      setForm(JSON.parse(draft));
    }
  }, []);

  // Auto-save draft to localStorage on form change
  useEffect(() => {
    localStorage.setItem('reservationDraft', JSON.stringify(form));
  }, [form]);

  // Update total cost whenever days change
  useEffect(() => {
    if (car) {
      setTotal(car.pricePerD * form.days);
    }
  }, [form.days, car]);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form and store order
  const handleSubmit = () => {
    const submitted = JSON.parse(localStorage.getItem('submittedOrders') || '[]');

    submitted.push({
      id: Date.now().toString(),
      ...form,
      carModel: `${car?.brand} ${car?.carModel}`,
      days: form.days,
      total,
    });

    localStorage.setItem('submittedOrders', JSON.stringify(submitted));
    localStorage.removeItem('reservationDraft');

    alert(`Reservation submitted. Total: $${total}`);
    router.push('/');
  };

  // Fallback if car not found
  if (!car) return null;

  // JSX UI rendering
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{car.brand} {car.carModel}</h1>
      <p className="text-sm">{car.carType}</p>
      <p className="text-sm font-medium">${car.pricePerD}/day</p>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="text-sm font-semibold mb-1 block">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. John Smith"
            className="border px-3 py-2 rounded w-full"
            required
            pattern="^[A-Za-z\s]{2,50}$" // Only letters and spaces, 2–50 characters
            title="Name should be 2–50 characters long and only contain letters or spaces"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="text-sm font-semibold mb-1 block">Phone</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 0412 345 678"
            className="border px-3 py-2 rounded w-full"
            required
            pattern="^0[0-9]{9}$" // Australian mobile number format
            title="Phone number must be 10 digits starting with 0 (e.g. 0412345678)"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="text-sm font-semibold mb-1 block">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            className="border px-3 py-2 rounded w-full"
            type="email"
            required
          />
        </div>

        {/* License Field */}
        <div>
          <label htmlFor="license" className="text-sm font-semibold mb-1 block">License</label>
          <input
            id="license"
            name="license"
            value={form.license}
            onChange={handleChange}
            placeholder="e.g. NSW 12345678"
            className="border px-3 py-2 rounded w-full"
            required
            pattern="^[A-Za-z0-9\s]{5,15}$"
            title="License should be 5–15 characters long and contain letters, numbers or spaces"
          />
        </div>

        {/* Start Date Field */}
        <div>
          <label htmlFor="startDate" className="text-sm font-semibold mb-1 block">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            type="date"
            className="border px-3 py-2 rounded w-full"
            required
            min={new Date().toISOString().split('T')[0]} // Block past dates
          />
        </div>

        {/* Days Field */}
        <div>
          <label htmlFor="days" className="text-sm font-semibold mb-1 block">Days</label>
          <input
            id="days"
            name="days"
            type="number"
            min="1"
            value={form.days}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        {/* Display Total */}
        <p className="font-medium">Total: ${total}</p>

        {/* Submit Button */}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Submit Order
        </button>
      </form>
    </div>
  );
}