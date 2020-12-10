import React from 'react';
import './CardViewer.css'
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class CardViewer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            front: true,
            index: 0,
        }
    }

    flip = () => this.setState({front: !this.state.front});
    next = () => {
        if (this.state.index < this.props.cards.length - 1) {
            this.setState({
                index: this.state.index + 1, 
                front: true});
        }
    };

    previous = () => {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1, 
                front:true});
        }
    };
        
    
    render(){
        if (!isLoaded(this.props.card)) {
            return <div>Loading...</div>;
        }
        if (isEmpty(this.props.cards)){
            return <div>Page Not Found!</div>
        }
        const cards = this.props.cards.map(card =>{
            if (this.state.front) {
                return (
                    <tr>
                        <td>{card.front}</td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{card.back}</td>
                    </tr>
                )
            }
            
        });

        return(
            <div>
                <h2>{this.props.name}</h2>
                <h4>You are viewing the {this.state.front? "front" : "back"} of card number {this.state.index + 1}</h4>
                <h4>{this.state.index === this.props.cards.length - 1? "Congratulations! You've reached the end." : "There are still " + (this.props.cards.length - this.state.index - 1) + " cards left till you reach the end."}</h4>
                <table>
                    <tbody onClick = {() => this.flip()}>
                        {cards[this.state.index]}
                    </tbody>
                </table>
                {/* why three ===? */}
                <button disabled = {this.state.index === 0} onClick = {() => this.previous()}>Previous</button>
                <button disabled = {this.state.index === this.props.cards.length - 1} onClick = {() => this.next()}>Next</button>
                <hr/>
                <Link to = "/">Home</Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return {cards: cards, name: name};
}

export default compose (
    withRouter, 
    firebaseConnect(props => {
        console.log(props);
        const deckId = props.match.params.deckId
        return [{path: '/flashcards/${deckId}', storeAs: deckId }]
    }),
    connect(mapStateToProps),
)(CardViewer);