import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';
import { ADD_BLIZZTOKEN } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Search from '../components/Search'

const Home = () => {
    // const [test, setTest] = useState(null)
    // const [newTest, setNewTest] = useState(null)

    // useEffect(() => {
    //     dataFetch()

    //     async function dataFetch() {
    //         const response = await fetch("https://us.battle.net/oauth/token", {
    //             body: "redirect_uri=http://localhost:3000/&scope=&grant_type=authorization_code&code=USEHINGKUXSBKLJ2KCNGYIVXJGY59CUAPW",
    //             headers: {
    //                 Authorization: "Basic YmY2YWVkNDFmZmYxNDg0NmFkOGMzOGQyMTdlZWJiZGM6TUlaSkR3a0tkS1Y4eWl4U3QyUzBXR21IRFk2UzJQYUQ=",
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             method: "POST"
    //         })
    //         const data = await response.json()

    //         setTest(data);
    //     }
    // }, [setTest])

    // useEffect(() => {
    //     newDataFetch()

    //     async function newDataFetch() {
    //         const response = await fetch("https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=USh6Uu3w3PE8lbzKHOnVZvjWZ3OKvO6kSd",
    //         )
    //         const data = await response.json()

    //         setNewTest(data);
    //     }
    // }, [setTest])

    // console.log(newTest)
    // console.log(test)


    return (
        <section className='p-4'>
            <h1>Hello</h1>
            <Search />
            <Link to={'/login'}><button className='border m-1 p-1'>Login</button></Link>
            <Link to={'/signup'}><button className='border m-1 p-1'>Signup</button></Link>
            <Link to={'/logout'}><button className='border m-1 p-1'>Logout</button></Link>
            <a href='http://localhost:3001/auth/auth/bnet'>Battle.net</a>

            <div></div>
        </section>
    );
};

export default Home;