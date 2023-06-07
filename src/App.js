import logo from './logo.svg';
import './App.css';
import {Routes , Route } from "react-router-dom" 
import Hero from './components/Hero';
import Header from './components/Header';
import Home from './routes/Home';
import Selector from './routes/Selector';
import Success from './routes/Success';
import Feed from './routes/Feed';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import ResetPassword from './routes/ResetPassword';
import MyFeeds from './routes/MyFeeds';
import PublicRoute from './routes/PublicRoute';



function App() {
  
  return (
    <div className='App'>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path='/' element={<Home />}></Route>
          </Route>
          <Route path="/selector" element={<PrivateRoute />}>
            <Route path='/selector' element={<Selector />}></Route>
          </Route>
          <Route path="/success" element={<PrivateRoute />}>
            <Route path='/success' element={<Success />}></Route>
          </Route>
          <Route path="/my_feeds" element={<PrivateRoute />}>
            <Route path='/my_feeds' element={<MyFeeds />}></Route>
          </Route>

          <Route path="/signup" element={<PublicRoute />}>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>
          <Route path="/login" element={<PublicRoute />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route path="/reset_password" element={<PublicRoute />}>
            <Route path="/reset_password" element={<ResetPassword />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
        
    </div>
  );
}

export default App;
