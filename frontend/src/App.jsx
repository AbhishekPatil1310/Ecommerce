import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';
import DashboardLayout from './layout/DashboardLayout';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import NotFoundPage from './pages/NotFound';
import UploadAd from './components/upload';
import CategoryAds from './components/CategoryAds'; // ✅ new page for showing ads category-wise
import CartList from './components/CartItems'
import AdDetails from './components/AdDetails'
import UserAddresses from './components/Address'
import Checkout from './components/Checkout';
import ContactForm from './components/Contact';
import SearchPage from './components/SearchPage'
import HomePage from './pages/Home';
import MyAds from './components/MyAds';

/* empty stubs – replace later */
const Empty = () => <div />;

export default function App() {
  return (
    <Routes>
      {/* -------- PUBLIC -------- */}
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} /> {/* "/" */}
        <Route
          path="signin"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route
          path="signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
      </Route>

      {/* -------- DASHBOARD (auth-only) -------- */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={['admin', 'advertiser', 'user']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Home */}
        <Route index element={<HomePage />} /> {/* /dashboard */}

        {/* ---- USER ROUTES ---- */}
        <Route
          path="categories/:id"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CategoryAds />
            </ProtectedRoute>
          }
        />

        <Route
          path="cart"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CartList /> {/* Replace with Cart component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoute allowedRoles={['user', 'advertiser']}>
              <ContactForm /> {/* Replace with Contact component */}
            </ProtectedRoute>
          }
        />

        {/* ---- ADVERTISER ROUTES ---- */}
        <Route
          path="upload"
          element={
            <ProtectedRoute allowedRoles={['advertiser']}>
              <UploadAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-ads"
          element={
            <ProtectedRoute allowedRoles={['advertiser']}>
              <MyAds /> {/* Replace with MyAds component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="wallet"
          element={
            <ProtectedRoute allowedRoles={['advertiser']}>
              <Empty /> {/* Replace with Wallet component */}
            </ProtectedRoute>
          }
        />

        {/* Common routes */}
        <Route path="stats" element={<Empty />} />
        <Route path="watch" element={<Empty />} />
        <Route path="account" element={<Empty />} />
      </Route>
        <Route
          path="ad/:id"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <AdDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="addresses"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserAddresses />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="search"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <SearchPage />
            </ProtectedRoute>
          }
        />

      {/* -------- FALLBACKS -------- */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
  );
}
