import styles from './club.module.css';

function Club({ name, id }) {
  return (
    <div className={styles.club}>
      <img
        src={`https://cdn.so3ody.com/scores/teams/50x50/${id}.png`}
        alt={name}
      />
      <h3>{name}</h3>
    </div>
  );
}

export default Club;
