import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import { HelmetProvider } from 'react-helmet-async';

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
