import { Edit2, Trash2 } from 'lucide-react';
import type Contact from '../types';

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export const ContactCardView = ({ contacts, onEdit, onDelete }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {contacts.map((contact) => (
      <div key={contact.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
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
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {contact.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> +{contact.phone_number}
          </p>
        </div>
      </div>
    ))}
    {contacts.length === 0 && <div className="col-span-full text-center py-12 text-gray-500">No contacts found</div>}
  </div>
);
