import _ from 'lodash';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import React from 'react';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import VideoDetail from '../components/VideoDetail';
import YoutubeSearch from '../components/YoutubeSearch';
import {Redirect} from 'react-router-dom';

import {userLogOut} from '../store/actions/UserActions';

import * as firebase from 'firebase';

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            videos:[],
            selectedVideo:null
        };
        
    }
    
    componentDidMount(){
        if(this.props.userDetails){
            const docRef=firebase.firestore().collection('rooms').doc(this.props.userDetails.roomID);
            docRef.onSnapshot((doc)=>{
                    if(doc.data().searchTerm.length===0){
                        console.log('Just logged in');
                    }else{
                        YoutubeSearch(doc.data().searchTerm)
                        .then((state)=>{
                            this.setState(state);
                        });        
                    }
            });
        }else{
            return <Redirect to="/" />
        }    
    }

    onVideoSearch=(searchTerm)=>{
        const docRef=firebase.firestore().collection('rooms').doc(this.props.userDetails.roomID);
        docRef.update({
            searchTerm
        })
        .then(()=>{
            YoutubeSearch(searchTerm)
            .then((state)=>{
                docRef.update({
                    videoId:state.selectedVideo.id.videoId
                })
                this.setState(state);
            })     
        })
        .catch(err=>console.log(err));
    }

    renderContent(roomInfo){
            if(roomInfo[0].users.length!==2){
                return (
                    <div>Waiting for your partner to join</div>
                )
            }else{
                let roomID=this.props.userDetails.roomID;
                return (
                    <div className="container">
                        <SearchBar onVideoSearch={this.onVideoSearch} roomID={roomID} />
                        <div className="row">
                            <VideoDetail video={this.state.selectedVideo} roomID={roomID} />
                            <VideoList 
                            onVideoSelect={selectedVideo=>{
                                const docRef=firebase.firestore().collection('rooms').doc(roomID);
                                docRef.update({
                                    videoId:selectedVideo.id.videoId
                                })
                                this.setState({selectedVideo})
                            }}
                            videos={this.state.videos} />
                        </div>
                    </div>
                );    
            }
    }

    logOut=()=>{
        this.props.userLogOut(this.props.userDetails.username,this.props.userDetails.roomID);
        return <Redirect to="/" />;
    }

    render(){
        const {userDetails,rooms}=this.props;
            if(userDetails===null){
                return <Redirect to="/" />
            }else{
                if(userDetails.username && userDetails.roomID){
                    if(rooms){
                        let roomInfo=rooms.filter(room=>room.id===userDetails.roomID);
                        return (
                            <div>
                                <h1>{userDetails.username}</h1>
                                <button className="btn btn-danger" onClick={this.logOut}>LOGOUT</button>
                                {this.renderContent(roomInfo)}
                            </div>
                        )                
                    }else{
                        return (
                            <div>Loading the search...</div>
                        )
                    }
                }else{
                    return (<div>
                        Welcome to c tube....
                    </div>)
                }    
            }    
    }
}

const mapStateToProps=(state)=>{
    return {
        userDetails:state.rooms.userInfo,
        logOutMessage:state.auth.authMessage,
        rooms:state.firestore.ordered.rooms
    }
}

export default compose(
    connect(mapStateToProps,{userLogOut}),
    firestoreConnect([
        {collection:'rooms'}
    ])
)(HomePage);