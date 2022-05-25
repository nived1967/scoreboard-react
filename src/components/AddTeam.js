import React from 'react'
import { useEffect } from 'react';
import { useState } from "react";

class AddTeam extends React.Component {
        constructor(props)
        {
            super(props);
            this.state={
                teamName:"",
                teamScore:0,
            };

        }
    render() { 
        return <form className="row mb-5" onSubmit={(e)=>{
            e.preventDefault();
            this.props.addTeam(this.state.teamName,Number(this.state.teamScore));
        }}>
        <div className="mb-3 col-4">
          <label htmlFor="inputName" className="form-label">
            Team Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            aria-describedby="name"
            name="teamName"
            onChange={(e) =>{
                this.setState({teamName: e.currentTarget.value})
            }}
            value={this.state.teamName}
          />
        </div>
        <div className="mb-3 col-4">
          <label htmlFor="inputPrice" className="form-label">
            Score
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            name="teamScore"
            onChange={(e) =>{
                this.setState({teamScore: Number(e.currentTarget.value)})
            }}
            value={Number(this.state.teamScore)}
          />
        </div>
        <button type="submit" className="btn btn-primary col-2 mt-3" >
          Add
        </button>
      </form>
      ;
    }
}
 
export default AddTeam;