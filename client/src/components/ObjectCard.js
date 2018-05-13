import React from 'react'
import { Link } from 'react-router-dom'

const ObjectCard = ({ id, title, onDelete }) => (
  <div class='card'>
    <div class='card-body'>
      <h5 class='card-title'>{title}</h5>
      <div class='btn-group'>
        <Link class='btn btn-link' to={'/objects/' + id + '/edit'}>
          <i class="far fa-edit"></i>
        </Link>
        <button class='btn btn-link' onClick={onDelete}>
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
)

export default ObjectCard