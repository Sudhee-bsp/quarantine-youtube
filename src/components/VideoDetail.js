import React from 'react';
import YouTube from '@u-wave/react-youtube';
import * as firebase from 'firebase';

class VideoDetail extends React.Component{
    state={
        paused:false,
        videoId:""
    }
    componentDidMount(){
        const docRef=firebase.firestore().collection('rooms').doc(this.props.roomID);
        docRef.onSnapshot((doc)=>{
            console.log("Current data: ", doc.data().paused);
            this.setState({
                paused:doc.data().paused,
                videoId:doc.data().videoId
            })
            console.log(this.state);
        });        
    }
   onTubePlaying=()=>{
        // this.setState({
        //     paused:false
        // })
        console.log('tube is playing');
        const docRef=firebase.firestore().collection('rooms').doc(this.props.roomID);
        docRef.update({
            paused:false
        })
    }

   onTubePause=()=>{
        // this.setState({
        //     paused:true
        // })
        console.log('tube is paused');
        const docRef=firebase.firestore().collection('rooms').doc(this.props.roomID);
        docRef.update({
            paused:true
        })
    }

    

    render(){
        if(!this.props.video){
            return <div>Not any video has been selected</div>;
        }
         return (
             <div className="video-detail col-8">
                 <YouTube
                     video={this.state.videoId}
                     height={300}
                     width={500}
                     paused={this.state.paused}
                    autoplay={true}
                    //   onReady={this.onTubeReady}
                     onCued={this.onTubeCued}
                    //  onStateChange={this.onTubeStateChange}
                     onPause={this.onTubePause}
                     onPlaying={this.onTubePlaying}
                     allowFullscreen={true}
                 />
                 <div className="details">
                     <div>{this.props.video.snippet.title}</div>
                     <div>{this.props.video.snippet.description}</div>
                 </div>
             </div>
         )     
    }
}

export default VideoDetail;
