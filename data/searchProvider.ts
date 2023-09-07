import userApiKey from "@/app/hooks/useApiKey";
import { Configuration, OpenAIApi } from "openai";

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
  "You are an extremely knowledgeable travel consultant, with an encyclopedic knowledge about Viet Nam. You make wise suggestions that will excite the person you're helping, expand their travel knowledge, and show them the hotels that suit them best.";

const systemPromptTest =
  "You are an experienced and knowledgeable travel advisor with strong knowledgeable travel about Viet Nam, who provides guidance to people on choosing the place and their travels destination based on available information is provided by themself";

const recommendationPrompt = `Here's requirement and information of them, who you need to give a advise and destination (a provice or city of Viet Nam):

{{userDescription}}

Based on user requirement and information, base on your knowledge to give them at least 7 destination in Viet Nam, which is suilt for them. The detination must be separate such as:
'ba ria - vung tau' should be 'ba ria', 'vung tau'. And the reason must less than 70 characters.
Remember, your answer should be formatted as a json array of suggestions with 'name' is the name of this destination (province or city), "reason" is the reason why you suggest this hotel to them. like this:
[
  {
    "name": "Vung Tau",
    "reason":'Vì bạn muốn đến nơi có gió, cát và biển. Bạn đang ở thành phố Hồ Chí Minh và không muốn đi xa nên Vũng Tàu là nơi lý tưởng.",
  },
  {
    "name": "Phan Thiết",
    "reason":'Cách thành phố Hồ Chí Minh không quá xa, có đầy đủ các yếu tố về thời tiết cũng như phong cảnh mong muốn.",
  },
  ...
]

Responses that do not respond to this exact format will be rejected. Do not include any other information in your response.
Remember, you are a travel service consultant, so your recommendations should be interesting and broaden the person's destination knowledge, but still should be based on that user's tastes.
Okay, here's the JSON:
`;

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

const getProvinceList = async ({ input = "" }: { input: string }) => {
  try {
    const removeVietNamese = toNonAccentVietnamese(JSON.stringify(input));

    const messages = [
      { role: "system", content: systemPromptTest },
      {
        role: "assistant",
        content: recommendationPrompt.replace(
          "{{userDescription}}",
          removeVietNamese
        ),
      },
    ];

    const recommendationCompletion = await createChatCompletion(messages);
    console.log("get result");

    const recommendations = JSON.parse(
      toNonAccentVietnamese(recommendationCompletion)
    );

    console.log("get format");

    return recommendations;
  } catch (err: any) {
    console.log("err err 222", err);

    return [];
  }
};

export { getProvinceList };
