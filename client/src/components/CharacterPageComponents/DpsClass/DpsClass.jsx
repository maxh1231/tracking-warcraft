const DpsClass = ({ equipment, currentSeason, setCurrentSeason }) => {

    console.log(equipment)

    let scores = []

    const classSelect = (value) => {
        switch (value) {
            case 'Rogue':
                scores = [
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
                return;

            case 'Mage':
                scores = [
                    {
                        "name": "Arcane",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_0
                    },
                    {
                        "name": "Fire",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_1
                    },
                    {
                        "name": "Frost",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_2
                    }

                ];
                return;

            case 'Hunter':
                scores = [
                    {
                        "name": "Beast Mastery",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_0
                    },
                    {
                        "name": "Marksmanship",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_1
                    },
                    {
                        "name": "Survival",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_2
                    }

                ];
                return;

            case 'Warlock':
                scores = [
                    {
                        "name": "Affliction",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_0
                    },
                    {
                        "name": "Demonology",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_1
                    },
                    {
                        "name": "Destruction",
                        "score": equipment.mythic_plus_scores_by_season[currentSeason].scores.spec_2
                    }

                ];
                return;
        }
    }

    classSelect(equipment.class)


    scores.sort((a, b) => b.score - a.score)

    console.log(scores);

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

export default DpsClass;