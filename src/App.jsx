import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from "./components/users/UserList.jsx";
import TransaccionForm from "./components/users/TransaccionForm.jsx";
import UserForm from "./components/users/UserForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="users/list" element={<UserList />} />
        <Route path="users/profile" element={<TransaccionForm />} />
        <Route path="users/form" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default App;
