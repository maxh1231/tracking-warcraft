import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SearchResults = () => {
    const [characters, setCharacters] = useState(null)

    useEffect(() => {
        getData();

        async function getData() {
            const response = await fetch(`https://raider.io/api/search?term=${field.name}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "raider-io.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_RADERIO_KEY
                }
            })
            const data = await response.json();

            setCharacters(data)
        }
    }, [setCharacters])

    let field = useParams();
    console.log(field);

    console.log(characters);
    return (

        <section>
            {characters && (
                <div>
                    {characters.matches.map((item, index) => (
                        <div key={index}>

                            {item.type === 'guild' && (
                                <div>
                                    <span><Link to={`/guild/${item.data.region.slug}/${item.data.realm.slug}/${item.name}`}>{item.name}</Link></span>
                                    <span>{item.data.faction}</span>
                                    <span>{item.data.region.short_name}</span>
                                    <span>{item.data.realm.name}</span>
                                </div>
                            )}
                            {item.type === 'character' && (
                                <div>
                                    <span><Link to={`/character/${item.data.region.slug}/${item.data.realm.slug}/${item.name}`}>{item.name}</Link></span>
                                    <span>{item.data.faction}</span>
                                    <span>{item.data.class.name}</span>
                                    <span>{item.data.region.short_name}</span>
                                    <span>{item.data.realm.name}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default SearchResults;