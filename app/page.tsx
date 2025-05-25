'use client';

import cars from '@/data/cars.json';
import CarCard, { Car } from '@/components/CarCard'; // 根据你的项目路径调整

export default function HomePage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Car Rental System</h1>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car: Car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
