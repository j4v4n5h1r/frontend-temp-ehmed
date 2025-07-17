"use client";
import { useState } from "react";

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { value: "default", label: "English" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
    { value: "italian", label: "Italian" },
    { value: "turkish", label: "Turkish" },
  ];

  return (
    <div
      style={{
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        flexShrink: "0",
        gap: "10px",
        height: "min-content",
        justifyContent: "center",
        position: "relative",
        width: "auto",
      }}
    >
      <div
        style={{
          flexShrink: "0",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <label
            htmlFor="language-select"
            style={{
              clip: "rect(0px, 0px, 0px, 0px)",
              clipPath: "inset(50%)",
              cursor: "default",
              height: "1px",
              marginBottom: "-1px",
              marginLeft: "-1px",
              marginRight: "-1px",
              marginTop: "-1px",
              overflowX: "hidden",
              overflowY: "hidden",
              position: "absolute",
              textWrap: "nowrap",
              whiteSpace: "nowrap",
              width: "1px",
            }}
          >
            Select Language
          </label>
          <select
            id="language-select"
            autoComplete="off"
            value={selectedLanguage}
            onChange={(e) =>
              setSelectedLanguage(e.target.options[e.target.selectedIndex].text)
            }
            style={{
              alignItems: "center",
              backgroundColor: "rgb(239, 239, 239)",
              borderBottom: "1px solid rgb(118, 118, 118)",
              borderLeft: "1px solid rgb(118, 118, 118)",
              borderRight: "1px solid rgb(118, 118, 118)",
              borderTop: "1px solid rgb(118, 118, 118)",
              bottom: "0px",
              left: "0px",
              opacity: "0",
              outline: "rgb(16, 16, 16) auto 1px",
              position: "absolute",
              right: "0px",
              textWrap: "nowrap",
              top: "0px",
              whiteSpace: "pre",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {languages.map((lang) => (
              <option
                key={lang.value}
                value={lang.value}
                style={{
                  alignItems: "center",
                  gap: "6px",
                  minHeight: "24px",
                  paddingBottom: "1px",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                  textWrap: "nowrap",
                  whiteSpace: "nowrap",
                }}
              >
                {lang.label}
              </option>
            ))}
          </select>
          <div
            style={{
              alignItems: "center",
              backgroundColor: "rgb(118, 184, 44)",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderColor: "rgb(254, 254, 254)",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              color: "rgb(254, 254, 254)",
              display: "flex",
              fontFamily: 'Rubik, "Rubik Placeholder", sans-serif',
              fontSize: "14px",
              gap: "5px",
              height: "100%",
              justifyContent: "center",
              lineHeight: "21px",
              overflowX: "hidden",
              overflowY: "hidden",
              paddingBottom: "8px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              pointerEvents: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                alignItems: "center",
                borderColor: "rgb(254, 254, 254)",
                color: "rgb(254, 254, 254)",
                display: "flex",
                fontFamily: 'Rubik, "Rubik Placeholder", sans-serif',
                fontSize: "14px",
                lineHeight: "21px",
                pointerEvents: "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width="26"
                height="26"
                fill="rgb(254, 254, 254)"
                style={{
                  borderColor: "rgb(254, 254, 254)",
                  color: "rgb(254, 254, 254)",
                  fill: "rgb(254, 254, 254)",
                  fontFamily: 'Rubik, "Rubik Placeholder", sans-serif',
                  fontSize: "14px",
                  height: "26px",
                  lineHeight: "21px",
                  overflowX: "hidden",
                  overflowY: "hidden",
                  pointerEvents: "none",
                  width: "26px",
                }}
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM128,215.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89ZM96.23,120c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z" />
              </svg>
            </div>
            <div
              style={{
                alignItems: "center",
                borderColor: "rgb(254, 254, 254)",
                color: "rgb(254, 254, 254)",
                display: "flex",
                fontFamily: 'Rubik, "Rubik Placeholder", sans-serif',
                fontSize: "14px",
                lineHeight: "21px",
                pointerEvents: "none",
              }}
            >
              <span style={{ marginRight: "5px", fontWeight: "500" }}>
                {selectedLanguage}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                width="20"
                height="20"
                style={{
                  borderColor: "rgb(254, 254, 254)",
                  color: "rgb(254, 254, 254)",
                  fontFamily: 'Rubik, "Rubik Placeholder", sans-serif',
                  fontSize: "14px",
                  height: "20px",
                  lineHeight: "21px",
                  overflowX: "hidden",
                  overflowY: "hidden",
                  pointerEvents: "none",
                  width: "20px",
                }}
              >
                <path
                  d="M 2 4.5 L 6 8.5 L 10 4.5"
                  fill="none"
                  stroke="rgb(254, 254, 254)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
