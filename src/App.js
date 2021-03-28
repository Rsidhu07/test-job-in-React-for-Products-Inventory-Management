import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import AddProducts from './Components/AddProducts/AddProducts';
import Products from './Components/Products/Products';
import Home from './Components/Home/Home';

const App = () => {
    return (
        <div className='App'>
            <section className='glass'>
                <Nav/>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/addProducts' exact>
                    <AddProducts />
                </Route>
                <Route path='/products' exact>
                    <Products />
                </Route>
            </section>
            <div className="circle1"></div>
            <div className="circle2"></div>
        </div>
    );
}

export default App;

