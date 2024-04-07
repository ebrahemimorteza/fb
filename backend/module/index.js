function login() {
    console.log("33333333333333333333333");
    // API endpoint برای دریافت درخواست لاگین
    app.post('/module/index', (req, res) => {
        console.log("33333333333333333333333");
        const { username, password } = req.body;

        // اینجا اطلاعات ورود را بررسی کنید
        // می‌توانید با استفاده از یک پکیج مدیریت کاربران مانند Passport.js یا بررسی دستی اطلاعات ورود را انجام دهید

        // بررسی مثالی
        if (username === 'admin' && password === 'password') {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    });
}
module.exports = login