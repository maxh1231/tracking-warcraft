import { useParams, useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

const CharacterInfo = ({ equipment }) => {
    const params = useParams();
    const upperCaseRegion = params.region.toUpperCase();
    const location = useLocation()

    const aotcFormat = (value) => {
        return `${value.slice(5, 7)}-${value.slice(8, 10)}-${value.slice(0, 4)}`
    }

    const calcProg = () => {
        if (equipment.raid_progression[`sanctum-of-domination`].mythic_bosses_killed > 0) {
            return `${equipment.raid_progression['sanctum-of-domination'].mythic_bosses_killed}/11 M`;
        } else if (equipment.raid_progression[`sanctum-of-domination`].heroic_bosses_killed > 0) {
            return equipment.raid_progression[`sanctum-of-domination`].heroic_bosses_killed
        } else {
            return equipment.raid_progression[`sanctum-of-domination`].normal_bosses_killed
        }
    }

    return (
        <section>

            {equipment !== null &&
                <div>
                    <div>
                        <img src={equipment.thumbnail_url} ></img>
                    </div>
                    <div>
                        <div>
                            <span>{equipment.name}</span>
                        </div>
                        {equipment.guild.name !== null && (
                            <div>
                                <span><Link to={`/guild/${params.region}/${params.realm}/${equipment.guild.name}`} state={location.state}>{"<"}{equipment.guild.name}{">"}</Link></span>
                            </div>
                        )}
                        <div>
                            <span>({upperCaseRegion}) {equipment.realm}</span>
                        </div>
                        <div>
                            <span>{equipment.race}<span> {equipment.active_spec_name} {equipment.class}</span></span>
                        </div>
                        <div>
                            <span>{equipment.mythic_plus_scores_by_season[2].scores.all} M+ Score</span>
                        </div>
                        {equipment.raid_achievement_curve.filter(raid => raid.raid.includes('sanctum-of-domination')).map(item => (
                            <div key={uuid()}>
                                <span>{calcProg()} </span>
                                <span>Sanctum of Domination AOTC on {aotcFormat(item.aotc)}</span>
                            </div>

                        ))}

                        {equipment.raid_achievement_curve.filter(raid => raid.raid.includes('sepulcher-of-the-first-ones')).map(item => (
                            <div key={uuid()}>
                                <span>Sepulcher of the First Ones AOTC on {aotcFormat(item.aotc)}</span>
                            </div>
                        ))}
                    </div>
                </div>}
        </section>
    )
}

export default CharacterInfo;