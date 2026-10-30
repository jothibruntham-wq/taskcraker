import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <><Navbar /><Home /></>
      <Products/>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;