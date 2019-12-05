import jwt_decode from "jwt-decode";
import { APP_ENVIRONMENT } from "../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url_front;
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
    console.log("called getuser", token)
    const token_string = await this.shuffleToken(token);
    try {
      return await jwt_decode(token_string);
    } catch (e) {
      console.log(e)
      // window.location = `${BASE_URL}/auth/login`;
    }
  }
}
export default DecodeToken;
