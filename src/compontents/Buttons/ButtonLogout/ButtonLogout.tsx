import { useNavigate } from "react-router-dom";

export const ButtonLogout = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('me');
        navigate('/');
    }

    return (
        <button type="button" onClick={() => logout()} className="link"> Выйти</button>
    )
}