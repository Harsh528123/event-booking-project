import React, {useState} from 'react'
import './Auth.css'

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    console.log(email)
    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }
    const handleSubmit = async (e) => {
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
        const res = await response.json()
        console.log(res);
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
            <button> Submit </button>
            <button onClick={switchModeHandler} style={{marginLeft: "5%"}}> Switch to {isLogin ? 'Signup' : 'Login'} </button>
        </section>

      </form>
    )
}

export default Auth