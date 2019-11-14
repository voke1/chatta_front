import jwt_decode from "jwt-decode";

class DecodeToken {
  static async shuffleToken(token) {
    if (token) {
      return token
        .split("")
        .reverse()
        .join("");
    }
    return null;
  }
  static async getUserPayload(token) {
    token = await this.shuffleToken(token);
    try {
      return await jwt_decode(token);
    } catch (e) {
      window.location = "http://localhost:3000/auth/login";
    }
  }
}
export default DecodeToken;
