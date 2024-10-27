import { fetchMeteors } from "../repository/meteorsRepository.js";
import { parseDates } from "../util/util.js";

interface IMeteorData {
  id: number;
  name: string;
  isHazardous: boolean;
  diameter: number;
  closestApproachDate: string;
  velocityKmPerSecond: string;
}

interface IResponse {
  meteors: IMeteorData[];
  totalCount?: number;
  wereDangerousMeteors?: boolean;
  parsedDateFrom: string;
  parsedDateTo: string;
}

const getMeteors = async (
  isTotalAmountRequired?: boolean,
  wereDangerousMeteorsRequired?: boolean,
  dateFrom?: string,
  dateTo?: string,
) => {
  const { parsedDateFrom, parsedDateTo } = parseDates(dateFrom, dateTo);
  const fetchedMeteors = await fetchMeteors(parsedDateFrom, parsedDateTo);
  const nearEarthObjects = fetchedMeteors.data.near_earth_objects as Record<
    string,
    object
  >;

  let wereDangerousMeteors = false;
  const meteorsData = {
    meteors: [],
    parsedDateFrom: parsedDateFrom,
    parsedDateTo: parsedDateTo,
  } as IResponse;

  for (const date in nearEarthObjects) {
    const meteorsGroupedByDate = nearEarthObjects[date] as object[];
    const mappedData: IMeteorData[] = meteorsGroupedByDate.map(
      (meteor: any): IMeteorData => {
        const isHazardous = meteor.is_potentially_hazardous_asteroid as boolean;
        if (isHazardous) {
          wereDangerousMeteors = true;
        }
        return {
          id: meteor.id as number,
          name: meteor.name as string,
          isHazardous: isHazardous,
          diameter: meteor.estimated_diameter.meters as number,
          closestApproachDate: meteor.close_approach_data[0]
            .close_approach_date_full as string,
          velocityKmPerSecond: meteor.close_approach_data[0].relative_velocity
            .kilometers_per_second as string,
        };
      },
    );

    meteorsData.meteors = meteorsData.meteors.concat(mappedData);
  }

  if (isTotalAmountRequired) {
    meteorsData.totalCount = meteorsData.meteors.length;
  }
  if (wereDangerousMeteorsRequired) {
    meteorsData.wereDangerousMeteors = wereDangerousMeteors;
  }

  return meteorsData;
};

export { getMeteors };
