import React from "react";
import AddNewButton from "./AddNewButton";
import "./AddTrack.css";

const AddTrack = (props) => (
  <div className="add-track-container">
    <h1>No tracks yet.</h1>
    <AddNewButton action={props.onAdd} />
  </div>
);

export default AddTrack;
