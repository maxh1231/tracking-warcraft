const DpsClass = ({ equipment, currentSeason, setCurrentSeason }) => {

    console.log(equipment)

    let scores = [equipment.mythic_plus_scores_by_season[0].scores.spec_0, equipment.mythic_plus_scores_by_season[0].scores.spec_1, equipment.mythic_plus_scores_by_season[0].scores.spec_2]


    scores.sort(function (a, b) {
        return a - b;
    })

    console.log(scores);

    const renderClass = () => {
        if (equipment.class === 'Rogue') {

            return (
                <div>
                    <div>
                        <p>{equipment.mythic_plus_scores_by_season[0].scores.dps}</p>
                        <p>DPS</p>
                        <p>Mythic+ Score</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
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