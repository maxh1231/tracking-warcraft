import { useState } from 'react'
import { Link } from 'react-router-dom'

const Search = ({ access_token }) => {
    const [field, setField] = useState('')


    const handleChange = (event) => {
        setField(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/search?term=${field}`).then(response => response.json()).then((charData) => {
        //     return <Navigate to='search-results' charData={charData} />
        // })

    }

    // fetch(`https://us.api.blizzard.com/data/wow/search/character/max/realm/?namespace=profile-us&access_token=${access_token}`)

    const handleClick = () => {
        return <Link to='/search-results' field={field} />
    }

    console.log(access_token)
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                />
                <button type='submit'><Link to={`search-results/${field}`}>Submit</Link></button>
            </form>
        </section>
    )
}

export default Search;