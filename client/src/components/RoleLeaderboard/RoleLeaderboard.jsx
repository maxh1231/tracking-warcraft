import { useEffect, useState } from 'react'

const RoleLeaderboard = () => {
    const [filter, setFilter] = useState('tank')
    const [role, setRole] = useState(null)


    useEffect(() => {
        roleFetch()

        async function roleFetch() {
            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/mythic-plus/rankings/characters?region=world&season=season-sl-3&class=all&role=${filter}&page=0`)
            const data = await response.json()

            setRole(data)
        }
    }, [setRole, filter])

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
            </section>
        ))
    )
}

export default RoleLeaderboard