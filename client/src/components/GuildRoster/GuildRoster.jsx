import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const GuildRoster = ({ IoData }) => {

    // Example items, to simulate fetching from another resources..
    // const items = [roster];
    const items = ["hi", "hi", "hello"];
    let tempArr = [];
    if (IoData) {
        tempArr = IoData;
    }

    function Items({ currentItems, page }) {
        return (
            <>
                <tbody>
                    {currentItems &&

                        currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>#{index + 1 + page}</td>
                                <td>{item.character.name}</td>
                            </tr>
                        ))}

                </tbody>
            </>
        );
    }

    function PaginatedItems({ itemsPerPage, roster }) {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(tempArr.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(tempArr.length / itemsPerPage));
            console.log(currentItems)
        }, [itemOffset, itemsPerPage]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % tempArr.length;
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

