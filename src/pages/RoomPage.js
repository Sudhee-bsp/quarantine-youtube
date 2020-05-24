import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {createRoom,joinRoom} from '../store/actions/RoomActions';

class RoomPage extends Component {

    state={
        create_username:'',
        create_roomID:'',
        join_username:'',
        join_roomID:''
    }


    onCreateFormSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.create_username.length || !JSON.stringify(this.state.create_roomID).length){
            alert('Please enter all the fields');
        }else if(JSON.stringify(this.state.create_roomID.length)<4){
            alert('Please enter a ROOM ID of more than 4 digits');
        }else{
            this.props.createRoom({username:this.state.create_username,roomID:this.state.create_roomID});
        }
    }

    onJoinFormSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state);
        if(!this.state.join_username.length || !JSON.stringify(this.state.join_roomID).length){
            alert('Please enter all the fields');
        }else if(JSON.stringify(this.state.join_roomID.length)<4){
            alert('Please enter a ROOM ID of more than 4 digits');
        }else{
            // console.log(this.state);
            this.props.joinRoom({username:this.state.join_username,roomID:this.state.join_roomID});
        }
    }

    onInputChange=(e)=>{
        // console.log(e.target.id);
        this.setState({[e.target.id]:e.target.value})
    }

    render() {
        const {roomMessage}=this.props;
        if(roomMessage!==null){
            if(roomMessage!=='Successfully created the room' && roomMessage!=='Successfully joined the room'){
                console.log(roomMessage);
            }else{
                return <Redirect to="/ctube" />
                // alert(createRoomMessage);
            }
        }
        return (
            <div className="container"  >
                <div className="row">
                    <div className="col">
                        <h3>Create Room Page</h3>
                        <form onSubmit={this.onCreateFormSubmit} className="mt-5" style={{borderRight:'1px dotted black'}}> 
                            <div className="form-group">
                                <input type="text" id="create_username" name="create_username" placeholder="Enter username" onChange={this.onInputChange} />
                            </div>
                            <div className="form-group">
                                <input type="number" id="create_roomID" name="create_roomID" placeholder="Enter roomID" onChange={this.onInputChange} />
                            </div>
                            <button className="btn btn-primary" type="submit">Create</button>
                        </form>
                    </div>
                    <div className="col">
                    <h3>Join Room Page</h3>
                        <form onSubmit={this.onJoinFormSubmit} className="mt-5">
                            <div className="form-group">
                                <input type="text" id="join_username" name="join_username" placeholder="Enter username" onChange={this.onInputChange} />
                            </div>
                            <div className="form-group">
                                <input type="number" id="join_roomID" name="join_roomID" placeholder="Enter roomID" onChange={this.onInputChange} />
                            </div>
                            <button className="btn btn-primary" type="submit">Join</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        roomMessage:state.rooms.errorMessage
    }
}

export default connect(mapStateToProps,{createRoom,joinRoom})(RoomPage);
