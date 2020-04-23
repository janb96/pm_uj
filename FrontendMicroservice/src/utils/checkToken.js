import axios from 'axios';
import {config} from './../config';

export async function checkToken() {

    try {
        let response = await axios.get(config.authMicroservice + "/microservice/checkToken");
        if(response.data.status) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        return false;
    }

}
