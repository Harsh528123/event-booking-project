import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Nav from './components/Nav';
import AuthContext from './context/auth-context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { defaultClient } from './components/ApolloClients/HeaderlessApolloClient';



function App() {
    const {token} = useContext(AuthContext);
    return (
      <ApolloProvider client={defaultClient}>
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
      </ApolloProvider>
    );
}

export default App;
