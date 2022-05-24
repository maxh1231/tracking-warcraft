import DpsClass from "../DpsClass";
import HybridClass from "../HybridClass";
import DpsRank from "../DpsRank";

const Progression = ({ equipment, currentRaid, setCurrentRaid, currentSeason, setCurrentSeason }) => {

    const handleSelectChange = (event) => {
        let value = event.target.value;
        console.log(value)
        setCurrentRaid(value);
    }

    const handleRaidInfo = () => {
        let raid = '';
        let n = 11;
        switch (currentRaid) {
            case 'Sepulcher of the First Ones':
                raid = 'sepulcher-of-the-first-ones';
                break;
            case 'Sanctum of Domination':
                raid = 'sanctum-of-domination';
                break;
            case 'Castle Nathria':
                raid = 'castle-nathria';
                n = 10
                break;
        };
        return (
            <ol>
                <li>Mythic: {equipment.raid_progression[raid].mythic_bosses_killed}/{n} M</li>
                <li>Heroic: {equipment.raid_progression[raid].heroic_bosses_killed}/{n} H</li>
                <li>Normal: {equipment.raid_progression[raid].normal_bosses_killed}/{n} N</li>
            </ol>
        )
    }

    const handleSeasonChange = (event) => {
        let value = event.target.value
        switch (value) {
            case 'BFA Season 4':
                setCurrentSeason(6);
                break;
            case 'BFA Season 3':
                setCurrentSeason(5);
                break;
            case 'BFA Season 2':
                setCurrentSeason(4);
                break;
            case 'BFA Season 1':
                setCurrentSeason(3);
                break;
            case 'SL Season 3':
                setCurrentSeason(2);
                break;
            case 'SL Season 2':
                setCurrentSeason(1);
                break;
            case 'SL Season 1':
                setCurrentSeason(0);
                break;
        };
    };

    return (
        <section>
            {equipment !== null && (
                <div>
                    <div>
                        <h3>Raid Progression</h3>
                        <select onChange={handleSelectChange}>
                            <option>Sepulcher of the First Ones</option>
                            <option>Sanctum of Domination</option>
                            <option>Castle Nathria</option>
                        </select>
                    </div>

                    <div>
                        <div>
                            <h4>{currentRaid}</h4>
                            <h4>Progress</h4>
                            <h4>Kills</h4>
                        </div>
                        <div>
                            {handleRaidInfo()}
                        </div>
                    </div>
                </div>
            )}

            {equipment !== null && (
                <div>
                    <div>
                        <h3>Mythic+ Progression</h3>
                        <select onChange={handleSeasonChange}>
                            <option>SL Season 3</option>
                            <option>SL Season 2</option>
                            <option>SL Season 1</option>
                            <option>BFA Season 4</option>
                            <option>BFA Season 3</option>
                            <option>BFA Season 2</option>
                            <option>BFA Season 1</option>
                        </select>
                    </div>
                    {
                        (equipment.class === 'Rogue' || equipment.class === 'Mage' || equipment.class === 'Hunter' || equipment.class === 'Warlock')
                            ?
                            <div>
                                <DpsClass equipment={equipment} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
                                <DpsRank equipment={equipment} />
                            </div>
                            :
                            <HybridClass equipment={equipment} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
                    }
                </div>
            )}
        </section>
    )
}

export default Progression;