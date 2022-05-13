import { SignupForm } from '../components/Forms'

const Signup = ({ setUser }) => {
    return (
        <main>
            <SignupForm setUser={setUser} />
        </main>
    );
};

export default Signup;