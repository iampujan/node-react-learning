import { Link } from "react-router-dom";
import { useState } from "react"
import axios from 'axios';

function Login() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    async function onLogin() {
        const response = await axios.post('http://localhost:8848/api/auth/login', { email: email, password: password })
        alert(email, password);
        console.log(response)
    }

    return (
        <div>
            <form>
                Email: <input type="email" name="Email" value={email} onChange={e => setemail(e.target.value)} /><br />
                Password: <input type="password" name="Password" value={password} onChange={e => setpassword(e.target.value)} /><br />
                <input type="button" value="Login" onClick={onLogin} /><br />
                <Link to="/">Back</Link><br />
            </form>
        </div>
    )
}

export default Login;