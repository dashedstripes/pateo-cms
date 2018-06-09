import React from 'react'
import { Link } from 'react-router-dom'

const TableRow = ({ id, title, slug, editUrl, onDelete }) => (
  <tr>
    <th scope="row">{id}</th>
    <td>{title}</td>
    <td>{slug}</td>
    <td>
      <Link class='btn btn-link' to={editUrl}>
        <i class="far fa-edit"></i>
      </Link>
      <button class='btn btn-link' onClick={onDelete}>
        <i class="fas fa-trash"></i>
      </button>
    </td>
  </tr>
)

export default TableRow