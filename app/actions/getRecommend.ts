"use server";

import { defaultData, getRecommendList } from "@/data/recommendProvider";
import userApiKey from "../hooks/useApiKey";

export default async function getRecommend({
  accommodation = [],
  queryData = {},
  onSuccess,
}: {
  accommodation: any[];
  queryData?: any;
  onSuccess?: (data: any[]) => void;
}) {
  try {
    let userData: any = {
      age: 23,
      searchHistory: ["bien", "outdoor", "mountain"],
      requirement: [
        "thích leo núi",
        "Thích đi ngắm mây trời",
        "Thích yên tĩnh",
        "Thích thiên nhiên",
      ],
    };

    if (!queryData?.isNotUseDefault) {
      const age = queryData?.age || 0;
      const gender = queryData?.gender || "female";

      age !== 0 &&
        defaultData.map((item, idx) => {
          if (item?.age?.[0] <= age && item?.age?.[1] >= age) {
            if (gender === item?.gender) {
              const { gender, hobby, requirement, searchHistory } = item;
              userData = {
                ...(age ? { age } : { age: userData.age }),
                gender,
                hobby,
                requirement,
                searchHistory,
              };
            }
          }
        });
    } else {
      userData = queryData;
    }

    let data: any[] = [];
    let apiKeyIndex = 0;
    let tryTime = 0;

    for (let i = 0; i < accommodation.length / 10; i++) {
      if (tryTime === 1) {
        break;
      }

      const temp = await getRecommendList({
        responseData: accommodation.slice(i * 10, i * 10 + 10),
        userData,
        index: apiKeyIndex,
      });

      if (temp === false) {
        apiKeyIndex = (apiKeyIndex + 1) % 4;
        i--;
        tryTime++;
        continue;
      }

      if (temp?.length) {
        tryTime = 0;
        data = [...data, ...temp];
      }
    }

    data.sort((a, b) => b.score - a.score);

    data?.length && onSuccess?.(data);

    data.map((item) => {
      return { id: item?.id };
    });

    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
