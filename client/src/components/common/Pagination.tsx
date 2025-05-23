interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages === 0) return null;

    const handlePrev = () => {
        if (currentPage > 1)
            onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages)
             onPageChange(currentPage + 1);
    };

    // Optional: show pages numbers
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <a className="page-link" href="#" onClick={handlePrev} tabIndex={-1}>Previous</a>
                </li>
                {pages.map(p => (
                    <li className={`page-item ${currentPage === p && "active"}`}>
                        <a
                            key={p}
                            className="page-link"
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                    <a className="page-link" href="#" onClick={handleNext}>Next</a>
                </li>
            </ul>
        </nav>
    );
};
