import React from 'react';
import styles from '../styles/styles.module.css';

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (direction: 'prev' | 'next') => void;
}

const UserPagination: React.FC<UserPaginationProps> = (
    {
        currentPage,
        totalPages,
        handlePageChange
    }
) => {
    return (
        <div className={styles['pagination-container']}>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                Prev
            </button>
            <button onClick={() => handlePageChange('next')} disabled={false}>
                Next
            </button>
        </div>
    );
};

export default UserPagination;
