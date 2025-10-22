import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import type Contact  from './types';
import { HeaderControls } from './components/HeaderControls';
import { ContactTable } from './components/ContactTable';
import { ContactCardView } from './components/ContactCardView';
import { ContactFormModal } from './components/ContactFormModal';
import { DeleteModal } from './components/DeleteModal';
import { fetchContacts, addContactApi, updateContactApi, deleteContactApi } from './utils/api';
import { generateRandomId, fuzzySearch, makeContactKey } from './utils/helpers';
import { validateForm } from './utils/validators';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [loading, setLoading] = useState(false);

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<Contact>({ id: '', name: '', email: '', phone_number: '' });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Filter contacts when search term changes
  useEffect(() => {
    setFilteredContacts(fuzzySearch(contacts, searchTerm));
  }, [contacts, searchTerm]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await fetchContacts();
      setContacts(data);
      toast.success('Contacts loaded successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  // Duplicate check
  const isDuplicateContact = (candidate: Contact, excludeId?: string) => {
    const key = makeContactKey(candidate);
    return contacts.some((c) => c.id !== excludeId && makeContactKey(c) === key);
  };

  // Add contact
  const addContact = async () => {
    const validation = validateForm(formData);
    if (!validation.valid) return toast.error(validation.message ?? 'Validation failed');

    if (isDuplicateContact(formData)) return toast('Contact already exists', { icon: '⚠️' });

    const newContact: Contact = { ...formData, id: generateRandomId() };
    const loadingToast = toast.loading('Adding contact...');
    try {
      await addContactApi(newContact);
      setContacts([...contacts, newContact]);
      setIsAddEditModalOpen(false);
      setFormData({ id: '', name: '', email: '', phone_number: '' });
      toast.success('Contact added successfully!', { id: loadingToast });
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to add contact: ${error.message}`, { id: loadingToast });
    }
  };

  // Update contact
  const updateContact = async () => {
    if (!currentContact) return;
    const validation = validateForm(formData);
    if (!validation.valid) return toast.error(validation.message ?? 'Validation failed');

    const noChange =
      formData.name === currentContact.name &&
      formData.email === currentContact.email &&
      formData.phone_number === currentContact.phone_number;
    if (noChange) return toast('No changes detected', { icon: 'ℹ️' });

    if (isDuplicateContact(formData, currentContact.id)) return toast('Already Exist', { icon: '⚠️' });

    const loadingToast = toast.loading('Updating contact...');
    try {
      await updateContactApi(currentContact.id, formData);
      const updatedContacts = contacts.map((c) => (c.id === currentContact.id ? { ...c, ...formData } : c));
      setContacts(updatedContacts);
      setIsAddEditModalOpen(false);
      setCurrentContact(null);
      setFormData({ id: '', name: '', email: '', phone_number: '' });
      toast.success('Contact updated successfully!', { id: loadingToast });
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to update contact: ${error.message}`, { id: loadingToast });
    }
  };

  // Delete contact
  const deleteContact = async () => {
    if (!currentContact) return;
    const loadingToast = toast.loading('Deleting contact...');
    try {
      await deleteContactApi(currentContact.id);
      setContacts(contacts.filter((c) => c.id !== currentContact.id));
      setIsDeleteModalOpen(false);
      setCurrentContact(null);
      toast.success('Contact deleted successfully!', { id: loadingToast });
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to delete contact: ${error.message}`, { id: loadingToast });
    }
  };

  // Open Add/Edit Modal
  const openAddModal = () => {
    setFormData({ id: '', name: '', email: '', phone_number: '' });
    setIsAddMode(true);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setCurrentContact(contact);
    setFormData({ ...contact });
    setIsAddMode(false);
    setIsAddEditModalOpen(true);
  };

  const openDeleteModal = (contact: Contact) => {
    setCurrentContact(contact);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Manager</h1>

        <HeaderControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onAdd={openAddModal}
        />

        {loading && <div className="text-center py-12">Loading...</div>}

        {!loading && viewMode === 'table' && (
          <ContactTable contacts={filteredContacts} onEdit={openEditModal} onDelete={openDeleteModal} />
        )}

        {!loading && viewMode === 'card' && (
          <ContactCardView contacts={filteredContacts} onEdit={openEditModal} onDelete={openDeleteModal} />
        )}

        <ContactFormModal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={isAddMode ? addContact : updateContact}
          isAddMode={isAddMode}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          contact={currentContact!}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
