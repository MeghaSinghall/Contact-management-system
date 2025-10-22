import axios from 'axios';
import type Contact from '../types';

const STEIN_API_URL = import.meta.env.VITE_STEIN_API_URL as string;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME as string;

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(`${STEIN_API_URL}/${SHEET_NAME}`);
  return response.data.filter((c: any) => c.id && c.name && c.email && c.phone_number);
};

export const addContactApi = async (contact: Contact) => {
  await axios.post(`${STEIN_API_URL}/${SHEET_NAME}`, [contact]);
};

export const updateContactApi = async (id: string, data: Partial<Contact>) => {
  await axios.put(`${STEIN_API_URL}/${SHEET_NAME}`, { condition: { id }, set: data });
};

export const deleteContactApi = async (id: string) => {
  await axios.delete(`${STEIN_API_URL}/${SHEET_NAME}`, { data: { condition: { id } } });
};
