
import Axios from 'axios';


class Service {


    storeBook = (book) => {

        return Axios.post('http://localhost:8090/admin/book',book);
    }

    updateBook = (book) => {
        return Axios.put('http://localhost:8090/admin/book',book);
    }

    getAllDetails = () => {
        return Axios.get('http://localhost:8090/books');
    }

    uploadImage=(selectedImage)=>{
        console.log(selectedImage)
        return Axios.post('http://localhost:8090/admin/uploadImage',selectedImage);
    }
}
export default new Service()
