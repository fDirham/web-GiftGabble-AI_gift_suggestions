import { FormResponse } from "@/utilities/customTypes";
import { convertCamelCaseObjToSnakeCase } from "@/utilities/helpers";
import { createSupabaseClient } from "@/utilities/supabaseClient";

export type FormResponsesReqBody = {
  actionType: "fr";
  sessionId: string;
  formResponse: FormResponse;
};

export type IdeaGenReqBody = {
  actionType: "ig";
  sessionId: string;
  ideaList: string[];
};

export type IdeaChosenReqBody = {
  actionType: "ic";
  sessionId: string;
  idea: string;
  ideaIdx: number;
};

export type ProductChosenReqBody = {
  actionType: "pc";
  sessionId: string;
  url: string;
  title: string;
  price?: number;
  rating?: number;
  reviewsCount?: number;
  currencySymbol?: string;
};

export type SearchClicksReqBody = {
  actionType: "sc";
  sessionId: string;
};

export type AnalyticsPostReqBody =
  | FormResponsesReqBody
  | IdeaGenReqBody
  | IdeaChosenReqBody
  | ProductChosenReqBody
  | SearchClicksReqBody;

export async function POST(request: Request) {
  const reqBody: AnalyticsPostReqBody = await request.json();

  const supabaseClient = createSupabaseClient();
  let res = null;
  if (reqBody.actionType == "fr") {
    res = await supabaseClient.from("gg_form_responses").insert({
      session_id: reqBody.sessionId,
      ...convertCamelCaseObjToSnakeCase(reqBody.formResponse),
    });
  } else if (reqBody.actionType == "ig") {
    res = await supabaseClient.from("gg_idea_gen").insert({
      session_id: reqBody.sessionId,
      idea_list: JSON.stringify(reqBody.ideaList),
    });
  } else if (reqBody.actionType == "ic") {
    res = await supabaseClient.from("gg_idea_chosen").insert({
      session_id: reqBody.sessionId,
      idea: reqBody.idea,
      idea_idx: reqBody.ideaIdx,
    });
  } else if (reqBody.actionType == "pc") {
    const toAdd: Partial<ProductChosenReqBody> = reqBody;
    delete toAdd.actionType;

    res = await supabaseClient.from("gg_product_chosen").insert({
      ...convertCamelCaseObjToSnakeCase(toAdd),
    });

    if (res.error) console.log(res.error);
  } else if (reqBody.actionType == "sc") {
    res = await supabaseClient.from("gg_search_clicks").insert({
      session_id: reqBody.sessionId,
    });
  }

  if (!res) {
    return Response.json("Invalid inputs", { status: 400 });
  }

  if (res.error) {
    console.error(res.error);
    return Response.json("Something went wrong", { status: 500 });
  }

  return Response.json("done");
}
