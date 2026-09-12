export const mockAppointments = [
  {
    id: "APT-001",
    patientName: "Rahul Das",
    phone: "9876543210",
    date: new Date().toISOString().split('T')[0], // Today
    time: "10:00 AM",
    status: "confirmed",
    reason: "Regular consultation",
    notes: "Follow-up consultation",
    createdAt: "2026-09-10"
  },
  {
    id: "APT-002",
    patientName: "Priya Ghosh",
    phone: "9830123456",
    date: new Date().toISOString().split('T')[0], // Today
    time: "10:30 AM",
    status: "pending",
    reason: "Fever and cold",
    notes: "First visit",
    createdAt: "2026-09-10"
  },
  {
    id: "APT-003",
    patientName: "Amit Roy",
    phone: "9123456789",
    date: new Date().toISOString().split('T')[0], // Today
    time: "11:00 AM",
    status: "completed",
    reason: "Routine checkup",
    notes: "Prescribed medicines",
    createdAt: "2026-09-08"
  },
  {
    id: "APT-004",
    patientName: "Sneha Sen",
    phone: "9000123456",
    date: new Date().toISOString().split('T')[0], // Today
    time: "11:30 AM",
    status: "cancelled",
    reason: "Not feeling well enough to travel",
    notes: "Patient cancelled via phone",
    createdAt: "2026-09-09"
  },
  {
    id: "APT-005",
    patientName: "Vikram Singh",
    phone: "8888888888",
    date: "2026-09-12", // Tomorrow
    time: "09:00 AM",
    status: "confirmed",
    reason: "Blood test review",
    notes: "Ensure reports are ready",
    createdAt: "2026-09-05"
  },
  {
    id: "APT-006",
    patientName: "Neha Patel",
    phone: "7777777777",
    date: "2026-09-12", // Tomorrow
    time: "09:30 AM",
    status: "pending",
    reason: "Skin allergy",
    notes: "Referred by Dr. Sharma",
    createdAt: "2026-09-10"
  },
  {
    id: "APT-007",
    patientName: "Karan Johar",
    phone: "9999999999",
    date: "2026-09-15", // Upcoming
    time: "10:00 AM",
    status: "confirmed",
    reason: "General consultation",
    notes: "",
    createdAt: "2026-09-11"
  }
];

export const mockDoctorProfile = {
  name: "Dr. Suman Pandab",
  specialization: "General Physician",
  phone: "+91 98765 43210",
  email: "dr.suman.pandab@example.com"
};

export const mockClinicInfo = {
  name: "Pandab Health Clinic",
  address: "123 Health Avenue, Sector 4, New Delhi",
  phone: "+91 11 2345 6789",
  consultationFee: "₹500"
};

export const mockScheduleSettings = {
  workingDays: {
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false
  },
  workingHours: {
    opening: "09:00 AM",
    closing: "06:00 PM"
  },
  slotDuration: "30 minutes",
  blockedDates: [
    { date: "2026-09-15", reason: "Attending Medical Conference" },
    { date: "2026-09-22", reason: "Personal Leave" },
    { date: "2026-10-02", reason: "National Holiday" }
  ]
};

export const mockAppSettings = {
  appointmentSettings: {
    defaultDuration: "30 minutes",
    maxAppointmentsPerDay: 20,
    advanceBookingPeriod: "30 days"
  },
  notifications: {
    confirmation: true,
    cancellation: true,
    reminder: true
  }
};
