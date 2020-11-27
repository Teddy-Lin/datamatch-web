import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
    render () {
        return(
            <div>
                <Link to = "/viewer">Card Viewer</Link>
                <br/>
                <Link to = "/editor">Card Editor</Link>
            </div>
            
        )
    }
}

export default HomePage;