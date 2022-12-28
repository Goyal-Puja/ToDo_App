import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons'

function App() {
  const [toDo, setToDo] = useState([]);
  const[newTask,setNewTask] = useState();
  const[updateData,setUpdateData] = useState();

  const addTask = () =>{
    if(newTask){
      let num = toDo.length+1;
      let newEntry = { id : num, title : newTask, status : false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks);
  }

  const markDone = (id) =>{
    let newTask = toDo.map(task => {
      if(task.id === id){
        return ({...task,status:!task.status})
      }
      return task;
    })
    setToDo(newTask);
  }

  const cancelUpdate = () =>{
    setUpdateData('');
  }

  const changeTask = (e) =>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  const updateTask = () =>{
         let filterRecord = [...toDo].filter(task => task.id !== updateData.id);
         let updateObject = [...filterRecord, updateData]
         setToDo(updateObject);
         setUpdateData('');
  }

  return (
    <div className="container App">
      <br /> <br />
      <h2>ToDo List App</h2>
      <br /> <br />

      {updateData && updateData ? (
        <div className='row'>
           <div className='col'>
             <input title='update a task' value={ updateData && updateData.title } onChange={ (e) => changeTask(e)} className='form-control form-control-lg'/>
           </div>
           <div className='col-auto'>
             <button title='update' onClick={updateTask} className='btn btn-lg btn-success mr-20'>Update</button>
             <button title='cancel' onClick={cancelUpdate} className='btn btn-lg btn-warning'>Cancel</button>
           </div>
        </div>
 

      ) : (

          <div className='row'>
               <div className='col'>
                  <input title='add a task' value={newTask} onChange={ (e) => setNewTask(e.target.value)} className='form-control form-control-lg'/>
               </div>
               <div className='col-auto'>
                  <button title='add' onClick={addTask} className='btn btn-lg btn-success'>Add Task</button>
               </div>
          </div>
      ) }
      
      <br />

      {toDo && toDo.length ? '' : 'No Tasks...!!'}
      {toDo && toDo.sort((a,b) => a.id > b.id ? 1 : -1).map((task,index) => {
        return(
          <React.Fragment key={task.id}>
            <div className='col taskBg'>
              <div className={task.status ? 'done' : ''}>
              <span className='taskNumber'>{index + 1}</span>
              <span className='taskText'>{task.title}</span>
            </div>
            <div className='iconsWrap'>
              <span title='complete/not complete' onClick={(e) => markDone(task.id)}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            {task.status ? null : (
               <span title='edit' onClick={() => setUpdateData({id: task.id, title: task.title,status: task.status ? true : false})}>
                 <FontAwesomeIcon icon={faPen} />
              </span>
              )}
              <span title='delete' onClick={() => deleteTask(task.id)}>
                 <FontAwesomeIcon icon={faTrashCan} />
              </span>
              </div>
            </div>
          </React.Fragment>
        )
      })
      }
    </div>
  );
}
export default App;






