import React from 'react';
import '../css/App.css';

import LisBlock from './ListBlock';
import FormBlock from './FormBlock';

export default class App extends React.Component{
  state={
    todoData: []
  };
  startid = 1;
  addElement = (text) => {
    const newElement = {
      lable: text,
      done: false,
      important: false,
      id: this.startid++
    };
    this.setState(({todoData})=>{
      const newData = [...todoData, newElement];
      return{
        todoData: newData,
      };
    });
  };
  deleteElement = (id) => {
    this.setState(({todoData})=>{
      const elId = todoData.findIndex((el) => el.id === id );
      const newData = [ ...todoData.slice(0, elId), ...todoData.slice(elId+1)];
      return{
        todoData: newData
      };
    });
  };
  changeProperty = (id, arr, propName) => {
    const elId = arr.findIndex((el) => el.id === id );
    const oldElement = arr[elId];
    const newElement = {...oldElement, [propName]: !oldElement[propName]};
    return [ ...arr.slice(0, elId), newElement, ...arr.slice(elId+1)];
  };
  changeDone = (id) => {
    this.setState(({todoData})=>{
      const newData = this.changeProperty(id,todoData,'done');
      return {
        todoData: newData
      };
    });
  };
  changeImportant = (id) =>{
    this.setState(({todoData})=>{
      const newData = this.changeProperty(id,todoData,'important');
      return {
        todoData: newData
      };
    });
  };
  render() {
    const {todoData} = this.state
    let completed_tasks = todoData.filter((el) => el.done).length;
    let important_tasks = todoData.filter((el) => el.important).length;
    // const nodata = [{lable: 'Добавь свою первую задачу!', done: false, important: false, id: 0}]
    // .length === 0 ? nodata : todoData
    return (
     <div className="container">
       <h2>Список дел</h2>
       <div className='text'>Выполненные дела: {completed_tasks === 0 ? 'у вас пока нет выполненных дел': completed_tasks } <br/> Важные дела: {important_tasks === 0 ? 'вы еще не добавляли важных дел': important_tasks }</div>
       <LisBlock
        changeDone = {this.changeDone}
        changeImportant={this.changeImportant}
        need = {todoData}
        deleteElement={this.deleteElement}
       />
       <FormBlock addElement = {this.addElement} btnValue = 'Добавить задачу'/>
     </div>
    );
  }
}
