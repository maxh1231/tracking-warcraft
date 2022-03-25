const HybridClass = ({ equipment, currentSeason, setCurrentSeason }) => {

    let scores = [
        {
            "name": "tank",
            "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.tank
        },
        {
            "name": "healer",
            "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.healer
        },
        {
            "name": "dps",
            "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.dps
        }
    ]

    scores.sort((a, b) => b.score - a.score)

    console.log(scores);

    return (
        <div>
            <div>
                <p>{equipment.mythic_plus_scores_by_season[currentSeason].scores.all}</p>
                <p>Overall</p>
                <p>Mythic+ Score</p>
            </div>

            <div>
                <p>{scores[0].score}</p>
                <p>{scores[0].name}</p>
                <p>Mythic+ Score</p>
            </div>

            {scores[1].score > 0 && (
                <div>
                    <p>{scores[1].score}</p>
                    <p>{scores[1].name}</p>
                    <p>Mythic+ Score</p>
                </div>
            )}

            {scores[2].score > 0 && (
                <div>
                    <p>{scores[2].score}</p>
                    <p>{scores[2].name}</p>
                    <p>Mythic+ Score</p>
                </div>
            )}
        </div>
    )
}

export default HybridClass;