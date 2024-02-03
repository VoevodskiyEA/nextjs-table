import React from 'react';

interface UserFiltersProps {
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({handleFilterChange, handleSortChange, handleSearch}) => {
    return (
        <div>
            <label>
                Filter:
                <input type="text" onChange={handleFilterChange} />
            </label>
            <label>
                Sort by Age:
                <select onChange={handleSortChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <label>
                Search:
                <input type="text" onChange={handleSearch} />
            </label>
        </div>
    );
};

export default UserFilters;
