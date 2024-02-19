import { useEffect } from "react";
import { useState } from "react";
import './sorting.css'

function SortData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("ascending");

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const apiResponse = await fetch(`https://dummyjson.com/users`);
      const result = await apiResponse.json();

      if (result && result.users && result.users.length > 0) {
        sort !== "" ? handleSort(result.users) : setUsers(result.users);
        setLoading(false);
      }

      console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  function handleSort(listOfUsers) {
    let cpyUsers = [...listOfUsers];
    if (sort === "ascending") {
      cpyUsers = cpyUsers.sort((firstUser, secondUser) =>
        firstUser.firstName > secondUser.firstName ? 1 : -1
      );

      setUsers(cpyUsers);
    } else if (sort === "desending") {
      cpyUsers = cpyUsers.sort((firstUser, secondUser) =>
        firstUser.firstName > secondUser.firstName ? -1 : 1
      );

      setUsers(cpyUsers);
    }
  }

  useEffect(() => {
    handleSort(users);
  }, [sort]);

  console.log(sort);

  if (loading) return <h1>Loading users! Please wait</h1>;

  return (
    <div className="sort-data-container">
      <h1>Sort Data</h1>
      <div className="sort-dropdown-container">
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          name="sort"
        >
          <option value="" id="">
            Please Select Option
          </option>
          <option value="ascending" id="ascending">
            Sort A - Z
          </option>
          <option value="desending" id="desending">
            Sort Z - A
          </option>
        </select>
      </div>
      <ul>
        {users && users.length > 0
          ? users.map((userItem) => (
              <li>
                <p>{userItem.firstName}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default SortData;
