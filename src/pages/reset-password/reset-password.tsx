import {
  Input,
  Button,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { useResetPasswordMutation } from '@services/api/authApi';
import { useFormWithValidation } from '@services/hooks/use-form-with-validation';
import { RESET_PASSWORD_FLAG } from '@utils/constants';

import styles from './reset-password.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const { values, handleChange, isValid } = useFormWithValidation({
    password: '',
    token: '',
  });

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleReset = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await resetPassword({ password: values.password, token: values.token }).unwrap();
      localStorage.removeItem(RESET_PASSWORD_FLAG);
      void navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (!localStorage.getItem(RESET_PASSWORD_FLAG)) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleReset(event);
      }}
      className={`${styles.reset} pl-10 pr-10 `}
    >
      <div className={`${styles.header} mb-20`}>
        <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
        <PasswordInput
          extraClass="mb-6"
          errorText="Укажите пароль посложнее."
          icon="ShowIcon"
          name="password"
          onChange={handleChange}
          placeholder="Введите новый пароль"
          size="default"
          value={values.password || ''}
        />
        <Input
          ref={inputRef}
          extraClass="mb-6"
          id="token"
          name="token"
          onChange={handleChange}
          placeholder="Введите код из письма"
          size="default"
          type="text"
          value={values.token || ''}
        />

        <Button
          size="large"
          type="primary"
          htmlType="button"
          disabled={isLoading || !isValid}
        >
          Сохранить
        </Button>
        {error && (
          <span className="text text_type_main-default error mt-4">
            Не удалось войти. Проверьте email и пароль.
          </span>
        )}
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
          <Link
            to={'/register'}
            className={`text text_type_main-default ${styles.link} ml-2`}
          >
            Войти
          </Link>
        </span>
      </div>
    </form>
  );
};
