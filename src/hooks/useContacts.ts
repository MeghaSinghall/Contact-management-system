import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import type Contact from '../types';
import { fuzzySearch } from '../utils/helpers';

const STEIN_API_URL = import.meta.env.VITE_STEIN_API_URL as string;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME as string;

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${STEIN_API_URL}/${SHEET_NAME}`);
      const valid = res.data.filter(
        (c: any) => c.id && c.name && c.email && c.phone_number
      );
      setContacts(valid);
      toast.success('Contacts loaded!');
    } catch (err: any) {
      toast.error(`Error loading contacts: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, setContacts, loading, fetchContacts };
};
