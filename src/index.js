import "./style";
import { h, Component, render } from "preact";
import linkState from "linkstate";
import { drinks } from "./data";

const DrinkList = ({ drinks, onSelectDrink }) => (
 <ul class="drink-list">
    {drinks.map(({ name, id }) => (
      <Drink
        key={id}
        id={id}
        name={name}
        onSelectDrink={onSelectDrink}
      />
    ))}
  </ul>
)

class Drink extends Component {
  onClick = () => {
    const { onSelectDrink, id } = this.props;
    onSelectDrink( { id });
  }
  
  render({ name, index, id }) {
    return <li>
      <button onClick={this.onClick}>{name}</button>
    </li>;
  }
}

class DrinkDetails extends Component {
  state = { flipped: false }
  onFlipCard = () => this.setState({ flipped: !this.state.flipped});
  render({ drink: { ingredients, directions } }, { flipped }) {
    const flipButtonText = flipped ? 'Ingredients' : 'Directions';
    return (<div class="details">
      {!flipped && <Details
        title="Ingredients"
        items={ingredients} />}

      {flipped && <Details
        title="Directions"
        items={directions} />}
      
      <button 
        class="button-small button-outline" 
        onClick={this.onFlipCard}>
        {`View ${flipButtonText}`}
      </button>
    </div>);
  }
} 

const Details = ({ items, title }) => (
  <div class="details-list">
    <h3>{title}</h3>
    <ul>
      {items.map(i => <li>{i}</li>)}
    </ul>
  </div>
)

export default class App extends Component {
  state = {
    selected: true,
  }

  render(_, { selected }) {
    const selectedDrink = selected ? drinks[selected - 1] : false;
    return (
      <div>
        <h1>Who needs a drink?</h1>
        
        <DrinkList 
          drinks={drinks} 
          onSelectDrink={linkState(this, "selected", "id")}/>
        
        {selected && <DrinkDetails drink={selectedDrink}/>}
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}