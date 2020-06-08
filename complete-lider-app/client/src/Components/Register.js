import React, { useState, useRef, useEffect, Fragment} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';

const Register = props => {

    const dataUser = {
        firstname : "", 
        lastname : "", 
        username : "", 
        email : "", 
        phone : "", 
        password : "",
        role : "",
        branchoffice : ""
    }

    const [user, setUser] = useState(dataUser);

    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=> {
        return() =>{
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name] : e.target.value });
    };

    const resetForm = () => {
        setUser(dataUser);
    }
    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
                if(!message.msgError){
                    timerID = setTimeout(() =>{
                        props.history.push('/login');
                    }, 2000)
                }

        });
    };


    return (
        <Fragment>
        <form className="row" onSubmit={onSubmit}>
            <div className="col s12 m6 offset-m3">
                <div className="card grey lighten-4">
                    <div className="card-content white-text">
                        <span className="card-title blue-text text-darken-2 center-align"><strong>Registro</strong></span>
                        
                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="first_name" 
                                    name="firstname"
                                    value={user.firstname}
                                    type="text"
                                    onChange={onChange} 
                                />
                                <label htmlFor="first_name">Nombre</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="last_name" 
                                    name="lastname"
                                    value={user.lastname}
                                    type="text"
                                    onChange={onChange} 
                                />
                                <label htmlFor="last_name">Apellido</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="username" 
                                    name="username"
                                    value={user.username}
                                    type="text"
                                    onChange={onChange} 
                                />
                                <label htmlFor="username">Usuario</label>                            
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="email" 
                                    name="email"
                                    value={user.email}
                                    type="email"
                                    onChange={onChange} 
                                />
                                <label htmlFor="email">Correo electrónico</label>                            
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="phone" 
                                    name="phone"
                                    value={user.phone}
                                    type="text"
                                    onChange={onChange} 
                                />
                                <label htmlFor="phone">Número de telefono</label>                            
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="password" 
                                    name="password"
                                    type="password"
                                    onChange={onChange}            
                                />
                                
                                <label htmlFor="password">Contraseña</label>
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="role" 
                                    name="role"
                                    type="text"
                                    onChange={onChange}            
                                />
                                
                                <label htmlFor="role">Tipo de usuario</label>
                                
                            </div>
                        </div>
                            {/* aca va a ir el chekerrrrrrrrrrrrrrr */}

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <input
                                    id="brach_office" 
                                    name="branchoffice"
                                    type="text"
                                    onChange={onChange}            
                                />
                                
                                <label htmlFor="branchoffice">Sucursal</label>
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12 m8 offset-m2">
                                <button className="waves-effect waves-light btn blue darken-2" type="submit">Registrar </button>  
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
 
export default Register;