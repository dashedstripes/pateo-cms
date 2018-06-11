import React from 'react'

const ContentField = ({ value, type, fieldInputs, onChange, onDelete, onFieldTypeChange }) => (
  <div class='form-group'>
    <div class='input-group'>
      <input class='form-control' type='text' value={value} placeholder="Enter a field name..." onChange={onChange} />
      <div class="input-group-append">
        <button class="btn btn-outline-danger" type="button" onClick={onDelete}>
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <select class='form-control mb-2' value={type} onChange={onFieldTypeChange}>
      {fieldInputs.map((fieldInput) => {
        return <option key={fieldInput.id} value={fieldInput.type}>{fieldInput.title}</option>
      })}
    </select>
  </div>
)

export default ContentField