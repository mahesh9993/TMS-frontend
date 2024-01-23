"use client"
import { Transition, Dialog } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

interface EditUserProps{
    userId: number | undefined;
    setUpdateResponse: React.Dispatch<React.SetStateAction<any>>;
    
}

const EditUser: React.FC<EditUserProps> = ({userId,setUpdateResponse}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        designation: "",
      });

    function closeForm(){
        setIsOpen(false);
    }

    function openForm() {
        setIsOpen(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
      };

    useEffect(() => {
      const fetchData =async () => {
        try {
            
            const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
            setUser(response.data.data);
            openForm();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      if(userId){
        fetchData();
      }
    }, [userId])


    const updateUser =async () => {
        
        
        const response = await axios.put(`http://localhost:8080/api/v1/users/${userId}`, user);
        
        if(!response.data){
            
            throw new Error("User not saved");
        }else{
            const data = response.data.data;
            //console.log(data);
            alert("User Updated");
            setUpdateResponse(data);
        }

        clearForm();
    }


    const clearForm = () => {
        
        setUser({
            userName: "",
            designation: "",
        });

        setIsOpen(false);
    }
    

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeForm}>
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform  bg-gray-200 shadow-xl rounded-md">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              Update User
            </Dialog.Title>
            <div className="flex max-w-md max-auto">
              <div className="py-2">
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    User Name
                  </label>
                  <input type="text" name="userName" value={user.userName} onChange={(e) => handleChange(e)} 
                  className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    Designation
                  </label>
                  <input type="text" name="designation" value={user.designation} onChange={(e) => handleChange(e)}
                   className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="h-14 my-4 space-x-4 pt-4">
                  <button onClick={updateUser}
                  className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6 cursor-pointer">
                    Update
                  </button>
                  <button onClick={clearForm}
                  className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 cursor-pointer">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  </>
  )
}

export default EditUser