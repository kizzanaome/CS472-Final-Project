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
            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    style={{ fontWeight: p === currentPage ? 'bold' : 'normal' }}
                >
                    {p}
                </button>
            ))}
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </nav>
    );
};
