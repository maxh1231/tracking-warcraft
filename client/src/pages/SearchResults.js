import { useParams } from "react-router-dom";

const SearchResults = () => {

    let field = useParams();
    console.log(field);

    fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/search?term=${field.name}`).then(response => response.json()).then(charData => console.log(charData))


    return (
        <section>
            <h1>search results page</h1>
        </section>
    )
}

export default SearchResults;