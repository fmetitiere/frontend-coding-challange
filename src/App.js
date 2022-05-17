import React, { useState, useEffect, useMemo } from "react";

import TenantsList from "./components/TenantsList";
import { Service } from "./Service";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tenants, setTenants] = useState([]);

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

  return (
    <>
      <div className="container">
        <h1>Tenants</h1>

        <TenantsList tenants={tenants} error={error} loading={loading} />
      </div>
      <div className="container">
        <button className="btn btn-secondary">Add Tenant</button>
      </div>
    </>
  );
}

export default App;
