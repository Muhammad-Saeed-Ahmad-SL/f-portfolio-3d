import { styles } from "../styles";

const SectionWrapper = (Component, idName, className = "") =>
  function HOC(props) {
    return (
      <section
        id={idName || undefined}
        className={`${styles.container} py-20 sm:py-32 relative scroll-mt-16 ${className}`}
      >
        <Component {...props} />
      </section>
    );
  };

export default SectionWrapper;
