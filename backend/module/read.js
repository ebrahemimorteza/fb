function select(db) {
    const mongoose = require('mongoose');
    var MyModel;
    if (db == 'user') {
        // تعریف ساختار سند
        const Schema = mongoose.Schema;
        const mySchema = new Schema({
            name: String,
            mobile: Number,
            email: String
        });

        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model(db, mySchema);
    } else if (db == 'news') {
        // تعریف ساختار سند
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
        MyModel = mongoose.model(db, mySchema);

    } else if (db == 'category_news') {
        // تعریف ساختار سند
        const Schema = mongoose.Schema;
        const mySchema = new Schema({
            title: String,
            id: Number,
        });

        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model(db, mySchema);
    } else if (db == 'pic') {
        // تعریف ساختار سند
        const Schema = mongoose.Schema;
        const mySchema = new Schema({
            title: String,
            id: Number,
            id_parent: Number,
            discript: String,
            name_pic: String
        });

        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model(db, mySchema);
    } else if (db == 'category_pic') {
        // تعریف ساختار سند
        const Schema = mongoose.Schema;
        const mySchema = new Schema({
            title: String,
            id: Number,
        });

        // ایجاد مدل بر اساس ساختار سند
        MyModel = mongoose.model(db, mySchema);
    }

    // خواندن همه سند‌ها
    MyModel.find()
        .then((documents) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: '200' }));
        })
        .catch((error) => {
            console.error('خطا در خواندن سند‌ها:', error);
        });
}
module.exports = select;