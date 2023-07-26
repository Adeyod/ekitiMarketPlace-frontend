import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ProductInfo from './pages/ProductInfo';
import { LoginUser } from './apicalls/users';
import Navbar from './components/Navbar';

// const user = await LoginUser();

function App() {
  const { loading } = useSelector((state) => state.loaders);
  // const { user } = useSelector((state) => state.user);
  // const user = await LoginUser()

  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Navbar />
        {/* {user ? <Nav/> : <Navbar/>} */}
        <Routes>
          {/* <Route
            path="/"
            element={
              <ProtectedPage>
              <Home />
               </ProtectedPage>
            }
          /> */}
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
