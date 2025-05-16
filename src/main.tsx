import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { loadFromLocalStorage, saveToLocalStorage } from './utils/storage.ts'
import { setDocumentsFromStorage } from './redux/documentReducer.ts'
import { Provider } from 'react-redux'
import { store } from './redux/configureStore.ts'

const savedState = loadFromLocalStorage()
if (savedState) {
  store.dispatch(setDocumentsFromStorage(savedState.documents))
}

store.subscribe(() => {
  saveToLocalStorage({ documents: store.getState().documents })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
