import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { useLogoutMutation } from '@services/api/authApi';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const [logout, { isLoading }] = useLogoutMutation();
  const { pathname } = useLocation();

  const caption =
    pathname === '/profile/orders'
      ? 'В этом разделе вы можете просмотреть свою историю заказов'
      : 'В этом разделе вы можете изменить свои персональные данные';

  const handleLogout = (): void => {
    void logout();
  };

  return (
    <main className={` mt-30 ${styles.container}`}>
      <aside className={styles.sidebar}>
        <ul className={`${styles.menu} mb-20`}>
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `text text_type_main-medium ${styles.item} ${isActive ? styles.itemActive : ''}`
              }
            >
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile/orders"
              end
              className={({ isActive }) =>
                `text text_type_main-medium ${styles.item} ${isActive ? styles.itemActive : ''}`
              }
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              disabled={isLoading}
              className={`text text_type_main-medium ${styles.item} ${styles.button}`}
              onClick={handleLogout}
            >
              {isLoading ? 'Выходим...' : 'Выход'}
            </button>
          </li>
        </ul>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.caption}`}
        >
          {caption}
        </p>
      </aside>
      <div className="pl-10">
        <Outlet />
      </div>
    </main>
  );
};
