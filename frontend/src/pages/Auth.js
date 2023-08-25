import React, {useState, useContext} from 'react'
import './Auth.css'
import authContext from '../context/auth-context';
import {useNavigate} from 'react-router-dom'
import { login, createUser } from '../queries/queries';
import { useMutation, useLazyQuery } from '@apollo/client';
import { clientWithHeader } from '../components/ApolloClients/HeaderApolloClient';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const {loginProcess, setClientWithHeader} = useContext(authContext);
    const navigate = useNavigate();
    const [loadLogin, { loading, error, loginData }] = useLazyQuery(login, {onCompleted: (data) => {
        loginProcess(data.login.token, data.login.userId, data.login.tokenExpiration);
        setClientWithHeader(clientWithHeader(data.login.token))
    }});
    const [createUserFunction, { loadingUser, errorUser, createdUserData }] = useMutation(createUser);

    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) { return }

        if (!isLogin){ 
            createUserFunction({ variables: { uInput: { email: email, password: password}} })
        } else {
            try {
                loadLogin( { variables: { email: email, password: password } })
            } catch (err) {
                console.log(err)
            }
        }
        // ...
    }
    return (
      <form className='authenticationForm' onSubmit={handleSubmit}>
        <section className='formComponents'>
            <label htmlFor='Email'> Email </label>
            <input type='email' id='email' onChange={(e => setEmail(e.target.value))} />
        </section>

        <section className='formComponents'>
            <label htmlFor='Email'> Password </label>
            <input type='password' id='password' onChange={(e => setPassword(e.target.value))} />
        </section>

        <section className='formActions'>
            <button className='formActionsButton' type='submit'> Submit </button>
            <button className='formActionsButton' onClick={switchModeHandler} style={{marginLeft: "5%"}}> Switch to {isLogin ? 'Signup' : 'Login'} </button>
        </section>

      </form>
    )
}

export default Auth