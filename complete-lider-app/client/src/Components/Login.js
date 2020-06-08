import React, { useState, useContext, Fragment} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ username : "", password : "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name] : e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const { isAuthenticated, user, message } = data;
                if(isAuthenticated){
                    authContext.setUser(user);
                    authContext.setIsAuthenticated(isAuthenticated);
                    props.history.push('/todos');
                }
                else
                    setMessage(message);
        });
    };

    return (  
        <Fragment>
        <form className="row" onSubmit={onSubmit}>
            <div className="col s12 m6 offset-m3">
                <div className="card grey lighten-4">
                    <div className="card-content white-text">
                        <span className="card-title blue-text text-darken-2 center-align"><strong>Inicio de Sesión</strong></span>
                        
                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="username" 
                                    name="username"
                                    type="text"
                                    onChange={onChange} 
                                />
                                <label htmlFor="username">Usuario</label>
                               
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="password" 
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={onChange}            
                                />
                                
                                <label htmlFor="password">Contraseña</label>
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <button className="waves-effect waves-light btn blue darken-2" type="submit">Ingresar </button>  
                            </div>
                        </div>             
                    
                    </div>
                </div>
            </div>
        </form>
        {message ? <Message message={message}/> : null }
    </Fragment>
    );
}
 
export default Login;