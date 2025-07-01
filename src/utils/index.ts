export function headCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function jwtPayloadExtract(jwt: string | undefined | null): {
  userId: string;
  name: string;
  email: string;
} {
  if (jwt == undefined || jwt == "undefined") {
    return {
      userId: "",
      name: "",
      email: "",
    };
  }

  const payloadBase64 = jwt.split(".")[1];

  // Convert URL-safe Base64 to standard Base64
  const standardBase64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if necessary
  const paddedBase64 =
    standardBase64 + "==".slice(0, (4 - (standardBase64.length % 4)) % 4);

  // Using TextDecoder
  const binaryString = atob(paddedBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const payload = new TextDecoder("utf-8").decode(bytes);

  const parsedPayload = JSON.parse(payload);

  return {
    userId: parsedPayload.userId || parsedPayload.sub || "",
    name:
      parsedPayload.name ||
      parsedPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ] ||
      "",
    email:
      parsedPayload.email ||
      parsedPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] ||
      "",
  };
}
