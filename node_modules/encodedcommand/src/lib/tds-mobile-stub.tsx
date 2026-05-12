// @toss/tds-mobile 웹 환경용 stub
// 토스앱 외부(일반 브라우저, Vercel)에서 동작하도록 대체 구현

import React from "react";

// Button 컴포넌트
export function Button({
  children,
  onClick,
  disabled,
  className,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        background: disabled ? "#ccc" : "#3182F6",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        padding: "16px",
        fontSize: "17px",
        fontWeight: 700,
        width: "100%",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

// Top 컴포넌트
function TitleParagraph({
  children,
  size = 20,
}: {
  children?: React.ReactNode;
  size?: number;
}) {
  return (
    <p
      style={{
        fontSize: size,
        fontWeight: 700,
        whiteSpace: "pre-line",
        margin: 0,
        color: "#191F28",
      }}
    >
      {children}
    </p>
  );
}

export function Top({
  title,
  upperGap = 0,
  lowerGap = 0,
}: {
  title?: React.ReactNode;
  upperGap?: number;
  lowerGap?: number;
}) {
  return (
    <div style={{ paddingTop: upperGap, paddingBottom: lowerGap }}>
      {title}
    </div>
  );
}

Top.TitleParagraph = TitleParagraph;

// TDSMobileAITProvider stub
export function TDSMobileAITProvider({
  children,
}: {
  children?: React.ReactNode;
  brandPrimaryColor?: string;
}) {
  return <>{children}</>;
}
