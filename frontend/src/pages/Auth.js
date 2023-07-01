import React, {useState, useContext} from 'react'
import './Auth.css'
import authContext from '../context/auth-context';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const {login} = useContext(authContext);


    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }
    const handleSubmit = async (e) => {

        console.log(isLogin);
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }`
        }
        if (!isLogin){
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }`
            }; 
        }
        try {
            const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                // will make sure it fails if we do it incorrectly
                'Content-Type': 'application/json' // backend tries to parse as incoming json

            }
        })

        if (response.status !== 200 && response.status != 201){
            throw new Error('Failed!');
        }
        const res = await response.json();
        console.log(res);
        isLogin ? login(res.data.login.token, res.data.login.userId, res.data.login.tokenExpiration) : login(res.data.createUser.token, res.data.createUser.userId, res.data.createUser.tokenExpiration)


        } catch (err) {
            console.log(err);
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
            <button type='submit'> Submit </button>
            <button onClick={switchModeHandler} style={{marginLeft: "5%"}}> Switch to {isLogin ? 'Signup' : 'Login'} </button>
        </section>

      </form>
    )
}

export default Auth