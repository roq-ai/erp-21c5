import axios from 'axios';
import queryString from 'query-string';
import { EngagementInterface, EngagementGetQueryInterface } from 'interfaces/engagement';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getEngagements = async (
  query?: EngagementGetQueryInterface,
): Promise<PaginatedInterface<EngagementInterface>> => {
  const response = await axios.get('/api/engagements', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createEngagement = async (engagement: EngagementInterface) => {
  const response = await axios.post('/api/engagements', engagement);
  return response.data;
};

export const updateEngagementById = async (id: string, engagement: EngagementInterface) => {
  const response = await axios.put(`/api/engagements/${id}`, engagement);
  return response.data;
};

export const getEngagementById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/engagements/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEngagementById = async (id: string) => {
  const response = await axios.delete(`/api/engagements/${id}`);
  return response.data;
};
