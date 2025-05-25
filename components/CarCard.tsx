'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export interface Car {
  id: number
  image: string
  brand: string
  carModel: string
  carType: string
  pricePerD: number
  available?: boolean
  stock?: number
  yearOfManufacture?: number
  mileage?: string
  fuelType?: string
  vin?: string
  description?: string
}

interface CarCardProps {
  car: Car
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between border rounded-2xl shadow-md p-4 bg-white transition hover:shadow-lg">
      {/* 图像区域 */}
      <div className="flex justify-center items-center overflow-hidden rounded-lg border mb-4 h-[200px]">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.carModel}`}
          width={400}
          height={200}
          className="object-contain w-full h-full"
        />
      </div>

      {/* 文本信息区域 */}
      <div className="flex-1 space-y-1 mb-4">
        <h2 className="text-xl font-semibold truncate">
          {car.brand} {car.carModel}
        </h2>
        <p className="text-sm text-gray-500">{car.carType} • {car.fuelType ?? 'N/A'}</p>
        <p className="text-sm text-gray-500">
          {car.yearOfManufacture} • {car.mileage ?? 'Mileage unknown'}
        </p>
        <p className="text-sm text-gray-400 truncate">{car.vin}</p>
        {car.description && (
          <p className="text-sm text-gray-700 line-clamp-2">{car.description}</p>
        )}
        <p className="mt-1 text-green-600 font-semibold">
          ${car.pricePerD}/day
        </p>
        <p className="text-sm font-medium">
          {car.available !== false ? 'Available' : 'Unavailable'}
        </p>
      </div>

      {/* 操作按钮 */}
      <div>
        {car.available !== false ? (
          <div className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl p-1 shadow-sm">
            <Button
              className="w-full"
              onClick={() => router.push(`/reservation?carName=${car.brand} ${car.carModel}`)}
            >
              Rent Now
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full opacity-50 cursor-not-allowed">
            Unavailable
          </Button>
        )}
      </div>
    </div>
  )
}

export default CarCard
