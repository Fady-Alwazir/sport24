import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import './style.css';

const CompetitonStats = () => {
  let CompetitionId = 6;
  const [competitionTable, setCompetitionTable] = useState([]);

  useEffect(() => {
    const getCompetitonCurrentSeason = async (competitionId) => {
      const {
        data: { data },
      } = await axios.get(`/competitions?id=${competitionId}`);
      console.log(data[0].seasons[0].id);
      return data[0].seasons[0].id;
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
    getCompetitonCurrentSeasonTable(CompetitionId);
  }, []);
  return (
    <div>
      <h1>Competition Stats</h1>
      {!competitionTable.length ? (
        <CircularProgress />
      ) : (
        <div>
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
    </div>
  );
};

export default CompetitonStats;
