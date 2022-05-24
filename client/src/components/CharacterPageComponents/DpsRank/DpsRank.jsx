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
                            <td>All {equipment.class}s</td>
                            <td>{equipment.mythic_plus_ranks.class.world}</td>
                            <td>{equipment.mythic_plus_ranks.class.region}</td>
                            <td>{equipment.mythic_plus_ranks.class.realm}</td>
                            <td>{equipment.mythic_plus_ranks.faction_class.world}</td>
                            <td>{equipment.mythic_plus_ranks.faction_class.region}</td>
                            <td>{equipment.mythic_plus_ranks.faction_class.realm}</td>
                        </tr>
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default DpsRank;