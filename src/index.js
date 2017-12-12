import "./style";
import { h, Component, render } from "preact";
import linkState from "linkstate";
import { drinks } from "./data";

/**
 * @TODOs
 * 
 * Build Ingredients Component
 * Build Steps Component
 * Add Toggle between each?
 * Add Images
 * Add Nicer Styles
 * 
 */

const DrinkList = ({ drinks, onSelectDrink }) => (
 <ul class='drink-list'>
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
    const { id, onSelectDrink } = this.props;
    onSelectDrink( { id });
  }
  
  render({ name, index, id }) {
    return <li>
      <button onClick={this.onClick}>{name}</button>
    </li>;
  }
} 

const DetailsList = ({ items }) => (
  <ul class='details-list'>
    {items.map(i => <li>{i}</li>)}
  </ul>
)

export default class App extends Component {
  state = {
    selected: null,
  }

  render(_, { selected }) {
    const selectedDrink = selected ? drinks[selected - 1] : false;
    return (
      <div>
        <h1>Who needs a drink?</h1>
        <DrinkList 
          drinks={drinks} 
          onSelectDrink={linkState(this, 'selected', 'id')}/>
        
        {selected && <DetailsList items={selectedDrink.ingredients} />} 
        {selected && <DetailsList items={selectedDrink.directions} />}

      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}