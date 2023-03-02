import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom";
import './App.css';
import Cart from "./components/Cart";
import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import Products from "./components/Products";

import Container from 'react-bootstrap/Container'

function App() {
  return (
    <>
      <MenuBar/>
      <Container>
        <Routes>
          <Route path="/" element={
            <Home />
          }></Route>
          
          <Route path="/productos" element={
            <Products />
          }></Route>

          <Route path="/carrito" element={
            <Cart></Cart>
          }></Route>
          
        </Routes>
      </Container>
    </>
  );
}

export default App;
