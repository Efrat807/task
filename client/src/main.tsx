import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './Utils/ReactQueryConfig.tsx'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import ToastsContainer from './Components/Toastify/ToastsContainer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastsContainer />
    </QueryClientProvider>
    </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
