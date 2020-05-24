import React from 'react';
import * as firebase from 'firebase';
class SearchBar extends React.Component{
     state={term:''};
  
    componentDidMount(){
        const docRef=firebase.firestore().collection('rooms').doc(this.props.roomID);
        docRef.onSnapshot((doc)=>{
            // console.log("Current data: ", doc.data());
            this.setState({
                term:doc.data().searchTerm
            })
        });
    } 
     
    onInputChange=(event)=>{
        this.setState({term:event.target.value});
        // console.log(event.target.value);
    }
   
    onFormSubmit=(event)=>{
        event.preventDefault();
        this.props.onVideoSearch(this.state.term);
    }

    render(){
        // console.log(this.props.onVideoSearch);
        return (
            <div className="searchbar">
                <form onSubmit={this.onFormSubmit}>
                    <input onChange={this.onInputChange} value={this.state.term} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SearchBar;