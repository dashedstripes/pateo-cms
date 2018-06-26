import React from 'react'

const FormEditField = ({ title, type, value, onChange }) => (
  <div class='col-6 mb-3'>
    <div class='form-group'>
      <label>{title}</label>
      <div class='input-group'>
        <input class='form-control' type={type} value={value} placeholder='' onChange={onChange} />
      </div>
    </div>
  </div>
)

export default FormEditField