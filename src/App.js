import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      val:0,
      counter:1,
      max:1000,
      load:false

    }
    this.get = this.get.bind(this)
    this.send = this.send.bind(this)
    this.handleChange = this.handleChange.bind(this);
  
  }
  componentDidMount(){
    if (process.env.MAX_VALUE!=undefined){
      this.setState({
        max:process.env.MAX_VALUE
      })
    }
    axios.get("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json")
    .then((res)=>{
      if (res.data ==null){
        this.setState({
          counter:1,
          val:1
        })
      }
      else{
        this.setState({
          counter:parseInt(res.data),
          val:parseInt(res.data)
        })
      }
    })

  }
  send(x){
      
    axios.post("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",{kishore: x})
    .then((res)=>{
      this.setState({load:false})
    })

  }

  handleChange(event) {
    this.setState({val: event.target.value});
  }
  

 get(e) {
    e.preventDefault()
    if(parseInt(this.state.val)!=this.state.counter){
      this.setState({
        counter:parseInt(this.state.val),
        val:parseInt(this.state.val),
        load:true
      })
      this.send(parseInt(this.state.val))
      
      
      return
    }
    if(e.target.dataset.op=="add"){
    if (parseInt(this.state.counter)==this.state.max){
      return
    }
      let x=parseInt(this.state.counter)+1
      this.setState({
        counter:x,
        val:x,
        load:true
      })
      this.send(x)
   }
   if(e.target.dataset.op=="sub"){
     if (parseInt(this.state.counter)==1){
       return
     }
    let x=parseInt(this.state.counter)-1
    this.setState({
      counter:x,
      load:true,
      val:x
    })
    this.send(x)
 }
    
  }

  render() {
    return (

        <div className="main">
          <div className="content">
          {this.state.load==true? <div className="sending"><div className="loader"></div><div style={{marginLeft:"8px"}}>Saving Counter value</div> </div>: <div style={{visibility:"hidden"}}>Saving Counter value</div>}
          <br></br>

          <div className="from">
          <form>
            <div className="button sub">
            <button  data-op="sub" onClick={this.get}>-</button>
            </div>
            
            <div className="input">
              
              <input type="text" value={this.state.val} onChange={this.handleChange} />
            </div>
            <div className="button add">
            <button  data-op="add" onClick={this.get}>+</button>
            </div>
          </form>
          <br></br>
          </div>
           Counter value {this.state.counter}
           </div>
        </div>

      
    );
  }
}

export default App;
