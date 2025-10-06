import { Link } from "react-router-dom"
import { ButtonLogin } from "../Buttons/ButtonLogin/ButtonLogin";
import { ButtonLogout } from "../Buttons/ButtonLogout/ButtonLogout";
import "./Header.css"

interface HeaderProps {
    isLogin: boolean;
}

export const Header = ({isLogin}: HeaderProps) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__container">
                    <Link to="/" className="header__logo">
                        ValenPortTaskManager
                    </Link>
                    {!isLogin ?
                        <ButtonLogin /> : <ButtonLogout />
                    }
                </div>
            </div>
        </header>
    )
}