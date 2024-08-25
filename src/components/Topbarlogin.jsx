import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import '../index.css'; 
import { info } from '../store/atoms/userinfo';
import { useRecoilValue } from 'recoil';

export function Topbarlogin() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const allInfo = useRecoilValue(info);
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString();
  
  return (
    <div className="  bg-gray-300 text-gray-900 p-2 flex justify-between items-center">
      <div className="sm:flex items-center space-x-4">
      <div className='flex gap-2'>
          <div onClick={()=>{
            navigate('/userprofile')
          }} className="rounded-full bg-green-500 text-center py-2 px-3.5">
              {allInfo.name?allInfo.name[0].toUpperCase():"?"}
          </div>
          <div className='flex pt-2 smd:pt-1 flex-col h-full justify-center'>
            <span onClick={()=>{
            navigate('/userprofile')
          }} className="text-sm md:flex smd:text-xl font-bold text-black">{allInfo.name}</span>
          </div>
      </div>
      </div>
      <div className="flex items-center space-x-8 text-xs">
        <div className="text-right">
          <div className="text-gray-900">{formattedDate}</div>
          <div className="text-gray-900">{formattedTime}</div>
        </div>
        <div className="">
          <button onClick={()=>{
            //localStorage.removeItem("token");
            //localStorage.removeItem("userinfo");
            
            navigate(`/notifications`)
          }} className="  text-gray-900 font-semibold  rounded-lg transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>
          </button>
          
        </div>
      </div>
    </div>
  );
};

