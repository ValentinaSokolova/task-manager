import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export const RegisterPage = () => {
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const checkRes = await fetch(`http://localhost:5000/users?email=${form.email}`);
            if (!checkRes.ok) throw new Error("Не удалось проверить email");
            const existingUsers = await checkRes.json();

            if (existingUsers.length > 0) {
                setError("Пользователь с таким email уже существует!");
                return;
            }

            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Ошибка при регистрации");

            localStorage.setItem("me", data.id);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    return (<form onSubmit={handleSubmit} className="register__form">
        <input type="name" name="name" placeholder="Имя" onChange={handleChange} value={form.name} className="register__input" required/>
        <input type="email" name="email" placeholder="Почта" onChange={handleChange} value={form.email} className="register__input" required/>
        <input type="password" name="password" placeholder="Пароль" onChange={handleChange} value={form.password} className="register__input" required/>
        {error && <p className="register__error">{error}</p>}
        <div className="link-container">
            
            <button type="submit" className="link">Вперед!</button>
            <Link to="/login" className="link">Есть аккаунт? Авторизоваться</Link>
        </div>
    </form>)
}