import React from 'react';
import AddNewButton from './Button';
import style from './AddTrack.module.css';

type AddTrackProps = {
  onAdd: () => void;
};

const AddTrack = ({ onAdd }: AddTrackProps) => (
  <div className={style['add-track-container']}>
    <h1>No tracks yet.</h1>
    <AddNewButton action={onAdd} />
  </div>
);

export default AddTrack;
