import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './ui/LandingPage';
import Login from './ui/Login';
import Signup from './ui/Signup';
import UserDashboard from './ui/UserDashboard';
import AdminDashboard from './ui/AdminDashboard';
import Newland from './Newland';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Newland />} />
        
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Pages */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
