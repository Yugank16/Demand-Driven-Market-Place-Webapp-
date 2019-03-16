import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateLayout from './Components/Layout/PrivateLayout';
import PublicLayout from './Components/Layout/PublicLayout';
import FlashMessage from './Containers/FlashMessage';
import NotFound from './Components/NotFound';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <FlashMessage />
                    <Switch>
                        <Route path="/home" component={PrivateLayout} />
                        <Route path="/" component={PublicLayout} />  
                        <Route path="*" component={NotFound} />                 
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
