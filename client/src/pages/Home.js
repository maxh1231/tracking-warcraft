import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';
import { ADD_BLIZZTOKEN } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Search from '../components/Search'

const Home = () => {
    return (
        <section className='p-4'>
            <h1>Hello</h1>
            <Search />
            <Link to={'/login'}><button className='border m-1 p-1'>Login</button></Link>
            <Link to={'/signup'}><button className='border m-1 p-1'>Signup</button></Link>
            <Link to={'/logout'}><button className='border m-1 p-1'>Logout</button></Link>
            <a href='http://localhost:3001/auth/auth/bnet'>Battle.net</a>
        </section>
    );
};

export default Home;