import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams, Link, useLocation } from 'react-router-dom'

const GuildRoster = ({ IoData }) => {
    const location = useLocation();
    const params = useParams()
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
                                <td>{item.character.class.name} {item.character.spec.name}</td>

                                <td><Link to={`/character/${params.region}/${params.realm}/${item.character.name}`} state={location.state}>{item.character.name}</Link></td>
                                <td>{item.character.items.item_level_equipped}</td>
                                {item.character.expansionData !== null ? <td><img src={`https://wow.zamimg.com/images/wow/icons/medium/${item.character.expansionData.covenant.icon}.jpg`}></img>R{item.character.expansionData.renownLevel}</td> : <td>-</td>}
                                <td>{item.keystoneScores.allScore}</td>
                                <td>Placeholder</td>
                                <td>{item.rank}</td>
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
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Name</th>
                            <th>ilvl</th>
                            <th>Covenant</th>
                            <th>M+</th>
                            <th>Prog</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                </table>
                <Items currentItems={currentItems} page={itemOffset} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="flex mx-2"
                />
            </>
        );
    }

    return (
        <section className=''>
            <PaginatedItems itemsPerPage={10} />
        </section>
    )
}

export default GuildRoster;

