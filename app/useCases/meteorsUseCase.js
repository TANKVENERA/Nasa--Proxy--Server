const repository = require('../repository/meteorsRepository')
const axios = require('axios');


const getMeteors = async () => {
    const fetchedMeteors = await repository.fetchMeteors();
    const nearEarthObjects = fetchedMeteors.data.near_earth_objects;

    let meteors = [];
    for (const date in nearEarthObjects) {
        const meteorsGroupedByDate = nearEarthObjects[date].map(meteor => {
                return {
                    id: meteor.id,
                    name: meteor.name,
                    isHazardous: meteor.is_potentially_hazardous_asteroid,
                    diameter: meteor.estimated_diameter.meters,
                    closestApproachDate: meteor.close_approach_data[0].close_approach_date_full,
                    velocityKmPerSecond: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
                }
            }
        );

        meteors = meteors.concat(meteorsGroupedByDate);
    }

    return meteors;
}

module.exports = {getMeteors}