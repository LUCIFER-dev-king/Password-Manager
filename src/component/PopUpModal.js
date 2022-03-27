import React from "react";

const PopUpModal = ({
  vaultItems,
  vaultList,
  inputHandler,
  modalTitle,
  setModelToggle,
  onCreate,
  onUpdate,
  isCreateOrUpdate,
  vaultItemsLabelList,
}) => {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="testModalLabel">
            {modalTitle}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setModelToggle(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="row">
            {vaultItems.map((value, id) => (
              <div className="col-6" key={id}>
                <div className="form-group m-1">
                  <label htmlFor={value}>{vaultItemsLabelList[id]}</label>
                  <input
                    id="vault_name"
                    type="text"
                    name={value}
                    className="form-control"
                    value={vaultList[value]}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            ))}
            {isCreateOrUpdate ? (
              <button
                className="submit-btn w-100 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#testModal"
                onClick={onCreate}
              >
                SUBMIT
              </button>
            ) : (
              <button
                className="submit-btn w-100 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#testModal"
                onClick={onUpdate}
              >
                UPDATE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
