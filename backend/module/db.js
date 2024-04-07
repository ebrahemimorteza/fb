const mongoose = require('mongoose');

// اتصال به مونگو دی‌بی
mongoose.connect('mongodb://localhost:27017/root', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connect is successful');

        // در اینجا می‌توانید عملیات دیگری روی دیتابیس انجام دهید
    })
    .catch((error) => {
        console.error('خطا در اتصال به مونگو دی‌بی:', error);
    });
module.exports = mongoose;