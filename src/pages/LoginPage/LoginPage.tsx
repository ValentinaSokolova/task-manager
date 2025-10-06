import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem("me")) {
            navigate("/home");
        }
    }, [navigate]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/users?email=${form.email}&password=${form.password}`);
        const data = await response.json();

        if (data.length > 0) {
            localStorage.setItem('me', data[0].id);
            navigate("/home");
        } else {
            alert("Неверный логин или пароль");
        }

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    return (<form onSubmit={handleSubmit} className="login__form">
        <input type="email" name="email" placeholder="Почта" onChange={handleChange} value={form.email} className="login__input" required/>
        <input type="password" name="password" placeholder="Пароль" onChange={handleChange} value={form.password} className="login__input" required/>
        <button type="submit" className="link">Go!</button>
        <Link to="/register" className="link">Нет аккаунта? Зарегистрироваться</Link>
    </form>)
}