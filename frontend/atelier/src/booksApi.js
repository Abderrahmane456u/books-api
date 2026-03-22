import axiosClient from './axiosClient'

export const getAllLivres = (categorie) =>
  axiosClient.get('/livres', categorie ? { params: { categorie } } : {})
export const getLivreById = (id) => axiosClient.get(`/livres/${id}`)
export const createLivre = (data) => axiosClient.post('/livres', data)
export const updateLivre = (id, data) => axiosClient.put(`/livres/${id}`, data)
export const deleteLivre = (id) => axiosClient.delete(`/livres/${id}`)

export const getAllCategories = () => axiosClient.get('/categories')