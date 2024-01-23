"use client"
import AdminNav from '@/app/components/AdminNav'
import React, { useEffect } from 'react'
import AddTask from '@/app/components/AddTask'
import { useRouter } from 'next/navigation';

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
          Manage Tasks</h1></div>
        <AddTask/>
    </div>
  )
}

export default page