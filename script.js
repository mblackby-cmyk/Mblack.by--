 const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    function closeMenu() {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
    }

    // عداد العملاء
    const CLIENT_KEY = 'mblack_client_count';
    let clientCount = localStorage.getItem(CLIENT_KEY) ? parseInt(localStorage.getItem(CLIENT_KEY)) : 300;
    const clientEl = document.getElementById('clientCounter');
    function updateClientDisplay() {
        clientEl.textContent = '+' + clientCount;
        clientEl.classList.add('pulse');
        setTimeout(() => clientEl.classList.remove('pulse'), 400);
    }
    function incrementClient() {
        clientCount++;
        localStorage.setItem(CLIENT_KEY, clientCount);
        updateClientDisplay();
    }
    updateClientDisplay();
    setInterval(incrementClient, 5000);

    // عداد الموظفين
    const EMPLOYEE_KEY = 'mblack_employee_count';
    const EMPLOYEE_DATE_KEY = 'mblack_employee_last_update';
    let employeeCount = localStorage.getItem(EMPLOYEE_KEY) ? parseInt(localStorage.getItem(EMPLOYEE_KEY)) : 10;
    let lastUpdate = localStorage.getItem(EMPLOYEE_DATE_KEY) ? new Date(localStorage.getItem(EMPLOYEE_DATE_KEY)) : new Date();
    const employeeEl = document.getElementById('employeeCounter');
    function updateEmployeeDisplay() {
        employeeEl.textContent = '+' + employeeCount;
        employeeEl.classList.add('pulse');
        setTimeout(() => employeeEl.classList.remove('pulse'), 400);
    }
    function checkEmployeeIncrement() {
        const now = new Date();
        const diffDays = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
        if (diffDays >= 1) {
            employeeCount += diffDays;
            localStorage.setItem(EMPLOYEE_KEY, employeeCount);
            localStorage.setItem(EMPLOYEE_DATE_KEY, now.toISOString());
            lastUpdate = now;
            updateEmployeeDisplay();
        }
        const nextMidnight = new Date(now);
        nextMidnight.setHours(24, 0, 0, 0);
        const timeUntilNext = nextMidnight - now;
        setTimeout(() => {
            employeeCount++;
            localStorage.setItem(EMPLOYEE_KEY, employeeCount);
            localStorage.setItem(EMPLOYEE_DATE_KEY, new Date().toISOString());
            updateEmployeeDisplay();
            setInterval(() => {
                employeeCount++;
                localStorage.setItem(EMPLOYEE_KEY, employeeCount);
                localStorage.setItem(EMPLOYEE_DATE_KEY, new Date().toISOString());
                updateEmployeeDisplay();
            }, 86400000);
        }, timeUntilNext);
    }
    updateEmployeeDisplay();
    checkEmployeeIncrement();

    // تعليق وهمي
    document.getElementById('submitComment').addEventListener('click', () => {
        const ta = document.getElementById('fakeComment');
        if (!ta.value.trim()) return;
        document.getElementById('successMsg').style.display = 'block';
        ta.value = '';
        setTimeout(() => document.getElementById('successMsg').style.display = 'none', 3000);
    });

    // دومين
    const domainOptions = document.querySelectorAll('.domain-option');
    const domainTypeInput = document.getElementById('domainTypeInput');
    const paidBox = document.getElementById('paidDomainBox');
    const extraModsSelect = document.getElementById('extraModsSelect');

    domainOptions.forEach(option => {
        option.addEventListener('click', () => {
            domainOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const domain = option.getAttribute('data-domain');
            domainTypeInput.value = domain;
            if (domain === 'paid') {
                paidBox.classList.add('active');
            } else {
                paidBox.classList.remove('active');
                extraModsSelect.value = '';
            }
        });
    });

    const phone = '201041758947';

    document.querySelectorAll('.order-package').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const pkg = btn.getAttribute('data-package');
            window.open(`https://wa.me/${201041758947}?text=${encodeURIComponent('أود طلب ' + pkg)}`, '_blank');
        });
    });

    document.getElementById('vipForm').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('vipName').value.trim();
        const vipPhone = document.getElementById('vipPhone').value.trim();
        const type = document.getElementById('vipType').value;
        const desc = document.getElementById('vipDesc').value.trim();
        if (!name || !vipPhone || !type) return alert('يرجى ملء جميع الحقول المطلوبة');

        const domainType = domainTypeInput.value;
        let extraMods = '';
        if (domainType === 'paid') {
            extraMods = extraModsSelect.value;
        }

        const msg = `طلب VIP من Mblack:%0A
الاسم: ${name}%0A
الهاتف: ${vipPhone}%0A
نوع الطلب: ${type}%0A
التفاصيل: ${desc}%0A
الدومين: ${domainType === 'free' ? 'مجاني' : 'مدفوع'}%0A
${extraMods ? 'الباقة الإضافية: ' + extraMods : ''}%0A
(رسوم طلب الخدمه 100ج.م (عربون))`;

        window.open(`https://wa.me/${201041758947}?text=${encodeURIComponent(msg)}`, '_blank');
        e.target.reset();
        domainOptions[0].classList.add('active');
        domainOptions[1].classList.remove('active');
        domainTypeInput.value = 'free';
        paidBox.classList.remove('active');
        extraModsSelect.value = '';
    });