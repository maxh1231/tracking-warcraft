import { useState, useEffect } from 'react'

const RunLeaderboard = () => {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        runFetch()

        async function runFetch() {
            const response = await fetch(`https://raider.io/api/v1/mythic-plus/runs?season=season-sl-3&region=world&dungeon=all&page=0`);
            const data = await response.json()

            setBoard(data)

        }

    }, [setBoard])

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

    return (

        (board &&
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
                    {board.rankings.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.run.dungeon.short_name}</td>
                            <td>{item.run.mythic_level}</td>
                            <td>{item.run.clear_time_ms}</td>
                            <td>icons</td>
                            {tankFinder(item.run.roster)}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    )
}

export default RunLeaderboard;