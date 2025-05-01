import { AnalyticsPostReqBody } from "@/app/api/analytics/route";
import { APIFormResponse, FormResponse } from "./customTypes";
import { timeoutPromise } from "./helpers";

const isDummyMode = process.env.NEXT_PUBLIC_DUMMY_MODE !== "0";

export async function useAnalyticsAPI(reqBody: AnalyticsPostReqBody) {
  const apiUrl = "/api/analytics";

  try {
    const res = await fetch(apiUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await res.json();
    if (res.ok) {
      return { isError: false, data };
    }
    throw data;
  } catch (error) {
    return { isError: true, error };
  }
}

export async function useRecAPI<T>(reqBody: {
  [k: string]: any;
}): Promise<{ isError: true; error: any } | { isError: false; data: T }> {
  const recommendUrl = process.env.NEXT_PUBLIC_RECOMMEND_API_URL;

  if (reqBody["formResponse"]) {
    reqBody["formResponse"] = convertFormResponseForAPI(
      reqBody["formResponse"]
    );
  }

  if (isDummyMode) {
    // Faux loading
    reqBody["isDummy"] = true;
    await timeoutPromise(3000);
  }

  try {
    const res = await fetch(recommendUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await res.json();
    if (res.ok) {
      return { isError: false, data };
    }
    throw data;
  } catch (error) {
    return { isError: true, error };
  }
}

function convertFormResponseForAPI(
  formResponse: FormResponse
): APIFormResponse {
  const toReturn: APIFormResponse = {
    who: formResponse.who,
    why: formResponse.why,
    whyExtra: formResponse.whyExtra,
    desc: formResponse.desc,
    budget: formResponse.budget,
    giftNotes: formResponse.giftNotes,
  };

  return toReturn;
}
