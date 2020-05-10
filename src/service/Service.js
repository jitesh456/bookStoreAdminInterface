
import Axios from 'axios';


class Service {


    storeBook = (book) => {

        return Axios.post('http://localhost:8090/admin/book',  book );
    }

    updateBook = (book) => {
        return Axios.put('http://localhost:8090/admin/update/price',book);
    }

    getAllDetails = () => {
        return Axios.get('http://localhost:8090/admin/books');
    }
}
export default new Service()
