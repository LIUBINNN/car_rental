'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const [form, setForm] = useState({
    carId: searchParams.get('carName'),
    name: '',
    phone: '',
    email: '',
    license: '',
    startDate: '',
    days: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'days' ? Number(value) : value,
    });
  };

  const isFormValid = () => {
    return (
      form.name.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.license.trim() &&
      form.startDate.trim() &&
      form.days > 0
    );
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;
    const licenseRegex = /^[A-Za-z0-9\s]{5,20}$/;

    if (!emailRegex.test(form.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!phoneRegex.test(form.phone)) {
      toast.error('Phone must be 10 digits and start with 0');
      return false;
    }
    if (!licenseRegex.test(form.license)) {
      toast.error('License format is invalid');
      return false;
    }
    if (form.startDate < today) {
      toast.error('Start Date cannot be in the past');
      return false;
    }
    return true;
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Reservation Form</h1>

      <label className="block">
        <span className="text-sm font-medium">Name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="e.g. John Smith"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Phone</span>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="e.g. 0412345678"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="e.g. john@example.com"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">License</span>
        <input
          name="license"
          value={form.license}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="e.g. NSW 12345678"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Start Date</span>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          min={today}
          className="w-full border px-3 py-2 rounded mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Days</span>
        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          min={1}
          className="w-full border px-3 py-2 rounded mt-1"
          required
        />
      </label>

      <button
        disabled={!isFormValid()}
        onClick={() => {
          if (!validateForm()) return;
          setShowDialog(true);
        }}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded mt-4 disabled:opacity-50"
      >
        Submit Reservation
      </button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div><strong>Car ID:</strong> {form.carId}</div>
                <div><strong>Name:</strong> {form.name}</div>
                <div><strong>Phone:</strong> {form.phone}</div>
                <div><strong>Email:</strong> {form.email}</div>
                <div><strong>License:</strong> {form.license}</div>
                <div><strong>Start Date:</strong> {form.startDate}</div>
                <div><strong>Days:</strong> {form.days}</div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast("Reservation submitted.");
                setShowDialog(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
