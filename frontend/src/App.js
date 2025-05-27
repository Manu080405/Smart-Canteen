import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
import ban_lunch from "./Components/Assets/ban_lunch.webp"
import NewCollections from "./Components/NewCollections/NewCollections";
import UserOrders from "./Components/UserOrders/UserOrders";
import snack_banner from "./Components/Assets/snacksbanner.jpg"
import drink_banner from "./Components/Assets/drinkbanner.jpg"

export const backend_url = 'http://localhost:4000';
export const currency = '₹';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/lunch" element={<ShopCategory banner={ban_lunch} category="lunch" />} />
          <Route path="/snacks" element={<ShopCategory banner={snack_banner} category="snacks" />} />
          <Route path="/drinks" element={<ShopCategory banner={drink_banner} category="drinks" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/collection" element={<NewCollections/>}/>
          <Route path="/userorder" element={<UserOrders/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
