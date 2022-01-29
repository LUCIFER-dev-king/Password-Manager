import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const VaultCard = ({
  vaultItems,
  setModelToggle,
  decryptItemsInModel,
  isCreateOrUpdate,
  onDeletePassVault,
}) => {
  const openModal = (e) => {
    e.preventDefault();
    decryptItemsInModel(vaultItems);
    isCreateOrUpdate(false);
    setModelToggle(true);
  };

  return (
    <div className="card p-0 mt-3 mt-md-0" style={{ width: "16rem" }}>
      <div className="d-flex p-2 justify-content-between">
        <div>
          <p>{vaultItems.vaultName}</p>
        </div>
        <div>
          <FaEdit className="m-1 vault-icon" onClick={openModal} />
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
