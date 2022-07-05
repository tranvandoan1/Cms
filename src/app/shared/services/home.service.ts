import ApiService from "./api.service";
class HomeService {
    getAll(data: object) {
        return ApiService.post("cms/getAllPaticipant", data);
    }

}
export default new HomeService();
