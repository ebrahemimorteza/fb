function upload() {
    const http = require('http');
    const fs = require('fs');
    const formidable = require('formidable');

    const server = http.createServer((req, res) => {
        if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
            const form = new formidable.IncomingForm();

            form.parse(req, (err, fields, files) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('خطا در پردازش فرم.');
                    return;
                }

                const file = files.file;

                if (!file || file.size === 0) {
                    res.statusCode = 400;
                    res.end('هیچ فایلی بارگذاری نشده است.');
                    return;
                }

                const oldPath = file.path;
                const newPath = './uploads/' + file.name;

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end('خطا در ذخیره فایل.');
                        return;
                    }

                    res.end('فایل با موفقیت بارگذاری شد.');
                });
            });
        } else {
            res.statusCode = 404;
            res.end('صفحه موردنظر یافت نشد.');
        }
    });

    server.listen(3000, () => {
        console.log('سرور درگاه 3000 راه‌اندازی شد.');
    });
}
module.exports = upload;