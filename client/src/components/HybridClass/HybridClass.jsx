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

        </div>
    )
}

export default HybridClass;