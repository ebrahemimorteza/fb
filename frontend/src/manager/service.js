import swal from "sweetalert";
import { jjAxios, jjAxiosUpload } from "./jAxios";

export const getDataService = async(data) => {
    const response = await jjAxios.get('', data)
    return response.data;

}
export const postDataService = async(data, data2) => {
    console.log(data)
    const response = await jjAxios.post('', data, data2);
    // swal('با موفقیت ویرایش شد', { icon: 'danger', buttons: 'متوجه شدم' })
    return response.data;
}
export const postDataUpload = async(data) => {
    const response = await jjAxiosUpload.post('', data);
    const nameFile = response.data;
    return nameFile;
    swal('با موفقیت ویرایش شد', { icon: 'danger', buttons: 'متوجه شدم' })
}
export const putDataService = async(data) => {
    await jjAxios.put('', data)
        .then(response => {
            console.log(response.data);
            // swal('با موفقیت ویرایش شد',{icon:'danger',buttons:'متوجه شدم'})
        })
        .catch(error => {
            console.error(error);
        });
}
export const deleteDataService = (data, data2) => {
    swal({
            title: "ایا مطمینی?",
            text: "این مورد را حذف می کنید?",
            icon: "warning",
            buttons: ['خیر', 'بله'],
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                const response = jjAxios.post('', data, data2);
                swal("Deleted!", "با موفقیت حذف شد!", "success");
            }
        });

}
export const selectDataService = async(data) => {
    const response = await jjAxios.get('', data);
    console.log(response.data)
    return response.data;

}
export const responseUrl = () => {

    // return 'upload/';
    return 'http://localhost:8080/shoping/upload/';

}