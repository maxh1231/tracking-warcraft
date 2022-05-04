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
    }, [setRole])

    console.log(role)

    return (
        (role && (
            <section>
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
            </section>
        ))
    )
}

export default RoleLeaderboard