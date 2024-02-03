import {useEffect, useState} from "react";
import UserFilters from "@/components/UserFilters";
import UserPagination from "@/components/UserPagination";
import CardViewTable from "@/components/CardViewTable";

const PAGE_SIZE = 12;

function HomePage() {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFilterChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = [...usersData].filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm));
    setFilteredUsers(filteredData);
    setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const sortOrder = e.target.value;
    const sortedData = [...dataToDisplay].sort((a, b) =>
      sortOrder === 'asc' ? a.age - b.age : b.age - a.age);
    setDataToDisplay(sortedData);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchedData = [...usersData].filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm));
    setSearchedUsers(searchedData);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchDataExample = async () => {
    try {
      const response = await fetch('api/staticdata');

      if (!response.ok) {
        return;
      }
      const users = await response.json();
      setUsersData(users);

      return users;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataExample().then((users) => {
      setDataToDisplay(users.slice(0, PAGE_SIZE));
      setFilteredUsers(users);
      setSearchedUsers(users);
      setTotalPages(Math.ceil(users.length / PAGE_SIZE));
    });

  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const leastArr = filteredUsers.length < searchedUsers.length ? filteredUsers : searchedUsers;
    const biggestArr = filteredUsers.length >= searchedUsers.length ? filteredUsers : searchedUsers;

    const resultArray = leastArr.filter((item) => {
      return biggestArr.some((item2) => item2.id === item.id)
    });

    setDataToDisplay(resultArray.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(resultArray.length / PAGE_SIZE))
  }, [currentPage, filteredUsers, searchedUsers]);

  return (
    <div>
      <UserFilters
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        handleSearch={handleSearch}
      />
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <CardViewTable users={dataToDisplay} />
    </div>
  );
}

export default HomePage;
