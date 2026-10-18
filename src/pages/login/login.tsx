import {
  Input,
  Button,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useLoginMutation } from '@services/api/authApi';
import { useFormWithValidation } from '@services/hooks/use-form-with-validation';

import styles from './login.module.css';

export const Login = (): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [login, { isLoading, error }] = useLoginMutation();

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    void login({ email: values.email, password: values.password });
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={`${styles.login} pl-10 pr-10 `}>
      <div className={`${styles.header} mb-20`}>
        <h3 className="text text_type_main-medium mb-6">Вход</h3>
        <Input
          ref={inputRef}
          extraClass="mb-6"
          id="email"
          errorText="Укажите корректный email."
          name="email"
          onChange={handleChange}
          placeholder="E-mail"
          size="default"
          type="email"
          error={Boolean(values.email) && !errors.email}
          value={values.email || ''}
        />
        <PasswordInput
          extraClass="mb-6"
          id="password"
          errorText="Укажите пароль посложнее."
          icon="ShowIcon"
          name="password"
          onChange={handleChange}
          placeholder="Пароль"
          size="default"
          value={values.password || ''}
        />
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          disabled={isLoading || !isValid}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
        {error && (
          <span className="error text text_type_main-default mt-4">
            Не удалось войти. Проверьте email и пароль.
          </span>
        )}
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive mb-4">
          Вы - новый пользователь?
          <Link
            to={'/register'}
            className={`text text_type_main-default ${styles.link} ml-2`}
          >
            Зарегистрироваться
          </Link>
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link
            to={'/forgot-password'}
            className={`text text_type_main-default ${styles.link} ml-2`}
          >
            Восстановить пароль
          </Link>
        </span>
      </div>
    </form>
  );
};
