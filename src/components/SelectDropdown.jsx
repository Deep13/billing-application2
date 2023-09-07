import React from 'react'

const SelectDropdown = ({ className, data = [] }) => {
  return (
    <select className={className}>
      {
        data.map(curr => {
          return <option key={curr.text}  value={curr.text}>{curr.text}</option>
        })
      }
    </select>
  )
}

export default SelectDropdown