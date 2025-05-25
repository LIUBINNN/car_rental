'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import cars from '@/data/cars.json';

export default function ReservationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('carId');

  const [car, setCar] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    license: '',
    startDate: '',
    days: 1
  });
  const [total, setTotal] = useState(0);

  // locate selected car
  useEffect(() => {
    const found = cars.find((c) => c.id.toString() === id);
    if (found) {
      setCar(found);
      setTotal(found.pricePerD);
    } else {
      router.push('/');
    }
  }, [id, router]);

  // auto-calculate total
  useEffect(() => {
    if (car) {
      setTotal(car.pricePerD * form.days);
    }
  }, [form.days, car]);

  // handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'days' ? parseInt(value) : value });
  };

  // handle submit
  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('submittedOrders') || '[]');

    existing.push({
      id: Date.now().toString(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      license: form.license,
      startDate: form.startDate,
      days: form.days,
      total,
      carModel: `${car.brand} ${car.carModel}`
    });

    localStorage.setItem('submittedOrders', JSON.stringify(existing));
    alert('Reservation submitted successfully!');
    router.push('/');
  };

  if (!car) return null;

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-2">
        Rent: {car.brand} {car.carModel}
      </h2>
      <p className="text-gray-600">{car.carType}</p>
      <p className="text-green-600 font-medium">${car.pricePerD}/day</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Pegi Mu"
          className="w-full border px-3 py-2 rounded"
          required
          pattern="[A-Za-z\s]{2,50}"
          title="2–50 letters and spaces"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 0412345678"
            className="w-full border px-3 py-2 rounded"
            required
            pattern="^0[0-9]{9}$"
            title="10 digits starting with 0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="e.g. john@example.com"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">License</label>
          <input
            name="license"
            value={form.license}
            onChange={handleChange}
            placeholder="e.g. NSW 12345678"
            className="w-full border px-3 py-2 rounded"
            required
            pattern="^[A-Za-z0-9\\s]{5,15}$"
            title="5–15 characters, letters/numbers/spaces"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Days</label>
          <input
            name="days"
            type="number"
            value={form.days}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={1}
            max={30}
            required
          />
        </div>

        <p className="font-semibold">Total: ${total}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit Reservation
        </button>
      </form>
    </main>
  );
}
