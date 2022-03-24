const DpsClass = ({ equipment, currentSeason, setCurrentSeason }) => {

    console.log(equipment)

    let scores = [
        {
            "name": "Assassination",
            "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_0
        },
        {
            "name": "Outlaw",
            "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_1
        },
        {
            "name": "Subtlety",
            "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_2
        }

    ];


    scores.sort((a, b) => b.score - a.score)

    console.log(scores);

    const renderClass = () => {
        if (equipment.class === 'Rogue') {

            return (
                <div>
                    <div>
                        <p>{equipment.mythic_plus_scores_by_season[currentSeason].scores.dps}</p>
                        <p>DPS</p>
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
    }

    return (
        <div>
            {renderClass()}
        </div>
    )
}

export default DpsClass;