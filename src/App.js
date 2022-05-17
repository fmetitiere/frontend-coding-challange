import React, { useState, useEffect, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";

import TenantsList from "./components/TenantsList";
import AddTenantForm from "./components/AddTenantForm";
import { Service } from "./Service";
import { diffInMonths } from "./utils/date";
import LottieBG from "./components/LottieBG";

function TabsNav({ filter, setFilter }) {
  const NavItem = ({ children, id }) => (
    <li className="nav-item mr-3">
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setError("There is an error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = useMemo(() => {
    switch (filter) {
      case "all":
        return tenants;
      case "payment-late":
        return tenants.filter((t) => t.paymentStatus === "LATE");
      case "lease-less-than-month":
        const today = new Date();
        return tenants.filter((t) => diffInMonths(t.leaseEndDate, today) < 1);
      default:
        return tenants;
    }
  }, [filter, tenants]);

  const onAddTenant = async (tenant) => {
    setLoading(true);
    setError("");
    try {
      const newTenant = await Service.addTenant(tenant);
      setTenants([...tenants, newTenant]);
      setLoading(false);
      return { error: false };
    } catch (error) {
      setError("Something went wrong adding the tenant. Try again.");
      setLoading(false);
      return { error: true };
    }
  };

  return (
    <>
      <div className="lottie">
        <LottieBG />
      </div>
      <div className="wrapper">
        <div className="container">
          <div className="d-flex justify-content-between mb-5">
            <h1>Tenants</h1>
            <Button className="btn btn-secondary" onClick={handleShow}>
              Add Tenant
            </Button>
          </div>
          <TabsNav filter={filter} setFilter={setFilter} />
          <TenantsList
            tenants={filteredTenants}
            error={error}
            loading={loading}
            onDelete={onDeleteTenant}
          />

          <>
            <Modal show={show} onHide={handleClose}>
              <AddTenantForm onAddTenant={onAddTenant} />
            </Modal>
          </>
        </div>
      </div>
    </>
  );
}

export default App;
