"use client";
import Link from "next/link";

export default function GlassNav() {
  return (
    <div
      className="hidden md:flex ml-8"
      style={{
        alignContent: "center",
        alignItems: "center",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(254, 254, 254, 0.75)",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        borderRadius: "15px",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        boxShadow:
          "rgba(0, 0, 0, 0.18) 0px 0.602187px 1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.5px, rgba(0, 0, 0, 0.06) 0px 10px 3.75px",
        display: "flex",
        flexShrink: "0",
        gap: "30px",
        height: "min-content",
        justifyContent: "center",
        paddingBottom: "6px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "6px",
        position: "relative",
      }}
    >
      <div
        style={{
          alignContent: "center",
          alignItems: "center",
          borderRadius: "30px",
          display: "flex",
          flexShrink: "0",
          gap: "24px",
          height: "min-content",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: "0",
            justifyContent: "flex-start",
            position: "relative",
            textWrap: "nowrap",
            whiteSpace: "pre",
          }}
        >
          <h4
            style={{
              color: "rgb(254, 254, 254)",
              fontFamily:
                '"Rubik Medium", "Rubik Medium Placeholder", sans-serif',
              fontSize: "16px",
              lineHeight: "19.2px",
              textAlign: "center",
              textWrap: "nowrap",
              whiteSpace: "pre",
            }}
          >
            <Link
              href="/how-to-use"
              className="hover:text-primary-300 transition-colors duration-200"
              style={{
                cursor: "pointer",
                display: "inline",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                lineHeight: "19.2px",
                textAlign: "center",
                textWrap: "nowrap",
                whiteSpace: "pre",
                color: "rgb(64, 64, 64)",
                fontWeight: "500",
              }}
            >
              How to use
            </Link>
          </h4>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: "0",
            justifyContent: "flex-start",
            position: "relative",
            textWrap: "nowrap",
            whiteSpace: "pre",
          }}
        >
          <h4
            style={{
              color: "rgb(254, 254, 254)",
              fontFamily:
                '"Rubik Medium", "Rubik Medium Placeholder", sans-serif',
              fontSize: "16px",
              lineHeight: "19.2px",
              textAlign: "center",
              textWrap: "nowrap",
              whiteSpace: "pre",
            }}
          >
            <Link
              href="/locations"
              className="hover:text-primary-300 transition-colors duration-200"
              style={{
                cursor: "pointer",
                display: "inline",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                lineHeight: "19.2px",
                textAlign: "center",
                textWrap: "nowrap",
                whiteSpace: "pre",
                color: "rgb(64, 64, 64)",
                fontWeight: "500",
              }}
            >
              Locations
            </Link>
          </h4>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: "0",
            justifyContent: "flex-start",
            position: "relative",
            textWrap: "nowrap",
            whiteSpace: "pre",
          }}
        >
          <h4
            style={{
              color: "rgb(254, 254, 254)",
              fontFamily:
                '"Rubik Medium", "Rubik Medium Placeholder", sans-serif',
              fontSize: "16px",
              lineHeight: "19.2px",
              textAlign: "center",
              textWrap: "nowrap",
              whiteSpace: "pre",
            }}
          >
            <Link
              href="/pricing"
              className="hover:text-primary-300 transition-colors duration-200"
              style={{
                cursor: "pointer",
                display: "inline",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                lineHeight: "19.2px",
                textAlign: "center",
                textWrap: "nowrap",
                whiteSpace: "pre",
                color: "rgb(64, 64, 64)",
                fontWeight: "500",
              }}
            >
              Pricing
            </Link>
          </h4>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: "0",
            justifyContent: "flex-start",
            position: "relative",
            textWrap: "nowrap",
            whiteSpace: "pre",
          }}
        >
          <h4
            style={{
              color: "rgb(254, 254, 254)",
              fontFamily:
                '"Rubik Medium", "Rubik Medium Placeholder", sans-serif',
              fontSize: "16px",
              lineHeight: "19.2px",
              textAlign: "center",
              textWrap: "nowrap",
              whiteSpace: "pre",
            }}
          >
            <Link
              href="/about"
              className="hover:text-primary-300 transition-colors duration-200"
              style={{
                cursor: "pointer",
                display: "inline",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                lineHeight: "19.2px",
                textAlign: "center",
                textWrap: "nowrap",
                whiteSpace: "pre",
                color: "rgb(64, 64, 64)",
                fontWeight: "500",
              }}
            >
              About Us
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
