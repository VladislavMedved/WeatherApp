import React from 'react';

import './App.css';
import { Header } from './components/header';
import { DenseTable } from './components/countriesTable';

function App() {
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <DenseTable />
      </div>
      
    </>
  );
}

export default App;
