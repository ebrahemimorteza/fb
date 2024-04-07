function collection(db, data) {
    const mongoose = require('mongoose');
    var newDocument;
    var Schema = mongoose.Schema;
    if (db == 'user') {
        // تعریف ساختار سند

        if (!mongoose.models.user) { // تعریف ساختار سند
            const userSchema = new Schema({
                name: String,
                id: Number,
                email: String,
                pass: String
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, userSchema);
        }
        const MyModel = mongoose.model('user');
        // ایجاد سند جدید
        console.log("object");
        console.log("object");
        newDocument = new MyModel(data);
    } else if (db == 'news') {
        // تعریف ساختار سند

        if (!mongoose.models.news) { // تعریف ساختار سند
            const newSchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                content: String,
                pic: String,
                date: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, newSchema);
        }
        const MyModel = mongoose.model('news');
        // ایجاد سند جدید

        newDocument = new MyModel(data);
    } else if (db == 'category_news') {

        if (!mongoose.models.category_news) { // تعریف ساختار سند
            const CaSchema = new Schema({
                title: String,
                id: Number,
                parent: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, CaSchema);
        }
        const MyModel = mongoose.model('category_news');
        // ایجاد سند جدید
        console.log("data");
        console.log(data);
        newDocument = new MyModel(data);
    } else if (db == 'pic') {
        if (!mongoose.models.pic) { // تعریف ساختار سند
            const picSchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                discript: String,
                name_pic: String
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, picSchema);
        }
        const MyModel = mongoose.model('pic');
        // ایجاد سند جدید
        console.log("data");
        console.log(data);
        newDocument = new MyModel(data);
    } else if (db == 'category_pic') {

        if (!mongoose.models.category_pic) { // تعریف ساختار سند
            const mySchema = new Schema({
                title: String,
                id: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model(db, mySchema);
        }
        const MyModel = mongoose.model('category_pic');
        // ایجاد سند جدید

        newDocument = new MyModel(data);
    }
    // ذخیره سند در دیتابیس
    newDocument.save()
        .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: '200' }));
        })
        .catch((error) => {
            console.error('خطا در ایجاد سند:', error);
        });
}
module.exports = collection;