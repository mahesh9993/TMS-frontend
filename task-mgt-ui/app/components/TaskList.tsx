"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditTask from './EditTask';

interface ResponseType{
    code: number;
    message: string;
    data:ITasks[];
}

type ITasks = {
    taskId: number,
    taskName: string,
    userName: string,
    priorityLevel: string,
    status: string
}

interface TaskListProps {
    saveResponse:{
        code: number,
        message: string,
        data: string,
    }
}

const TaskList: React.FC<TaskListProps> = ({saveResponse}) => {

    const [tasks, setTasks] = useState<ResponseType>({
        code: 0,
        message: "",
        data:[] as ITasks[]
    });
    const [taskId, setTaskId] = useState<number>();
    const [updateResponse, setUpdateResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              
              const res = await axios.get('http://localhost:8080/api/v1/tasks');
              
              setTasks(res.data);
              //console.log(res.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
           
          fetchData();
          
          //console.log(tasks);

    }, [saveResponse,updateResponse])

    const handleRemoveTask = async (taskId: number) => {
        try {
          
          await axios.delete(`http://localhost:8080/api/v1/tasks/${taskId}`);
          
          setTasks((prevTasks) => ({
            ...prevTasks,
            data: prevTasks.data.filter((task) => task.taskId !== taskId),
          }));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };

      const handleEditTask = (taskId:number) => {
        setTaskId(taskId);
      }

  return (
    <>
    <div className="container mx-auto">
    <div className="table w-full p-2 mt-5">
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-2 border-r text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">ID</div>
                        </th>
                        <th className="p-2 border-r text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">Task</div>
                        </th>
                        <th className="p-2 border-r text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">ASSIGNED TO</div>
                        </th>
                        <th className="p-2 border-r text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">PRIORITY</div>
                        </th>
                        <th className="p-2 border-r text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">STATUS</div>
                        </th>
                        <th className="p-2 border-r text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">ACTION</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task)=>(
                    <tr key={task.taskId} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                        <td className="p-2 border-r">{task.taskId}</td>
                        <td className="p-2 border-r">{task.taskName}</td>
                        <td className="p-2 border-r">{task.userName}</td>
                        <td className="p-2 border-r">{task.priorityLevel}</td>
                        <td className="p-2 border-r">{task.status}</td>
                        <td>
                            <a onClick={() => handleEditTask(task.taskId)} 
                            className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin mx-1 cursor-pointer">
                                Edit</a>
                            <a onClick={() => handleRemoveTask(task.taskId)} 
                            className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin mx-1 cursor-pointer">
                                Remove</a>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </div>
        <EditTask taskId={taskId} setUpdateResponse={setUpdateResponse} />
        </>
  )
}

export default TaskList