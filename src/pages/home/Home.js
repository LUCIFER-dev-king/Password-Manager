import React, { useEffect, useState } from "react";
import Base from "../../core/Base";
import { getUser } from "./helper/homeHelper";
import { isAuthenticated } from "../../auth/helper/authHelper";
import { connect } from "react-redux";
import { setUserVault } from "../../redux/actions";
import { useHistory } from "react-router";
import { colorCodes } from "../../utils/colorCodes";

const Home = ({ setUserVault }) => {
  const { _id } = isAuthenticated();
  const history = useHistory();
  const [recentItems, setRecentItems] = useState([]);
  useEffect(() => {
    getUser(_id).then((result) => {
      try {
        if (result.status === 200) {
          setUserVault(result.data);
        }
      } catch (error) {
        history.push("/signin");
        localStorage.removeItem("user");
      }
    });

    if (localStorage.getItem("recentItems")) {
      var recentItemsList = localStorage.getItem("recentItems");
      recentItemsList = JSON.parse(recentItemsList);
      setRecentItems(recentItemsList);
    }
  }, []);

  const handleItemRoute = (type) => {
    if (type === "password") {
      history.push("/password");
    } else if (type === "notes") {
      history.push("/notes");
    } else if (type === "bank") {
      history.push("/bankaccount");
    }
  };
  return (
    <Base>
      <div className="container mt-5">
        <h4>Recent Vaults</h4>
        <div className="mt-3 d-flex" style={{ zIndex: "1" }}>
          {recentItems.length > 0 ? (
            recentItems.map((item, id) => (
              <div
                key={id}
                className="card p-0 mt-3 mt-md-0 me-2 hover-card"
                style={{
                  width: "14rem",
                  height: "12rem",
                  cursor: "pointer",
                }}
                onClick={() => handleItemRoute(item.type)}
              >
                <div
                  className="h-75"
                  style={{
                    borderRadius: "2px 2px 0 0",
                    backgroundColor: `${
                      colorCodes[Math.floor(Math.random() * 6)]
                    }`,
                  }}
                ></div>
                <h5 className="h-25 p-2 font-medium">{item.name}</h5>
              </div>
            ))
          ) : (
            <div>No recent items</div>
          )}
        </div>
        <div
          style={{
            position: "relative",
            width: "500px",
            marginTop: "20px",
          }}
        >
          <iframe
            title="video"
            src="https://www.loom.com/embed/01cb3b4b6a8c4467877edb54dd7e0cf5"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "300px",
            }}
          ></iframe>
        </div>
      </div>
    </Base>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setUserVault: (uservault) => {
    dispatch(setUserVault(uservault));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
