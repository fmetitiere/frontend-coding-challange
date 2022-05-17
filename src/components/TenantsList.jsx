import React from "react";
import { formatDate } from "../utils/date";

const Loading = () => {
  return (
    <div className="loading">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

function Item({ tenant, onDelete }) {
  return (
    <tr>
      <th>{tenant.id}</th>
      <td>{tenant.name}</td>
      <td>{tenant.paymentStatus}</td>
      <td>{formatDate(tenant.leaseEndDate)}</td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(tenant.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function TenantsList({ tenants, onDelete, loading, error }) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Payment Status</th>
                <th>Lease End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <Item key={t.id} tenant={t} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </>
      )}
      <h3 className="error-container text-center">{error}</h3>
    </>
  );
}

export default TenantsList;
