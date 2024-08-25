import { Button } from "../components/Button";
import { Topbarlogin } from "../components/Topbarlogin";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { info} from "../store/atoms/userinfo";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";



export function Createtask(){
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  return (
    <div>
      
      <div className="fixed right-0 left-0 top-0">
      <div className="smd:ml-48 md:ml-64">
      <Topbarlogin></Topbarlogin>
      </div>
      
        <div>
        <button onClick={toggleSidebar} data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        </div>
        </div>


        <aside id="separator-sidebar" className={`fixed top-0 left-0 z-40 w-48 md:w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div>
            <ul className="cursor-pointer space-y-2 font-medium">
              <li>
                <a
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>

              <li>
                <a
                  onClick={() => {
                    navigate("/messages");
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group fill-[#8e8e8e] hover:fill-[#ffffff]"
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
</svg> */}
                  <svg
                    className="w-[25px] h-[25px] "
                    viewBox="0 0 640 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"></path>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                  {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                </a>
              </li>
              <li>
                <a
                  onClick={()=>{
                    navigate('/userprofile')
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </a>
              </li>

              {/* <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                    </a>
                </li> */}
              <li>
                <a
                  onClick={() => {
                    navigate("/dashboardnotes");
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Important stuff
                  </span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/assignedprojects");
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Assigned Projects
                  </span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/userprojects");
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Your Projects
                  </span>
                </a>
              </li>
              <li>
                <a
                  onClick={()=>{
                    navigate('/settings')
                  }}
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group fill-[#8e8e8e] hover:fill-[#ffffff]"
                >
                  <svg
                    className="w-[25px] h-[25px] "
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"></path>
                  </svg>

                  <span className="ms-3">Settings</span>
                </a>
              </li>
            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe7G-6BswDGNbcGfjRcGttV4oxP3eet_QRgUTkHkuwc49axfA/viewform?usp=sf_link"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group fill-[#8e8e8e] hover:fill-[#ffffff]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-[15px] h-[20px] "
                    viewBox="0 0 384 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"></path>
                  </svg>
                  <span className="ms-3">Feedback</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                  </svg>
                  <span className="ms-3">Documentation</span>
                </a>
              </li>

              <li className="cursor-pointer">
                <a
                  onClick={() => {
                    navigate("/colab");
                  }}
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group fill-[#8e8e8e] hover:fill-[#ffffff]"
                >
                  <svg
                    className="w-[25px] h-[25px] "
                    viewBox="0 0 640 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L550.2 352H592c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48H516h-4-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48H48c-26.5 0-48 21.5-48 48V304c0 26.5 21.5 48 48 48H156.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123z"></path>
                  </svg>
                  <span className="ms-3">Collab</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sahil-kumar-sinha-98011a24b/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group fill-[#8e8e8e] hover:fill-[#ffffff]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                      </svg> */}
                  <svg
                    className="w-[25px] h-[25px] "
                    viewBox="0 0 640 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"></path>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Developed by
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userinfo");
                    localStorage.removeItem("allusers");
                    navigate("/signin");
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="ms-3">Log out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        </aside>
        <div className="w-full h-screen bg-white" onClick={()=>{
          setSidebarOpen(false);
        }}>
          <div className=" fixed pt-2 right-2 top-16 w-7 h-7 flex items-center justify-center bg-white">
            <button onClick={()=>{
                navigate('/userprojects')
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 6.827 6.827" className="text-blue-500">
                    <defs>
                        <style>
                            {`
                                .str1 {
                                    stroke: #212121;
                                    stroke-width: 0.213;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                }
                                .fil0 {
                                    fill: none;
                                }
                            `}
                        </style>
                    </defs>
                    <circle cx="3.413" cy="3.413" r="2.453" className="fil0 str1"/>
                    <path d="M4.64 2.187L2.187 4.64" className="fil0 str1"/>
                    <path d="M4.64 4.64L2.187 2.187" className="fil0 str1"/>
                </svg>
            </button>
        </div>

          <div className=" mt-2 md:ml-64 smd:ml-48">
            <Createtaskbaby></Createtaskbaby>
          </div>
        </div>
    </div>
    
  );
}



function Createtaskbaby() {

    return (
        <div>
          <div className="z-30">
            < Topbarlogin />
            </div>
            <div className="z-10">
                <TaskManager />
            </div>
        </div>
    );
}

function TaskManager() {
    const navigate = useNavigate();
    const allinfo = useRecoilValue(info);
    const [projectName, setProjectName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading , setLoading] = useState(false);
    const [refresh , setRefresh] = useState({
        id:null,
        isparent:null
    });
    
    const addTask = (parentId = null) => {
        const newTask = {
            id: Date.now(),
            title: '',
            completed: false,
            subtasks: [],
            description: '',
        };

        if (parentId === null) {
            setTasks([...tasks, newTask]);
        } else {
            const updatedTasks = tasks.map(task =>
                task.id === parentId
                    ? { ...task, subtasks: [...task.subtasks, newTask] }
                    : task
            );
            setTasks(updatedTasks);
        }
    };

    const deleteTask = (id, parentId = null) => {
        const deleteTaskById = (taskList) => taskList.filter(task => task.id !== id);

        if (parentId === null) {
            setTasks(deleteTaskById(tasks));
        } else {
            const updatedTasks = tasks.map(task =>
                task.id === parentId
                    ? { ...task, subtasks: deleteTaskById(task.subtasks) }
                    : task
            );
            setTasks(updatedTasks);
        }
    };

    const handleCompletion = (id, parentId = null) => {
        const toggleTaskCompletion = (taskList) => taskList.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );

        if (parentId === null) {
            setTasks(toggleTaskCompletion(tasks));
        } else {
            const updatedTasks = tasks.map(task =>
                task.id === parentId
                    ? { ...task, subtasks: toggleTaskCompletion(task.subtasks) }
                    : task
            );
            setTasks(updatedTasks);
        }
    };

    const updateTaskField = (taskList, taskId, field, value) => {
        return taskList.map(task => {
            if (task.id === taskId) {
                return { ...task, [field]: value };
            }
            if (task.subtasks.length > 0) {
                return { ...task, subtasks: updateTaskField(task.subtasks, taskId, field, value) };
            }
            return task;
        });
    };

    const handleFieldChange = (taskId, field, value) => {
        const updatedTasks = updateTaskField(tasks, taskId, field, value);
        setTasks(updatedTasks);
    };


    const renderTasks = (taskList, parentId = null) => {
        //var discription = false;
        return (
            <div className={`z-10 ml-${parentId ? '10' : '0'}`}>
                {taskList.map(task => (
                    <div
                        key={task.id}
                        className={`relative mt-4 p-2 border rounded ${
                            parentId ? 'bg-gray-100 ml-8' : 'bg-gray-300'
                        }`}
                    >
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCompletion(task.id, parentId)}
                            />
                            <input
                                type="text"
                                className="ml-2 p-1 border rounded flex-grow"
                                placeholder="Task title"
                                value={task.title}
                                onChange={(e) => handleFieldChange(task.id, 'title', e.target.value)}
                            />
                            <div onClick={()=>{
                                //discription = !discription
                                if(refresh.id == task.id){
                                  setRefresh({
                                    id:null,
                                    isparent:null
                                  })
                                }
                                else{
                                  setRefresh({
                                    id:task.id,
                                    isparent:parentId
                                });
                                }
                                //console.log("refreshed");
                            }}>
                            {refresh.id !=task.id ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>
}

                            </div>
                        </div>
                        <div className={`${refresh.id == task.id?'':'hidden'}`}>
                        <textarea
                            className={`${refresh.id == task.id?'':'hidden'}mt-2 p-1 border rounded w-full`}
                            placeholder="Task description"
                            value={task.description}
                            onChange={(e) => handleFieldChange(task.id, 'description', e.target.value)}
                        />
                        </div>
                        <div className="mt-2 flex">
                            <button onClick={() => deleteTask(task.id, parentId)} className="ml-2 text-sm text-red-500">Delete</button>
                            {parentId === null && task.subtasks.length == 0 &&(
                                <button onClick={() => addTask(task.id)} className="ml-2 text-sm text-blue-500">Add Subtask</button>
                            )}
                        </div>
                        {task.subtasks.length > 0 && renderTasks(task.subtasks, task.id)}
                        {parentId === null && task.subtasks.length > 0 && (
                                <button onClick={() => addTask(task.id)} className="ml-3 mt-2 text-sm text-blue-500">Add Subtask</button>
                            )}
                    </div>
                ))}
            </div>
        );
    };

    const LoadingIndicator = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      );
      
    function handleCreateProject() {
        
        if(projectName==''){
          alert('give a name to your task');
          return;
        }
        setLoading(true);
        const projectData = {
            title: projectName,
            description: '', // You can add a project description here if needed
            link: '', // Add any project link if necessary
            folder: 4, // Specify the folder ID if applicable
            tasks: tasks.map(task => ({
                work: task.title,
                description: task.description,
                completed:false,
                assignto: allinfo.id, 
                subtasks: task.subtasks.map(subtask => ({
                    subwork: subtask.title,
                    subdescription: subtask.description,
                    completed:false,
                    assignto: allinfo.id , // Assign to specific user if needed
                }))
            }))
        };
    
        axios.post('https://honoprisma.codessahil.workers.dev/createproject', projectData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            //console.log('Project created successfully:', response.data);
            navigate('/userprojects')
        })
        .catch(error => {
            console.error('Error creating project:', error);
            // Handle error, such as displaying an error message
        })
        .finally(()=>{
            setLoading(false);
        });
    }
    

    return (
        <div className="p-4 pt-12">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Project / Objective / Target</label>
            <div className="pb-1">
                <input
                    type="text"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter title / name..."
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </div>
            <hr className=" mt-2"></hr>
            <hr></hr>
            <hr></hr>
            
            <div className="overflow-y-auto">
                {renderTasks(tasks)}
                <div className="">
                    <div className="flex justify-center w-full">
                        <button onClick={() => addTask()} className="mt-4 p-2 px-6 bg-blue-500 text-white rounded">Add Task</button>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <Button name="Create"  onClick={handleCreateProject} ></Button>
            </div>
            {loading && <LoadingIndicator />}
        </div>
    );
}
