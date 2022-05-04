import { useEffect, useState } from 'react'

const RoleLeaderboard = () => {
    const [filter, setFilter] = useState('tank')
    const [role, setRole] = useState(null)
    const [page, setPage] = useState(0);


    useEffect(() => {
        roleFetch()

        async function roleFetch() {
            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/mythic-plus/rankings/characters?region=world&season=season-sl-3&class=all&role=${filter}&page=${page}`)
            const data = await response.json()

            setRole(data)
        }
    }, [setRole, filter, page])

    console.log(role)

    const handleRole = (event) => {
        if (event.target.id === 'tank') {
            setFilter('tank')
        }

        if (event.target.id === 'healer') {
            setFilter('healer')
        }

        if (event.target.id === 'dps') {
            setFilter('dps')
        }
    }

    const handlePage = (event) => {
        console.log(event.target.id)
        if (event.target.id === 'next') {
            setPage(page + 1)
        } else if (event.target.id === 'previous' && page > 0) {
            setPage(page - 1)
        }

    }

    return (
        (role && (
            <section>
                <div>
                    <button id='tank' onClick={handleRole}>Tank</button>
                    <button id='healer' onClick={handleRole}>Healer</button>
                    <button id='dps' onClick={handleRole}>DPS</button>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Character</th>
                                <th>Runs</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div>
                    <button id='previous' onClick={handlePage}>Previous</button>
                    <button id='next' onClick={handlePage}>Next</button>
                </div>
            </section>
        ))
    )
}

export default RoleLeaderboard