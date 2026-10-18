import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '@services/api/authApi';
import { useFormWithValidation } from '@services/hooks/use-form-with-validation';
import { RESET_PASSWORD_FLAG } from '@utils/constants';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
  });

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleRestore = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await forgotPassword({ email: values.email }).unwrap();

      localStorage.setItem(RESET_PASSWORD_FLAG, 'true');

      void navigate('/reset-password');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleRestore(event);
      }}
      className={`${styles.forgotPassword} pl-10 pr-10 `}
    >
      <div className={`${styles.header} mb-20`}>
        <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
        <Input
          ref={inputRef}
          extraClass="mb-6"
          id="email"
          errorText="Укажите корректный email."
          name="email"
          onChange={handleChange}
          placeholder="Укажите e-mail"
          size="default"
          type="email"
          value={values.email || ''}
          error={Boolean(values.email) && !errors.email}
        />

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          disabled={isLoading || !isValid}
        >
          Восстановить
        </Button>
        {error && (
          <span className="text text_type_main-default error mt-4">
            Не удалось отправить письмо. Проверьте email
          </span>
        )}
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
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
