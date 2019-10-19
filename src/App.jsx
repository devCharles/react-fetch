import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      character: {},
      formData: {
        category: 'glasses',
        description: 'just glasses',
        name: 'air'
      },
      success: false
    }
  }

  async componentDidMount () {
    const response = await fetch('https://swapi.co/api/people/1')
    const character = await response.json()
    this.setState({ character })
  }

  async saveData() {
    console.log('saveData')
    const { formData } = this.state

    const response = await fetch('https://react-mktplace.firebaseio.com/.json', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      this.setState({ success: true })
      setTimeout(() => {
        this.setState({ success: false })
      }, 2000)
    }

    console.log('response: ', response)
  }


  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          { this.state.success ? 'TODO COOL!' : 'ALV!' }
          </a>
          <p>
            <button 
              onClick={this.saveData.bind(this)}
            >
              ADD
            </button>
          </p>
        </header>
        <main>
        </main>
      </div>
    )
  }
}

export default App;
