import React from "react";

export default function Teams(props) {

  return (
    <div className="row mt-3">
      <div className="col-5">
        <h2>
          {props.team.name}
          <span className="badge bg-secondary">{props.team.score}</span>
        </h2>
      </div>
      <div className="col-3">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              props.decrementQuantity(props.index);
            }}
          >
            -
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              props.incrementQuantity(props.index);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="col-2">
        {props.team.score}
      </div>
      <button
        className="col-2 btn btn-danger"
        onClick={() => {
          props.selectUser(props.index);
        }}
      >
        Click this after updation then press submit
      </button>
    </div>
  );
}
