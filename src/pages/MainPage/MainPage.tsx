import { Link } from "react-router-dom"
import './MainPage.css'
import '../../assets/styles/buttons_and_links.css'

export const MainPage = () => {
    return (<div className="main">
        <h1 className="main__title">Привет! Это task-manager, мой проект в портфолио. Чтобы посмотреть все возможности, можно авторизоваться и попользоваться!</h1>
        <div className="link-container">
        <Link to="/login" className="link">Войти</Link>
        <Link to="/register" className="link">К регистрации!</Link>
        <Link to="https://github.com/ValentinaSokolova/task-manager" className="link">Вернуться на гит-репозиторий проекта</Link>
        </div>
    </div>)
}