import { Search, Filter, BarChart3, X } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalUsers: number;
  filteredUsers: number;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  sortBy,
  onSortChange,
  totalUsers,
  filteredUsers,
}: SearchAndFilterProps){
  return (
    <div className="card p-8 mb-8 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Search & Filter</h2>
        <div className="flex flex-row items-center gap-2 text-sm text-gray-600">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            {filteredUsers}
          </span>
          <span>of {totalUsers} users</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group">
          <label htmlFor="search" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Search className="h-4 w-4" />
            Search Users
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10 group-hover:shadow-md"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="filter" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Filter className="h-4 w-4" />
            Filter By
          </label>
          <select
            id="filter"
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            className="input-field group-hover:shadow-md cursor-pointer"
          >
            <option value="">All Users</option>
            <optgroup label="Email Domain">
              <option value="gmail">Gmail Users</option>
              <option value="yahoo">Yahoo Users</option>
              <option value="reqres">ReqRes Users</option>
            </optgroup>
            <optgroup label="Name Range">
              <option value="a-f">Names A-F</option>
              <option value="g-l">Names G-L</option>
              <option value="m-r">Names M-R</option>
              <option value="s-z">Names S-Z</option>
            </optgroup>
          </select>
        </div>

        <div className="group">
          <label htmlFor="sort" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <BarChart3 className="h-4 w-4" />
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="input-field group-hover:shadow-md cursor-pointer"
          >
            <option value="">Default Order</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email Address</option>
          </select>
        </div>
      </div>

      {searchTerm && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Search active:</span> "{searchTerm}"
            </p>
            <button
              onClick={() => onSearchChange('')}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};