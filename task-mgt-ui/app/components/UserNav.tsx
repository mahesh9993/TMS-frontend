"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const UserNav = () => {

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
        </div>
        <div className="flex space-x-4 items-center">
        <a onClick={handleLogOut} className=
          "bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm cursor-pointer">Log out</a>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default UserNav