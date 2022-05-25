import TeamList from "./components/TeamList";
import React, { useState } from "react";
import AddTeam from "./components/AddTeam";
import { useEffect } from 'react';

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
    fetch("http://localhost:3000/users").then((result)=>{
      result.json().then((resp)=>{
        setTeamList(resp)
        setName(resp[0].name)
        setScore(resp[0].score)
        setId(resp[0].id)
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
    newTeamList[index].score+=10;
    setTeamList(newTeamList);
  };

  const decrementQuantity = (index) => {
    let newTeamList = [...teamList];
    if (newTeamList[index].score > 0) {
      newTeamList[index].score-=10;
    }
    setTeamList(newTeamList);
  };

  const selectUser = (index) => {
    // newTeamList.splice(index, 1);
    setName(teamList[index].name)
    setScore(teamList[index].score)
    setId(teamList[index].id)
  };

  function updateUser()
  {
    let item={name,score,id}
    console.warn("item",item)
    fetch(`http://localhost:3000/users/${id}`,{
      method:'PUT',
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
      fetch("http://localhost:3000/users",{
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
        />
        <div className="App">
          <button className="btn btn-primary" onClick={()=>updateUser()}>
          Submit
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
