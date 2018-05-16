import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, title, slug, onDelete }) => (
  <div class='card'>
    <div class='card-body align-items-center'>
      <div class='float-left'>
        <h6 class='card-title mb-1'>{title}</h6>
        <p class='card-subtitle text-muted'>
          <small>{slug}</small>
        </p>
      </div>
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

export default Card