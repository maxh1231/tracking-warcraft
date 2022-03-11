import { useState } from 'react'

const Search = ({ access_token }) => {
    const [field, setField] = useState('')

    const handleChange = (event) => {
        setField(event.target.value);
    }

    console.log(access_token)
    return (
        <section>
            <form>
                <input
                    type="text"
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}

export default Search;