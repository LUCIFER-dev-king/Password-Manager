import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const VaultCard = ({
  vaultItems,
  setModelToggle,
  decryptItemsInModel,
  isCreateOrUpdate,
  onDeletePassVault,
  colorCode,
}) => {
  const openModal = (e) => {
    e.preventDefault();
    console.log("triggerd");
    decryptItemsInModel(vaultItems);
    isCreateOrUpdate(false);
    setModelToggle((prev) => !prev);

    if (localStorage.getItem("recentItems")) {
      var recentItems = localStorage.getItem("recentItems");
      recentItems = JSON.parse(recentItems);
      if (vaultItems.sitePassword !== undefined) {
        var item = {
          type: "password",
          name: vaultItems.vaultName,
        };
        let pass = recentItems.findIndex((p) => p.name === item.name);
        console.log(pass);
        if (pass < 0) {
          recentItems.push(item);
          localStorage.setItem("recentItems", JSON.stringify(recentItems));
        }
      } else if (vaultItems.notes !== undefined) {
        var item2 = {
          type: "notes",
          name: vaultItems.vaultName,
        };
        let note = recentItems.findIndex((p) => p.name === item2.name);
        if (note < 0) {
          recentItems.push(item2);
          localStorage.setItem("recentItems", JSON.stringify(recentItems));
        }
      } else if (vaultItems.bankName !== undefined) {
        var item3 = {
          type: "bank",
          name: vaultItems.vaultName,
        };

        let bank = recentItems.findIndex((p) => p.name === item3.name);
        if (bank < 0) {
          recentItems.push(item3);
          localStorage.setItem("recentItems", JSON.stringify(recentItems));
        }
      }
    }
  };

  return (
    <div
      className="card p-0 mt-3 mt-md-0 hover-card"
      style={{ width: "14rem", height: "12rem" }}
    >
      <div
        className="h-75"
        style={{
          borderRadius: "2px 2px 0 0",
          backgroundColor: `${colorCode}`,
        }}
      ></div>
      <div className="d-flex p-2 justify-content-between align-items-center">
        <div>
          <p>{vaultItems.vaultName}</p>
        </div>
        <div>
          <FaEdit
            className="m-1 vault-icon"
            onClick={openModal}
            data-bs-toggle={"modal"}
            data-bs-target={"#testModal"}
          />
          <FaTrashAlt
            className="m-1 vault-icon"
            onClick={() => onDeletePassVault(vaultItems)}
          />
        </div>
      </div>
    </div>
  );
};

export default VaultCard;
