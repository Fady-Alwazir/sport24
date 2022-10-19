import React from 'react';
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Pairs from '../Pairs';
import styles from './competition.module.css';

function Competition({ matches }) {
  const matchesToRender = Object.entries(matches).map(([name, nameMatches]) => {
    return { name, matches: nameMatches };
  });
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (idx) => (event, isExpanded) => {
    setExpanded(isExpanded ? matchesToRender[idx].name : false);
  };

  return (
    <>
      {Object.keys(matches).length ? (
        matchesToRender.map(({ name, matches }, idx) => {
          return (
            <Accordion
              key={name}
              expanded={expanded === name}
              onChange={handleChange(idx)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`panel-${name}-header`}
              >
                <Typography
                  component="div"
                  sx={{
                    width: '33%',
                    flexShrink: 0,
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                >
                  {name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div">
                  <div className={styles.pairsContainer}>
                    {matches.map((match) => {
                      return <Pairs key={match.id} match={match} />;
                    })}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <CircularProgress className={styles.progressBar} />
      )}
    </>
  );
}

export default Competition;
