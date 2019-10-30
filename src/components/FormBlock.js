import React from 'react';
import '../css/FormBlock.css';

export default class InputBlock extends React.Component{
  state={
    value: ''
  };
  customOnChange = (event) => {
    this.setState({
      value: event.target.value
    })
  };
  customSubmit = (event) => {
    event.preventDefault();
    this.props.addElement(this.state.value);
    this.setState({
      value: ''
    })
  };
  render(){
    const {btnValue} = this.props;
    const {value} = this.state;
    return(
      <form className='wrap' onSubmit={this.customSubmit}>
        <input type='text' value={value} onChange={this.customOnChange} placeholder={this.props.placeholder}className='castomInput'></input>
        <button className='castomBtn'>{btnValue}</button>
      </form>
    );
  };
}
