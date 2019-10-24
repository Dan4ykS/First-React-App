import React from 'react';
import '../css/ListBlock.css';
import LisBlockItem from './ListBlockItem';

function Form({need, deleteElement, changeDone, changeImportant}){
  const elements = need.map((item)=>{
    const {id,...needItem} = item;
    return(
    <li key = {id}>
      <LisBlockItem {... needItem} 
      deleteItem = {() => deleteElement(id)}
      changeDone = {() => changeDone(id)}
      changeImportant ={() => changeImportant(id)}/>
    </li>);
  });

  return (
    <div className='mainContent'>
      <ul>
        {elements}
      </ul>
    </div>
  );
}
export default Form;