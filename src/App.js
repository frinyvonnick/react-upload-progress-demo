import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { percentage: 0 }

  handleChange = () => { 
    const that = this
    const formData = new FormData();
    const file = this.ref.files[0];
    formData.append('myFile', file);
    const xhr = new XMLHttpRequest()
    xhr.open('post', 'http://localhost:4000/api/upload', true)
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        const percentage = (e.loaded / e.total) * 100
        that.setState({ percentage })
      }
    };
    xhr.onerror = function(e) {
      console.error('An error occurred while submitting the form. Maybe your file is too big')
    };
    xhr.onload = function() {
      console.log(this.statusText)
    };

    xhr.send(formData)
  }

  render() {
    return (
      <div className="App">
        <div style={{ backgroundColor: 'green', height: '20px', width: `${this.state.percentage}%` }}></div>
        <button onClick={() => { this.ref.click() }}>Joindre un fichier</button>
        <input
          style={{ visibility: 'hidden' }}
          ref={ref => { this.ref = ref }}
          onChange={this.handleChange} type="file"
        />
      </div>
    );
  }
}

export default App;
