import React, { useMemo, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";
import { isAuthenticated } from "../../auth/helper/authHelper";
import { searchQuery } from "./helper/searchHelper";
import { useHistory } from "react-router";

const Search = () => {
  const { _id } = isAuthenticated();
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const [notFound, setNotFound] = useState(false);

  //Search for credentials from all vaults
  const searchHandler = (value) => {
    searchQuery(_id, value).then((res) => {
      try {
        if (res.status === 200) {
          setNotFound(false);
          setSearchResult(res.data.passVaultArray);
        }
      } catch (error) {
        console.log("Not Found");
        setNotFound(true);
        setSearchResult([]);
      }
    });
  };

  const debounceOnChangeSearchHandler = useMemo(
    () => debounce(searchHandler, 300),
    []
  );

  useEffect(() => {
    return () => {
      debounceOnChangeSearchHandler.cancel();
    };
  }, []);
  return (
    <div
      className="ms-5 ms-sm-2 d-flex flex-column w-100"
      style={{ zIndex: "5" }}
    >
      <div className="col-12 col-md-6 py-2 position-relative">
        <div
          style={{ backgroundColor: "#f4f0fa" }}
          className="d-flex py-2 px-1 rounded align-items-center "
        >
          <input
            style={{
              background: "transparent",
              outline: "none",
              border: "none",
              fontSize: "16px",
            }}
            onChange={(e) => debounceOnChangeSearchHandler(e.target.value)}
            type="text"
            placeholder="Search"
            color="#fff"
            className="text-left ps-2 w-100 "
          />
          <FaSearch style={{ cursor: "pointer" }} className="text-muted" />
        </div>

        {searchResult.length ? (
          <div
            style={{ backgroundColor: "#fff" }}
            className="w-100 mt-2 rounded position-absolute shadow z-5"
          >
            <ul className="p-0 m-0">
              {searchResult.map((res, id) => (
                <li
                  onClick={() => {
                    if (res.sitePassword !== undefined) {
                      history.push("/password");
                    } else if (res.notes !== undefined) {
                      history.push("/notes");
                    } else if (res.bankName !== undefined) {
                      history.push("/bankaccount");
                    }
                  }}
                  className="searchItem"
                  key={id}
                >
                  {res.vaultName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        {notFound ? (
          <div
            style={{ backgroundColor: "#fff" }}
            className="w-100 rounded mt-2 py-2 px-2"
          >
            Not Found
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
