import React from 'react';
import '../css/SearchBlock.css';

export default class SearchBlock extends React.Component{
  state = {
    value: '',
    active: false,
  };
  customOnChange = (event)=>{
    const {searchElement = () =>{}} = this.props
    this.setState({
      value: event.target.value
    })
    searchElement(event.target.value)
  };
  customOnClick = (el) => {
    this.setState(({active})=>{
      return{
        active: !active
      };
    })
  };
  render(){
    let clas = 'search__custombtn';
    if(this.state.active){
      clas += ' active';
    }
    return(
      <div className='search'>
        <input type='text' onChange={this.customOnChange} placeholder={this.props.placeholder}className='search__castomInput'></input>
        <button onClick={this.customOnClick} className={clas}>Все</button>
        <button onClick={this.customOnClick} className={clas}>Выполненные</button>
        <button onClick={this.customOnClick} className={clas}>Важные</button>
      </div>
    );
  };
}