import React from 'react';
import { evaluate } from 'mathjs';
import "./App.css";

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      expression: '',
      result: ''
    }
  }

  handleInput = (event) => {
    let expression = event.target.value.replace(/=|;|:|@|[^=+-^*./)(]/,'');
    this.evalExpression(expression);
  }

  handleKeyPress = (key) => {
    let expression = this.state.expression;
    let newExpression = '';
    if (key != '<-' && key != '=') {
      newExpression = expression+key;
    } else if (key != '=') {
      newExpression = expression.slice(0,expression.length-1);
    } else {
      return;
    }
    this.evalExpression(newExpression);
  }

  evalExpression = (expression) => {
    try {
      let result = evaluate(expression);
      this.setState({expression, result})
    } catch (err) {
        this.setState({expression, result: "INVALID EXPRESSION"})
      }
  }

  render(){
    const {expression, result} = this.state;
    return(<div className="container">
        <div className="wrapper">
          <input type="text" value={expression} pattern={"[0-9]*"} onChange={this.handleInput}/>
          <p>Result: {result}</p>
          {buttons.map(el => <div className="button" key={el}>
                                <button onClick={() => this.handleKeyPress(el)}>
                                  {el}
                                </button>
                                {(buttons.indexOf(el)+1)%4 === 0 ? <br/> : ''}
                              </div>
                              )}
        </div>
      </div>
    );
  }
}

const buttons = ['<-', '(',')','^','7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+']

export default App;