"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';

const AdminNav = () => {

  const router = useRouter();

  const handleLogOut = () => {
    sessionStorage.removeItem("loggedUser");
    router.push('/');
  }

  return (
    <nav>
    <div className="">
      <div className="flex justify-between h-16 px-10 shadow items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">TMS</h1>
          <div className="hidden md:flex justify-around space-x-4">
            <Link href="/admin/users" className="hover:text-indigo-600 text-gray-700">Users</Link>
            <Link href="/admin/tasks" className="hover:text-indigo-600 text-gray-700">Tasks</Link>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <a onClick={handleLogOut}
           className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm cursor-pointer">Log out</a>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default AdminNav