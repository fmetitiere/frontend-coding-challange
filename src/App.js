import React, { useState, useEffect, useMemo } from "react";

import TenantsList from "./components/TenantsList";
import { Service } from "./Service";
import { diffInMonths } from './utils/date';


function TabsNav({ filter, setFilter }) {
  const NavItem = ({ children, id }) => (
    <li className="nav-item">
      <button
        className={`nav-link ${filter === id ? "active" : ""}`}
        onClick={() => setFilter(id)}
      >
        {children}
      </button>
    </li>
  );

  return (
    <ul className="nav nav-tabs">
      <NavItem id="all">All</NavItem>
      <NavItem id="payment-late">Payment is late</NavItem>
      <NavItem id="lease-less-than-month">
        Lease ends in less than a month
      </NavItem>
    </ul>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tenants, setTenants] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await Service.getTenants();
      setTenants(result);
    } catch (error) {
      setError("There is an error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteTenant = async (id) => {
    setLoading(true);
    setError("");
    try {
      await Service.deleteTenant(id);
      const newTenants = tenants.filter((t) => t.id !== id);
      setTenants(newTenants);
    } catch (error) {
      setError("Something went wrong deleting the tenant. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = useMemo(() => {
    switch (filter) {
      case 'all':
        return tenants;
      case 'payment-late':
        return tenants.filter(t => t.paymentStatus === 'LATE');
      case 'lease-less-than-month':
        const today = new Date();
        return tenants.filter(t => diffInMonths(t.leaseEndDate, today) < 1);
      default:
        return tenants; 
    }
  }, [filter, tenants]);

  return (
    <>
      <div className="container">
        <h1>Tenants</h1>
        <TabsNav filter={filter} setFilter={setFilter} />
        <TenantsList
          tenants={filteredTenants}
          error={error}
          loading={loading}
          onDelete={onDeleteTenant}
        />
      </div>
      <div className="container">
        <button className="btn btn-secondary">Add Tenant</button>
      </div>
    </>
  );
}

export default App;
