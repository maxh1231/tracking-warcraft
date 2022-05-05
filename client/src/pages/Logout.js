import { LogoutForm } from '../components/Forms'

const Logout = ({ setUser }) => {
    return (
        <main>
            <LogoutForm setUser={setUser} />
        </main>
    );
};

export default Logout;