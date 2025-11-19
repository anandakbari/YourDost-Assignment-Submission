
import { Circle } from 'lucide-react';
import type { User } from '../types/User';

export default function UserCard({ user, index }:{user:User, index:number}){
  const getEmailDomain = (email: string) => {
    return email.split('@')[1];
  };

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'gmail.com':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'yahoo.com':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'reqres.in':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div 
      className="card p-6 hover:shadow-2xl transition-all duration-300 animate-fade-in group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <Circle className="absolute -bottom-1 -right-1 w-5 h-5 text-green-400 fill-current border-2 border-white rounded-full bg-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                ID #{user.id}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getDomainColor(getEmailDomain(user.email))}`}>
                {getEmailDomain(user.email)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};