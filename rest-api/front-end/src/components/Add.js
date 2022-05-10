import React, { Component } from 'react'

export default class Add extends Component {
  
  constructor(props) 
  {
    super(props)
    this.state={
      id : "",
      title : "",
      description :"",
      url : "",

    }
  }
  handleChange=(e) => {
   
        this.setState({
          [e.target.name]: e.target.value,
        })
       console.log(this.state)
  }
  handleSubmit = (event) => {
   event.preventDefault()
    alert('submitted')
   
    fetch('/projects',{
      method : 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify(this.state)
    }).then(()=>(window.location.reload()))
   
alert(JSON.stringify(this.state))
  }
  render() {
    return (
     

      <div className="model-body">
          <form>
              <div className="form-group">
              <label>ID : </label> <br></br>
              < input type = "text"
              name = "id"
              onChange ={this.handleChange}
                  />
             </div>
             <div className="form-group">
              <label>Title</label> <br></br>
              < input type = "text"
              name = "title"
             onChange = {
              this.handleChange
             }
              />
              </div>
                 <div className="form-group">
              <label>Description</label> <br></br>
              < input type = "text"
              name = "description"
onChange ={this.handleChange} />             
              </div>
                 <div className="form-group">
              <label>URL</label> <br></br>
              < input type = "text"
              name = "url"
             onChange ={this.handleChange}
              />
              </div>
              <div>
                  <input type="submit" value="Save"  onClick={this.handleSubmit} />
              </div>
          </form>
      </div>
   
    )
  }
}
