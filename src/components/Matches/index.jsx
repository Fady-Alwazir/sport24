import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SwiperSlide } from 'swiper/react';
import { axios, mapMatches, getDate } from '../../utils';
import Competition from '../Competition';
import CustomSwiper from '../CustomSwiper';
import Club from '../Club';
import styles from './matches.module.css';
import { Card, CardActionArea } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Matches() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState({});
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getMatches = async () => {
      const [
        {
          data: { data: matchesData },
        },
        {
          data: { data: teamsData },
        },
      ] = await Promise.all([
        axios.get(`/matches?date=${getDate(value)}`),
        axios.get(`/teams`),
      ]);

      setMatches(mapMatches(matchesData));
      setTeams(teamsData);
    };

    setMatches({});
    getMatches();
  }, [value]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <CustomSwiper swiperClassName={styles.slide}>
          {teams.map((team) => (
            <SwiperSlide key={team.id}>
              <Card className={styles.clubCard}>
                <CardActionArea>
                  <Club name={team.name} id={team.id} />
                </CardActionArea>
              </Card>
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="اليوم" {...a11yProps(0)} />
            <Tab label="غدا" {...a11yProps(1)} />
            <Tab label="أمس" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Competition matches={matches} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Competition matches={matches} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Competition matches={matches} />
        </TabPanel>
      </Box>
    </>
  );
}

export default Matches;
