import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person } from '../../types/types';

const BASE_URL: string = 'http://localhost:8000';

const delayFetch = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/*
reducerPath, oluşturduğunuz slice'ın Redux store içindeki konumunu belirtir. Redux Toolkit, birden fazla slice'ı bir araya getirirken ve Redux store'u yapılandırırken her bir slice'ın bir adrese ihtiyacı vardır. Bu adres, hangi reducer'ın hangi parçasını oluşturduğunu belirtir.

* Örneğin, reducerPath değeri posts olarak belirlenmiş bir slice düşünelim:

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    reducer fonksiyonları burada tanımlanır
  },
});

Bu slice'ın Redux store içindeki konumu "posts" olacaktır. Yani, Redux store'da" state.posts" şeklinde erişilebilir. Bu, store'daki diğer slice'ların (örneğin users, todos gibi) konumunu belirlemek için kullanılır.
*/

export const personsApi = createApi({
  // Redux store'da" state.persons" şeklinde erişilebilir.
  reducerPath: 'persons',
  //   baseQuery, API isteklerini gerçekleştirmek için kullanılan temel bir sorgu işlevini temsil eder.
  baseQuery: fetchBaseQuery({
    //   fetchBaseQuery fonksiyonu, temel bir sorgu işlevi oluşturur ve bu işlev, belirtilen baseUrl (temel URL) üzerinden HTTP isteklerini gerçekleştirir.
    baseUrl: BASE_URL,
    fetchFn: async (...arg) => {
      // console.log(arg); // url, method, body, ...
      await delayFetch(1000);
      return fetch(...arg);
    },
  }),
  tagTypes: ['Person'],
  endpoints: (builder) => ({
    // endpoints nesnesi, API isteklerini yönetmek için tanımlanan endpoint'leri içerir.
    getPersons: builder.query<Person[], void>({
      /*
        GET işlemleri (query): builder.query<GelecekOlanVeriTürü, HataDurumu>
        GelecekOlanVeriTürü: Bu, GET isteği başarılı olduğunda beklenen veri türünü belirtir. Yani, isteğin dönüşü olarak beklenen verinin türüdür.
        HataDurumu: Bu, GET isteğinden dönüş yapılacağı durumlarda beklenen hata türünü belirtir. Yani, isteğin başarısız olduğunda dönmesi beklenen hata durumudur.
        */
      query: () => ({ url: '/persons', method: 'GET' }),
      providesTags: ['Person'],
    }),
    addPerson: builder.mutation<void, Partial<Person>>({
      /*
        * Person: İsteğin başarılı olması durumunda beklenen veri türüdür. Yani, eklenen kişinin tüm özelliklerini içeren tam bir Person nesnesi beklenir.
        Partial<Person>: Bu, isteğe gönderilen verinin türünü belirtir. Yani, eklenen kişinin bazı özelliklerini içeren bir Partial<Person> nesnesi beklenir. Bu, kişinin tüm özelliklerini zorunlu kılmadan isteğe göndermenize olanak tanır.

        * Örneğin, bir kişi eklemek için bir istek gönderdiğinizde, isteğe gönderilen veri, belki de kişinin adı ve yaşını içerir. Ancak, isteğin sonucunda dönen veri, eklenen kişinin tüm özelliklerini içermeyebilir. Örneğin, veritabanında otomatik olarak oluşturulan bir "id" özelliği veya başka bazı otomatik olarak eklenen özellikler olabilir. Bu nedenle, geri dönen veri, eklenen kişinin tüm özelliklerini içermez, yalnızca eklenen kişinin bazı özelliklerini içerir.

         * Bu, genellikle mutasyon işlemlerinde (örneğin, yeni bir öğe ekleme işlemlerinde) görülür. Mutasyon işlemleri sonucunda, genellikle yeni öğenin tüm bilgilerini döndürmek yerine, sadece işlemin başarılı olduğunu gösteren bir mesaj veya öğenin sadece birkaç anahtar bilgisini döndürmek daha yaygındır.
        */
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

/*
export const personsApi = createApi({
  reducerPath: 'persons',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPersons: builder.query<Person[], void>({
      query: () => '/persons',
    }),
    addPerson: builder.mutation<Person, Partial<Person>>({
      query: (newPerson) => ({
        url: '/persons',
        method: 'POST',
        body: newPerson,
      }),
    }),
    deletePerson: builder.mutation<void, number>({
      query: (personId) => ({
        url: `/persons/${personId}`,
        method: 'DELETE',
      }),
    }),
    updatePerson: builder.mutation<Person, Partial<Person>>({
      query: ({ id, ...updates }) => ({
        url: `/persons/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
  }),
});

export const { useGetPersonsQuery, useAddPersonMutation, useDeletePersonMutation, useUpdatePersonMutation } = personsApi;
*/

/*
<Person, Partial<Person>> ifadesindeki virgül, aslında iki farklı türü belirtir. İlk tür, bir API isteğinin dönüşümüne giden giriş (input) veri tipini, ikinci tür ise API isteğinin dönüşümünden sonra döndürülen çıkış (output) veri tipini temsil eder.

Yani, <Person, Partial<Person>> ifadesinde, bir API isteğine verilen verinin türü Person olarak belirtilirken, isteğin sonucunda dönen verinin türü ise Partial<Person> olarak belirtilir. Bu, bir API isteğinin veri akışını temsil eder: İstek başlatılırken bir Person nesnesi verilir, ancak yanıt alındığında geri dönen veri, belki de tüm Person özelliklerini içermeyebilir, bu nedenle kısmi bir Person nesnesi olabilir.

Örneğin, bir kişi eklemek için bir API isteği gönderdiğinizde, isteğe yeni bir kişinin tam bilgilerini verirsiniz (Person), ancak yanıt olarak sadece eklenen kişinin bazı özelliklerini alırsınız, bu nedenle geri dönen veri kısmi bir kişiyi (Partial<Person>) temsil eder.
*/

/*
Örneğin, bir kişi eklemek için bir istek gönderdiğinizde, isteğe gönderilen veri, belki de kişinin adı ve yaşını içerir. Ancak, isteğin sonucunda dönen veri, eklenen kişinin tüm özelliklerini içermeyebilir. Örneğin, veritabanında otomatik olarak oluşturulan bir "id" özelliği veya başka bazı otomatik olarak eklenen özellikler olabilir. Bu nedenle, geri dönen veri, eklenen kişinin tüm özelliklerini içermez, yalnızca eklenen kişinin bazı özelliklerini içerir.

Bu, genellikle mutasyon işlemlerinde (örneğin, yeni bir öğe ekleme işlemlerinde) görülür. Mutasyon işlemleri sonucunda, genellikle yeni öğenin tüm bilgilerini döndürmek yerine, sadece işlemin başarılı olduğunu gösteren bir mesaj veya öğenin sadece birkaç anahtar bilgisini döndürmek daha yaygındır.
*/
