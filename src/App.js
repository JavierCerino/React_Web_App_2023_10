import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Banner from './components/shared/banner/Banner';
import Restaurants from './components/restaurant/restaurants';
import Principal from './components/principal/Principal';
import HacerReserva from './components/hacerReserva/HacerReserva';
import Productos from './components/productos/productos';
import Ofertas from './components/ofertas/ofertas';
import RestaurantDetail from './components/restaurant/RestaurantDetail';

function App(props) {
  return (
    <div className="App">
      <Banner lang={props.lang}/>
      <BrowserRouter lang={props.lang}>
       <Routes>
        <Route path="/restaurantes" element={< Restaurants lang={props.lang}/>} />
        <Route path="/restaurantes/:restauranteId" element={<RestaurantDetail />} />
        <Route path="/reservas" component = {HacerReserva} element={<HacerReserva lang={props.lang}/>} />
        <Route path="/productos" component = {Productos} element={<Productos lang={props.lang}/>} />
        <Route path="/ofertas" element={<Ofertas lang={props.lang}/>} />
        <Route path="/" element={<Principal lang={props.lang}/>} />
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
