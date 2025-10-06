import { useNavigate } from "react-router-dom"

export const ButtonLogin = () => {
    const navigate = useNavigate()
    return(
        <button type="button" onClick={() => navigate("/login")} className="link">Войти</button>
    )
}