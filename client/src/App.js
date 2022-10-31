import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DataProvider } from './utils/DataContext';
import { ToastContainer, toast } from 'react-toastify';

import Header from './components/Header';
import Hero from './components/Hero';
import Search from './pages/Search';
import Saved from './pages/Saved';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  return (
    <DataProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnHover={true}
        />
        <Header />
        <div className="container">
          <Hero />
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Search} />
          <Route exact path={process.env.PUBLIC_URL + "/search"} component={Search} />
          <Route exact path={process.env.PUBLIC_URL + "/saved"} component={Saved} />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
