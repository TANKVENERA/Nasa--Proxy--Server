const repository = require('../repository/meteorsRepository')
const axios = require('axios');


const getMeteors = async (isTotalAmountRequired, wereDangerousMeteorsRequired, dateFrom, dateTo) => {
    const fetchedMeteors = await repository.fetchMeteors(dateFrom, dateTo);
    const nearEarthObjects = fetchedMeteors.data.near_earth_objects;

    let wereDangerousMeteors = false;
    let result = {meteors: []};

    for (const date in nearEarthObjects) {
        const meteorsGroupedByDate = nearEarthObjects[date].map(meteor => {
            const isHazardous = meteor.is_potentially_hazardous_asteroid;
            if (isHazardous) {
                wereDangerousMeteors = true
            }
                return {
                    id: meteor.id,
                    name: meteor.name,
                    isHazardous: isHazardous,
                    diameter: meteor.estimated_diameter.meters,
                    closestApproachDate: meteor.close_approach_data[0].close_approach_date_full,
                    velocityKmPerSecond: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
                }
            }
        );

        result.meteors = result.meteors.concat(meteorsGroupedByDate);
    }

    if (isTotalAmountRequired === 'true') {
       result.totalCount = result.meteors.length;
    }
    if (wereDangerousMeteorsRequired === 'true') {
        result.wereDangerousMeteors = wereDangerousMeteors;
    }

    return result;
}

module.exports = {getMeteors}