import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person } from '../../types/types';

export const BASE_URL: string = 'http://localhost:8000';

export const delayFetch = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const personsApi = createApi({
  // Redux store'da" state.persons" şeklinde erişilebilir.
  reducerPath: 'persons',
  //   baseQuery, API isteklerini gerçekleştirmek için kullanılan temel bir sorgu işlevini temsil eder.
  baseQuery: fetchBaseQuery({
    //   fetchBaseQuery fonksiyonu, temel bir sorgu işlevi oluşturur ve bu işlev, belirtilen baseUrl (temel URL) üzerinden HTTP isteklerini gerçekleştirir.
    baseUrl: BASE_URL,
    fetchFn: async (...arg) => {
      // console.log(arg); // url, method, body, ...
      await delayFetch(500);
      return fetch(...arg);
    },
  }),
  tagTypes: ['Person'],
  endpoints: (builder) => ({
    // endpoints nesnesi, API isteklerini yönetmek için tanımlanan endpoint'leri içerir.
    getPersons: builder.query<Person[], void>({
      query: () => ({ url: '/persons', method: 'GET' }),
      providesTags: ['Person'],
    }),
    addPerson: builder.mutation<void, Partial<Person>>({
      query: (newPerson: Person) => ({
        url: '/persons',
        method: 'POST',
        body: newPerson,
      }),
      // Yeni bir post eklendiğinde 'Person' etiketine sahip verilerin önbelleğini temizler ve veriler tekrar çekilir
      invalidatesTags: ['Person'],
    }),
    removePerson: builder.mutation<void, Person>({
      // başarılı olduğunda => void
      // hata olursa => Person
      query: (person: Person) => ({
        url: `/persons/${person.id}`,
        method: 'DELETE',
      }),
      // Bir silme işlemi olduğunda 'Person' etiketine sahip verilerin önbelleğini temizler ve veriler tekrar çekilir
      invalidatesTags: ['Person'],
    }),
  }),
});

export const { useGetPersonsQuery, useAddPersonMutation, useRemovePersonMutation } = personsApi;
