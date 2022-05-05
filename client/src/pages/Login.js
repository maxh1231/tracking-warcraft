import { LoginForm } from '../components/Forms'

const Login = ({ setUser }) => {
    return (
        <main>
            <LoginForm setUser={setUser} />
        </main>
    );
};

export default Login;