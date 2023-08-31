import userApiKey from "@/app/hooks/useApiKey";
import { Configuration, OpenAIApi } from "openai";

//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

//acc2
//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
//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

const key = [
  "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",
  "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",
  "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",
  "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",
  "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",
];

const createChatCompletion = async (messages: any, index = 0) => {
  const openAIList = key.map((item) => {
    const configuration = new Configuration({
      apiKey: item,
    });
    const openai = new OpenAIApi(configuration);
    return openai;
  });

  const completion: any = await openAIList[index].createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  return completion?.data?.choices?.[0]?.message?.content as any;
};

const systemPrompt =
  "You are an extremely knowledgeable travel consultant, with an encyclopedic knowledge of global cinema from the last century. You make wise suggestions that will excite the person you're helping, expand their travel knowledge, and show them the hotels that suit them best.";

const systemPromptTest =
  "You are an experienced and knowledgeable travel advisor who provides guidance to people on choosing hotels and accommodations for their travels based on available information about hotels, rooms, and the preferences and requirements they provide and the priority of the criteria will be sequentially as follows destination, duration, interests, objectives, budget, and special requests. And the priori";

const recommendationPrompt = `This is the detail of the information: 0 is the id of that hotel, 1: the province/location of this hotel, 2: is the price of the hotel per day, 3: the room's number of this hotel, 4: is the bed's number hotel have, 
5: is the hotel type, 6: is the rental type, 7: is the convenient of the hotel, 8: is the number bathrooms of this hotel, 
9: is the number guest room of this hotel, 10: is the convenient about location/distance of this hotel.

Here's a list of hotels, with hotel's information:

{{ratings}}

Here's a user requirement and description:

{{userDescription}}

Based on user requirement and hotel list properties is provided in the hotel information, Scoring based on the above information and requirements, rate the suitability of that hotel for user requirements on a 100-point scale and explain why.
Remember, the hotel have more convenient or cheap price is needed a plus point when you score it.
Remember, if they give a 'location', all the recommend should have the same location with the requirement.

Responses that do not respond to this exact format will be rejected. Do not include any other information in your response. Secure the valid JSON and the array contains exactly 10 items.
Remember, you are a travel service consultant, so your recommendations should be interesting and broaden the person's hotel knowledge, but still should be based on that user's tastes .

Your answer should be formatted as a json array of suggestions with '_id is the id of that hotel, "reason" is the reason why you suggest this hotel to them. like this:
[
  {
    "_id": "64a6e138b23da45aa2319cc8",
    "reason":'Vì bạn thích biển và đi ít người, và thích khu vực gần trung tâm",
    "score":70
  },
  ...
]

The _id must be the same with the data I provided.
Okay, here's the JSON:
`;

const descriptionUser = `This is the detail of the information: "age": is the user age. "gender" is their gender.
 "searchHistory" is the most important information when them choose a place. "requirement" is every thing convenient about the condition of the place they want 
 or it is their favorite type place such as the place have sea or mountain or some place have the outdoor activity such as climb, swimming, or maybe is the weather is sunny, cool, cold, warm, windy,... .

Here's a the user information, their hobbies and requirement:

{{ratings}}

Based on the requirement description briefly describe the characteristics of this person what they want and what important to them when choosing a place.
Remember, location is the most important thing of them.
Be specific about users and their hobby, and avoid making general, cliched statements like this:

Based on the requirement description, this person is looking for a budget-friendly hotel in Vung Tau that is close to the city center and offers amenities like Wi-Fi and TV.
From their history, they seem to interested wit the place near the sea, beach. They prioritize being near the beach and enjoy spending time by the sea.

Responses that do not respond to this exact format will be rejected. Do not include any other information in your response.
Remember, you are a travel service consultant, so your recommendations should be suggest to make them easy to choice, but still should be based on that user's tastes. Your answer is no longer than 75 words.
Okay, here's the description:`;

function toNonAccentVietnamese(str: string) {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");

  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

const defaultData = [
  {
    age: [22, 24],
    gender: "male",
    searchHistory: ["Vung Tau", "Tay Ninh"],
    hobby: ["outdoor", "mountain", "climb"],
    requirement: ["TV", "wifi", "điều hòa", "ban công"],
  },

  {
    age: [22, 24],
    gender: "female",
    searchHistory: ["Da Lat", "Nha Trang"],
    hobby: ["beach", "relax", "spa"],
    requirement: ["wifi", "bể bơi", "đồ ăn sáng"],
  },
  {
    age: [25, 30],
    gender: "male",
    searchHistory: ["Hoi An", "Hanoi"],
    hobby: ["cultural", "food", "explore"],
    requirement: ["wifi", "điều hòa", "gym"],
  },
  {
    age: [25, 30],
    gender: "female",
    searchHistory: ["Phu Quoc", "Phan Thiet"],
    hobby: ["beach", "sunbathe", "watersports"],
    requirement: ["TV", "bể bơi", "spa"],
  },
  {
    age: [15, 18],
    gender: "male",
    searchHistory: ["Da Nang", "Phu Quoc", "outdoor"],
    hobby: ["beach", "watersports", "exploration"],
    requirement: ["wifi", "điều hòa", "gym", "trò chơi"],
  },
  {
    age: [15, 18],
    gender: "female",
    searchHistory: ["Ha Long", "Hanoi", "shopping"],
    hobby: ["sightseeing", "food", "photography"],
    requirement: ["wifi", "TV", "đồ ăn sáng"],
  },
  {
    age: [18, 20],
    gender: "male",
    searchHistory: ["Sapa", "Hoi An", "adventure"],
    hobby: ["trekking", "cultural", "nightlife"],
    requirement: ["wifi", "điều hòa", "bar", "ăn chay"],
  },
  {
    age: [18, 20],
    gender: "female",
    searchHistory: ["Nha Trang", "Da Lat", "family vacation"],
    hobby: ["relax", "spa", "golf"],
    requirement: ["wifi", "bể bơi", "đồ chơi trẻ em"],
  },
  {
    age: [20, 22],
    gender: "male",
    searchHistory: ["Sapa", "Hoi An", "adventure"],
    hobby: ["trekking", "cultural", "nightlife"],
    requirement: ["wifi", "điều hòa", "bar", "ăn chay"],
  },
  {
    age: [30, 35],
    gender: "male",
    searchHistory: ["Phan Thiet", "Moc Chau", "romantic getaway"],
    hobby: ["beach", "wine tasting", "quiet"],
    requirement: ["wifi", "điều hòa", "barbecue"],
  },
  {
    age: [20, 22],
    gender: "female",
    searchHistory: ["Nha Trang", "Da Lat", "family vacation"],
    hobby: ["relax", "spa", "golf"],
    requirement: ["wifi", "bể bơi", "đồ chơi trẻ em"],
  },
  {
    age: [30, 35],
    gender: "female",
    searchHistory: ["Hue", "Halong", "cruise"],
    hobby: ["cultural", "history", "sunset view"],
    requirement: ["wifi", "điều hòa", "buổi hướng dẫn"],
  },
  {
    age: [35, 40],
    gender: "male",
    searchHistory: ["Mui Ne", "Hanoi", "adventure travel"],
    hobby: ["outdoor", "hiking", "local cuisine"],
    requirement: ["wifi", "điều hòa", "buổi tham quan"],
  },
  {
    age: [35, 40],
    gender: "female",
    searchHistory: ["Phu Quoc", "Da Nang", "beach vacation"],
    hobby: ["sunbathe", "yoga", "sightseeing"],
    requirement: ["wifi", "điều hòa", "dịch vụ spa"],
  },
  {
    age: [45, 50],
    gender: "male",
    searchHistory: ["Ha Long", "Hanoi", "historical sites"],
    hobby: ["cultural", "photography", "cruise"],
    requirement: ["wifi", "điều hòa", "thuê xe ô tô"],
  },
  {
    age: [45, 50],
    gender: "female",
    searchHistory: ["Nha Trang", "Vung Tau", "luxury vacation"],
    hobby: ["beach", "shopping", "spa"],
    requirement: ["wifi", "điều hòa", "dịch vụ thư giãn"],
  },
  {
    age: [50, 100],
    gender: "male",
    searchHistory: ["Hue", "Da Lat", "cultural experience"],
    hobby: ["sightseeing", "traditional music", "relax"],
    requirement: ["wifi", "điều hòa", "chỗ ở thoải mái"],
  },
  {
    age: [50, 100],
    gender: "female",
    searchHistory: ["Hoi An", "Halong", "cruise"],
    hobby: ["cultural", "relax", "local cuisine"],
    requirement: ["wifi", "điều hòa", "dịch vụ y tế"],
  },
];

const getRecommendList = async ({
  responseData = [],
  userData,
  index = 0,
}: {
  responseData: any[];
  userData: any;
  index: number;
}) => {
  let recommendationCompletionData: any[] = [];

  try {
    const removeVietNamese = toNonAccentVietnamese(
      JSON.stringify(responseData)
    );

    const userInfoRemoveVietNamese = toNonAccentVietnamese(
      JSON.stringify(userData)
    );

    const userMessages = [
      { role: "user", content: systemPromptTest },
      {
        role: "user",
        content: descriptionUser.replace(
          "{{ratings}}",
          userInfoRemoveVietNamese
        ),
      },
    ];
    const userProfile = await createChatCompletion(userMessages, index);

    const waitingFn = async () => {
      const timer = await setTimeout(() => {
        //
      }, 4000);

      clearTimeout(timer);
    };
    const timer = await waitingFn;

    const messages = [
      { role: "system", content: systemPromptTest },
      { role: "user", content: userProfile },
      {
        role: "assistant",
        content: recommendationPrompt
          .replace("{{ratings}}", removeVietNamese)
          .replace("{{userDescription}}", userProfile),
      },
    ];

    const recommendationCompletion = await createChatCompletion(
      messages,
      index
    );

    const recommendations = JSON.parse(recommendationCompletion);

    recommendationCompletionData = recommendations;
  } catch (err: any) {
    console.log("err err 222", err);
    return false;
  }

  let resData: any[] = [];

  responseData.map((item) => {
    recommendationCompletionData?.filter((responseItem) => {
      if (responseItem?._id === item?.id) {
        const {
          area,
          pricesPerDate,
          rooms,
          beds,
          properties,
          accommodationType,
          convenient,
          bathrooms,
          guest,
          featured,
        } = item;

        const temp = {
          area,
          pricesPerDate,
          rooms,
          beds,
          properties,
          accommodationType,
          convenient,
          bathrooms,
          guest,
          featured,
          ...responseItem,
        };

        resData.push(temp);
      }
    });
  });

  return resData;
};

export {
  createChatCompletion,
  systemPromptTest,
  recommendationPrompt,
  systemPrompt,
  toNonAccentVietnamese,
  descriptionUser,
  defaultData,
  getRecommendList,
};
