import React from 'react'

const ContentSystemFields = ({ uiTitle, title, slug, onSave, onTitleChange }) => (
  <div>
    <div class='row pb-4'>
      <div class='col-6'>
        <h3>{uiTitle}</h3>
      </div>
      <div class='col-6'>
        <div class='btn-group float-right'>
          <button class='btn btn-success' onClick={onSave} disabled={title === ''}>Save</button>
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col-6'>
        <div class='form-group'>
          <label>Title</label>
          <input class='form-control' type='text' placeholder="" value={title} onChange={onTitleChange} />
        </div>
      </div>
      <div class='col-6'>
        <div class='form-group'>
          <label>Slug</label>
          <input class='form-control' type='text' value={slug} disabled />
        </div>
      </div>
    </div>
  </div>
)

export default ContentSystemFields