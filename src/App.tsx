import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { MainPage } from './pages/MainPage/MainPage'
import { TasksPage } from './pages/TasksPage/TasksPage';
function App() {

  return (
      <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<TasksPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
