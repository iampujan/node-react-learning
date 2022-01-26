import { Link } from "react-router-dom";

function SignUp() {

    return (
        <div>
            <form>
                First Name: <input type="text" name="Full Name" /><br />
                Email: <input type="email" name="Email" /><br />
                Password: <input type="password" name="Password" /><br />
                <input type="button" value="SignUp" /><br />
                <Link to="/">Back</Link><br />
            </form>
        </div>
    )
}

export default SignUp;