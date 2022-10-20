import React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardActionArea } from '@mui/material';
import styles from './pairs.module.css';

function Pairs({ match, isCompetitionMatch = false }) {
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <div className={styles.cardHead}>
          <img
            src={`https://cdn.so3ody.com/scores/competitions/100x130/${match.competition.id}.png`}
          />
          <span>{match.competition.name}</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.flex}>
            <div className={styles.team}>
              <img
                src={`https://cdn.so3ody.com/scores/teams/50x50/${match.teamA.id}.png`}
              />
              <span>{match.teamA.name}</span>
            </div>
            {match.status === 'played' ? (
              <div className={styles.topCenter}>
                {isCompetitionMatch && (
                  <span className={styles.time}>
                    {match.timing.split(' ')[0]}
                  </span>
                )}
                <div className={styles.score}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {match.scoreA}
                  </Typography>
                  <span>:</span>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {match.scoreB}
                  </Typography>
                </div>
                {isCompetitionMatch ? (
                  <span className={styles.time}>
                    {match.timing.split(' ')[1].slice(0, 5)}
                  </span>
                ) : (
                  <span className={styles.time}>وقت كامل</span>
                )}
              </div>
            ) : match.status === 'playing' ? (
              <div className={styles.topCenter}>
                {isCompetitionMatch && (
                  <span className={styles.time}>
                    {match.timing.split(' ')[0]}
                  </span>
                )}
                <div className={styles.score}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {match.scoreA}
                  </Typography>
                  <span>:</span>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {match.scoreB}
                  </Typography>
                </div>
                <span className={styles.time}>
                  الشوط {match.active_half} دقيقة {match.minute}
                </span>
              </div>
            ) : (
              <div className={styles.timing}>
                {match.timing.split(' ')[1].slice(0, 5)}
              </div>
            )}
            <div className={styles.team}>
              <img
                src={`https://cdn.so3ody.com/scores/teams/50x50/${match.teamB.id}.png`}
              />
              <span>{match.teamB.name}</span>
            </div>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default Pairs;
