import axios from 'axios';
import type { Review } from './reviewg.types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerReviewsGlobales = async (): Promise<Review[]> => {
  const res = await axios.get<Review[]>(`${API_URL}/reviews/all`);
  return res.data;
};
