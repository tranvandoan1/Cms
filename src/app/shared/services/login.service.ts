import Login from "./auth.service";
class LoginService {
  //api login
  signIn(data: object) {
    return Login.post("auth/signin", data);
  }
}
export default new LoginService();
