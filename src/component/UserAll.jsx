import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination';
export default function UserAll() {

  const [params] =useSearchParams()
  const [userList, setUserList]=useState([])
  const [total, setTotal]=useState(0)
  const [totalPages, setTotalPages]=useState(1)
  const getAllUsers=async()=>{
    const page=params.get('page');
    const per_page=params.get('per_page');
    const url=`http://reqres.in/api/users?page=${page}&per_page=${per_page}`;
    try{
        const response =await fetch(url,{
            method:'GET'
        });
        const data = await response.json();
        console.log('data: ',data)
        if(!data){
            alert('데이터가 없습니다');
            return;
        }
        const arr=[... data.data];
        setUserList(arr);
        setTotal(data.total);
        setTotalPages(data.total_page)
    }catch(error){
        alert('error: '+error.message)
    }
  }
  useEffect(()=>{
    getAllUsers();
  },[])

  return (
    <div>
        <h1>All Users</h1>
        <ul>
            {userList&&
                userList.map((user,i)=>(
                    <li key={user.id}>
                        <img src={user.avatar} alt={user.id}></img>
                        {user.first_name} {user.last_name} [{user.email}]
                    </li>
                ))
            }

        </ul>
        <div>
            <Pagination>1</Pagination>
        </div>
      
    </div>
  )
}
