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

export default class App extends Component {
  state = {
    selected: null,
  }

  render(_, { selected }) {
    return (
      <div>
        <h1>Who needs a drink?</h1>
        <DrinkList 
          drinks={drinks} 
          onSelectDrink={linkState(this, 'selected', 'id')}/>
        
        {selected && <div class="selected">
          {drinks[selected - 1].ingredients.map(i => <p>{i}</p>)}
        </div>}

        {selected && <hr/>}
        {selected && <div class="selected">
          {drinks[selected - 1].directions.map(i => <p>{i}</p>)}
        </div>}
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}