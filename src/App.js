import TeamList from "./components/TeamList";
import React, { useState } from "react";
import AddTeam from "./components/AddTeam";
import { useEffect } from 'react';
var a;
var b;
var f=0;
function App() {
  const teams = [];

  let [teamList, setTeamList] = useState(teams);
  const [name,setName]=useState(null);
  const [score,setScore]=useState(0);
  const[id,setId]=useState(null)
  
  useEffect(()=>{
    getUsers();
  },[])

  function getUsers()
  {
    fetch("https://score-board-main.herokuapp.com/scoreboard").then((result)=>{
      result.json().then((resp)=>{
        // console.log(resp.score[0]._id);
        setTeamList(resp.score)
        setName(resp.score[0].name)
        // console.log(resp[0].name);
        setScore(resp.score[0].score)
        setId(resp.score[0]._id)
        // console.log(id)
        a=resp.score[0]._id;
      })
    })
  }

  // function selectUser(id)
  // {
  //   let item=teams[id-1]
  //   setName(item.name)
  //   setScore(item.score)
  //   setId(item.id)
  // }

  // function saveUser()
  // {
  //     console.warn(teamList)
  //     let data={teamList}
  //     fetch("http://localhost:3000/users",{
  //       method:'POST',
  //       headers:{
  //         'Accept':'application/json',
  //         'Content-Type':'application/json'
  //       },
  //       body:JSON.stringify(data)
  //     }).then((result)=>{
  //       console.warn("result",result);
  //     })
  // }
  

  const incrementQuantity = (index) => {
    let newTeamList = [...teamList];
    newTeamList[index].score+=1;
    b=teamList[index]._id;
    setId(teamList[index]._id)
    setTeamList(newTeamList);
  };

  const decrementQuantity = (index) => {
    let newTeamList = [...teamList];
    if (newTeamList[index].score > 0) {
      newTeamList[index].score-=1;
    }
    b=teamList[index]._id;
    setId(teamList[index]._id)
    setTeamList(newTeamList);
  };

  const selectUser = (index) => {
    // newTeamList.splice(index, 1);
    setName(teamList[index].name)
    setScore(teamList[index].score)
    setId(teamList[index]._id)
    // console.log(id);
    b=teamList[index]._id;
    // console.log(b)
    a=teamList[index]._id;
  };

  const updateUser=(name,score,index,f) =>{
    // console.log(b)
    if(f==1)
    {b=teamList[index]._id;}
      console.log(f);
    console.log(b)
    let item={name,score,b}
    // console.log(id)
    // console.log(b)
    // console.log(a)
    // console.log(index)
    console.warn("item",item)
    fetch(`https://score-board-main.herokuapp.com/scoreboard/${b}`,{
      method:'PATCH',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result)=>{
      result.json().then((resp)=>{
        console.warn(resp)
        getUsers()
      })
    })
  }

  const addTeam =(name,score) => {
    setName(name);
    setScore(score);
    console.warn({name,score})
      let data={name,score}
      fetch("https://score-board-main.herokuapp.com/scoreboard",{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }).then((result)=>{
        console.warn("result",result);
        getUsers()
      })
  }

  return (
    <>
      <main className="container mt-5">
        <AddTeam addTeam={addTeam}/>
        
        <TeamList
          teamList={teamList}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          selectUser={selectUser}
          updateUser={updateUser}
        />
        <div className="App">
          <button className="btn btn-primary" onClick={()=>updateUser(name,score,b,0)}>
          Submit
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
