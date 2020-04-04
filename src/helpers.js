const { GET_TOTAL, GET_TOTAL_BY_COUNTRY } = require("./commands");
const { getTotalCases, getTotalCasesByCountry } = require("./api/statistics");

const executeCommand = async (command, params) => {
  switch (command) {
    case GET_TOTAL:
      return prettifyTotalResult(await getTotalCases());
    case GET_TOTAL_BY_COUNTRY:
      return prettifyCountryResult(await getTotalCasesByCountry(params[0]));
    default:
      return null;
  }
};

const prettifyCountryResult = (data) => {
  const isDataEmpty =
    !data.latest_stat_by_country || !data.latest_stat_by_country.length;

  if (isDataEmpty) {
    return null;
  }

  const statByCountry = data.latest_stat_by_country[0];
  const fields = [
    "total_cases",
    "total_deaths",
    "total_recovered",
    "active_cases",
    "serious_critical",
    "new_cases",
    "new_deaths",
  ];

  return fields
    .map((field) =>
      statByCountry[field]
        ? `<i>${field.replace("_", " ")}</i>: <b>${statByCountry[field]}</b>`
        : ""
    )
    .join("\n");
};

const prettifyTotalResult = (data) => {
  const fields = [
    "total_cases",
    "total_deaths",
    "total_recovered",
    "new_cases",
    "new_deaths",
  ];

  return fields
    .map((field) => `<i>${field.replace("_", " ")}</i>: <b>${data[field]}</b>`)
    .join("\n");
};

module.exports = {
  executeCommand,
};
