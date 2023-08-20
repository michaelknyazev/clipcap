type UserAgent = "Chrome" | "Firefox" | "Safari" | "Other";

export const detectUserAgent = (userAgentString: string | null): UserAgent => {
  if (!userAgentString) {
    return "Other";
  }

  if (userAgentString.includes("Firefox")) {
    return "Firefox";
  } else if (userAgentString.includes("Chrome")) {
    // Chrome's UA string also contains "Safari", so check for Chrome first
    return "Chrome";
  } else if (userAgentString.includes("Safari")) {
    return "Safari";
  } else {
    return "Other";
  }
};