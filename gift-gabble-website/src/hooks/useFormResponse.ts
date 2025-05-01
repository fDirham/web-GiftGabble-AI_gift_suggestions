import { UNKNOWN_VALUE } from "@/components/SearchForm/options";
import { FormResponse } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";
import { SetStateAction, useCallback } from "react";
import useIdeaList from "./useIdeaList";
import useImageMap from "./useImageMap";

function resolveWho(whoOne: string, whoTwo: string) {
  if (!whoTwo || whoTwo == UNKNOWN_VALUE) return whoOne;
  return whoTwo;
}

export default function useFormResponse() {
  const { resetIdeaList } = useIdeaList();
  const { resetImageMap } = useImageMap();

  const initialValues: FormResponse = {
    who: UNKNOWN_VALUE,
    whoOne: UNKNOWN_VALUE,
    whoTwo: UNKNOWN_VALUE,
    why: UNKNOWN_VALUE,
    whyExtra: "",
    desc: "",
    giftNotes: "",
    budget: 0,
  };

  const [
    formResponse,
    _setFormResponse,
    isFormResponseLoaded,
    clearFormResponse,
  ] = useSessionStorage("formResponse", initialValues);

  const setFormResponse = useCallback(
    (newVal: SetStateAction<FormResponse>) => {
      resetIdeaList();
      resetImageMap();
      _setFormResponse(newVal);
    },
    [_setFormResponse, resetIdeaList, resetImageMap]
  );

  const modifyFormResponse = useCallback(
    (newFormResponse: Partial<FormResponse>) => {
      const changeTo: FormResponse = { ...formResponse, ...newFormResponse };
      changeTo.who = resolveWho(changeTo.whoOne, changeTo.whoTwo);
      setFormResponse(changeTo);
    },
    [setFormResponse, formResponse]
  );

  return {
    formResponse,
    setFormResponse,
    modifyFormResponse,
    isFormResponseLoaded,
    clearFormResponse,
    isFormResponseEmpty:
      formResponse.who === initialValues.who &&
      formResponse.desc == initialValues.desc,
  };
}
