import { useState } from 'react'

const Search = ({ access_token }) => {
    const [field, setField] = useState('')

    const handleChange = (event) => {
        setField(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/search?term=${field}`)
    }

    // fetch(`https://us.api.blizzard.com/data/wow/search/character/max/realm/?namespace=profile-us&access_token=${access_token}`)



    console.log(access_token)
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </section>
    )
}

export default Search;