import React, {Component} from 'react';
import SideNav from 'containers/SideNav'
import Router from 'containers/Router'
import 'materialize-src/sass/materialize.scss'

class App extends Component {
    render() {
        return (<div>
            <SideNav />
            <Router />
            {/* <Footer /> */}
        </div>);
    }
}

export default App
