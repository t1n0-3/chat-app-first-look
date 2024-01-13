import { useContext } from 'react'
import { authContext } from '../context/authContext'
function Login() {
    const { onLogin } = useContext(authContext)
    return (
        <div className='back'>
            <form onSubmit={onLogin}>
                <h2>User Login</h2>
                <label htmlFor="email">Email:</label>
                <input className='emailInput' type="text" id="email" name="email" required></input>

                <label htmlFor="password">Password:</label>
                <input  className='passInput' type="password" id="password" name="password" required></input>

                <input className='onUserSubmit' type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login