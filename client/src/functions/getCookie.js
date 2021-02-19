function getCookieDataFromString(cookie) {
  let cookies = cookie.split(";");
  let userIdPair = cookies[0].split("=");
  let tokenPair = cookies[1].split("=");
  let userIdValue = userIdPair[1];
  let tokenIdValue = tokenPair[1];

  return { userId: userIdValue, token: tokenIdValue };
}
export default getCookieDataFromString;
