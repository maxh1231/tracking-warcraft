import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const RunLeaderboard = () => {
    const [board, setBoard] = useState(null)
    const [page, setPage] = useState(0)

    // regular raider io api data
    // useEffect(() => {
    //     runFetch()

    //     async function runFetch() {
    //         const response = await fetch(`https://raider.io/api/v1/mythic-plus/runs?season=season-sl-3&region=world&dungeon=all&page=${page}`);
    //         const data = await response.json()

    //         setBoard(data)

    //     }

    // }, [setBoard, page])

    // killcors proxy server api data
    useEffect(() => {
        runFetch()

        async function runFetch() {
            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/mythic-plus/rankings/runs?region=world&season=season-sl-3&dungeon=all&strict=false&page=${page}&limit=0&minMythicLevel=0&maxMythicLevel=0&eventId=0&faction=&realm=&period=0&recent=false`);
            const data = await response.json()
            setBoard(data)
        }

    }, [setBoard, page])

    console.log(board);

    const tankFinder = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].role === 'tank') {
                return (
                    <td>{array[i].character.name}</td>
                )
            }
        }
    }

    const healerFinder = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].role === 'healer') {
                return (
                    <td>{array[i].character.name}</td>
                )
            }
        }
    }

    const dpsFinder = (array) => {
        const damage = array.filter(item => item.role === 'dps')
        return (
            <>
                <td><Link to={`/character/${damage[0].character.region.slug}/${damage[0].character.realm.altSlug}/${damage[0].character.name}`}>{damage[0].character.name} </Link>
                    <Link to={`/character/${damage[1].character.region.slug}/${damage[1].character.realm.altSlug}/${damage[1].character.name}`}>{damage[1].character.name} </Link>
                    <Link to={`/character/${damage[2].character.region.slug}/${damage[2].character.realm.altSlug}/${damage[2].character.name}`}>{damage[2].character.name}</Link></td>
            </>
        )
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

        (board &&
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Dungeon</th>
                            <th>Level</th>
                            <th>Time</th>
                            <th>Affixes</th>
                            <th>Tank</th>
                            <th>Healer</th>
                            <th>DPS</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {board.rankings.rankedGroups.map((item, index) => (
                            <tr key={index}>
                                <td>{item.rank}</td>
                                <td>{item.run.dungeon.short_name}</td>
                                <td>{item.run.mythic_level}</td>
                                <td>{item.run.clear_time_ms}</td>
                                <td>icons</td>
                                {tankFinder(item.run.roster)}
                                {healerFinder(item.run.roster)}
                                {dpsFinder(item.run.roster)}
                                <td>{item.score}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div>
                    <button id='previous' onClick={handlePage}>Previous</button>
                    <button id='next' onClick={handlePage}>Next</button>
                </div>
            </section>
        )
    )
}

export default RunLeaderboard;