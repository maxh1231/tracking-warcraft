import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const GuildRoster = ({ IoData }) => {

    // Example items, to simulate fetching from another resources.
    // const items = [roster];
    const items = ["hi", "hi", "hello"];
    console.log(IoData)

    // useEffect(() => {
    //     IOData()

    //     async function IOData() {
    //         const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/guilds/roster?region=us&realm=illidan&guild=liquid`)

    //         const data = await response.json()
    //         setIoData(data)
    //     }
    // }, [setIoData])



    function Items({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((item) => (
                        <div>
                            <h3>Item #{item}</h3>
                        </div>
                    ))}
            </>
        );
    }

    function PaginatedItems({ itemsPerPage, roster }) {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(IoData.guildRoster.roster.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(IoData.guildRoster.roster.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % IoData.guildRoster.roster.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} page={itemOffset} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }

    return (
        <section>
            <PaginatedItems itemsPerPage={10} />
        </section>
    )
}

export default GuildRoster;

