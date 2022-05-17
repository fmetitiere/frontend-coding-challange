import React from 'react'
import { useFormik } from "formik";
import { isAFutureDate } from '../utils/date';

const AddTenantForm = ({ onAddTenant, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      paymentStatus: "CURRENT",
      leaseEndDate: ""
    },
    onSubmit: async (values) => {
      const { error } = await onAddTenant({
        ...values,
        leaseEndDate: new Date(values.leaseEndDate).toISOString()
      });
      if(!error){
        formik.resetForm();
      }
    },
    validate: (payload) => {
      let errors = {};

      if(payload.name.length < 1 || payload.name.length > 25) {
        errors = { name: 'Name should have 1-25 characters' };
      }
      if(payload.leaseEndDate === '') {
        errors = { ...errors, leaseEndDate: 'Please select a date'};
      }else if(!isAFutureDate(payload.leaseEndDate)){
        errors = { ...errors, leaseEndDate: 'Please select a valid future date'};
      }
      return errors;
    },
  });
  const { errors, touched } = formik;

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {
            errors.name && touched.name && 
            <div style={{color: 'red'}}>{errors.name}</div>
          }
        </div>
        <div className="form-group">
          <label>Payment Status</label>
          <select 
             className="form-control"
             id="paymentStatus"
             name="paymentStatus"
             type="text"
             value={formik.values.paymentStatus}
             onChange={formik.handleChange}
          >
            <option>CURRENT</option>
            <option>LATE</option>
          </select>
        </div>
        <div className="form-group">
          <label>Lease End Date</label>
          <input 
            className="form-control"
            id="leaseEndDate"
            name="leaseEndDate"
            type="date"
            value={formik.values.leaseEndDate}
            onChange={formik.handleChange}
          />
           {
            errors.leaseEndDate && touched.leaseEndDate && 
            <div style={{color: 'red'}}>{errors.leaseEndDate}</div>
          }
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <button className="btn" type="reset" onClick={formik.resetForm}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddTenantForm;