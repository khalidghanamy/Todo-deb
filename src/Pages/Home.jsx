import AddTask from "../Components/taskComponents/AddTask.jsx";
import Tasks from "./Tasks";
import { useEffect,useState } from "react";
import useTasks from "../store/Task.js"
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from 'react-router-dom'
function Home() {
  const { tasks, getAllTasks } = useTasks();
  const [taskStatus, setTaskStatus] = useState(["Todo", "InProgress", "UnderReview", "Rework","Completed"]);
const navigate = useNavigate()  
const [currentUser, setCurrentUser] = useState(undefined);

const [tasksTest,setTasksTest]=useState(tasks)
const [updateList,setUpdateList]=useState(0)
useEffect(() => {
  async function getMe() {
    if (!localStorage.getItem("task-user")) {
      navigate("/login");
    } 
  }
  getMe();
}, []);


  

  const user = JSON.parse(localStorage.getItem("task-user"))



  useEffect(() => {
    (async () => {
     const data = await  getAllTasks(user._id);
     setTasksTest(data)
     }
     )();
 
  }, [tasks.length,updateList]);
  return (
    <>
        {tasks.length &&<div className="container p-0 m-0">
          <div className="row">
          <NavBar/>
          </div>
          <div className="row mt-5 d-flex justify-content-center">
            <div className="mt-5 d-flex justify-content-center">
          <AddTask setUpdateList={setUpdateList}/>
          </div>
          </div>
          <div className="row" style={{marginRight:"5.1rem"}}>
           
          {
            tasks.length && taskStatus.map((task, index) => {
              
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
                  <Tasks tasks={tasksTest}  taskStatus={task} key={index} setUpdateList={setUpdateList} updateList={updateList}/>
                </div>
              );
            }
            )
          }
    
            
           
            
          </div>
          
          
        </div>}
        
    </>
  );
}

export default Home;
