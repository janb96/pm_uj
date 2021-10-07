import axios from 'axios';
import {config} from './../config';

export async function getUserData() {

    try {
        let response = await axios.get(config.authMicroservice + "/microservice/checkToken");
        if(response.data.status) {
            return response.data;
        } else {
            return false;
        }
    } catch(error) {
        return false;
    }

}
