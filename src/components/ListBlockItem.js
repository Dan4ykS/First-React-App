import React from 'react';
import '../css/LisBlockItem.css';

export default function FormItem({lable,deleteItem,changeDone,done,changeImportant,important}){
  let classNames = 'spanContainer__lable';
    if (important) {
      classNames +=' important';
    }
    if(done) {
      classNames +=' line-through';
    }
  return (
    <div className='spanContainer fade'>
      <span className={classNames} onClick = {changeDone}>{lable}</span>
      <button onClick={deleteItem} className="spanContainer__delete">
        <i className="far fa-trash-alt"></i>
      </button>
      <button onClick = {changeImportant} className="spanContainer__delete important">
        <i className="fas fa-exclamation"></i>
      </button>
    </div>
  );
};