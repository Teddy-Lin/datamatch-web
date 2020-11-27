import React from 'react';
import {Link} from 'react-router-dom';
import CardViewer from './CardViewer';
import CardEditor from './CardEditor';

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