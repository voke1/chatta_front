const validations = [];
export class Validation {
  static async validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const success = emailRegex.test(String(email).toLowerCase());
    return await Validation.getResponse(
      success,
      "email",
      "A valid email is required"
    );
  }
  static async validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/;
    const success = passwordRegex.test(password);
    return await Validation.getResponse(
      success,
      "password",
      "Password must be between 8 and 20 characters long and must contain" +
        " at least 1 number"
    );
  }
  static async validateFullName(fullName) {
    const words = fullName.split(" ");
    const nameRegex = /^[a-zA-Z ]{4,30}$/;
    const success =
      nameRegex.test(fullName) && words.length > 1 && words[1].length > 0;
    return await Validation.getResponse(
      success,
      "name",
      "Name should contain first name and last name and must be between 4 to 30 characters long"
    );
  }
  static async validatePhone(phone) {
    const passwordRegex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    const success = passwordRegex.test(phone);
    return await Validation.getResponse(
      success,
      "phone",
      "Please enter a valid phone number"
    );
  }
  static async validateAll(e) {
    const validate = {
      email: this.validateEmail,
      password: this.validatePassword,
      fullName: this.validateFullName,
      phone: this.validatePhone
    };
    const validated = e.target.name;
    const result = await validate[validated](e.target.value);
    if (!result.success) {
      if (validations.indexOf(validated) > -1) {
        validations.splice(validations.indexOf(validated), 1);
      }
    } else {
      if (validations.indexOf(validated) === -1) validations.push(validated);
    }
    return await Validation.runCheck(result);
  }
  static async runCheck(result) {
    if (validations.length === 3) {
      return Validation.getResponse(true, result.type, "", false);
    } else {
      return result;
    }
  }
  static async getResponse(success, type, message, disabled) {
    return {
      success,
      message: !success ? message : "",
      disabled: typeof disabled === "undefined" ? true : disabled,
      type,
      color: {
        name: `${type}Color`,
        value: !success ? "#edcad2" : ""
      }
    };
  }
}
