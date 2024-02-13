import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { personsApi } from '../services/personsApi';

// configureStore: Redux store'unu yapılandırmak için kullanılır.
export const store = configureStore({
  reducer: {
    // kare parantez içinde bir ifade kullanarak dinamik olarak bir anahtar belirleyebilirsiniz.
    [personsApi.reducerPath]: personsApi.reducer, // reducer : (state, action) => {…}
  },
  // personsApi.reducerPath: RTK Query'nin reducer'ının kaydedileceği yerdir.
  // personsApi.reducer: RTK Query tarafından oluşturulan reducer'ı store'a ekler.
  // personsApi.middleware: RTK Query tarafından oluşturulan middleware'i store'a ekler.

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(personsApi.middleware),
  // personsApi.middleware:  RTK Query tarafından otomatik olarak oluşturulur ve redux store'a eklenir. Bu middleware, API isteklerini kontrol etmek ve işlemek için kullanılır. Biz configureStore fonksiyonunda, oluşturduğumuz redux store'a bu middleware'i ekliyoruz ki, RTK Query tarafından yapılan API istekleri doğrudan redux store'a entegre edilsin ve orada yönetilsin.
});

// setupListeners(store.dispatch): RTK Query'nin özel listener'larını kurar. Bu, async action'ların redux store'a otomatik olarak dispatch edilmesini sağlar.
setupListeners(store.dispatch);

//? middleware
//* Middleware, bir işlemin (örneğin bir HTTP isteğinin veya bir eylemin) başlaması ve tamamlanması arasında çalışan fonksiyonlardır.
//* Özetle, middleware terimi, bir yazılım uygulamasında bir işlemin başlaması ve tamamlanması arasında çalışan ve işlemin davranışını değiştiren veya genişleten ara katman işlevlerini ifade eder. Bu, işlemleri işleme, izleme, güncelleme veya değiştirme gibi çeşitli amaçlar için kullanılabilir.
