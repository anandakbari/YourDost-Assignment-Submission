import { useState, useEffect, useMemo } from 'react';
import type{ User } from '../types/User';
import { fetchUsers } from '../services/userService';
import Header from './Header';
import UserGrid from './UserGrid';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import { AlertTriangle } from 'lucide-react';

export default function UserDirectory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadAllUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, get the first page to know total pages
        const firstPageResponse = await fetchUsers(1);
        const totalPages = firstPageResponse.total_pages;
        let allUsersData: User[] = [...firstPageResponse.data];

        // Fetch remaining pages
        const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
        const remainingResponses = await Promise.all(
          remainingPages.map(page => fetchUsers(page))
        );

        remainingResponses.forEach(response => {
          allUsersData = [...allUsersData, ...response.data];
        });
        
        setAllUsers(allUsersData);
      } catch (err) {
        console.error('Error loading users:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadAllUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = allUsers.filter((user) => {
      const searchMatch = 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      if (!searchMatch) return false;

      switch (filterType) {
        case 'gmail':
          return user.email.includes('@gmail.com');
        case 'yahoo':
          return user.email.includes('@yahoo.com');
        case 'reqres':
          return user.email.includes('@reqres.in');
        case 'a-f':
          return user.first_name.toLowerCase().charAt(0) <= 'f';
        case 'g-l': {
          const firstChar = user.first_name.toLowerCase().charAt(0);
          return firstChar >= 'g' && firstChar <= 'l';
        }
        case 'm-r': {
          const firstCharMR = user.first_name.toLowerCase().charAt(0);
          return firstCharMR >= 'm' && firstCharMR <= 'r';
        }
        case 's-z':
          return user.first_name.toLowerCase().charAt(0) >= 's';
        default:
          return true;
      }
    });

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'first_name':
            return a.first_name.localeCompare(b.first_name);
          case 'last_name':
            return a.last_name.localeCompare(b.last_name);
          case 'email':
            return a.email.localeCompare(b.email);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [allUsers, searchTerm, filterType, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, endIndex);
  }, [filteredAndSortedUsers, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, sortBy]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner />
            <div className="mt-6 space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Loading User Directory</h2>
              <p className="text-gray-600">Fetching user data from API...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center py-20 px-4">
          <div className="card p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Users</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-3">
            User Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All data is fetched live from the ReqRes API.
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filterType={filterType}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalUsers={allUsers.length}
          filteredUsers={filteredAndSortedUsers.length}
        />

        <UserGrid users={paginatedUsers} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedUsers.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </main>
    </div>
  );
};