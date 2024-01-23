"use client"
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useState } from 'react'
import TaskList from './TaskList';


const AddTask = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [newTask, setNewTask] = useState({
      priorityLevel: "",
      status: "",
      taskId: 0,
      taskName: "",
      userId: 0,
    });

    const [responseData, setResponseData] = useState({
      code: 0,
      message: "",
      data: "",
     });

     const priorityOptions =["HIGH","MEDIUM","LOW"];
     const statusOptions = ["PENDING", "PROCCESSING", "COMPLETED"];

    function closeForm(){
        setIsOpen(false);
    }

    function openForm() {
        setIsOpen(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setNewTask({ ...newTask, [e.target.name]: value });
    };

    const saveTask = async (e: { preventDefault: any }) => {
      e.preventDefault();

      const response = await axios.post('http://localhost:8080/api/v1/tasks', newTask);

      if(response.data.data != newTask.taskName){
          
          alert(response.data.data);
      }else{
          const data = response.data;
          //console.log(data);
          alert(data.data + " Created");
          setResponseData(data);
      }

      clearForm(e);
  }

  const clearForm = (e: { preventDefault: any; }) => {
      e.preventDefault();
      setNewTask({
        priorityLevel: "",
        status: "",
        taskId: 0,
        taskName: "",
        userId: 0,
        });

      setIsOpen(false);
  }

  return (
    <>
    <div className="container ml-10">
        <button className="bg-green-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
        onClick={openForm}>
             ADD NEW
        </button>
    </div>
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
              Add New Task
            </Dialog.Title>
            <div className="flex max-w-md max-auto">
              <div className="py-2">
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    Task
                  </label>
                  <input type="text" name="taskName" value={newTask.taskName} onChange={(e) => handleChange(e)}
                  className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    Assigen To
                  </label>
                  <input type="text" name="userId" value={newTask.userId} onChange={(e) => handleChange(e)}
                  className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="h-14 my-4">
                <label className="block text-gray-600 text-sm font-normal">Priority</label>
                <select name="priorityLevel" value={newTask.priorityLevel} onChange={(e) => handleChange(e)} 
                    className="h-10 w-96 border mt-2 px-2 py-2">
                    <option value={""}></option>
                     {priorityOptions.map((priorityOption) => (
                    <option key={priorityOption} value={priorityOption}>
                     {priorityOption}
                    </option>
                     ))}
                </select>
                </div>
                <div className="h-14 my-4">
                <label className="block text-gray-600 text-sm font-normal">Status</label>
                <select name="status" value={newTask.status} onChange={(e) => handleChange(e)} 
                    className="h-10 w-96 border mt-2 px-2 py-2">
                    <option value={""}></option>
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
  <TaskList saveResponse={responseData}/>
  </>
  )
}

export default AddTask