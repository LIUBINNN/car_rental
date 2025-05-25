'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  name: string;
  carModel: string;
  days: number;
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const localOrders = localStorage.getItem('submittedOrders');
    if (localOrders) {
      setOrders(JSON.parse(localOrders));
    }
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submitted Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-md shadow-sm">
              <p>
                <span className="font-semibold">Customer:</span> {order.name}
              </p>
              <p>
                <span className="font-semibold">Car:</span> {order.carModel}
              </p>
              <p>
                <span className="font-semibold">Days:</span> {order.days}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ${order.total}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
