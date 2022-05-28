import React from "react";
import Teams from "./Teams";

export default function TeamList(props) {
  return (
    props.teamList.length > 0 ?
    props.teamList.map((team, i) => {
    return (
      <Teams
        team={team}
        key={i}
        incrementQuantity={props.incrementQuantity}
        decrementQuantity={props.decrementQuantity}
        selectUser={props.selectUser}
        updateUser={props.updateUser}
        index={i}
      />
    )
  }
   ) : <h1>No Teams Left</h1>
  );
}
