const DpsRank = ({ equipment }) => {
    return (
        <div>
            {equipment !== null && (

                <table>
                    <thead>
                        <tr>
                            <th>Leaderboard</th>
                            <th>World</th>
                            <th>Region</th>
                            <th>Realm</th>
                            <th>({equipment.faction.toUpperCase().slice(0, 1)}) World</th>
                            <th>({equipment.faction.toUpperCase().slice(0, 1)}) Region</th>
                            <th>({equipment.faction.toUpperCase().slice(0, 1)}) Realm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        </tr>
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default DpsRank;