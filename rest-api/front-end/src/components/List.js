import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Add from './Add.js'
class List extends Component {
    constructor(props) {
        super(props);{
            this.state = {
                data:[],
                ShowAdd : false,
                editableId : 3,
            
            }
            
        }
    }
     componentDidMount() {
     fetch('/api').then(res => res.json()).then(data => this.setState({
         data: data
     })).catch(err => console.log(err))
        console.log(this.state.data)
     }
     deleteRecord = (evt) =>{
      //   console.log(evt.target.id)
         fetch(`/${evt.target.id}`,{
             method: 'DELETE',
         }).then(() =>{alert('deleted')}).then(() => {window.location.reload()})
       
     }
    handleEdit=(evt) => {
            this.setState({
                editableId : evt.target.id
            })
            console.log(this.state.editableId)
     }
     saveChanges=()=>{
         console.log(this.state)
         fetch(`/update?id=${this.state.editableId}&title=${this.state.title}&description=${this.state.description}&url=${this.state.url}`,{
             method : "PUT",
             headers: { 'Content-Type': 'application/json' },
         })
         .then(response => response.json())
         .then(res=> console.log(res))
         .then(()=>{
             alert('Updated');
             window.location.reload();
            })
     }
     handleChange=(evt)=>{
         this.setState({
             [evt.target.name] : evt.target.value
         })
     }
    render() {

        return (
            < div className="App">

                <h1>List of Web Projects</h1>
                <div>
                <button className="btn" onClick={()=>{this.setState({ShowAdd: true});}}>Add Record</button>
                {this.state.ShowAdd===true? <Add/> : ""}
                </div>
                <br></br>
            <table className="center">
                    <tbody>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>URL</th>
                    <th></th>
                </tr>
                {
                    this.state.data.map(record=>(

                        
                        
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td ><input type="text" name="title" defaultValue={record.title}  disabled={this.state.editableId===record.id? false : true} onChange={this.handleChange}/></td>
                    <td><input type="text" defaultValue={record.description} name="description"  disabled={this.state.editableId===record.id? false : true}   onChange={this.handleChange}/></td>
                    <td><input  type="text" defaultValue={record.url} name="url" disabled={this.state.editableId===record.id? false : true}  onChange={this.handleChange}/> </td>
                   
                 <td><input type="button" value="Delete" id={record.id} onClick={this.deleteRecord}></input></td>
                <td><input type="button" value="Edit" id={record.id} onClick={this.handleEdit}></input></td>
                <td><input type="button" value="Save" id={record.id} onClick={this.saveChanges}></input></td>

                </tr>
                    ))
                }
                 </tbody>
                </table>
                
            </div>
        );
    }
}

export default List;
