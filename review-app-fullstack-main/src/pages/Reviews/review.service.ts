import axios from 'axios';
import type { Review } from './review.types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerReviews = async (): Promise<Review[]> => {
  const res = await axios.get(`${API_URL}/reviews`);
  return res.data;
};

export const crearReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  const res = await axios.post(`${API_URL}/reviews`, review);
  return res.data;
};

export const actualizarReview = async (id: number, review: Omit<Review, 'id'>): Promise<Review> => {
  const res = await axios.put(`${API_URL}/reviews/${id}`, review);
  return res.data;
};

export const eliminarReview = async (id: number): Promise<Review> => {
  const res = await axios.delete(`${API_URL}/reviews/${id}`);
  return res.data;
};