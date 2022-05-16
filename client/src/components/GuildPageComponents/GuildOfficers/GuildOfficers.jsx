import { Link, useParams, useLocation } from "react-router-dom";

const GuildOfficers = ({ officers }) => {
    const params = useParams();
    const location = useLocation();

    return (
        <section>

            {officers !== null && (
                <div>
                    <h1>not null</h1>
                    <p>Guild Master: <Link to={`/character/${params.region}/${params.realm}/${officers[0].character.name}`} state={location.state}>{officers[0].character.name}</Link></p>
                    <span>Officers: </span>
                    {officers.filter(item => item.rank > 0).map((character, index) => (
                        <span key={index}><Link to={`/character/${params.region}/${params.realm}/${character.character.name}`} state={location.state}>{character.character.name}</Link> </span>
                    ))}
                </div>
            )}
        </section>
    )
}

export default GuildOfficers;