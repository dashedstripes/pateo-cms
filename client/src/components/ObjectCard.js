import React from 'react'
import { Link } from 'react-router-dom'

const ObjectCard = ({ id, title, slug, onDelete }) => (
  <div class='card'>
    <div class='card-body'>
      <h5 class='card-title'>{title}</h5>
      <p class='card-subtitle text-muted'>{slug}</p>
      <div class='btn-group float-right'>
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