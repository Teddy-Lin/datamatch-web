import React from 'react';
import './CardEditor.css';
import {Link} from 'react-router-dom';
import {firebaseConnect, withRouter} from 'react-redux-firebase';
import {compose} from 'redux';

class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards: [
                {front: 'front1', back: 'back1'}, 
                {front: 'front2', back: 'back2'}, 
              ], 
            front: '', 
            back: '', 
            name: '',
        
        }
    }

    // handleFrontChange = event => {
    //     console.log(event.value.name);
    //     this.setState({front: event.target.value});
    // };

    // handleBackChange = event => {
    //     console.log(event.value.name);
    //     this.setState({back: event.target.value});
    // };


    addCard = () => {
        // if neither side is empty
        if (this.state.front.trim() && this.state.back.trim()){
            alert("Cannot add empty card");
            return 
        } 

        const newCard = { front: this.state.front, back:this.state.back};
        const cards = this.state.cards.slice().concat(newCard);
        this.setState({cards, front: '', back: ''});
    };

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({ cards });
    };
    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    createDeck = () => {
        const deckId = this.props.firebase.push('./flashcards').key;
        const newDeck = {cards: this.state.cards, name: this.state.name};
        const onComplete = () => {
            console.log("database updated!");
            this.props.history.push(`/viewer/${deckId}`);
        };
        this.props.firebase.update(`/flashcards/${deckId}`, newDeck, onComplete);
    }

    render() {
        const cards = this.state.cards.map((card, index) =>{
            return (
                <tr key = {index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick = {() => this.props.deleteCard(index)}>
                            Delete Card
                        </button>
                    </td>
                </tr>
            )
        });

        return(
            <div>
                <h2>Card Editor</h2>
                <div>
                    Deck name:
                <input 
                    name = "name"
                    onChange = {this.handleChange}
                    placeholder = "name of deck" 
                    value = {this.state.name}/>
                </div>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br/>
                <input 
                name = "front"
                onChange = {this.handleChange} 
                placeholder = "Front of Card" 
                value = {this.state.front}
                />
                <input 
                name = "back"
                onChange = {this.handleChange} 
                placeholder = "Back of Card" 
                value = {this.state.back}
                />
                <button onClick = {this.addCard} disabled = {!this.state.front.trim() || !this.state.back.trim()}>Add Card</button>
                <hr/>
                
                <div>
                    <button
                        disabled = {!this.state.name.trim() || this.state.cards.length === 0}
                        onClick=  {this.createDeck}
                    >Create Deck</button>
                </div>
                <br/>
                <Link to = "/viewer">Go to Card Viewer</Link>
            </div>
        )
    }
}

export default compose(firebaseConnect(), withRouter)(CardEditor);
