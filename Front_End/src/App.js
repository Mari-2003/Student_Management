import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChooseUser from './pages/ChooseUser';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path ='/choose' element={<ChooseUser />} />
          <Route path='/admin/login'  element={<LoginPage role="admin"/>} />
          <Route path='/student/login'  element={<LoginPage role="student" />} />
          <Route path ='/student/*' element={< StudentDashboard/>} />
          <Route path ='/admin/*' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
