"use client";

import styles from "./SearchForm.module.scss";
import { UNKNOWN_VALUE, whoOptions, whoTwoMap, whyOptions } from "./options";
import useFormResponse from "@/hooks/useFormResponse";
import { Amaranth } from "next/font/google";
import { FormResponse } from "@/utilities/customTypes";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export type SearchFormProps = {
  onGo: (formResponse: FormResponse) => void;
};

export default function SearchForm(props: SearchFormProps) {
  const { formResponse, modifyFormResponse, isFormResponseLoaded } =
    useFormResponse();

  function handleGo() {
    props.onGo(formResponse);
  }

  // Render
  const renderOptions = (
    optionsList: (string | string[])[],
    keyName: string
  ) => {
    return optionsList.map((option, i) => {
      let value = option;
      let display = option;
      if (Array.isArray(option)) {
        value = option[0];
        display = option[1];
      }

      return (
        <option value={value} key={`${i}-${keyName}`}>
          {display}
        </option>
      );
    });
  };

  const renderInputTree = () => {
    if (!isFormResponseLoaded) return null;
    const toRender = [];

    // Who
    toRender.push(
      <label htmlFor="whoOne" key="whoOneLabel">
        I'm getting a gift for my...
      </label>
    );

    toRender.push(
      <select
        name="whoOne"
        id="whoOne"
        key="whoOne"
        value={formResponse.whoOne}
        onChange={(e) => {
          modifyFormResponse({
            whoOne: e.target.value,
            whoTwo: UNKNOWN_VALUE,
            desc: "",
          });
        }}
      >
        {renderOptions(whoOptions, "whoOne")}
      </select>
    );

    if (formResponse.whoOne == UNKNOWN_VALUE) return toRender;
    const whoTwoObj = whoTwoMap[formResponse.whoOne];

    if (whoTwoObj) {
      toRender.push(
        <label htmlFor="whoTwo" key="whoTwoLabel">
          {whoTwoObj.formLabelText}
        </label>
      );

      toRender.push(
        <select
          name="whoTwo"
          id="whoTwo"
          key="whoTwo"
          value={formResponse.whoTwo}
          onChange={(e) => modifyFormResponse({ whoTwo: e.target.value })}
        >
          {renderOptions(whoTwoObj.optionsList, "whoTwo")}
        </select>
      );

      if (formResponse.whoTwo == UNKNOWN_VALUE) return toRender;
    }

    // Why
    toRender.push(
      <label htmlFor="whySelect" key="whySelectLabel">
        Why?
      </label>
    );

    toRender.push(
      <select
        name="whySelect"
        id="whySelect"
        key="whySelect"
        value={formResponse.why}
        onChange={(e) =>
          modifyFormResponse({ why: e.target.value, whyExtra: "" })
        }
      >
        {renderOptions(whyOptions, "why")}
      </select>
    );

    if (formResponse.why == UNKNOWN_VALUE) return toRender;

    // Special why cases
    if (formResponse.why == "other") {
      toRender.push(
        <label htmlFor="otherWhyInput" key="otherWhyInputLabel">
          Why are you buying a gift for your{" "}
          <span className={[amaranth.className, styles.whoSpan].join(" ")}>
            {formResponse.who}
          </span>
          {"?"}
        </label>
      );

      toRender.push(
        <textarea
          name="otherWhyInput"
          id="otherWhyInput"
          key={"otherWhyInput"}
          className={styles.otherWhyInput}
          value={formResponse.whyExtra}
          onChange={(e) => modifyFormResponse({ whyExtra: e.target.value })}
          placeholder="e.g Because I appreciate them..."
          maxLength={100}
        ></textarea>
      );

      if (!formResponse.whyExtra) return toRender;
    }

    // Description
    toRender.push(
      <label htmlFor="descInput" key="descInputLabel">
        Describe your{" "}
        <span className={[amaranth.className, styles.whoSpan].join(" ")}>
          {formResponse.who}
        </span>{" "}
        <br />{" "}
        <span style={{ fontWeight: 400 }}>
          (The better the description, the better our recommendations will be)
        </span>
      </label>
    );

    toRender.push(
      <textarea
        name="descInput"
        id="descInput"
        key={"descInput"}
        className={styles.descInput}
        value={formResponse.desc}
        onChange={(e) => modifyFormResponse({ desc: e.target.value })}
        placeholder="Hobbies? Favorite tv shows / media? Personality?"
        maxLength={200}
      ></textarea>
    );

    if (!formResponse.desc) return toRender;

    // gift notes
    toRender.push(
      <label htmlFor="giftNotesInput" key="giftNotesInputLabel">
        OPTIONAL: Any notes about the gift?
      </label>
    );

    toRender.push(
      <textarea
        name="giftNotesInput"
        id="giftNotesInput"
        key={"giftNotesInput"}
        className={styles.giftNotesInput}
        value={formResponse.giftNotes}
        onChange={(e) => modifyFormResponse({ giftNotes: e.target.value })}
        placeholder="e.g It needs to be lightweight"
        maxLength={200}
      ></textarea>
    );

    // Budget
    // toRender.push(
    //   <label htmlFor="budgetInput" key="budgetInputLabel">
    //     OPTIONAL: Do you have a budget? <br />
    //     ($0 for no)
    //   </label>
    // );

    // toRender.push(
    //   <span
    //     className={[styles.input, styles.budgetSpan].join(" ")}
    //     key={"budgetInput"}
    //   >
    //     {"$ "}
    //     <input
    //       name="budgetInput"
    //       id="budgetInput"
    //       className={styles.budgetInput}
    //       value={formResponse.budget}
    //       onChange={(e) =>
    //         modifyFormResponse({ budget: parseInt(e.target.value) })
    //       }
    //       type="number"
    //       min={0}
    //       max={500}
    //       placeholder="0"
    //     ></input>
    //   </span>
    // );

    toRender.push(
      <button onClick={handleGo} key={"goButton"}>
        Find a gift!
      </button>
    );

    return toRender;
  };

  return <div className={styles.container}>{renderInputTree()}</div>;
}
