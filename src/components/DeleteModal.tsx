import type Contact from '../types';

interface Props {
  isOpen: boolean;
  contact?: Contact;
  onCancel: () => void;
  onDelete: () => void;
}

export const DeleteModal = ({ isOpen, contact, onCancel, onDelete }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the contact <strong>{contact?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-400 hover:text-black transition-all cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
