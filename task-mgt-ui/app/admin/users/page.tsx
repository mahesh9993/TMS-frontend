"use client"
import AdminNav from '@/app/components/AdminNav'
import ManageUser from '@/app/components/AddUser'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter();

  const userId = sessionStorage.getItem("loggedAdmin");

  useEffect(() => {
    if(!userId){
      router.push('/');
    }
  }, [])
  

  return (
    <div>
        <AdminNav/>
        <div className="text-center mt-4"><h1 className="text-xl lg:text-2xl font-bold cursor-default">
          Manage Users</h1></div>
        <ManageUser/>
        
    </div>
  )
}

export default page