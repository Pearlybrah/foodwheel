import axios from "axios";

const PROXYURL = "https://cors-anywhere.herokuapp.com/";
const BASEURL = "https://api.yelp.com/v3/businesses/search?categories=";
const BASEURL2 = "&location="
const APIKEY = "77osbYb8Jaxb5I4iA4bh2qVN7lj4vEVezZe9AbCExk_9t_9F9Cn7DOh9zNYKe9JbKkS4y71PfF21FNyq0w1Z2WF-lzqGbVaPQ3QFjIIj6_WEr753Kqpem_pHUbZ4XHYx";

export default {
    search: function(location, category){
        console.log(PROXYURL + BASEURL + category + BASEURL2 + location);
        return axios.get(PROXYURL + BASEURL + category + BASEURL2 + location, {
            headers: {
                Authorization: "Bearer " + APIKEY
            }
          })
    }
};