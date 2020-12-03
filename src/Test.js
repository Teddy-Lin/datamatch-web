import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';

const Test = (props) => {
    // return <div>{props.flashcards.deck1.name}</div>
    return <div>Test {props.match.params.id}</div>
    // return <div>Test</div>
}

// const mapStateToProps = state => {
//     if (!isLoaded(props.flashcards)){
//         return <div>Loading...</div>;

//     }
//     console.log(state);
//     const flashcards = state.firebase.data.flashcards;
//     return {test: '1234', hello: 'world', isEmpty: isEmpty};
// };


// // export default firebaseConnect([/flashcards])(connect(mapStateToProps)(Test));
// export default compose(
//     firebaseConnect([/flashcards]),
//     connect(mapStateToProps),
// )(Test);

// export default Test;
export default withRouter(Test);