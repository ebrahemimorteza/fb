const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

var i = 0

// function webServer() {

const server = http.createServer((req, res) => {

    // let filePath = path.join(__dirname, '../public', req.url === '/' ? 'index.html' : req.url)
    let filePath = path.join(__dirname, '../public', req.url)

    i++;
    console.log("*************************************************" + i);


    // console.log(req)
    // if (req.url === '/') {
    //     res.write('helllllo ali and morteza')
    //     res.end()
    // }
    let extname = path.extname(filePath);
    let contentType = 'text/html'
    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "text/json";
            break;
        case ".html":
            contentType = "text/html";
            break;
        case ".ico":
            contentType = "text/html";
            break;
    }
    console.log(" >> " + contentType);
    if (contentType === 'text/html' && extname === '') {
        filePath += '.html'
    }
    console.log(filePath);

    // اتصال به دیتابیس
    const mongoose = require('./db');

    // بررسی اگر مدل `user` تعریف نشده باشد، آن را تعریف کنید
    if (!mongoose.models.user) {
        // تعریف مدل 'user'
        const UserSchema = new mongoose.Schema({
            email: String,
            pass: String,
            // سایر فیلدهای کاربر
        });

        // تعریف مدل 'user' با استفاده از 'mongoose.model'
        mongoose.model('user', UserSchema);
    }

    // در ادامه از مدل 'user' استفاده کنید
    const User = mongoose.model('user');

    // بررسی اطلاعات ورود با استفاده از دیتابیس
    if (req.url === '/login' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            const { email, pass } = JSON.parse(data);
            console.log(email + "  " + pass);
            // جستجو در دیتابیس برای بررسی اعتبار اطلاعات ورود
            User.findOne({ email, pass })
                .then(user => {
                    if (user) {
                        // اعتبار اطلاعات ورود صحیح است
                        const userData = {
                            email: user.email,
                            pass: user.pass,
                            // ویژگی‌های دیگر کاربر
                        };
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: '200' }));

                        // دستورات بعدی برای استفاده از اطلاعات کاربر
                    } else {
                        // اعتبار اطلاعات ورود ناصحیح است
                    }
                })
                .catch(error => {
                    console.error(error);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                });
        });
    }

    if (req.url === '/getSlider' && req.method === 'POST') {
        if (!mongoose.models.pic) { // تعریف ساختار سند
            var Schema = mongoose.Schema;
            const picSchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                discript: String,
                name_pic: String
            });

            // ایجاد مدل بر اساس ساختار سند
            const MyModel = mongoose.model('pic', picSchema);
        }
        const MyModel = mongoose.model('pic');

        MyModel.find({ parent: "1" })
            .then((documents) => {
                console.log("------------------------------------------------------------------------------------");
                console.log(documents.length);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: '200', data: documents }));
            })
            .catch((error) => {
                console.error('خطا در خواندن سند‌ها:', error);
            });
    }

    if (req.url === '/geth' && req.method === 'POST') {
        if (!mongoose.models.news) { // تعریف ساختار سند
            var Schema = mongoose.Schema;
            var newSchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                content: String,
                pic: String,
                date: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            var MyModel = mongoose.model('news', newSchema);
        }
        console.log("//////////////////////////////////////////////////////////");
        var MyModel = mongoose.model('news');

        MyModel.find({ id_parent: "1" })
            .then((documents) => {
                console.log("//////////////////////////////////////////////////////////");
                console.log(documents.length);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: '200', data: documents }));
            })
            .catch((error) => {
                console.error('خطا در خواندن سند‌ها:', error);
            });
    }
    if (req.url === '/getN2' && req.method === 'POST') {
        if (!mongoose.models.news) { // تعریف ساختار سند
            var Schema = mongoose.Schema;
            var newSchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                content: String,
                pic: String,
                date: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            var MyModel = mongoose.model('news', newSchema);
        }
        console.log("//////////////////////////////////////////////////////////");
        var MyModel = mongoose.model('news');

        MyModel.find({ id_parent: "3" })
            .then((documents) => {
                console.log("//////////////////////////////////////////////////////////");
                console.log(documents.length);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: '200', data: documents }));
            })
            .catch((error) => {
                console.error('خطا در خواندن سند‌ها:', error);
            });
    }
    if (req.url === '/getN1' && req.method === 'POST') {
        if (!mongoose.models.news) { // تعریف ساختار سند
            var Schema = mongoose.Schema;
            var newSchema = new Schema({
                title: String,
                id: Number,
                id_parent: Number,
                content: String,
                pic: String,
                date: Number,
            });

            // ایجاد مدل بر اساس ساختار سند
            var MyModel = mongoose.model('news', newSchema);
        }
        console.log("//////////////////////////////////////////////////////////");
        var MyModel = mongoose.model('news');

        MyModel.find({ id_parent: "2" })
            .then((documents) => {
                console.log("//////////////////////////////////////////////////////////");
                console.log(documents.length);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: '200', data: documents }));
            })
            .catch((error) => {
                console.error('خطا در خواندن سند‌ها:', error);
            });
    }
    if (req.url === '/getNC' && req.method === 'POST') {
        console.log("----------+++++")
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const { id } = JSON.parse(data);
                console.log(data);
                console.log(id);

                if (!mongoose.models.news) { // تعریف ساختار سند
                    var Schema = mongoose.Schema;
                    var newSchema = new Schema({
                        title: String,
                        id: Number,
                        id_parent: Number,
                        content: String,
                        pic: String,
                        date: Number,
                    });

                    // ایجاد مدل بر اساس ساختار سند
                    var MyModel = mongoose.model('news', newSchema);
                }
                console.log("//////////////////////////////////////////////////////////");
                var MyModel = mongoose.model('news');

                MyModel.find({ id: id })
                    .then((documents) => {
                        console.log("//////////////////////////////////////////////////////////");
                        console.log(documents.length);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: '200', data: documents }));
                    })
                    .catch((error) => {
                        console.error('خطا در خواندن سند‌ها:', error);
                    });

            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
    }


    if (req.url === '/upload') {
        const multiparty = require('multiparty');

        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.statusCode = 500;
                res.end('خطا در پردازش فرم.');
                return;
            }
            const file = files.file[0];
            if (!file || file.size === 0) {
                res.statusCode = 400;
                res.end('هیچ فایلی بارگذاری نشده است.');
                return;
            }
            console.log("object");
            console.log(file.path);
            const oldPath = file.path;
            const newPath = 'upload/' + file.originalFilename; // تغییر نام فایل به originalFilename

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('خطا در ذخیره فایل.');
                    return;
                }

                // ادامه پردازش فایل...

                res.statusCode = 200;
                res.end('فایل با موفقیت آپلود شد.');
            });
        });
    }
    if (req.url === '/category_news' && req.method === 'POST') {
        const select = require('./read');
        // بررسی اگر مدل 'user' تعریف نشده باشد، آن را تعریف کنید
        if (!mongoose.models.category_news) {
            // تعریف مدل 'user'
            const NewsSchema = new mongoose.Schema({
                title: String,
                parent: String,
                // سایر فیلدهای کاربر
            });

            // تعریف مدل 'user' با استفاده از 'mongoose.model'
            mongoose.model('category_news', NewsSchema);
        }

        // در ادامه از مدل 'user' استفاده کنید
        const Category_news = mongoose.model('category_news');

        // جستجوی تمام رکوردها در جدول 'user'
        Category_news.find()
            .then(Category_news => {
                // فرآیند کار با رکوردهای برگردانده شده
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(Category_news));
            })
            .catch(error => {
                console.error(error);
                // برخورد با خطا
            });
    }
    if (req.url === '/category_news_insert' && req.method === 'POST') {
        const collection = require('./create');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const { title, parent } = JSON.parse(data);
                console.log(data);
                collection("category_news", { title, parent }).then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: '200' }));
                });
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }
    if (req.url === '/category_news_edit' && req.method === 'POST') {
        const update1 = require('./update');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                var { title, id, parent } = JSON.parse(data);
                console.log(data);
                update1("category_news", { title, id, parent })
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }

    if (req.url === '/user') {
        const select = require('./read');
        console.log("-------------------***********----------------")
            // بررسی اگر مدل 'user' تعریف نشده باشد، آن را تعریف کنید
        if (!mongoose.models.user) {
            // تعریف مدل 'user'
            const NewsSchema = new mongoose.Schema({
                name: String,
                id: Number,
                email: String
                    // سایر فیلدهای کاربر
            });

            // تعریف مدل 'user' با استفاده از 'mongoose.model'
            mongoose.model('user', NewsSchema);
        }

        // در ادامه از مدل 'user' استفاده کنید
        const User = mongoose.model('user');

        // جستجوی تمام رکوردها در جدول 'user'
        User.find()
            .then(User => {
                // فرآیند کار با رکوردهای برگردانده شده
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(User));
            })
            .catch(error => {
                console.error(error);
                // برخورد با خطا
            });
    }
    if (req.url === '/pic' && req.method === 'POST') {
        const select = require('./read');
        // بررسی اگر مدل 'user' تعریف نشده باشد، آن را تعریف کنید
        if (!mongoose.models.pic) {
            // تعریف مدل 'user'
            const NewsSchema = new mongoose.Schema({
                title: String,
                id: Number,
                name_pic: String,
                // سایر فیلدهای کاربر
            });

            // تعریف مدل 'user' با استفاده از 'mongoose.model'
            mongoose.model('pic', NewsSchema);
        }

        // در ادامه از مدل 'user' استفاده کنید
        const Pic = mongoose.model('pic');

        // جستجوی تمام رکوردها در جدول 'user'
        Pic.find()
            .then(Pic => {
                // فرآیند کار با رکوردهای برگردانده شده
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(Pic));
            })
            .catch(error => {
                console.error(error);
                // برخورد با خطا
            });
    }
    if (req.url === '/pic_insert' && req.method === 'POST') {
        const collection = require('./create');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const { title, name_pic, id, id_parent, discript } = JSON.parse(data);
                console.log(data);
                collection("pic", { title, name_pic, id, id_parent, discript }).then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: '200' }));
                });
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }
    if (req.url === '/pic_edit' && req.method === 'POST') {
        const update1 = require('./update');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                var { title, name_pic, id, id_parent, discript } = JSON.parse(data);
                console.log(data);
                update1("pic", { title, name_pic, id, id_parent, discript })
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }

    if (req.url === '/news' && req.method === 'POST') {
        const select = require('./read');
        // بررسی اگر مدل 'user' تعریف نشده باشد، آن را تعریف کنید
        if (!mongoose.models.news) {
            // تعریف مدل 'user'
            const NewsSchema = new mongoose.Schema({
                title: String,
                date: Number,
                id: Number,
                id_parent: Number,
                content: String,
                pic: String
                    // سایر فیلدهای کاربر
            });

            // تعریف مدل 'user' با استفاده از 'mongoose.model'
            mongoose.model('news', NewsSchema);
        }

        // در ادامه از مدل 'user' استفاده کنید
        const News = mongoose.model('news');

        // جستجوی تمام رکوردها در جدول 'user'
        News.find()
            .then(News => {
                // فرآیند کار با رکوردهای برگردانده شده
                res.statusCode = 200;
                // res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(News));
            })
            .catch(error => {
                console.error(error);
                // برخورد با خطا
            });
    }
    if (req.url === '/news_insert') {
        const collection = require('./create');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const { title, id, id_parent, pic, content } = JSON.parse(data);
                console.log(data);
                collection("news", { title, id, id_parent, pic, content }).then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: '200' }));
                });
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }
    if (req.url === '/news_edit') {
        const update1 = require('./update');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                var { title, id, id_parent, pic, content } = JSON.parse(data);
                console.log(data);
                update1("news", { title, id, id_parent, pic, content })
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }

    if (req.url === '/category_pic' && req.method === 'POST') {
        const select = require('./read');
        // بررسی اگر مدل 'user' تعریف نشده باشد، آن را تعریف کنید
        if (!mongoose.models.category_pic) {
            // تعریف مدل 'user'
            const NewsSchema = new mongoose.Schema({
                title: String,
                id: Number,
                // سایر فیلدهای کاربر
            });

            // تعریف مدل 'user' با استفاده از 'mongoose.model'
            mongoose.model('category_pic', NewsSchema);
        }

        // در ادامه از مدل 'user' استفاده کنید
        const Category_pic = mongoose.model('category_pic');

        // جستجوی تمام رکوردها در جدول 'user'
        Category_pic.find()
            .then(Category_pic => {
                // فرآیند کار با رکوردهای برگردانده شده
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(Category_pic));
            })
            .catch(error => {
                console.error(error);
                // برخورد با خطا
            });
    }
    if (req.url === '/category_pic_insert' && req.method === 'POST') {
        const collection = require('./create');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const { title, id } = JSON.parse(data);
                console.log(data);
                collection("category_pic", { title, id }).then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: '200' }));
                });
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }
    if (req.url === '/category_pic_edit' && req.method === 'POST') {
        const update1 = require('./update');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                var { title, id } = JSON.parse(data);
                console.log(data);
                update1("category_pic", { title, id })
            } catch (error) {
                console.error(error);
                // برخورد با خطا در تجزیه و تحلیل JSON
                // ارسال پاسخ به مشتری با خطا مناسب
            }
        })
        console.log(data);

    }


    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log("error");
        } else {

            res.writeHead(200, { 'content-Type': contentType })
            res.end(data);
        }
    })
});

server.listen(3000, () => console.log('server is runing'));
// }
module.exports = server;