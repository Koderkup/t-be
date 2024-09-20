import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ErrorBoundaryFallback, PageLayout, RoutesPaths } from 'common';
import {
  CategoryPage,
  InfoPage,
  MainPage,
  Navigation,
  OrderDetailsPage,
  OrderHistoryPage,
  ProductPage,
  ProfilePage,
  StripeCheckoutPage,
} from '@/pages';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PageLayout />} errorElement={<ErrorBoundaryFallback />}>
        <Route index path={RoutesPaths.HOME} element={<MainPage />} />

        <Route
          path={`${RoutesPaths.CATEGORIES}/:category`}
          element={<CategoryPage />}
        />

        <Route
          path={`${RoutesPaths.PRODUCT}/:productId`}
          element={<ProductPage />}
        />

        <Route
          path={RoutesPaths.ORDER_HISTORY}
          element={<OrderHistoryPage />}
        />
        <Route
          path={`${RoutesPaths.ORDER_HISTORY}/:orderId`}
          element={<OrderDetailsPage />}
        />

        <Route path={RoutesPaths.INFO} element={<InfoPage />} />

        <Route
          path={RoutesPaths.PROFILE_INFORMATION}
          element={<ProfilePage />}
        />

        <Route path="/:shopId" element={<Navigation />} />
      </Route>

      <Route path={RoutesPaths.STRIPE} element={<StripeCheckoutPage />} />
    </>
  )
);
