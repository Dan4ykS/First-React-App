import React from 'react';
import '../css/App.css';

import LisBlock from './ListBlock';
import FormBlock from './FormBlock';
import SearchBlock from './SearchBlock';

export default class App extends React.Component{
  state = {
    todoData: [],
    search: '', 
    filter: 'all',
    date: new Date()
  };

  startid = 1;

  componentDidMount(){
    setInterval(() => {
      this.setState({ date : new Date()})
    }, 1000);
  }

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
    const {todoData,search,filter,date} = this.state,
      visibleData = this.searchElement(this.filterElement(todoData,filter),search);
    let completed_tasks = todoData.filter((el) => el.done).length,
      activ_tasks = todoData.filter((el) => el.lable).length - todoData.filter((el) => el.done).length;
    return (
     <div className="container">
       <h2>Список дел</h2>
       <div className='header'>
        <div className='header__time'>
            <span>Текущее время:</span> {date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()}:{date.getMinutes() < 10 ? ('0' + date.getMinutes()): date.getMinutes() }:{date.getSeconds()<10? ('0' + date.getSeconds()): date.getSeconds()}
        </div>
        <div className='header__text'>
          <span>Активных задач:</span> {activ_tasks === 0 ? 'все задачи выполнены!': activ_tasks } <br/> <span>Выполненных задач:</span> {completed_tasks === 0 ? 'у вас пока нет выполненных задач': completed_tasks }
        </div>
      </div>
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
