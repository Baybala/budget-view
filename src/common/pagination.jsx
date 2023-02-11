import React from 'react';

const Pagination = ({onClick, currentPage, number_pages}) => {
    return ( 
            <nav > 
                <ul className="pagination justify-content-end">
                    {number_pages.map(num => <li className={num === currentPage ? "page-item active" : "page-item"} 
                                            onClick={() => onClick(num)}
                                            key = {num}>
                                                <a className="page-link">{num}</a>
                                            </li>
                                    )}
                </ul>
            </nav>        
    );
}
 
export default Pagination;