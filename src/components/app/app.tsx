import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { Modal } from '@components/modal/modal';
import { Feed } from '@pages/feed/feed';
import { ForgotPassword } from '@pages/forgot-password/forgot-password';
import { Home } from '@pages/home/home';
import { Ingredient } from '@pages/ingredient/ingredient';
import { Login } from '@pages/login/login';
import { NotFound } from '@pages/not-found/not-found';
import { ProfileInfo } from '@pages/profile-info/profile-info';
import { ProfileOrders } from '@pages/profile-orders/profile-orders';
import { Profile } from '@pages/profile/profile';
import { Register } from '@pages/register/register';
import { ResetPassword } from '@pages/reset-password/reset-password';
import { useGetUserQuery } from '@services/api/authApi';
import { setIsAuthChecked } from '@services/slices/authSlice';
import { useAppDispatch } from '@services/storeHooks';

import { ProtectedRoute } from '../protected-route';

import type { Location } from 'react-router-dom';

import styles from './app.module.css';

type TBackgroundState = {
  backgroundLocation?: Location;
};

export const App = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = (location.state as TBackgroundState | null)
    ?.backgroundLocation;
  const dispatch = useAppDispatch();
  const hasToken = Boolean(localStorage.getItem('accessToken'));

  const { isLoading } = useGetUserQuery(undefined, { skip: !hasToken });
  useEffect(() => {
    if (!isLoading) dispatch(setIsAuthChecked(true));
  }, [isLoading, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<ProtectedRoute component={<Profile />} />}>
          <Route index element={<ProfileInfo />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>

        <Route
          path="ingredients/:id"
          element={
            <div className={styles.ingredient}>
              <h2 className="text text_type_main-large mt-10">Детали ингредиента</h2>

              <Ingredient />
            </div>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClose={() => {
                  void navigate(-1);
                }}
                title="Детали ингредиента"
              >
                <Ingredient />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
