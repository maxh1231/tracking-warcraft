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

                </tbody>
            </table>
        )
    )
}

export default RunLeaderboard;