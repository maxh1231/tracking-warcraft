import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
    const [characters, setCharacters] = useState(null)

    useEffect(() => {
        getData();

        async function getData() {
            const response = await fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/search?term=${field.name}`)
            const data = await response.json();

            setCharacters(data)
        }
    }, [setCharacters])

    let field = useParams();
    console.log(field);

    // let charArr = [];
    // fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/search?term=${field.name}`).then(response => response.json()).then(charData => {
    //     console.log(charData)

    // })
    //     console.log(setCharacters)
    //     for (let i = 0; i < charData.matches.length; i++) {
    //         charArr.push(charData.matches[i])

    //     }
    // })



    console.log(characters);
    return (

        <section>

            {characters && (
                <div>
                    {characters.matches.map((character, index) => (
                        <div key={index}>
                            <h2>{character.name}</h2>
                        </div>
                    ))}
                </div>
            )}

            {/* {(charArr.length > 0) ? (
                {
                    charArr.map((character) => (
                        <span key={character.id}>
                            <h1>{character.name}</h1>
                        </span>

                    ))
                )} : <span>no results</span>} */}

            {/* <div>
                {(charArr.length > 0) ? (charArr.map((character) => (
                    <span key={character.data.id}></span>
                ))) : (<span>No results</span>)}

            </div> */}
        </section>
    )
}

export default SearchResults;