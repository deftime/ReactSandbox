import { createRoot } from 'react-dom/client'
import { RouterProvider} from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorMsg } from '@/components/ErrorMsg'
import { router } from "@/app/router.ts";
import './styles/app.scss'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorMsg}>
    <RouterProvider router={router} />
  </ErrorBoundary>
)
