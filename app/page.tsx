'use client';

import { useState } from 'react';
import cars from '@/data/cars.json';
import CarCard from 'components/CarCard';

type Car = typeof cars[number];
type CarType = Car['carType'];

//view the cars by types
const groupCarsByType = (carList: Car[]) => {
  const groups: Record<CarType, Car[]> = {};
  carList.forEach((car) => {
    if (!groups[car.carType]) {
      groups[car.carType] = [];
    }
    groups[car.carType].push(car);
  });
  return groups;
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchTerm(value);

  if (value.trim() === '') {
    setSuggestions([]);
    return;
  }

  const keyword = value.toLowerCase();
  const allKeywords = cars.flatMap(car => [
    car.brand,
    car.carModel,
    car.carType
  ]);

  const uniqueMatches = Array.from(new Set(
    allKeywords.filter(item =>
      item.toLowerCase().includes(keyword)
    )
  )).slice(0, 3); // limit 3 suggestions

  setSuggestions(uniqueMatches);
};

  //fuzzy search for searching bar
  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.carModel} ${car.carType}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const groupedCars = groupCarsByType(filteredCars);

  return (
    <>
    <main className="p-6 space-y-12">

    <div className="flex justify-between items-center mb-6">
      {/* menu botton on the left */}
  <button
    onClick={() => setMenuOpen(true)}
    className="text-gray-700 font-medium hover:text-black"
  >
    ☰ Menu
  </button>

  {/* search bar on the right */}
    <div className="relative w-full max-w-md">
  <input
    type="text"
    placeholder="Search cars..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-sm"
  />

  {/* suggestions list */}
  {suggestions.length > 0 && (
    <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded shadow-md">
      {suggestions.map((s, index) => (
        <li
          key={index}
          onClick={() => {
            setSearchTerm(s);
            setSuggestions([]);
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
        >
          {s}
        </li>
      ))}
    </ul>
  )}
</div>
</div>

      {/* showing the cars list by types */}
      {Object.entries(groupedCars).map(([type, carsInType]) => (
        <section key={type}>
          {/* Types of cars */}
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{type}</h2>

          {/* Show the cars that in same type */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carsInType.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      ))}
    </main>
      {/* 侧拉菜单 */}
      {menuOpen && (
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 space-y-4">
        <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-black mb-4">
          ✕ Close
        </button>
        <ul className="space-y-3 font-medium text-gray-800">
        <li><a href="/aboutus">About Us</a></li>
        <li><a href="/storeslocation">Stores Location</a></li>
        <li><a href="/contactus">Contact Us</a></li>
        <li><a href="/policy">Policy</a></li>
        </ul>
      </div>
    )}
    </>
  );
}