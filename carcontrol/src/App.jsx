import './App.css'
import { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarOn,faArrowUp,faArrowDown,faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons'
function App() { 
  const[direction,setdirection]=useState(null)
  const[fardirection,setfardirection]=useState(true)
  const[backdirection,setbackdirection]=useState(true)
  const[leftdirection,setleftdirection]=useState(true)
  const[rightdirection,setrightdirection]=useState(true)
  const[btngo,setbtngo]=useState(false)
  const ubidotstoken="BBUS-xwZlsfZKwah7Lak4VvZhcA1Dy8yR4L"
  const device_label="car-control"
 
  const url=`https://industrial.api.ubidots.com/api/v1.6/devices/${device_label}/`;
  async function senddata(dir){
    // const exdata=Math.random(1,5)*10
    try{
      await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "X-Auth-Token": ubidotstoken
        },
        body:JSON.stringify({directions:{"value":dir}})
        
      })   
    }catch(e){
      console.log("error at sending the data ")
    }
    console.log("data transerfer completed🥳")
  }
function values(){
  setbtngo(true)
  window.addEventListener("deviceorientation",(e)=>{
    let {beta,gamma}=e
    console.log(beta,gamma)
    if(beta>15){
      setdirection (1)
      setfardirection(true)
      setbackdirection(false)
      setleftdirection(false)
      setrightdirection(false)
    }else if(beta<-15){
      setdirection(2) 
      setfardirection(false)
      setbackdirection(true)
      setleftdirection(false)
      setrightdirection(false)    
    }else if(gamma>15){
      setdirection(3) 
      setfardirection(false)
      setbackdirection(false)
      setleftdirection(false)
      setrightdirection(true)
    }else if(gamma<-15) {
      setdirection(4)
      setfardirection(false)
      setbackdirection(false)
      setleftdirection(true)
      setrightdirection(false)
    }else{
      console.log("Tilt the Phone")
    }
    if(direction!=null){
      senddata(direction)
      
    }
  })
}

  return (
    <>
    
     {btngo?
     <>
     {fardirection?<div id='front'><FontAwesomeIcon icon={faArrowUp} bounce /></div>:""}
     {backdirection?<div id='back'><FontAwesomeIcon icon={faArrowDown} bounce /></div>:""}
     {leftdirection?<div id='left'><FontAwesomeIcon icon={faArrowLeft} beat /></div>:""}
     {rightdirection?<div id='right'><FontAwesomeIcon icon={faArrowRight} beat /></div>:""}
     <div id='car' onClick={senddata}>
     <FontAwesomeIcon icon={faCarOn} />
     </div>
     <p>Tilt any side of your phone🥳</p>
 
     

     </>
     :<button id='button1' onClick={values}>Start</button>}
    </>
  )
}
  


export default App
