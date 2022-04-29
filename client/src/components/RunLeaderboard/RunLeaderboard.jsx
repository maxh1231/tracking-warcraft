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
        <section></section>
    )
}

export default RunLeaderboard;