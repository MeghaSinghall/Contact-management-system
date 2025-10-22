import PhoneInput from 'react-phone-input-2';
import { X } from 'lucide-react';
import 'react-phone-input-2/lib/style.css';
import type Contact from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formData: Contact;
  setFormData: (data: Contact) => void;
  onSubmit: () => void;
  isAddMode: boolean;
}

export const ContactFormModal = ({ isOpen, onClose, formData, setFormData, onSubmit, isAddMode }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{isAddMode ? 'Add Contact' : 'Edit Contact'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <PhoneInput
              country={'in'}
              value={formData.phone_number}
              onChange={(phone) => setFormData({ ...formData, phone_number: phone })}
              inputStyle={{
                width: '100%',
                height: '42px',
                fontSize: '14px',
                paddingLeft: '48px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
              }}
              buttonStyle={{
                borderRadius: '8px 0 0 8px',
                border: '1px solid #d1d5db',
              }}
              containerStyle={{ width: '100%' }}
              enableSearch={true}
              searchPlaceholder="Search country"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onSubmit}
            className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-300 hover:text-black transition-all cursor-pointer"
          >
            {isAddMode ? 'Add' : 'Update'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
