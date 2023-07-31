import axios from 'axios';
import queryString from 'query-string';
import { ErpProcessInterface, ErpProcessGetQueryInterface } from 'interfaces/erp-process';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getErpProcesses = async (
  query?: ErpProcessGetQueryInterface,
): Promise<PaginatedInterface<ErpProcessInterface>> => {
  const response = await axios.get('/api/erp-processes', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createErpProcess = async (erpProcess: ErpProcessInterface) => {
  const response = await axios.post('/api/erp-processes', erpProcess);
  return response.data;
};

export const updateErpProcessById = async (id: string, erpProcess: ErpProcessInterface) => {
  const response = await axios.put(`/api/erp-processes/${id}`, erpProcess);
  return response.data;
};

export const getErpProcessById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/erp-processes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteErpProcessById = async (id: string) => {
  const response = await axios.delete(`/api/erp-processes/${id}`);
  return response.data;
};
