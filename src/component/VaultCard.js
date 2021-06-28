import React from "react";
import { FaEdit, FaTrashAlt, FaShare } from "react-icons/fa";

const VaultCard = () => {
  return (
    <div className='card m-1 p-0' style={{ width: "16rem" }}>
      <div className='card-body  d-flex justify-content-between'>
        <div>
          <p>Body Name</p>
        </div>
        <div>
          <FaEdit className='m-1' />
          <FaShare className='' />
          <FaTrashAlt className='m-1' />
        </div>
      </div>
    </div>
  );
};

export default VaultCard;
