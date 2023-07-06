import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Hompage from './pages/homepage';
import StockDetails from './pages/stockdetails';


function App(params) {

    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Hompage/>}/>
            <Route path='/stocks/:id' element={<StockDetails/>}/>
        </Routes>
        </BrowserRouter>
    );

}

export default App;
