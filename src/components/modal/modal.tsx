import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from './../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const modalRoot = document.getElementById('modals');

export const Modal = ({ title, onClose, children }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!modalRoot) return <></>;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} pl-10 pr-10 `}>
        <header className={styles.modalHeader}>
          {title && <h2 className="text text_type_main-large mt-10">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            className={`${styles.closeButton} mt-15`}
          >
            <CloseIcon type="primary" />
          </button>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
