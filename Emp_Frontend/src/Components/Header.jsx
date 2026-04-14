import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <nav className='flex justify-end gap-4 bg-blue-400 p-4 text-black'>
        <NavLink to="" className={({ isActive }) => (isActive ? "text-pink-700 bg-pink-200 p-3" : "")}>Home</NavLink>
        <NavLink to="create-emp" className={({ isActive }) => (isActive ? "text-pink-700 bg-pink-200 p-3" : "")}>CreateEmp</NavLink>
        <NavLink to="list" className={({ isActive }) => (isActive ? "text-pink-700 bg-pink-200 p-3" : "")}>EmployeesList</NavLink>
    </nav>
  )
}

export default Header