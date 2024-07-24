import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import {Provider} from "react-redux"
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {store} from "./state/store";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <MemoryRouter>
    <App />
  </MemoryRouter>
</Provider>
);

