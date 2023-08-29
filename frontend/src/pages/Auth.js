import React, {useState, useContext} from 'react'
import './Auth.css'
import authContext from '../context/auth-context';
import { login, createUser } from '../queries/queries';
import { useMutation, useLazyQuery } from '@apollo/client';
import { clientWithHeader } from '../components/ApolloClients/HeaderApolloClient';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // by default be in the login page
    const {loginProcess, setClientWithHeader} = useContext(authContext);
    const [loadLogin, { loading, error, loginData }] = useLazyQuery(login, {onCompleted: (data) => {
        loginProcess(data.login.token, data.login.userId, data.login.tokenExpiration);
        setClientWithHeader(clientWithHeader(data.login.token))
    }});
    const [createUserFunction, { loadingUser, errorUser, createdUserData }] = useMutation(createUser);

    /**
     * Changes the button for sign up and login
    */
    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }

    /**
     * 
     * @param {*} e Event can be either a login/ signup request or a request to go to the other's page
     * @returns 
     */
    const handleSubmit = (e) => {

        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) { return }

        if (!isLogin){ 
            // for signup, create user through a mutation
            createUserFunction({ variables: { uInput: { email: email, password: password}} })
        } else {
            try {
                loadLogin( { variables: { email: email, password: password } }) // for login, use the details for the query
            } catch (err) {
                console.log(err)
            }
        }
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

            {error && error.graphQLErrors.map(({ message }, i) => (<span key={i}>{message}</span>))}

        </form>
    )
}

export default Auth