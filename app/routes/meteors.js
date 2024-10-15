const express = require('express');
const router = express.Router();
const axios = require('axios')
const path = require('path');

const baseUrl = process.env.NASA_API_URL
const apiPath = 'neo/rest/v1/feed';
const apiKey = process.env.API_NASA_TOKEN || 'DEMO_KEY'
const meteorsUrl = new URL(path.join(apiPath), baseUrl);

meteorsUrl.searchParams.append("api_key", apiKey);


/**
 * Get meteors

 * @returns meteors: list of meteors
 */
router.get('/meteors', async (req, res, next) => {
    try {
        const axiosResponse = await axios.get(meteorsUrl.toString());
        const meteors = axiosResponse.data.near_earth_objects;

        var result = [];
        for (const date in meteors) {
            const meteorsGroupedByDate = meteors[date].map(meteor => {
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

            result = result.concat(meteorsGroupedByDate);
        }

        res.json(result);
    }
    catch (err) {
        next(err)
    }
});

module.exports = router;