import http from "../http-common";

class BachDataService {
  getAll(page = 0){
    return http.get(`bach?page=${page}`)
  }

  getById(id){
    return http.get(`/bach?id=${id}`)
  }

  findByQuery (query, by = "name", page = 0) {
    return http.get(`bach?{by}=${by}=${query}&page=${page}`)
  }

  createReview(data) {
    return http.post("/review-new", data);
  }

  updateReview(data) {
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
   return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getCities(id) {
    return http.get('/city')
  }
}

export default new BachDataService()