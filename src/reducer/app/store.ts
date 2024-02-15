import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { personsApi } from '../services/personsApi';
import { albumsApi } from '../services/albumsApi';
import { photoApi } from '../services/photoApi';

// configureStore: Redux store'unu yapılandırmak için kullanılır.
export const store = configureStore({
  reducer: {
    // kare parantez içinde bir ifade kullanarak dinamik olarak bir anahtar belirleyebilirsiniz.
    [personsApi.reducerPath]: personsApi.reducer, // reducer : (state, action) => {…}
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
  },
  // personsApi.middleware: RTK Query tarafından oluşturulan middleware'i store'a ekler.
  //! // Api ara yazılımının eklenmesi önbelleğe alma, geçersiz kılma ve yoklamayı mümkün kılar,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personsApi.middleware).concat(albumsApi.middleware).concat(photoApi.middleware),
});

// setupListeners(store.dispatch): RTK Query'nin özel listener'larını kurar. Bu, async action'ların redux store'a otomatik olarak dispatch edilmesini sağlar.
// isteğe bağlıdır, ancak refetchOnFocus/refetchOnReconnect davranışları için gereklidir
// see `setupListeners` docs - özelleştirme için 2. arg olarak isteğe bağlı bir geri arama alır
setupListeners(store.dispatch);
