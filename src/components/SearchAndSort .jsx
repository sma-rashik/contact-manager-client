import React from "react";

const SearchAndSort = ({ searchQuery, sortOption, onSearch, onSort }) => (
  <div className="mt-4 flex items-center">
    <input
      type="text"
      placeholder="Search by name"
      value={searchQuery}
      onChange={onSearch}
      className="p-2 border rounded ml-2"
    />
    <select
      value={sortOption}
      onChange={onSort}
      className="p-2 border rounded ml-2"
    >
      <option value="name">Sort by Name</option>
      <option value="phoneNumber">Sort by Phone Number</option>
      <option value="email">Sort by Email</option>
    </select>
  </div>
);

export default SearchAndSort;
