import React from 'react';
import '../css/SearchBlock.css';

export default class SearchBlock extends React.Component{
  state = {
    value: ''
  };

  buttons = [
    {name: 'all', value: 'Все'},
    {name: 'done', value: 'Выполненные'},
    {name: 'important', value: 'Важные'}
  ];

  customOnChange = (event)=>{
    const {searchElement = () =>{}} = this.props;
    this.setState({
      value: event.target.value
    })
    searchElement(event.target.value)
  };

  render(){
    const buttons = this.buttons.map(({name,value}) => {
      const { filterElement = () => {},startfilter } = this.props;
      let isActive = startfilter === name
      return(
        <button onClick = {() => filterElement(name)} key={name} className = {isActive ? 'search__custombtn active': 'search__custombtn'}>{value}</button>
      );
    });
    return(
      <div className='search'>
        <input type='text' onChange={this.customOnChange} placeholder={this.props.placeholder}className='search__castomInput'></input>
        {buttons}
      </div>
    );
  };
}