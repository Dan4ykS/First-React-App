import React from 'react';
import '../css/App.css';

import LisBlock from './ListBlock';
import FormBlock from './FormBlock';
import SearchBlock from './SearchBlock';

export default class App extends React.Component{
  state={
    todoData: [],
    search: '', 
    filter: 'all'
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
    })
  };

  deleteElement = (id) => {
    this.setState(({todoData})=>{
      const elId = todoData.findIndex((el) => el.id === id );
      const newData = [ ...todoData.slice(0, elId), ...todoData.slice(elId+1)];
      return{
        todoData: newData
      };
    })
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
    })
  };

  changeImportant = (id) =>{
    this.setState(({todoData})=>{
      const newData = this.changeProperty(id,todoData,'important');
      return {
        todoData: newData
      };
    })
  };

  changeSearchEl = (el) => {
    this.setState({search: el})
  };

  chageFilterEl = (el) => {
    this.setState({filter: el})
  };
      
  searchElement = (arr, search) => {
    if (search === ''){
       return arr
    }
    return arr.filter((e)=> e.lable.toLowerCase().includes(search.toLowerCase()));
  };

  filterElement = (arr, filterProp) => {
    if(filterProp==='all'){
      return arr;
    }
    else if (filterProp === 'done') {
      return arr.filter((el) => el.done);
    }
    else if (filterProp === 'important') {
      return arr.filter((el) => el.important);
    }
  };

  render() {
    const {todoData,search,filter} = this.state
    let completed_tasks = todoData.filter((el) => el.done).length;
    let activ_tasks = todoData.filter((el) => el.lable).length - todoData.filter((el) => el.done).length;
    const visibleData = this.searchElement(this.filterElement(todoData,filter),search)
    return (
     <div className="container">
       <h2>Список дел</h2>
       <div className='text'>Активных задач: {activ_tasks === 0 ? 'все задачи выполнены!': activ_tasks } <br/> Выполненных задач: {completed_tasks === 0 ? 'у вас пока нет выполненных задач': completed_tasks }</div>
       <SearchBlock 
       placeholder='Поиск'
       searchElement = {this.changeSearchEl}
       filterElement = {this.chageFilterEl}
       startfilter = {this.state.filter}/>
       <LisBlock
        changeDone = {this.changeDone}
        changeImportant={this.changeImportant}
        need = {visibleData}
        deleteElement={this.deleteElement}
       />
       <FormBlock placeholder='Придумайте новую задачу!' addElement = {this.addElement} btnValue = 'Добавить задачу'/>
     </div>
    );
  };
}
