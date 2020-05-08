
import Axios from 'axios';


class Service {


    storeBook = (book) => {

        return Axios.post('http://localhost:8090/add', { book });
    }

    deleteData = (dataID) => {
        return Axios.delete('http://localhost:8090/${dataID}');
    }

    getAllDetails = () => {
        return Axios.get('http://localhost:8090/all');
    }
}
export default new Service()
