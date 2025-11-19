import type{ User } from '../types/User';
import { Users } from 'lucide-react';
import UserCard from './UserCard';

export default function UserGrid({ users }:{users:User[]}){
  if (users.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <div className="max-w-sm mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-600">
            No users match your current search and filter criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {users.map((user, index) => (
        <UserCard key={user.id} user={user} index={index} />
      ))}
    </div>
  );
};