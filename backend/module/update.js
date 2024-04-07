function update(db, data) {
    const mongoose = require('mongoose');
    var newDocument;
    var MyModel;
    if (db == 'user') {
        if (!mongoose.models.user) { // تعریف ساختار سند
            const Schema = mongoose.Schema;
            const mySchema = new Schema({
                name: String,
                mobile: Number,
                email: String
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, mySchema);

        }
        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model('user');
    } else if (db == 'news') {
        if (!mongoose.models.news) { // تعریف ساختار سند
            const Schema = mongoose.Schema;
            const mySchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                pic: String,
                content: String,
                date: Number,

            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, mySchema);

        }
        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model('news');

    } else if (db == 'category_news') {
        if (!mongoose.models.category_news) { // تعریف ساختار سند
            const Schema = mongoose.Schema;
            const mySchema = new Schema({
                title: String,
                id: Number,
                parent: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, mySchema);

        }
        console.log("data");
        console.log(data.id);
        const MyModel = mongoose.model('category_news');
    } else if (db == 'pic') {
        if (!mongoose.models.pic) { // تعریف ساختار سند
            const Schema = mongoose.Schema;
            const mySchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                discript: String,
                name_pic: String
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, mySchema);

        }
        console.log("data");
        console.log(data.id);
        const MyModel = mongoose.model('pic');
    } else if (db == 'category_pic') {
        // تعریف ساختار سند
        if (!mongoose.models.category_pic) { // تعریف ساختار سند
            const Schema = mongoose.Schema;
            const mySchema = new Schema({
                title: String,
                id: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, mySchema);

        }
        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model('category_pic');
    }

    // به‌روزرسانی سند با شرط مشخص
    //{ name: 'John Doe' }, { age: 35 }
    console.log("id****---////");
    const documentId = data.id; // استفاده از ایدی درست شما
    MyModel.updateOne({ id: documentId }, data)
        .then(() => {
            console.log('سند با موفقیت به‌روزرسانی شد');
        })
        .catch((error) => {
            console.error('خطا در به‌روزرسانی سند:', error);
        });
}
module.exports = update;