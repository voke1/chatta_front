import jwt_decode from "jwt-decode";
import { APP_ENVIRONMENT } from "../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;
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
      window.location = `${BASE_URL}/auth/login`;
    }
  }
}
export default DecodeToken;
