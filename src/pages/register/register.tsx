import {
  Input,
  Button,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useRegisterMutation } from '@services/api/authApi';
import { useFormWithValidation } from '@services/hooks/use-form-with-validation';

import styles from './register.module.css';

export const Register = (): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [register, { isLoading, error }] = useRegisterMutation();

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    void register({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={`${styles.register} pl-10 pr-10 `}
    >
      <div className={`${styles.header} mb-20`}>
        <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
        <Input
          ref={inputRef}
          extraClass="mb-6"
          id="name"
          errorText="Укажите корректное имя."
          name="name"
          onChange={handleChange}
          placeholder="Имя"
          error={Boolean(values.name) && !errors.name}
          size="default"
          type="text"
          value={values.name || ''}
        />
        <Input
          extraClass="mb-6"
          id="email"
          errorText="Укажите корректный email."
          name="email"
          onChange={handleChange}
          placeholder="E-mail"
          error={Boolean(values.email) && !errors.email}
          size="default"
          type="email"
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
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
        {error && (
          <span className="error text text_type_main-default mt-4">
            Не удалось зарегистрироваться. Возможно, такой email уже занят.
          </span>
        )}
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?
          <Link
            to={'/login'}
            className={`text text_type_main-default ${styles.link} ml-2`}
          >
            Войти
          </Link>
        </span>
      </div>
    </form>
  );
};
