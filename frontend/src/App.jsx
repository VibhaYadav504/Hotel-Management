import React from 'react'
import { Routes, Route } from 'react-router-dom'
import WebLayout from './Layout/Web/WebLayout'
import Home from './pages/Web/Home'
import About from './pages/Web/About'
import Room from './pages/Web/Room'
import Staff from './pages/Web/Staff'
import Booking from './pages/Web/Booking'
import Customer from './pages/Web/Customer'

import Login from './Login'
import AdminLayout from './Layout/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/Dashboard/Dashboard'

import AdminStaff from './pages/Admin/Staff/Staff'
import StaffForm from './pages/Admin/Staff/Components/StaffForm'
import EditStaff from './pages/Admin/Staff/Components/EditStaff'

import AdminBooking from './pages/Admin/booking/Booking'
import BookingTable from "./pages/Admin/booking/components/BookingTable";
import BookingForm from './pages/Admin/booking/components/BookingForm'
import EditBooking from './pages/Admin/booking/components/EditBooking'

import AdminRoom from './pages/Admin/Room/Room'
import RoomForm from './pages/Admin/Room/Components/RoomForm'
import EditRoom from './pages/Admin/Room/Components/EditRoom'

import AdminCustomer from './pages/Admin/Customer/Customer'
import CustomerForm from './pages/Admin/Customer/Components/CustomerForm'
import EditCustomer from './pages/Admin/Customer/Components/EditCustomer'
import CustomerTable from './pages/Admin/Customer/Components/CustomerTable'
import RoomTable from './pages/Admin/Room/Components/RoomTable'


const App = () => {
  return (
    <Routes>

      {/* Web Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/room" element={<Room />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Layout Wrapper */}
      <Route path="/admin" element={<AdminLayout />}>

        {/* Dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* Staff */}
        <Route path="/admin/staff" element={<AdminStaff />} />
         <Route path='/admin/stafftale' element={<CustomerTable/>}/>
        <Route path="/admin/staff/add" element={<StaffForm />} />
        <Route path="/admin/staff/edit/:id" element={<EditStaff />} />

        {/* Customer */}
        <Route path="/admin/customer" element={<AdminCustomer />} />
        <Route path='/admin/customertable' element={<CustomerTable/>}/>
        <Route path="/admin/customerform/add" element={<CustomerForm />} />
        <Route path="/admin/customer/edit/:id" element={<EditCustomer />} />

        {/* Room */}
        <Route path="/admin/room" element={<AdminRoom />} />
           <Route path='/admin/roomtable' element={<RoomTable/>}/>
        <Route path="/admin/room/add" element={<RoomForm />} />
        <Route path="/admin/room/edit/:id" element={<EditRoom />} />

        {/* Booking */}
        <Route path="/admin/booking" element={<AdminBooking />} />
        <Route path="/admin/bookingtable" element={<BookingTable/>} />
        <Route path="/admin/booking/add" element={<BookingForm />} />
        <Route path="/admin/booking/edit/:id" element={<EditBooking />} />

      </Route>

    </Routes>
  )
}
export default App
