"use client"
import { Transition, Dialog } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

interface EditUserTaskProps{
    taskId:number | undefined;
    setUpdateResponse: React.Dispatch<React.SetStateAction<any>>;
}

const EditUserTask: React.FC<EditUserTaskProps> = ({taskId,setUpdateResponse}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({
        status: "",
      });

    const statusOptions = ["PENDING", "PROCCESSING", "COMPLETED"];

    function closeForm(){
        setIsOpen(false);
    }

    function openForm() {
        setIsOpen(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setTask({ ...task, [e.target.name]: value });
    };

    useEffect(() => {
      const fetchData =async () => {
        try {
  
            const response = await axios.get(`http://localhost:8080/api/v1/tasks/${taskId}`);
            
            setTask(response.data.data);
            //console.log(response.data);
            openForm();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      if(taskId){
        fetchData();
      }
    }, [taskId]);
    

    const saveTask = async () => {
        const response = await axios.put(`http://localhost:8080/api/v1/tasks/user/${taskId}`, task);
        
        if(!response.data){
            throw new Error("Status Not Updated");
        }else{
            const data = response.data.data;
            //console.log(data);
            alert("status Updated to " + data );
            setUpdateResponse(data);
        }

        clearForm();
    }

    const clearForm = ()=>{

        setTask({
            status: "", 
        });

        setIsOpen(false);
    }

  return (
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
              Update Progress
            </Dialog.Title>
            <div className="flex max-w-md max-auto">
              <div className="py-2">
                <div className="h-14 my-4">
                <label className="block text-gray-600 text-sm font-normal">Status</label>
                <select name="status" value={task.status} onChange={(e) => handleChange(e)} 
                    className="h-10 w-96 border mt-2 px-2 py-2">
                     {statusOptions.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                     {statusOption}
                    </option>
                     ))}
                </select>
                </div>
                <div className="h-14 my-4 space-x-4 pt-4">
                  <button onClick={saveTask}
                  className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6 cursor-pointer">
                    Save
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
  )
}

export default EditUserTask