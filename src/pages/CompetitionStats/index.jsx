import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import moment from 'moment';

import './style.css';
import { Match } from '../../components';

const CompetitonStats = () => {
  const [currentSeasonDetails, setCurrentSeasonDetails] = useState({});
  let CompetitionId = 3;
  const [competitionTable, setCompetitionTable] = useState([]);
  const [currentWeekMatches, setCurrentWeekMatches] = useState([]);

  useEffect(() => {
    const getCompetitonCurrentSeason = async (competitionId) => {
      const {
        data: { data },
      } = await axios.get(`/competitions?id=${competitionId}`);
      const startDate = data[0].currentSeason.start_date;
      const endDate = data[0].currentSeason.end_date;
      console.log(data[0]);
      const currentProgressPercentage =
        (moment().diff(startDate, 'days') /
          moment(endDate).diff(startDate, 'days')) *
        100;
      setCurrentSeasonDetails({
        id: data[0].currentSeason.id,
        name: data[0].currentSeason.name,
        startDate: data[0].currentSeason.start_date,
        endDate: data[0].currentSeason.end_date,
        currentProgressPercentage,
        format: data[0].format,
      });

      return data[0].currentSeason.id;
    };

    const getCompetitonCurrentSeasonTable = async (competitionId) => {
      const seasonId = await getCompetitonCurrentSeason(competitionId);
      const {
        data: {
          data: { table },
        },
      } = await axios.get(`/competitions/table?season_id=${seasonId}`);
      const tableData = table.map((team) => {
        return {
          id: team.id,
          position: team.position,
          name: team.name,
          totalMatches: team.totalMatches,
          totalWonMatches: team.totalWonMatches,
          totalLossMatches: team.totalLossMatches,
          totalDrawMatches: team.totalDrawMatches,
          score: team.score,
          receive: team.receive,
          points: team.points,
        };
      });

      setCompetitionTable(tableData);
    };
    const getCompetitonCurrentWeekMatches = async (competitionId) => {
      const seasonId = await getCompetitonCurrentSeason(competitionId);
      const {
        data: { data },
      } = await axios.get(`/competitions/season/details?season_id=${seasonId}`);
      console.log(data);
      setCurrentWeekMatches(data.CurrentWeekMatches);
    };
    getCompetitonCurrentSeasonTable(CompetitionId);
    getCompetitonCurrentWeekMatches(CompetitionId);
  }, []);
  return (
    <div class="comeptiton-page-container">
      {currentSeasonDetails.endDate ? (
        <div class="competition-title-container">
          <div class="competition-img">
            <h3 class="comeptition-name">{currentSeasonDetails.name}</h3>
            <img
              src={`https://cdn.so3ody.com/scores/competitions/100x130/${CompetitionId}.png`}
              alt="competition-img"
            ></img>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                style={{
                  width: `${
                    (currentSeasonDetails.currentProgressPercentage * 30) / 100
                  }rem`,
                }}
              ></div>
            </div>
            <div class="competetion-start-end-dates">
              <p>{currentSeasonDetails.startDate}</p>
              <p>{currentSeasonDetails.endDate}</p>
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
      <h2>مبارايات الأسبوع الحالي</h2>

      <div class="current-week-matches-container">
        {currentWeekMatches.length > 0 ? (
          currentWeekMatches.map((match) => {
            return <Match match={match} isCompetitionMatch />;
          })
        ) : (
          <CircularProgress />
        )}
      </div>
      {currentSeasonDetails.format === 'domestic_league' ? (
        <section>
          <h2>ترتيب الفرق</h2>

          {!competitionTable.length ? (
            <CircularProgress />
          ) : (
            <div class="competition-table-container">
              <table className="competition-table">
                <tr>
                  <th>#</th>
                  <th
                    style={{
                      textAlign: 'right',
                      color: '#DF6276',
                      width: '20rem',
                    }}
                  >
                    الفريق
                  </th>
                  <th>لعب</th>
                  <th>فاز</th>
                  <th>خسر</th>
                  <th>تعادل</th>
                  <th>له</th>
                  <th>عليه</th>
                  <th
                    style={{
                      textAlign: 'right',
                      color: '#DF6276',
                    }}
                  >
                    نقاط
                  </th>
                </tr>

                {competitionTable.map((team) => (
                  <tr class="competition-table-row" key={team.id}>
                    <td
                      style={{
                        padding: '0.1px',
                      }}
                    >
                      {team.position}
                    </td>
                    <td
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <img
                        src={`https://cdn.so3ody.com/scores/teams/50x50/${team.id}.png`}
                        alt="صورة الفريق"
                      />
                      <p>{team.name}</p>
                    </td>
                    <td>{team.totalMatches}</td>
                    <td>{team.totalWonMatches}</td>
                    <td>{team.totalLossMatches}</td>
                    <td>{team.totalDrawMatches}</td>
                    <td>{team.score}</td>
                    <td>{team.receive}</td>
                    <td
                      style={{
                        textAlign: 'right',
                        color: '#DF6276',
                      }}
                    >
                      {team.points}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </section>
      ) : (
        ''
      )}
    </div>
  );
};

export default CompetitonStats;
