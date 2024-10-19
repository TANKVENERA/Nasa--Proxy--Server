const repository = require("../repository/meteorsRepository");
const util = require("../util/util");

const getMeteors = async (
  isTotalAmountRequired,
  wereDangerousMeteorsRequired,
  dateFrom,
  dateTo,
) => {
  const parseDates = util.parseDates(dateFrom, dateTo);
  const fetchedMeteors = await repository.fetchMeteors(
    parseDates.dateFrom,
    parseDates.dateTo,
  );
  const nearEarthObjects = fetchedMeteors.data.near_earth_objects;

  let wereDangerousMeteors = false;
  let meteorsData = { meteors: [] };

  for (const date in nearEarthObjects) {
    const meteorsGroupedByDate = nearEarthObjects[date].map((meteor) => {
      const isHazardous = meteor.is_potentially_hazardous_asteroid;
      if (isHazardous) {
        wereDangerousMeteors = true;
      }
      return {
        id: meteor.id,
        name: meteor.name,
        isHazardous: isHazardous,
        diameter: meteor.estimated_diameter.meters,
        closestApproachDate:
          meteor.close_approach_data[0].close_approach_date_full,
        velocityKmPerSecond:
          meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
      };
    });

    meteorsData.meteors = meteorsData.meteors.concat(meteorsGroupedByDate);
  }

  if (isTotalAmountRequired) {
    meteorsData.totalCount = meteorsData.meteors.length;
  }
  if (wereDangerousMeteorsRequired) {
    meteorsData.wereDangerousMeteors = wereDangerousMeteors;
  }

  return meteorsData;
};

module.exports = { getMeteors };
