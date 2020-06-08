import React, { useContext, Fragment } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';



const Navbar = props => {

    const {isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);


    const onClickLogoutHandler = () => {
        AuthService.logout().then(data =>  {
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }
    const unauthenticatedNavBar = () => {
        return (
            <Fragment>

                <Link to="/" className="waves-effect waves-light btn grey lighten-5 black-text">
                    <li>Inicio</li>
                </Link>

                <Link to="/login" className="waves-effect waves-light btn grey lighten-5 black-text">
                    <li>Iniciar sesion</li>
                </Link>

                <Link to="/register" className="waves-effect waves-light btn grey lighten-5 black-text">
                    <li>Registrarse</li>
                </Link>
            </Fragment>
        )
    };

    const authenticatedNavBar = () => {
        return (
            <Fragment>

                <Link to="/" className="waves-effect waves-light btn grey lighten-5 black-text">
                    <li>Inicio</li>
                </Link>

                <Link to="/todos" className="waves-effect waves-light btn grey lighten-5 black-text">
                    <li>Todos</li>
                </Link>
                {
                    user.role === "administrator" ?
                    <Link to="/admin" className="waves-effect waves-light btn grey lighten-5 black-text">
                        <li>Admin</li>

                    </Link> : null
                }

                <button type="button" 
                        className="waves-effect waves-light btn" 
                        onClick={onClickLogoutHandler}>
                        Cerrar Sesion
                </button>

            </Fragment>
        )
    }

    return (
        
            <nav>
                <div className="nav-wrapper blue darken-2">
                    <Link to="/">
                        <div className="brand-logo">Lider Mandados</div>
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar() }
                    </ul>
                </div>
            </nav>
      
    )

}

export default Navbar;
