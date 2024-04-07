function delet(db, id) {
    const mongoose = require('mongoose');

    // تعریف ساختار سند
    const Schema = mongoose.Schema;
    const mySchema = new Schema({
        name: String,
        age: Number,
        email: String
    });

    // ایجاد مدل بر اساس ساختار سند
    const MyModel = mongoose.model(db, mySchema);

    // حذف سند با شرط مشخص
    MyModel.deleteOne({ id: id })
        .then(() => {
            console.log('سند با موفقیت حذف شد');
        })
        .catch((error) => {
            console.error('خطا در حذف سند:', error);
        });
}
module.exports = delet;