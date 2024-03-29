import { Album, Person } from './../../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, delayFetch } from './personsApi';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...arg) => {
      await delayFetch(500);
      return fetch(...arg);
    },
  }),
  tagTypes: ['PersonAlbums', 'Album'],
  endpoints: (builder) => ({
    // fetch
    fetchAlbums: builder.query<Album[], Partial<Person>>({
      providesTags: (result, error, person) => {
        // eslint-disable-next-line no-debugger
        // debugger;
        // result => attığımız endpoint(http://localhost:8000/albums?personId=3KGWPLrPAzddaQhBRFpUo) sonucu dönen data'yı temsil eder
        // yani personId": "3KGWPLrPAzddaQhBRFpUo"' ye sahip olan albümleri çekiyoruz
        return result
          ? [...result.map((album) => ({ type: 'Album' as const, id: album.id })), { type: 'PersonAlbums', id: person?.id ?? 0 }]
          : [];
      },
      query: (person: Person) => ({
        url: '/albums',
        method: 'GET',
        params: {
          // http://localhost:8000/albums?personId=31
          personId: person?.id,
        },
      }),
    }),
    // add
    addAlbum: builder.mutation<void, Partial<Album>>({
      invalidatesTags: (result, error, album) => {
        // result => işlem doğru bir şekilde tamamlanırda bize gelen data
        // error => eğer hata var ise hata mesajı
        // person => gelen parametre
        return [
          {
            // yeni bir albüm eklediğimizde bu kişiye ait albüm koleksiyonunun güncellenmesi gerektiğini belirtmiş oluruz.
            /*
            Albüm eklemesi yapıldığında, invalidatesTags fonksiyonu album.personId kullanarak, bu albümün ait olduğu kişiye ait albüm koleksiyonunu temsil eden etiketi belirler. Dolayısıyla, yeni eklenen albüm, ilgili kişiye ait albüm koleksiyonunu günceller ve bu koleksiyonla ilgili önbellekleri temizler. Bu şekilde, type: 'PersonAlbums' etiketi, albüm eklemesi sonrasında güncellenen veriyi temsil eder.
            */
            type: 'PersonAlbums',
            id: album.personId,
          },
        ];
      },
      query: (album: Album) => ({
        url: '/albums',
        method: 'POST',
        body: album,
      }),
    }),
    // remove
    removeAlbum: builder.mutation<void, Album>({
      invalidatesTags: (result, error, album) => {
        return [{ type: 'Album', id: album.id }];
      },
      query: (album: Album) => ({
        url: `/albums/${album.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useAddAlbumMutation, useRemoveAlbumMutation, useFetchAlbumsQuery } = albumsApi;

/*
    provided: {
      Album: {
        '15': [
          'fetchAlbums({"id":"3KGWPLrPAzddaQhBRFpUo","name":"Marian"})'
        ],
        '25': [
          'fetchAlbums({"id":"3KGWPLrPAzddaQhBRFpUo","name":"Marian"})'
        ],
        '35': [
          'fetchAlbums({"id":"jnxb5hhud-u4OXQ0kobSw","name":"Missouri"})'
        ],
        '45': [
          'fetchAlbums({"id":"jnxb5hhud-u4OXQ0kobSw","name":"Missouri"})'
        ]
      },
      PersonAlbums: {
        '3KGWPLrPAzddaQhBRFpUo': [
          'fetchAlbums({"id":"3KGWPLrPAzddaQhBRFpUo","name":"Marian"})'
        ],
        'jnxb5hhud-u4OXQ0kobSw': [
          'fetchAlbums({"id":"jnxb5hhud-u4OXQ0kobSw","name":"Missouri"})'
        ]
      }
    },
*/
