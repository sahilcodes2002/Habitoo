import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { info } from "../store/atoms/userinfo";
import { allusers } from "../store/atoms/contacts";
//import { set } from "date-fns";
var projectdata1 = null;
var projectdate = null;
export function ProjectDetails() {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [AllUsers, setAllUsers] = useRecoilState(allusers);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const navigate = useNavigate();
  const [invitedusers, setinvitedusers] = useState([]);
  const [allinfo, setinfo] = useRecoilState(info);
  const [coreprojectdata, setcoredata] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showinfo, setShowinfo] = useState(false);
  const [showinfo1, setShowinfo1] = useState(false);




  const invitedUsersRef = useRef(invitedusers);

  // Update ref whenever invitedusers state changes
  useEffect(() => {
    invitedUsersRef.current = invitedusers;
  }, [invitedusers]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    var intervalId = null;

    async function start() {
      setLoading(true);
      await fetchAllUsers();
      await fetchProjectData();
      
      fetchInvitedUsers().then(() => {
        intervalId = setInterval(async () => {
          console.log(invitedUsersRef.current.length); // This will always reflect the latest value
          if (projectdata1 != null && invitedUsersRef.current.length > 0) {
            const dd = await checktoupdate();
            if (dd === true) {
              fetchProjectData();
              fetchAllUsers();
              fetchInvitedUsers();
            }
          }
        }, 20000);
      });
    }

    start();

    return () => clearInterval(intervalId);
  }, [refresh]);

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  //   setLoading(true);
  //   fetchAllUsers();
  //   fetchInvitedUsers();
  //   //console.log(invitedusers);

  //   fetchProjectData();

  //   const intervalId = setInterval(async () => {
  //     if (projectdata1 != null && invitedusers.length>0) {
  //       //console.log(projectdata1);
  //       const dd = await checktoupdate();
  //       //console.log(dd);
  //       if (dd == true) {
  //         fetchProjectData();
  //         fetchAllUsers();
  //         fetchInvitedUsers();
  //       }
  //     }
  //   }, 20000);

  //   return () => clearInterval(intervalId);
  // }, [refresh]);

  async function checktoupdate() {
    if (projectdata1 || projectdata1 != null) {
      const simplifiedWorks = projectdata1.works.map((work) => ({
        id: work.id,
        assignto: work.assignto,
        completed: work.completed,
      }));

      const simplifiedSubworks = projectdata1.subworks.map((subwork) => ({
        id: subwork.id,
        assignto: subwork.assignto,
        completed: subwork.completed,
      }));
      try {
        const response = await axios.post(
          `https://honoprisma.codessahil.workers.dev/checkforupdate`,
          {
            simplifiedWorks,
            simplifiedSubworks,
            id: projectdata1.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Get the data from the response
        const data = await response.data.res;
        return data;
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      return false;
    }
  }

  const fetchProjectData = async () => {
    try {
      // Start loading
      // projectdata1 = projectData;
      setProjectData(null);
      // Make the request to the backend
      const response = await axios.get(
        `https://honoprisma.codessahil.workers.dev/getproject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data.res;
      projectdata1 = data;
      if (projectdate == null) {
        const isoDate = data.created_at;
        const date = new Date(isoDate);
        projectdate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      //console.log(data);

      const transformedTasks = await transformTasks(data.works, data.subworks);
      setProjectData({
        title: data.title,
        tasks: transformedTasks,
        user_id: data.user_id,
        id: data.id,
        folder_id: data.folder_id,
        description: data.description,
        link: data.link,
        archive: data.archive,
        done: data.done,
        created_at: data.created_at,
      });
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitedUsers = async () => {
    try {
      const res = await axios.post(
        `https://honoprisma.codessahil.workers.dev/invitedusers`,
        {
          project_id: parseInt(id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setinvitedusers(res.data.res);
    } catch (err) {
      alert(err);
      //console.log("Error fetching invited user data:", err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://honoprisma.codessahil.workers.dev/getallusers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAllUsers(response.data.res);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleUserClick = async (userId) => {
    const res = await axios.post(
      `https://honoprisma.codessahil.workers.dev/inviteUserToProject`,
      {
        project_id: parseInt(id),
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    // setShowModal(false);
    setinvitedusers((prevInvitedUsers) => [...prevInvitedUsers, res.data.res]);
    setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setShowModal(false);
  };
  const handleUserClick1 = async (id) => {
    const res = await axios.post(
      `https://honoprisma.codessahil.workers.dev/removeinvite`,
      {
        id: parseInt(id),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    // setShowModal(false);
    fetchInvitedUsers();
    fetchAllUsers();
    setShowModal1(false);
  };

  const transformTasks = async (works, subworks) => {
    //console.log(works);
    return works.map((work) => ({
      id: work.id,
      title: work.work,
      description: work.description,
      completed: work.completed,
      assignto: work.assignto,
      subtasks: subworks
        .filter((subwork) => subwork.work_id === work.id)
        .map((subwork) => ({
          id: subwork.id,
          title: subwork.subwork,
          description: subwork.subdescription,
          assignto: subwork.assignto,
          completed: subwork.completed, // Add this if you track subtask completion
        })),
    }));
  };

  const LoadingIndicator = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
  if (loading)
    return (
      <div>
        <LoadingIndicator></LoadingIndicator>
      </div>
    );

  if (projectData == null)
    return (
      <div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center h-screen">
            Getting team changes
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between">
        <div
          className="p-2 mt-3 ml-1 cursor-pointer"
          onClick={() => {
            if (projectData.user_id === allinfo.id) {
              navigate("/userprojects");
            } else {
              navigate("/assignedprojects");
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
        </div>
        <div className="p-2">
          <button
            className={`mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow ${
              allinfo.id != projectData.user_id ? "hidden" : "bg-blue-400"
            }`}
            onClick={() => {
              //console.log(projectData)
              //console.log(allinfo);
              setShowModal1((x) => !x);
            }}
          >
            People
          </button>
          <button
            className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow ${
              allinfo.id != projectData.user_id ? "hidden" : "bg-blue-400"
            }`}
            onClick={() => {
              //console.log(projectData)
              //console.log(allinfo);
              setShowModal((x) => !x);
            }}
          >
            Invite
          </button>
          <button
            className={`mr-2 ml-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow `}
            onClick={() => {
              //console.log(projectData)
              //console.log(typeof(projectData.id));
              navigate(`/projectmessages/${projectData.id}`);
            }}
          >
            Messages
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="font-serif text-2xl smd:text-4xl">
          {projectData.title} :{" "}
          <span className="text-lg smd:text-2xl font-light pb-1 text-gray-600">
            {projectdate}
          </span>
        </div>
      </div>
      <div>
        {/* <ProjectTitlebar setShowModal={setShowModal} projectname ={projectData.title} ></ProjectTitlebar> */}
        {projectData && (
          <ProjectTaskManager
            setShowinfo={setShowinfo}
            setShowinfo1={setShowinfo1}
            showinfo1={showinfo1}
            showinfo={showinfo}
            setRefresh={setRefresh}
            id={id}
            projectTitle={projectData.title}
            initialTasks={projectData.tasks}
            projectData={projectData}
            allinfo={allinfo}
            invitedusers={invitedusers}
            projectdata1={projectdata1}
          />
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Invite user..</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid gap-2">
              {AllUsers.filter(
                (user) =>
                  !invitedusers.some((invite) => invite.user_id === user.id)
              ).map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="text-lg font-semibold">{user.name}</div>
                  <div className="text-gray-600">{user.username}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showModal1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Invited users..</h3>
              <button
                onClick={handleCloseModal1}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid gap-2">
              {invitedusers.map((user) => (
                <div
                  key={user.id}
                  className={`${
                    user.accepted ? "bg-green-300" : "bg-gray-100"
                  } p-2 rounded-md cursor-pointer hover:opacity-70`}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="text-lg font-semibold">
                        {user.user.name}
                      </div>
                      <div className="text-gray-600">{user.user.username}</div>
                    </div>
                    <div
                      className="flex flex-col justify-center"
                      onClick={() => handleUserClick1(user.id)}
                    >
                      <div>
                        <svg
                          className="w-6 h-6"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g data-name="22-Remove">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z"
                            />
                            <path d="M6 15h20v2H6z" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectTaskManager({
  id,
  setShowinfo,
  setShowinfo1,
  showinfo,
  showinfo1,
  setRefresh,
  projectTitle,
  initialTasks,
  projectData,
  allinfo,
  invitedusers,
  projectdata1,
}) {
  //console.log(projectData);
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(false);
  const [showinfoofid, setShowinfoofid] = useState(null);

  // Toggle the completed state of a task or subtask
  const handleCheckboxChange = async (taskId, parentId) => {
    const updateTaskCompleted = (taskList, taskId) => {
      if (parentId === null) {
        for (const it of projectdata1.works) {
          if (it.id == taskId) {
            it.completed = !it.completed;
          }
        }
      } else {
        for (const it of projectdata1.subworks) {
          if (it.id == taskId) {
            it.completed = !it.completed;
          }
        }
      }
      return taskList.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        if (task.subtasks && task.subtasks.length > 0) {
          return {
            ...task,
            subtasks: updateTaskCompleted(task.subtasks, taskId),
          };
        }
        return task;
      });
    };

    const findTask = (taskList, id) => {
      for (const task of taskList) {
        if (task.id === id) return task;
        if (task.subtasks && task.subtasks.length > 0) {
          const foundTask = findTask(task.subtasks, id);
          if (foundTask) return foundTask;
        }
      }
      return null;
    };

    const taskToUpdate = findTask(tasks, taskId);

    if (taskToUpdate) {
      // Update the local state first
      const updatedTasks = updateTaskCompleted(tasks, taskId);
      setTasks(updatedTasks);

      try {
        // Check if the task is a `work` or `subwork`
        const isSubwork = parentId != null; // Example logic: adjust as needed

        // console.log(`Task ID: ${taskId}, Is Subwork: ${isSubwork}`); // Debugging

        if (isSubwork) {
          // It's a subwork
          try {
            await axios.post(
              "https://honoprisma.codessahil.workers.dev/updateSubWorkCompletion",
              {
                subworkId: taskId,
                completed: !taskToUpdate.completed,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (err) {
            alert(err);
          }
        } else {
          // It's a work
          await axios.post(
            "https://honoprisma.codessahil.workers.dev/updateWorkCompletion",
            {
              workId: taskId,
              completed: !taskToUpdate.completed,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
      } catch (error) {
        console.error("Error updating task completion:", error);
        // Optionally revert the local state if needed
        setTasks(tasks);
      }
    }
  };

  // Render tasks and subtasks
  async function handlesubtaskdelete (id){
    
    try{
      setLoading(true);
      await axios.post(
        `https://honoprisma.codessahil.workers.dev/deletesubwork`,
        {
          id: parseInt(id)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
    }catch(err){
      alert(err);
    }
  }
  async function handletaskdelete (id){
    try{
      setLoading(true);
      await axios.post(
        `https://honoprisma.codessahil.workers.dev/deletework`,
        {
          id: parseInt(id)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
    }catch(err){
      alert(err);
    }
  }
  const renderTasks = (taskList, parentId = null) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUsing, setIsusing] = useState("");
    const [istask, setisTask] = useState(parentId);
    //const [showinfo, setShowinfo] = useState(false);

    //console.log(taskList);
    return (
      <div
        className={`relative ${
          parentId ? "ml:6 smd:ml-8" : "ml-2 smd:ml-4"
        } pl-[6px] border-l border-gray-500`}
      >
        {showinfo && (
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg relative">
              <button
                onClick={() => setShowinfo(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                ✕
              </button>
              <ShowingInfo
                setRefresh={setRefresh}
                id={id}
                showinfoofid={showinfoofid}
                setShowinfo={setShowinfo}
              />
            </div>
          </div>
        )}
        {showinfo1 && (
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg relative">
              <button
                onClick={() => setShowinfo1(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                ✕
              </button>
              <ShowingInfo1
                setRefresh={setRefresh}
                id={id}
                setShowinfo1={setShowinfo1}
              />
            </div>
          </div>
        )}
        {taskList.map((task, index) => (
          <div key={task.id} className="relative mt-4">
            {/* Line connecting to the previous task */}
            {index >= 0 && (
              <div className="absolute -left-1 top-0 h-full border-l border-gray-500"></div>
            )}
            {/* Task Box */}

            <div className="flex">
              <div className="flex flex-col justify-center">
                <button className={`${
                        allinfo.id == projectData.user_id 
                          ? ""
                          : "hidden"
                      } `} onClick={async()=>{
                  if(parentId){
                    await handlesubtaskdelete(task.id);
                    setRefresh(x=>!x);
                  }else{
                    await handletaskdelete(task.id);
                    setRefresh(x=>!x);
                  }
                }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="3 0 24 24"
                    stroke-width="0.5"
                    stroke="currentColor"
                    class={` size-5 smd:size-6`}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`relative flex-1 pl-1 pr-2 border rounded shadow-sm ${
                  parentId ? "border-gray-400" : "border-gray-200"
                } ${task.completed == false ? "bg-blue-200" : "bg-green-200"}`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      //console.log(projectData);
                      if (
                        projectData.user_id == allinfo.id ||
                        allinfo.id == task.assignto
                      ) {
                        handleCheckboxChange(task.id, parentId);
                      }
                    }}
                    className=" form-checkbox h-5 w-5 text-blue-500"
                  />
                  <div className="m-2 w-full">
                    <div
                      className={`${
                        task.completed == false ? "bg-white" : "bg-green-100"
                      } ml-1 p-1 border w-full flex-grow rounded-md`}
                    >
                      {task.title}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`${
                        allinfo.id != projectData.user_id &&
                        task.assignto == allinfo.id
                          ? ""
                          : "hidden"
                      } `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                    </div>

                    <div>
                      <div
                        className={`px-[1px] pt-[2px] rounded-md bg-white  ${
                          allinfo.id != projectData.user_id
                            ? "hidden"
                            : "bg-white"
                        }`}
                      >
                        <div className=" pt-1 relative inline-block text-left">
                          {/* Circular Icon */}
                          <div className="flex ">
                            <button
                              onClick={() => {
                                setIsOpen(!isOpen);
                                setIsusing(task.id);
                                setisTask(parentId);
                              }}
                              className="flex items-center justify-center w-5 h-6  bg-gray-300 rounded-full focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </button>
                            <button
                              className={`${parentId ? "hidden" : ""}`}
                              onClick={() => {
                                //console.log(task.id);
                                setShowinfoofid(task.id);
                                setShowinfo(true);
                              }}
                            >
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </div>
                            </button>
                          </div>

                          {/* Dropdown Menu */}
                          {isOpen &&
                            isUsing == task.id &&
                            istask == parentId && (
                              <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                                <div className="py-1">
                                  <button
                                    onClick={async () => {
                                      //task id
                                      //parentid
                                      //x.user.id
                                      if (parentId == null) {
                                        try {
                                          setLoading(true);
                                          await axios.post(
                                            `https://honoprisma.codessahil.workers.dev/updatework`,
                                            {
                                              workid: task.id,
                                              userid: allinfo.id,
                                            },
                                            {
                                              headers: {
                                                Authorization: `Bearer ${localStorage.getItem(
                                                  "token"
                                                )}`,
                                                "Content-Type":
                                                  "application/json",
                                              },
                                            }
                                          );
                                          task.assignto = allinfo.id;
                                          setIsOpen(false);
                                          setLoading(false);
                                        } catch (err) {
                                          alert(err);
                                        }
                                      } else {
                                        try {
                                          setLoading(true);
                                          const res = await axios.post(
                                            `https://honoprisma.codessahil.workers.dev/updatesubwork`,
                                            {
                                              workid: task.id,
                                              userid: allinfo.id,
                                            },
                                            {
                                              headers: {
                                                Authorization: `Bearer ${localStorage.getItem(
                                                  "token"
                                                )}`,
                                                "Content-Type":
                                                  "application/json",
                                              },
                                            }
                                          );
                                          task.assignto = allinfo.id;
                                          setIsOpen(false);
                                          setLoading(false);
                                        } catch (err) {
                                          alert(err);
                                        }
                                      }
                                    }}
                                    // Adding a key prop is recommended when rendering lists
                                    className={`${
                                      task.assignto == allinfo.id
                                        ? "bg-green-300"
                                        : ""
                                    } block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                                  >
                                    Myself
                                  </button>
                                  {invitedusers
                                    .filter((x) => {
                                      //console.log(invitedusers[0].name);
                                      return x.accepted === true;
                                    })
                                    .map((x) => (
                                      <button
                                        onClick={async () => {
                                          //task id
                                          //parentid
                                          //x.user.id
                                          if (parentId == null) {
                                            try {
                                              setLoading(true);
                                              const res = await axios.post(
                                                `https://honoprisma.codessahil.workers.dev/updatework`,
                                                {
                                                  workid: task.id,
                                                  userid: x.user.id,
                                                },
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${localStorage.getItem(
                                                      "token"
                                                    )}`,
                                                    "Content-Type":
                                                      "application/json",
                                                  },
                                                }
                                              );
                                              task.assignto = x.user.id;
                                              setIsOpen(false);
                                              setLoading(false);
                                            } catch (err) {
                                              alert(err);
                                            }
                                          } else {
                                            try {
                                              setLoading(true);
                                              const res = await axios.post(
                                                `https://honoprisma.codessahil.workers.dev/updatesubwork`,
                                                {
                                                  workid: task.id,
                                                  userid: x.user.id,
                                                },
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${localStorage.getItem(
                                                      "token"
                                                    )}`,
                                                    "Content-Type":
                                                      "application/json",
                                                  },
                                                }
                                              );

                                              task.assignto = x.user.id;
                                              setIsOpen(false);
                                              setLoading(false);
                                            } catch (err) {
                                              alert(err);
                                            }
                                          }
                                        }}
                                        key={x.id} // Adding a key prop is recommended when rendering lists
                                        className={`${
                                          task.assignto == x.user.id
                                            ? "bg-green-300"
                                            : ""
                                        } block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                                      >
                                        {x.user.name}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {task.description && (
                  <div className="pr-2 pt-1">
                    <textarea
                      className={`${
                        task.completed == false ? "bg-while" : "bg-green-100"
                      } ml-2 p-1 border rounded w-full`}
                      placeholder="Task description"
                      value={task.description}
                      readOnly
                    />
                  </div>
                )}
                {/* Render subtasks */}
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="mt-2 pl-6 border-l border-gray-300">
                    {renderTasks(task.subtasks, task.id)}
                  </div>
                )}
              </div>
            </div>
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
  return (
    <div className="p-2 pl-1 smd:pl-2 pt-5">
      <h2 className="text-xl font-bold mb-4">{projectTitle}</h2>
      <div>{renderTasks(tasks)}</div>
      {loading && <LoadingIndicator />}
      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowinfo1(true);
          }}
          className="mt-4 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ShowingInfo({ setRefresh, showinfoofid, id, setShowinfo }) {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  //console.log(showinfoofid);
  if (loading) {
    return (
      <div>
        {/* <LoadingIndicator></LoadingIndicator> */}
        <div className="flex justify-center bg-gray-50">
          <div className="flex flex-col justify-center"></div>
            Loading....
        </div>
      </div>
    );
  }
  return (
    <div>
      {!loading && (
        <div className=" text-slate-700 pb-2">
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-900 "
          >
            subtask title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="email"
            id="email"
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="you title"
          />
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-900 "
          >
            subtask description
          </label>
          <textarea
            onChange={(e) => {
              setDiscription(e.target.value);
            }}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="your discription"
          />
          <button
            onClick={async () => {
              setLoading(true);
              //setShowinfo(false);
              try {
                const res = await axios.post(
                  `https://honoprisma.codessahil.workers.dev/addsubwork`,
                  {
                    work_id: showinfoofid,
                    title: title,
                    description: description,
                    project_id: parseInt(id),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                setLoading(false);
                setRefresh((x) => !x);
                setShowinfo(false);
              } catch (err) {
                setShowinfo(true);
                alert(err);
              }
            }}
            type="submit"
            class="mt-2 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

function ShowingInfo1({ setRefresh, id, setShowinfo1 }) {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div>
        {/* <LoadingIndicator></LoadingIndicator> */}
        <div className="flex justify-center bg-gray-50">
          <div className="flex flex-col justify-center"></div>
            Loading....
        </div>
      </div>
    );
  }
  return (
    <div>
      {!loading && (
        <div className=" text-slate-700 pb-2">
          <label class="block mb-1 text-sm font-medium text-gray-900 ">
            title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="email"
            id="email"
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="you title"
          />
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-900 "
          >
            description
          </label>
          <textarea
            onChange={(e) => {
              setDiscription(e.target.value);
            }}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="your discription"
          />
          <button
            onClick={async () => {
              setLoading(true);
              //setShowinfo(false);
              try {
                const res = await axios.post(
                  `https://honoprisma.codessahil.workers.dev/addwork`,
                  {
                    title: title,
                    description: description,
                    project_id: parseInt(id),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                setLoading(false);
                setRefresh((x) => !x);
                setShowinfo1(false);
              } catch (err) {
                setShowinfo1(true);
                alert(err);
              }
            }}
            type="submit"
            class="mt-2 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

const LoadingIndicator = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 bg-transparent">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default ProjectTaskManager;
