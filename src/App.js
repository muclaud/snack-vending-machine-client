import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import ReportPage from './pages/ReportPage';
import SingleCategory from './pages/SingleCategory';

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/report' component={ReportPage} />
        <Route exact path='/category/:categoryId' component={SingleCategory} />
      </Container>
    </Router>
  );
}

export default App;
