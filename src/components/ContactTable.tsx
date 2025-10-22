import { Edit2, Trash2 } from 'lucide-react';
import type Contact from '../types';

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export const ContactTable = ({ contacts, onEdit, onDelete }: Props) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {contacts.map((contact) => (
          <tr key={contact.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">+{contact.phone_number}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(contact)}
                  className="bg-green-700 text-white p-2 rounded hover:bg-green-300 hover:text-black transition-all cursor-pointer"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(contact)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-400 hover:text-black transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {contacts.length === 0 && <div className="text-center py-12 text-gray-500">No contacts found</div>}
  </div>
);
