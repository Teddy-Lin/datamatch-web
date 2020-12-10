import React from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';

const Test = props => {
    if (!isLoaded(props.flashcards)){
        return <div>Loading...</div>;
    }
    
    // return <div>Test {props.match.params.id}</div>
    // return <div>Test</div>;
    return <div>{props.flashcards.deck1.name}</div>;
};

 const mapStateToProps = state => {
     console.log(state);
    //  const isEmpty = state.firebase.profile.isEmpty;
     const flashcards = state.firebase.data.flashcards;
    //  return {test: '1234', hello: 'world', isEmpty: isEmpty};
    return {flashcards};
 };

// export default Test;
// export default withRouter(Test);
// export default connect(mapStateToProps)(Test);
// export default firebaseConnect(['/flashcards'])(Test);
// export default firebaseConnect(['/flashcards'])(connect(mapStateToProps)(Test));
export default compose(firebaseConnect(['/flashcards']), connect(mapStateToProps))(Test);