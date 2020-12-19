import './App.css';
import React, { Fragment, useEffect } from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import PrivateRoute from './components/route/PrivateRoute'
import DisplayImage from './components/DisplayImage'
//Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadToken } from './actions/auth'
import { loadImage } from './actions/upload'

function App() {
    useEffect(() => {
        store.dispatch(loadToken())
        store.dispatch(loadImage())
    }, [])

    return (
        <Provider store={store}>
            <Fragment>
                    <Router>
                        <Navbar/>
                        <Switch>
                            <Route path='/register' component={Register} exact/>
                            <Route path='/login' component={Login}/>
                            <PrivateRoute path='/upload'component={FileUpload}/>
                            <PrivateRoute path='/uploadedpic'component={DisplayImage}/>
                            <Route render={() => <Redirect to="/login" />} />
                            {/* <Route path="*" component={Register} /> */}
                        </Switch>
                    </Router>
                </Fragment>
        </Provider>
    );
}

export default App;
