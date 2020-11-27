import React from 'react';
import './CardEditor.css';
import {Link} from 'react-router-dom';

class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {front: '', back: ''}
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
            this.props.addCard(this.state);
            this.setState({front: '', back: ''});
        } 
    };

    // deleteCard = index => {
    //     this.props.deleteCard(index);
    // };
    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    render() {
        const cards = this.props.cards.map((card, index) =>{
            return (
                <tr key = {index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick = {() => this.props.deleteCard(index)} disabled = {this.props.cards.length === 1}>
                            Delete Card
                        </button>
                    </td>
                </tr>
            )
        });

        return(
            <div>
                <h2>Card Editor</h2>
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
                <Link to = "/viewer">Go to Card Viewer</Link>
            </div>
        )
    }
}

export default CardEditor