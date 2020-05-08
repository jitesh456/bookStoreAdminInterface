
import Axios from 'axios';


class Service {


    storeBook = (book) => {

        return Axios.post('http://localhost:8090/admin/update/book',  book );
    }

    deleteData = (dataID) => {
        return Axios.delete('http://localhost:8090/${dataID}');
    }

    getAllDetails = () => {
        return Axios.get('http://localhost:8090/admin/books');
    }
}
export default new Service()
