const mapMatches = (matches) => {
  const matchesObject = {};

  matches.forEach((match) => {
    if (matchesObject[match.competition.name]) {
      matchesObject[match.competition.name].push(match);
    } else {
      matchesObject[match.competition.name] = [match];
    }
  });

  return matchesObject;
};

export default mapMatches;
