import './Register.css'

import { POST } from '../requester'

function Register() {

    async function onRegister(e) {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const response = await POST('register', formData)
        console.log(response)
    }

    return (
        <div className='back'>
            <form onSubmit={onRegister}>
                <h2>User Registration</h2>
                <label htmlFor="email">Email:</label>
                <input className='emailInput' type="text" id="email" name="email" required></input>

                <label htmlFor="username">Username:</label>
                <input className='usernameInput' type="text" id="username" name="username" required></input>

                <label htmlFor="password">Password:</label>
                <input className='passInput' type="password" id="password" name="password" required></input>

                <label htmlFor="confirmPassword">Repeat Password:</label>
                <input className='confPasswInput' type="password" id="confirmPassword" name="confirmPassword" required></input>

                <input className='onUserSubmit' type="submit" value="Register"></input>
            </form>
        </div>
    )
}

export default Register