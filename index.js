import React from 'react';
import { render } from 'react-dom';
import Contacts from './Contacts';

class App extends React.Component {
  render() {
    return (
    <Contacts/>
  );
    
  }
}

render(<App />, document.getElementById('root'));
