"use client";
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import EditUser from './EditUser';

interface UserListProps {
    res: {
      code: number;
      message: string;
      data: User[] | string;
    };
  }

type User = {
    userId: number;
    userName: string;
    password: string;
    designation: string;
  };

const UserList: React.FC<UserListProps> = ({res}) => {

    const [users, setUsers] = useState<User[]>([]);
    const [userId, setUserId] = useState<number>();
    const [updateResponse, setUpdateResponse] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            
            const response = await axios.get<{ data: User[] }>('http://localhost:8080/api/v1/users');
            
            setUsers(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
         
        fetchData();
      }, [res,updateResponse]);


      const handleRemoveUser = async (userId: number) => {
        try {
          
          await axios.delete(`http://localhost:8080/api/v1/users/${userId}`);
          
          setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

      const hadleEditUser = (userId:number) => {
        setUserId(userId);
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
                                <div className="flex items-center justify-center">USER NAME</div>
                            </th>
                            <th className="p-2 border-r text-sm font-thin text-gray-500">
                                <div className="flex items-center justify-center">DESIGNETION</div>
                            </th>
                            <th className="p-2 border-r text-sm font-thin text-gray-500">
                                <div className="flex items-center justify-center">ACTION</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users?.map((user) => (
                        <tr key={user.userId} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{user.userId}</td>
                            <td className="p-2 border-r">{user.userName}</td>
                            <td className="p-2 border-r">{user.designation}</td>
                            <td>
                                <a onClick={()=> hadleEditUser(user.userId)} 
                                className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin mx-1 cursor-pointer">
                                    Edit
                                </a>
                                <a onClick={() => handleRemoveUser(user.userId)} 
                                className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin mx-1 cursor-pointer">
                                     Remove
                             </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <EditUser userId ={userId} setUpdateResponse={setUpdateResponse} />
      </>
    );
};

export default UserList;
