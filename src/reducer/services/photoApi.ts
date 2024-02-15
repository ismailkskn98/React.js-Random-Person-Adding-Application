import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './personsApi';
import { Album, Photo } from '../../types/types';

const delayFetch = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const photoApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...arg) => {
      await delayFetch(500);
      return fetch(...arg);
    },
  }),
  tagTypes: ['Photo', 'AlbumPhotos'],
  endpoints: (builder) => ({
    fetchPhotos: builder.query<Photo[], Partial<Album>>({
      providesTags: (result, error, album) =>
        result
          ? [...result.map((photo) => ({ type: 'Photo' as const, id: photo.id })), { type: 'AlbumPhotos', id: album.id }]
          : [],
      query: (album: Album) => ({
        // /photos?albumId=342532
        url: '/photos',
        method: 'GET',
        params: {
          albumId: album.id,
        },
      }),
    }),
    addPhoto: builder.mutation<void, Photo>({
      invalidatesTags: (result, error, photo) => [
        {
          type: 'AlbumPhotos',
          id: photo.albumId,
        },
      ],
      query: (photo: Photo) => ({ url: '/photos', method: 'POST', body: photo }),
    }),
    removePhoto: builder.mutation<void, Photo>({
      invalidatesTags: (result, error, photo) => [
        {
          type: 'AlbumPhotos',
          id: photo.albumId,
        },
      ],
      query: (photo: Photo) => ({ url: `/photos/${photo.id}`, method: 'DELETE' }),
    }),
  }),
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photoApi;
