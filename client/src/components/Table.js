import React from 'react'

const Table = ({ headings, items }) => (
  <table class="table table-hover">
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {items}
    </tbody>
  </table>
)

export default Table