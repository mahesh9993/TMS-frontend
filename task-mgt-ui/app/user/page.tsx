"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import UserNav from '../components/UserNav'
import UsersTaskList from '../components/UsersTaskList'

const user = () => {

  const router = useRouter();

  const userId = sessionStorage.getItem("loggedUser");

  useEffect(() => {
    if(!userId){
      router.push('/');
    }
  }, [])

  return (
    <div>
      <UserNav/>
      <div className="text-center mt-4"><h1 className="text-xl lg:text-2xl font-bold cursor-default">
        Manage Your Tasks</h1></div>
      <UsersTaskList/>
    </div>
  )
}

export default user