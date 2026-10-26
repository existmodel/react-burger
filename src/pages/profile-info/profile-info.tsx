import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useUpdateUserMutation } from '@services/api/authApi';
import { useFormWithValidation } from '@services/hooks/use-form-with-validation';
import { selectUser } from '@services/slices/authSlice';

import styles from './profile-info.module.css';

export const ProfileInfo = (): React.JSX.Element | null => {
  const user = useSelector(selectUser);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const { values, handleChange, resetForm } = useFormWithValidation({
    email: user ? user.email : '',
    password: '',
    name: user ? user.name : '',
  });
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  if (!user) {
    return null;
  }
  const isNameChanged = values.name !== user.name;
  const isEmailChanged = values.email !== user.email;
  const isPasswordFilled = values.password !== '';
  const isChanged = isNameChanged || isEmailChanged || isPasswordFilled;
  const handleNameIconClick = (): void => {
    setIsNameDisabled(false);
    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    void updateUser({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  };

  const handleReset = (): void => {
    resetForm();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form}>
      <Input
        extraClass="mb-6"
        disabled={isNameDisabled}
        id="name"
        name="name"
        onChange={handleChange}
        placeholder="Имя"
        size="default"
        type="text"
        value={values.name || ''}
        errorText="Укажите корректное имя."
        icon="EditIcon"
        ref={nameRef}
        onIconClick={handleNameIconClick}
        onBlur={() => setIsNameDisabled(true)}
      />
      <EmailInput
        extraClass="mb-6"
        isIcon
        name="email"
        onChange={handleChange}
        errorText="Укажите корректный email."
        placeholder="Логин"
        value={values.email || ''}
      />
      <PasswordInput
        extraClass="mb-6"
        id="password"
        icon="EditIcon"
        name="password"
        onChange={handleChange}
        errorText="Укажите пароль посложнее."
        placeholder="Пароль"
        size="default"
        value={values.password || ''}
      />
      {error && (
        <span className="error text text_type_main-default mt-4">
          Не удалось сохранить изменения. Возможно, такой email уже занят.
        </span>
      )}
      {isChanged && (
        <div className={styles.buttons}>
          <Button size="large" type="primary" htmlType="submit" disabled={isLoading}>
            Сохранить
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="button"
            disabled={isLoading}
            onClick={handleReset}
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};
