import React from 'react';
import { app } from '../firebase/firebaseConfig';

const Logueo = (props:any) => {

    const [isRegistrando, setIsRegistrando] = React.useState(false);

    const crearUsuario =(correo: string, password: string) => {
        
        app.auth().createUserWithEmailAndPassword(correo, password).then((usuarioFirebase)=>{
            console.log("usuario creado:" , usuarioFirebase);
            props.setUsuario(usuarioFirebase);
        });
    };

    const iniciarSesion = (correo: string, password:string) => {
        
        app.auth().signInWithEmailAndPassword(correo, password).then((usuarioFirebase)=>{
            console.log("sesión iniciada con:", usuarioFirebase);  
            props.setUsuario(usuarioFirebase);         
        });
    };

    const submitHandler = (e:any) => {
        e.preventDefault();
        const correo=e.target.emailField.value;
        const password = e.target.passwordField.value;
        //console.log(correo,password);
        /*
        app.auth().createUserWithEmailAndPassword(correo, password).then((usuarioFirebase)=>{
            console.log("usuario creado:" , usuarioFirebase);
            props.setUsuario(usuarioFirebase);
        });*/

        if(isRegistrando){
            crearUsuario(correo, password);

        }

        if(!isRegistrando){
            iniciarSesion(correo, password);
        }
    };

    return (
        <div>
            <h1>{isRegistrando ? "Registrate": "Inicia sesión"}</h1>      
            <form onSubmit={submitHandler}>
                <label htmlFor='emailField'>Correo</label>
                <input type="email" id="emailField" />
                <label htmlFor='passwordField'>Contraseña</label>
                <input type="password" id="passwordField" />  
                <button type='submit'>{isRegistrando ? "Registrate": "Inicia sesión"}</button>              
            </form>    
            <button onClick={()=> setIsRegistrando(!isRegistrando)}>
            {isRegistrando ? "¿Ya tienes cuenta? ¡Inicia sesión!": "¿No tienes cuenta? ¡Registrate GRATIS!"}
            </button>  
        </div>
    ) 
}

export default Logueo;