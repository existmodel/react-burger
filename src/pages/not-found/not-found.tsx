import styles from './not-found.module.css';

export const NotFound = (): React.JSX.Element => {
  return (
    <div className={styles.notFound}>
      <p className="text text_type_digits-large mb-8">404</p>
      <p className="text text_type_main-medium mb-15">page not found</p>
    </div>
  );
};
