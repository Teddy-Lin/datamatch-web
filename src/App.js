import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './HomePage';

import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'}, 
        {front: 'front2', back: 'back2'}, 
      ], 
    }
  }

  addCard = card => {
      const cards = this.state.cards.slice().concat(card);
      this.setState({ cards });
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  }


  render() {
    return (
      <Switch>
        <Route exact path = "/">
          <HomePage/>
        </Route>
        <Route exact path = "/editor">
          <CardEditor 
            addCard = {this.addCard} 
            deleteCard = {this.deleteCard} 
            cards ={this.state.cards}
          />
        </Route>
        <Route exact path = "/viewer">
          <CardViewer 
          cards ={this.state.cards}
          />
        </Route>
      </Switch>

    );
    
  }
}

export default App;
