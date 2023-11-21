import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Authorized } from './Views/Authorized';
import { ApplicationViews } from './Views/ApplicationViews';
import { Route, Routes } from "react-router-dom";
import NavBar from './Nav/NavBar';
import './App.css';


function App() {
  return <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="*" element={
    <Authorized>
      <>
        <NavBar />
        <ApplicationViews />
      </>
    </Authorized>
  } />
</Routes>
}

export default App;




