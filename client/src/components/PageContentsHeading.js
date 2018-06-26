import React from 'react'

const PageContentsHeading = ({ title, onSave, isSaveDisabled }) => (
  <div>
    <div class='row pb-4'>
      <div class='col-6'>
        <h3>{title}</h3>
      </div>
      <div class='col-6'>
        <div class='btn-group float-right'>
          <button class='btn btn-success' onClick={onSave} disabled={isSaveDisabled}>Save</button>
        </div>
      </div>
    </div>
  </div>
)

export default PageContentsHeading