import React, { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { AdminUser } from '../types';
import { mockUsers } from '../data/mockData';
import { DataTable } from '../components/DataTable';
import { PencilIcon } from '../icons/PencilIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

const StatusBadge: React.FC<{ status: 'Verified' | 'Pending' | 'Rejected' }> = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        Verified: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Rejected: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


export const UserManagement: React.FC = () => {

    const columns = useMemo<ColumnDef<AdminUser>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => <div className="font-medium text-gray-900 dark:text-white">{info.getValue() as string}</div>
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role',
            header: 'Role',
        },
        {
            accessorKey: 'verificationStatus',
            header: 'Status',
            cell: info => <StatusBadge status={info.getValue() as 'Verified' | 'Pending' | 'Rejected'} />
        },
        {
            accessorKey: 'createdAt',
            header: 'Registration Date',
            cell: info => new Date(info.getValue() as string).toLocaleDateString(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: () => (
                <div className="flex space-x-2">
                    <button className="text-emerald-500 hover:text-emerald-700" aria-label="Verify User"><CheckCircleIcon className="h-5 w-5" /></button>
                    <button className="text-gray-500 hover:text-gray-700" aria-label="Edit User"><PencilIcon className="h-5 w-5" /></button>
                    <button className="text-red-500 hover:text-red-700" aria-label="Delete User"><TrashIcon className="h-5 w-5" /></button>
                </div>
            )
        }
    ], []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
                 <button className="mt-2 sm:mt-0 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                    Add New User
                </button>
            </div>
            <DataTable columns={columns} data={mockUsers} />
        </div>
    );
};