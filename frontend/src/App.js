import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Nav from './components/Nav';
import AuthContext from './context/auth-context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
    const {token} = useContext(AuthContext);
    console.log(token);
    return (
      <BrowserRouter>
        <div className='appContainer'>
          <Nav />
          <Routes>
            {!token && <Route path="/" element={<Navigate replace to="/auth" />} />}
            {!token && <Route path="/auth" element={<Auth/>} /> }
            {token && <Route path="/auth" element={<Navigate replace to="/events" />} />}  
            {token && <Route path="/events" element={<Events/>} /> }          
            {!token && <Route path="/events" element={<Navigate replace to="/auth" />} /> }          
            {token && <Route path="/bookings" element={<Bookings/>} />}
            {token && <Route path="/bookings" element={<Navigate replace to="/auth" />} />}
          </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
