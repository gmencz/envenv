import React from 'react';
import Logo from './assets/logo.svg';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={Logo} alt='dsaf' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
