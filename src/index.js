import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider,useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {reduxFirestore,getFirestore,createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider,getFirebase,isLoaded} from 'react-redux-firebase';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';

// import './index.css';
import rootReducer from './store/reducers/rootReducer';

import 'bootstrap/dist/css/bootstrap.css';

const store=createStore(rootReducer,
  compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
  reduxFirestore(fbConfig)
  )  
);

const profileSpecificProps={
  userProfile:'users',
  useFirestoreForProfile:true,
  enableRedirectHandling:false,
  resetBeforeLogin:false
}

const rrfProps={
  firebase,
  config:fbConfig,
  config:profileSpecificProps,
  dispatch:store.dispatch,
  createFirestoreInstance
}

const Loading=()=>{
  return (
   <div className="row">
     <div className="col">
       <h4>Loading.....</h4>
     </div>
   </div>
  )
}

const AuthIsLoaded=({ children })=> {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div><Loading /></div>;
  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
