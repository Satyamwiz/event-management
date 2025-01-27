import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'TEACHER',
    department: 'Computer Science',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'STUDENT',
    department: 'Electronics',
    status: 'active'
  }
];

const AdminUsers: React.FC = () => {
  const [users] = useState(mockUsers);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-600">Manage all users here</p>
        </div>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.department}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {user.status}
                  </span>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;