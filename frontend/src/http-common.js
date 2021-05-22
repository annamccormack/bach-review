import axios from "axios";

export default axios.create({
  baseURL: "https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/bach-review-lejvo/service/Listings/incoming_webhook",
  headers: {
    "Content-type": "application/json"
  }
})