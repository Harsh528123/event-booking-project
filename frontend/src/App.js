import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Nav from './components/Nav';
function App() {
  return (
    <BrowserRouter>
      <div className='appContainer'>
        <Nav />
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/bookings" element={<Bookings/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
