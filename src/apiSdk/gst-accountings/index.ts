import axios from 'axios';
import queryString from 'query-string';
import { GstAccountingInterface, GstAccountingGetQueryInterface } from 'interfaces/gst-accounting';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGstAccountings = async (
  query?: GstAccountingGetQueryInterface,
): Promise<PaginatedInterface<GstAccountingInterface>> => {
  const response = await axios.get('/api/gst-accountings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGstAccounting = async (gstAccounting: GstAccountingInterface) => {
  const response = await axios.post('/api/gst-accountings', gstAccounting);
  return response.data;
};

export const updateGstAccountingById = async (id: string, gstAccounting: GstAccountingInterface) => {
  const response = await axios.put(`/api/gst-accountings/${id}`, gstAccounting);
  return response.data;
};

export const getGstAccountingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gst-accountings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGstAccountingById = async (id: string) => {
  const response = await axios.delete(`/api/gst-accountings/${id}`);
  return response.data;
};
