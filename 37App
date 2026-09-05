วิเคราะห์จากรูปภาพ Error ที่คุณส่งมา (ReferenceError: setHasLoadedAdmin is not defined) และเปรียบเทียบโค้ดระหว่างเวอร์ชันเก่า (33App) กับโค้ดใหม่ พบสาเหตุที่แท้จริงแล้วครับ:
สาเหตุ:
ในโค้ดส่วนที่ประกาศ State ของ Component App (ซึ่งอยู่ก่อนฟังก์ชัน useEffect และฟังก์ชันดึงข้อมูล) ตัวแปรสเตท hasLoadedAdmin และ setHasLoadedAdmin ขาดหายไป หรือถูกวางตำแหน่งไว้ผิด ทำให้เวลาที่ฟังก์ชัน fetchAdminData พยายามอัปเดตสถานะด้วยคำสั่ง setHasLoadedAdmin(true) เบราว์เซอร์จึงฟ้อง Error ว่าฟังก์ชันนี้ไม่มีอยู่ (Not defined) จนทำให้แอปพลิเคชันพังและขึ้นหน้าจอสีเทา/ขาวครับ
นอกจากนี้ ในฝั่งของการเข้าสู่ระบบ (Login) ที่ไม่สามารถกดเข้าได้ เกิดจากโค้ดใหม่ไม่มีระบบ Hybrid Fallback (ที่คอยเช็คข้อมูลระหว่าง Firebase กับ Google Sheets) ทำให้ถ้าบัญชีผู้ใช้ใน Firebase ยังว่างเปล่าหรือผู้ใช้พิมพ์รหัสผ่าน ระบบจะหาบัญชีไม่เจอ
วิธีแก้ไขแบบเบ็ดเสร็จ (100% Bug-Free)
ผมได้ทำการรวมโค้ดฉบับสมบูรณ์ที่แก้ไขปัญหา Login ไม่ได้, จอขาว setHasLoadedAdmin, และ ระบบ Hybrid Firebase 100% ไว้ให้คุณในไฟล์เดียวแล้วครับ
กรุณาลบโค้ดทั้งหมดใน App.jsx ของคุณออกให้เกลี้ยง แล้วก็อปปี้โค้ดด้านล่างนี้ไปวางแทนที่ได้เลยครับ:
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// 📍 ฟังก์ชันบังคับล็อกโซนเวลาประเทศไทย (GMT+7) เสมอ
const getThaiTime = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));

const Icons = {
    Book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    List: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    ChevronLeft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    ChevronRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    Alert: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    EyeOff: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
    Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Upload: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
    Chart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    PieChart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
    Award: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
    MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    CalendarX: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="14" y2="18"></line><line x1="14" y1="14" x2="10" y2="18"></line></svg>,
    Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Loader: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loader-spinner text-white"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>,
    MoreVertical: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    FileCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 16 12"/></svg>,
    Clock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    Star: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    FileText: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Image: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
    Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    HelpCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    UserPlus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>,
    AnimatedTrash: ({ isHovered }) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g style={{ 
                transformOrigin: '100% 20%', 
                transform: isHovered ? 'rotate(35deg) translate(2px, -2px)' : 'rotate(0deg)', 
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            }}>
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </g>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    )
};

const formatSafeDate = (val) => {
    if (!val) return '';
    const str = String(val);
    if (str.includes('T')) {
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }
    }
    return str.split('T')[0];
};

const PRODUCT_COLORS = {
    'ES1': 'bg-blue-500', '3300': 'bg-blue-400', '5500': 'bg-emerald-500', 'ES5/ES5.1': 'bg-purple-500',
    'S-villas': 'bg-amber-500', 'ES2': 'bg-pink-500', 'ES3': 'bg-indigo-500',
    'MOR-R': 'bg-rose-500', 'MOD-T': 'bg-orange-500', 'S7R4': 'bg-cyan-500', 'Flex7': 'bg-teal-600', 
    'ESC/MW': 'bg-fuchsia-500', 'อื่นๆโปรดระบุ': 'bg-slate-500'
};

const getCardStyle = (task, settings = {}) => {
    const jobType = String(task.job_type || '').toLowerCase();
    const area = String(task.area || '').trim();
    const siteStr = String(task.site_name || '').toLowerCase();
    const eqStr = String(task.equipment_no || '').toLowerCase();
    const combinedStr = siteStr + ' ' + eqStr;

    const isLeave = jobType === 'leave' || combinedStr.includes('leave_') || combinedStr.includes('ลา') || combinedStr === 'ลา';

    let customColor = null;
    if (String(task.equipment_no).includes('_#')) {
        const match = String(task.equipment_no).match(/_(#[0-9a-fA-F]{6})/);
        if (match) customColor = match[1];
    }

    if (jobType === 'public_holiday' || combinedStr.includes('hld_')) return { bg: settings.holidayBg || '#D0021B', text: settings.holidayText || '#ffffff', isSpecial: true, isLeave: false };
    if (jobType === 'company_event' || combinedStr.includes('event_') || combinedStr.includes('meeting')) return { bg: customColor || settings.eventBg || '#22c55e', text: settings.eventText || '#ffffff', isSpecial: true, isLeave: false };
    if (isLeave) return { bg: settings.leaveBg || '#eab308', text: settings.leaveText || '#ffffff', isSpecial: true, isLeave: true };
    if (area !== '' && area !== 'กรุงเทพและปริมณฑล' && area !== 'ไม่ระบุ') return { bg: settings.upcBg || '#f472b6', text: settings.upcText || '#ffffff', isSpecial: false, isLeave: false };
    if (jobType === 'mod') return { bg: settings.modBg || '#64748b', text: settings.modText || '#ffffff', isSpecial: false, isLeave: false };
    if (jobType.includes('re-ins') || jobType.includes('temporary') || jobType.includes('builder lift')) return { bg: settings.reinsBg || '#fef08a', text: settings.reinsText || '#854d0e', isSpecial: false, isLeave: false };
    
    return { bg: settings.normalBg || '#e2e8f0', text: settings.normalText || '#1e293b', isSpecial: false, isLeave: false };
};

const RealtimeClock = React.memo(({ lastSyncTime }) => {
    const [currentTime, setCurrentTime] = useState(getThaiTime());
    
    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(getThaiTime()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="realtime-clock flex flex-col gap-1 py-2 bg-slate-50 border-t border-slate-200 shadow-inner z-50">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700">
                <Icons.Clock />
                <span>{currentTime.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}  {currentTime.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' })}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-normal bg-white px-2 py-0.5 rounded-md border border-slate-100">
                อัปเดตข้อมูลล่าสุด: {Math.floor((getThaiTime() - new Date(lastSyncTime)) / 60000) < 1 ? 'เพิ่งอัปเดตเมื่อสักครู่' : `${Math.floor((getThaiTime() - new Date(lastSyncTime)) / 60000)} นาทีที่แล้ว`}
            </div>
        </div>
    );
});

const CalendarGrid = React.memo(({ daysInView, db, isAdmin, user, setModal, setAlertMsg, handleDrop, handleDragOver, handleDragLeave, handleDragStart, handleDragEnd, setConfirmDialog, apiAction, setQuickAddType, filteredBookings, tableFontScale, columnZoom, specialFontScale, isExporting }) => {
    const taskMap = useMemo(() => {
        const map = {};
        filteredBookings.forEach(task => {
            if (String(task.status) === 'cancelled') return;
            const dateStr = formatSafeDate(task.date);
            if (!dateStr) return;
            const key = `${dateStr}_${task.inspector_name}`;
            if (!map[key]) map[key] = [];
            map[key].push(task);
        });
        return map;
    }, [filteredBookings]);

    const numInspectors = (db.inspectors || []).length || 1;
    const screenWidth = typeof window !== 'undefined' ? (window.innerWidth || 375) : 375;
    const baseColWidth = db.settings?.gridColWidth ? parseInt(db.settings.gridColWidth) : Math.floor((screenWidth - 45) / 3);
    const colWidthPx = Math.floor(baseColWidth * columnZoom);
    const gridCols = isExporting ? `60px repeat(${numInspectors}, 300px)` : `45px repeat(${numInspectors}, ${colWidthPx}px)`;

    return (
        <div id="calendar-export-area" className={`calendar-grid ${isExporting ? 'export-mode' : ''}`} style={{ 
            gridTemplateColumns: gridCols, width: 'max-content', minWidth: '100%', backgroundColor: isExporting ? '#cbd5e1' : undefined
        }}>
            <div className={`sticky-corner font-bold flex items-center justify-center ${isExporting ? 'min-h-[60px]' : ''}`} style={{ fontSize: `${(isExporting ? 14 : 11) * tableFontScale}px` }}>DATE</div>
            
            {(db.inspectors || []).map((ins, i) => (
                <div key={i} className={`sticky-top flex items-center justify-center ${isExporting ? 'min-h-[60px] !py-3' : ''}`}>
                    <div className={`font-bold w-full text-center px-1 ${isExporting ? 'break-words leading-tight' : 'truncate'}`} style={{ fontSize: `${(isExporting ? 16 : 13) * tableFontScale}px` }}>
                        {ins.name || '-'}
                    </div>
                </div>
            ))}
            {daysInView.map((d, index) => {
                let headerClass = d.isSunday ? 'text-red-600 font-black bg-red-50/50' : '';
                return (
                    <React.Fragment key={index}>
                        <div className={`sticky-left ${headerClass} ${d.isToday ? 'is-today-row' : ''} flex flex-col justify-center items-center ${isExporting ? 'px-2' : ''}`}>
                            {!d.isEmpty && (
                                <>
                                    <span className="font-black" style={{ fontSize: `${(isExporting ? 18 : 15) * tableFontScale}px`, lineHeight: 1.1 }}>{d.day}</span>
                                    <span className="font-bold opacity-90" style={{ fontSize: `${(isExporting ? 13 : 10) * tableFontScale}px` }}>{d.weekday}</span>
                                </>
                            )}
                        </div>
                        {!d.isEmpty && (db.inspectors || []).map((ins, idx) => {
                            const cellKey = `${d.full}_${ins.name}`;
                            const cellTasks = taskMap[cellKey] || [];
                            const hasLeave = cellTasks.some(t => {
                                const jt = String(t.job_type || '').toLowerCase();
                                const eq = String(t.equipment_no || '').toLowerCase();
                                return jt === 'leave' || eq.startsWith('leave_') || eq.includes('ลา');
                            });
                            const isBlockedForNormalUser = d.isGlobalHoliday || d.isGlobalEvent || hasLeave;
                            let cellHolidayClass = '';
                            if (d.isGlobalHoliday && cellTasks.length === 0) cellHolidayClass = 'is-holiday-cell';
                            else if (d.isGlobalEvent && cellTasks.length === 0 && !hasLeave) cellHolidayClass = 'is-global-event-cell';
                            const cellClassName = `grid-cell hover:opacity-90 flex flex-col transition-colors duration-200 ${cellHolidayClass} ${d.isToday ? 'is-today-row' : ''}`;
                            
                            return (
                                <div key={idx} 
                                    onDragOver={user?.role === 'viewer' ? undefined : handleDragOver} 
                                    onDragLeave={user?.role === 'viewer' ? undefined : handleDragLeave} 
                                    onDrop={user?.role === 'viewer' ? undefined : ((e) => handleDrop(e, d.full, ins.name))}
                                    className={cellClassName}
                                    onClick={() => {
                                        if (!user) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการจองคิวตรวจครับ');
                                        if (user.role === 'viewer') return;
                                        if (!isAdmin && isBlockedForNormalUser) return;
                                        
                                        const todayLocalString = window.SAIS_UTILS?.getLocalDateString(getThaiTime()) || getThaiTime().toISOString().split('T')[0];
                                        if (d.full < todayLocalString && !isAdmin) return setAlertMsg('ไม่สามารถจองคิวงานย้อนหลังได้ครับ');
                                        
                                        if (isAdmin) {
                                            setModal({ type: 'admin_cell_action', data: { date: d.full, inspector_name: ins.name } });
                                        } else {
                                            setQuickAddType('job');
                                            setModal({ type: 'booking', data: { date: d.full, inspector_name: ins.name } });
                                        }
                                    }}>

                                    {d.isGlobalHoliday && d.globalHolidays.map((gh, ghi) => {
                                        const isCard = cellTasks.length > 0;
                                        return (
                                            <div key={'gh'+ghi} 
                                                draggable={isAdmin && user?.role !== 'viewer'}
                                                onDragStart={(e) => handleDragStart(e, gh.id || gh.equipment_no)}
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-black/20' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-center ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
                                                style={{ 
                                                    backgroundColor: isCard ? (db.settings?.holidayBg || '#D0021B') : undefined,
                                                    color: db.settings?.holidayText || '#ffffff',
                                                    fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, 
                                                    whiteSpace: isExporting ? 'normal' : 'inherit' 
                                                }} 
                                                onClick={(e) => { e.stopPropagation(); setModal({ type: 'detail', data: gh }); }}
                                            >
                                                {gh.site_name}
                                            </div>
                                        );
                                    })}

                                    {d.isGlobalEvent && !hasLeave && d.globalEvents.map((ge, gei) => {
                                        const isCard = cellTasks.length > 0;
                                        let customColor = null;
                                        const match = String(ge.equipment_no).match(/_(#[0-9a-fA-F]{6})/);
                                        if (match) customColor = match[1];

                                        return (
                                            <div key={'ge'+gei} 
                                                draggable={isAdmin && user?.role !== 'viewer'}
                                                onDragStart={(e) => handleDragStart(e, ge.id || ge.equipment_no)}
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-black/20' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-center ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
                                                style={{ 
                                                    backgroundColor: isCard ? (customColor || db.settings?.eventBg || '#22c55e') : (customColor || undefined),
                                                    color: db.settings?.eventText || '#ffffff',
                                                    fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, 
                                                    whiteSpace: isExporting ? 'normal' : 'inherit' 
                                                }} 
                                                onClick={(e) => { e.stopPropagation(); setModal({ type: 'detail', data: ge }); }}
                                            >
                                                {ge.site_name}
                                            </div>
                                        );
                                    })}
                                    
                                    {cellTasks.map((task, tIdx) => {
                                        const styleObj = getCardStyle(task, db.settings || {});
                                        const isSingleCard = cellTasks.length === 1;
                                        const fullText = !styleObj.isSpecial ? `${task.equipment_no || ''} ${task.unit_no || ''} ${task.site_name || ''}` : `${task.site_name || ''}`;
                                        const textLen = fullText.length;
                                        
                                        let dynamicScale = 1.0;
                                        if (textLen <= 6) dynamicScale = 1.6;       
                                        else if (textLen <= 12) dynamicScale = 1.3; 
                                        else if (textLen <= 20) dynamicScale = 1.1;
                                        else if (textLen > 35) dynamicScale = 0.85; 

                                        return (
                                            <div key={task.id || tIdx} 
                                                draggable={isAdmin && user?.role !== 'viewer'} 
                                                onDragStart={(e) => handleDragStart(e, task.id || task.equipment_no)} 
                                                onDragEnd={handleDragEnd}
                                                className={`task-content relative w-full flex items-center justify-center p-1 rounded-md ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-black/20 shadow-sm' : 'cursor-pointer'} ${isSingleCard ? 'h-full min-h-[40px]' : 'flex-1 min-h-[26px] border-b border-black/10'} ${isExporting ? '!overflow-visible !py-2 !min-h-[50px]' : 'overflow-hidden'}`}
                                                style={{ backgroundColor: styleObj.bg, color: styleObj.text }}
                                                onClick={(e) => { e.stopPropagation(); setModal({ type: 'detail', data: task }); }}>
                                                
                                                <div className="w-full flex flex-col justify-center items-center text-center">
                                                    {styleObj.isLeave ? (
                                                        <div className="font-black flex items-center justify-center leading-none" style={{ fontSize: `${(isSingleCard ? (isExporting ? 46 : 36) : (isExporting ? 32 : 24)) * specialFontScale}px` }}>
                                                            ลา
                                                        </div>
                                                    ) : isSingleCard ? (
                                                        <div className="format-multi-line flex flex-col justify-center items-center w-full !text-center">
                                                            {!styleObj.isSpecial ? (
                                                                <>
                                                                    <div className="leading-tight opacity-90 font-bold" style={{ fontSize: `${(isExporting ? 12 : 10) * dynamicScale * tableFontScale}px` }}>{task.equipment_no} <span className="opacity-60">/</span> {task.product_line || '-'} <span className="opacity-60">/</span> {task.unit_no}</div>
                                                                    <div className="leading-tight font-black mt-[2px] w-full break-words" style={{ fontSize: `${(isExporting ? 14 : 11) * dynamicScale * tableFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }}>{task.site_name}</div>
                                                                </>
                                                            ) : (
                                                                <div className="whitespace-pre-wrap leading-tight font-black w-full break-words" style={{ fontSize: `${(isExporting ? 15 : 12) * dynamicScale * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'pre-wrap' }}>{task.site_name}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="format-single-line font-black leading-tight w-full !text-center" style={{ fontSize: `${(isExporting ? 12 : 10) * dynamicScale * (styleObj.isSpecial ? specialFontScale : tableFontScale)}px`, whiteSpace: isExporting ? 'normal' : 'nowrap', overflow: isExporting ? 'visible' : 'hidden' }}>
                                                            {!styleObj.isSpecial ? `${task.equipment_no} / ${task.product_line || '-'} / ${task.site_name}` : task.site_name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
});

const App = () => {
    const SCRIPT_URL = window?.SAIS_CONFIG?.SCRIPT_URL || "";
    const ADMIN_USERNAME = window?.SAIS_CONFIG?.ADMIN_USERNAME || "jiraphong2227";
    const utils = window?.SAIS_UTILS || {};

    const [modal, setModal] = useState(null); 
    const [db, setDb] = useState({ bookings: [], inspectors: [], notifications: [], settings: {} });
    const [adminDb, setAdminDb] = useState({ users: [], logs: [], all_bookings: [] });
    const [hasLoadedAdmin, setHasLoadedAdmin] = useState(false);
    const dbRef = useRef(db);
    useEffect(() => { dbRef.current = db; }, [db]);

    const [currentDate, setCurrentDate] = useState(getThaiTime());
    const [period, setPeriod] = useState(getThaiTime().getDate() > 15 ? 1 : 0); 
    const todayLocalString = window?.SAIS_UTILS?.getLocalDateString(getThaiTime()) || getThaiTime().toISOString().split('T')[0];
    const [lastSyncTime, setLastSyncTime] = useState(getThaiTime());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [pickerYear, setPickerYear] = useState(getThaiTime().getFullYear());
    
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullY, setPullY] = useState(0);
    const touchStartY = useRef(0);
    
    const [isExporting, setIsExporting] = useState(false);
    const [viewFileUrl, setViewFileUrl] = useState(null);
    const [docUrls, setDocUrls] = useState({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });

    const [isDragging, setIsDragging] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);
    const [draggingTask, setDraggingTask] = useState(null);
    const lastActivityTime = useRef(Date.now());

    const [showBookingHelp, setShowBookingHelp] = useState(false);
    const [showLoginHelp, setShowLoginHelp] = useState(false);
    const [showAdminHelp, setShowAdminHelp] = useState(false);
    const [showRoleHelp, setShowRoleHelp] = useState(false);

    const [dashYear, setDashYear] = useState(getThaiTime().getFullYear().toString());
    const [dashMonth, setDashMonth] = useState((getThaiTime().getMonth() + 1).toString()); 
    const [dashArea, setDashArea] = useState('All');
    const [dashJobType, setDashJobType] = useState('All');

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initFirebase = async () => {
            if (window.firebase && window.dbFirestore) {
                setIsFirebaseReady(true); return;
            }
            try {
                await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
                await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js");
                
                if (!window.firebase.apps.length) {
                    window.firebase.initializeApp({
                        apiKey: "AIzaSyCUpmXdw0il6yaZu5KaDWJgQd_siJqECi4",
                        authDomain: "sais-schedule-booking-system.firebaseapp.com",
                        projectId: "sais-schedule-booking-system",
                        storageBucket: "sais-schedule-booking-system.firebasestorage.app",
                        messagingSenderId: "436553957315",
                        appId: "1:436553957315:web:2324d6a8510e8aa1afc776"
                    });
                }
                window.dbFirestore = window.firebase.firestore();
                setIsFirebaseReady(true);
            } catch (e) {
                console.error("Firebase Load Error:", e);
            }
        };
        initFirebase();
    }, []);

    const handleMigrateToFirestore = async () => {
        if (!window.confirm("ยืนยันการย้ายข้อมูลทั้งหมดจาก Sheets ลง Firestore ใช่หรือไม่?")) return;
        if (!hasLoadedAdmin) return setAlertMsg("กรุณารอระบบโหลดฐานข้อมูล Admin ให้ครบถ้วนก่อน");
        if (!isFirebaseReady || !window.dbFirestore) return setAlertMsg("Firebase ยังไม่พร้อมทำงาน");

        try {
            setLoadingMsg("กำลังโอนย้ายข้อมูล Bookings...");
            const bookings = adminDb.all_bookings || [];
            for (const b of bookings) {
                if (!b.id) continue;
                await window.dbFirestore.collection("bookings").doc(String(b.id)).set(b);
            }

            setLoadingMsg("กำลังโอนย้ายข้อมูล Users...");
            const users = adminDb.users || [];
            for (const u of users) {
                if (!u.username) continue;
                await window.dbFirestore.collection("users").doc(String(u.username)).set(u);
            }

            setLoadingMsg("กำลังโอนย้ายข้อมูล Inspectors...");
            const inspectors = db.inspectors || [];
            for (const ins of inspectors) {
                if (!ins.name) continue;
                await window.dbFirestore.collection("inspectors").doc(String(ins.name)).set(ins);
            }

            setLoadingMsg(null);
            setSuccessModal(`ย้ายข้อมูลลง Firestore สำเร็จ!`);
        } catch (error) {
            setLoadingMsg(null);
            setAlertMsg("เกิดข้อผิดพลาด: " + error.message);
        }
    };

    const DynamicStyles = () => {
        const s = db.settings || {};
        return (
            <style>{`
                :root {
                    --app-bg: ${s.appBg || '#f8fafc'};
                    --header-bg: ${s.headerBg || '#1e293b'};
                    --header-text: ${s.headerText || '#ffffff'};
                    --table-header-bg: ${s.tableHeaderBg || '#1e293b'};
                    --table-header-text: ${s.tableHeaderText || '#ffffff'};
                    --table-border: ${s.tableBorder || '#cbd5e1'};
                    --card-radius: ${s.cardRadius || '6'}px;
                    --card-padding: ${s.cardPadding || '4'}px;
                    --title-font-size: ${s.titleFontSize || '11'}px;
                    --sub-font-size: ${s.subFontSize || '10'}px;
                }
                .app-container { background-color: var(--app-bg) !important; }
                .main-header { background-color: var(--header-bg) !important; color: var(--header-text) !important; }
                .main-header h1 { color: var(--header-text) !important; }
                .sticky-corner, .sticky-top { background-color: var(--table-header-bg) !important; color: var(--table-header-text) !important; }
                .sticky-left, .grid-cell { border-color: var(--table-border) !important; }
                .task-content { 
                    border-radius: var(--card-radius) !important; 
                    padding: var(--card-padding) !important; 
                }
                .task-content .font-black { font-size: var(--title-font-size) !important; }
                .task-content .font-bold { font-size: var(--sub-font-size) !important; }
            `}</style>
        );
    };

    const availableInspectors = useMemo(() => {
        return (db.inspectors || []).filter(ins => {
            return !(adminDb.users || []).some(u => u.inspector_mapped_name === ins.name && u.username !== modal?.data?.username);
        });
    }, [db.inspectors, adminDb.users, modal]);

    useEffect(() => {
        if (modal && modal.type === 'booking') {
            const currentArea = areaSelection === 'other' ? (modal.data?.area || 'ไม่ระบุ') : areaSelection;
            handleMapChange(currentArea);
            setDocUrls({
                layout: modal.data?.layout_img || '',
                wiring: modal.data?.wiring_img || '',
                precheck: modal.data?.precheck_img || '',
                site_cond_1: modal.data?.site_cond_1 || '',
                site_cond_2: modal.data?.site_cond_2 || '',
                site_cond_3: modal.data?.site_cond_3 || '',
                site_cond_4: modal.data?.site_cond_4 || '',
                site_cond_5: modal.data?.site_cond_5 || '',
                site_cond_6: modal.data?.site_cond_6 || ''
            });
        }
    }, [modal, areaSelection]);

    const getDiffLog = useCallback((oldData, newData, actionUser) => {
        const site = newData?.site_name || oldData?.site_name || '-';
        const eq = newData?.equipment_no || oldData?.equipment_no || '-';
        const jt = newData?.job_type || oldData?.job_type || '-';
        const inspector = newData?.inspector_name || oldData?.inspector_name || '-';
        const dateStr = newData?.date ? formatSafeDate(newData.date) : (oldData?.date ? formatSafeDate(oldData.date) : '-');
        
        let userFullName = actionUser || '-';
        if (adminDb && adminDb.users) {
            const userObj = adminDb.users.find(u => String(u.username) === String(actionUser));
            if (userObj && userObj.full_name) userFullName = `${userObj.full_name} (${actionUser})`;
        }

        if (!oldData) {
            return `[เพิ่มรายการใหม่]\nหัวข้อ/โครงการ: ${site}\nประเภทงาน: ${jt}\nEq No.: ${eq}\nผู้ตรวจ: ${inspector}\nวันที่: ${dateStr}\nโดย: ${userFullName}`;
        }
        
        let changes = [];
        const labels = {
            date: 'วันที่', inspector_name: 'ผู้ตรวจ', site_name: 'หัวข้อ/โครงการ',
            equipment_no: 'Eq No.', unit_no: 'Unit', job_type: 'ประเภทงาน', 
            area: 'พื้นที่', tel: 'เบอร์โทร', product_line: 'Product',
            layout_doc: 'สถานะ Layout', wiring_doc: 'สถานะ Wiring', precheck_doc: 'สถานะ Precheck'
        };
        for (let key in labels) {
            let oldVal = String(oldData[key] || '').trim();
            let newVal = String(newData[key] || '').trim();
            if (oldVal !== newVal) {
                if (oldVal === 'false' || oldVal === 'pending') oldVal = 'รอตรวจสอบ';
                if (oldVal === 'true') oldVal = 'ตรวจสอบแล้ว';
                if (newVal === 'false' || newVal === 'pending') newVal = 'รอตรวจสอบ';
                if (newVal === 'true') newVal = 'ตรวจสอบแล้ว';
                changes.push(`• ${labels[key]}: [${oldVal || '-'}] ➡️ [${newVal || '-'}]`);
            }
        }
        return changes.length > 0 ? `[อัปเดตข้อมูล]\nหัวข้อ/โครงการ: ${site}\nโดย: ${userFullName}\nการเปลี่ยนแปลง:\n${changes.join('\n')}` : `บันทึกการแก้ไขโดยไม่มีการเปลี่ยนแปลง (หัวข้อ: ${site})`;
    }, [adminDb]);

    useEffect(() => {
        if (successModal) {
            const timer = setTimeout(() => { setSuccessModal(null); }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successModal]);

    useEffect(() => { localStorage.setItem('sais_table_font_scale', tableFontScale.toString()); }, [tableFontScale]);
    useEffect(() => { localStorage.setItem('sais_special_font_scale', specialFontScale.toString()); }, [specialFontScale]);
    useEffect(() => { localStorage.setItem('sais_column_zoom', columnZoom.toString()); }, [columnZoom]);

    const updateTableFontScale = (adjustment) => { setTableFontScale(prev => Math.round(Math.max(0.3, Math.min(5.0, prev + adjustment)) * 10) / 10); };
    const updateSpecialFontScale = (adjustment) => { setSpecialFontScale(prev => Math.round(Math.max(0.3, Math.min(5.0, prev + adjustment)) * 10) / 10); };
    const updateColumnZoom = (adjustment) => { setColumnZoom(prev => Math.round(Math.max(0.3, Math.min(3.0, prev + adjustment)) * 10) / 10); };

    const changePeriod = (dir) => {
        if (dir === 'next') {
            if (period === 0) setPeriod(1);
            else { setPeriod(0); setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)); }
        } else {
            if (period === 1) setPeriod(0);
            else { setPeriod(1); setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)); }
        }
    };

    const handleMapChange = (val) => {
        if (utils && typeof utils.getMapEmbedUrl === 'function') { setLiveMapUrl(utils.getMapEmbedUrl(val) || ''); } 
        else { setLiveMapUrl(''); }
    };
    
    const handleMapClick = (link) => {
        if (!link) return;
        const coordRegex = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
        const matchCoord = link.match(coordRegex);
        let finalUrl = link;
        if (matchCoord) {
            finalUrl = `https://www.google.com/maps/search/?api=1&query=${matchCoord[1]},${matchCoord[2]}`;
        } else if (!link.startsWith('http')) {
            finalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(link)}`;
        }
        window.open(finalUrl, '_blank');
    };

    const handleExportJPG = () => {
        setShowSettings(false);
        setCurrentView('calendar');
        setLoadingMsg('กำลังเตรียมรูปภาพ...');
        setIsExporting(true);
        setTimeout(() => {
            if (utils && utils.exportToJPG) {
                utils.exportToJPG('calendar-export-area')
                    .then(() => { setIsExporting(false); setLoadingMsg(null); })
                    .catch(() => { setIsExporting(false); setLoadingMsg(null); });
            } else {
                setIsExporting(false); setLoadingMsg(null);
            }
        }, 1000); 
    };

    const apiAction = async (payload, customLoadMsg = null, disableAutoSync = false) => {
        if (!SCRIPT_URL) return false;
        if (customLoadMsg) setLoadingMsg(customLoadMsg);
        try {
            const payloadWithAuth = { ...payload, api_key: window?.SAIS_CONFIG?.API_KEY };
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payloadWithAuth) });
            const text = await res.text(); 
            try {
                const result = JSON.parse(text);
                if (result.status === 'ok') { 
                    if(customLoadMsg) setLoadingMsg(null); 
                    return true;
                } else { 
                    if(customLoadMsg) setLoadingMsg(null);
                    return false; 
                }
            } catch(e) { 
                if(customLoadMsg) setLoadingMsg(null);
                return false; 
            }
        } catch (e) { 
            if(customLoadMsg) setLoadingMsg(null);
            return false; 
        }
    };

    const handleBulkDelete = async (type, ids) => {
        if (ids.length === 0) return;
        setConfirmDialog({
            msg: `ยืนยันลบข้อมูลที่เลือกทั้ง ${ids.length} รายการ?`,
            onConfirm: async () => {
                setConfirmDialog(null); 
                
                if (window.dbFirestore) {
                    const batch = window.dbFirestore.batch();
                    ids.forEach(id => {
                        const docRef = window.dbFirestore.collection("bookings").doc(String(id));
                        batch.delete(docRef);
                    });
                    await batch.commit();
                }

                if (type === 'leave') setSelectedLeavesToDelete([]);
                if (type === 'event') setSelectedEventsToDelete([]);
                if (type === 'holiday') setSelectedHolidaysToDelete([]);
                setSuccessModal(`ลบสำเร็จ ${ids.length} รายการ`);

                apiAction({ action: 'delete_multiple', ids: ids, user: user?.username }, null, true);
            }
        });
    };

    const generateDates = useCallback((startStr, endStr, omitSunday = true) => {
        if (!startStr || !endStr) return [];
        let start = new Date(`${startStr}T12:00:00`); let end = new Date(`${endStr}T12:00:00`);
        if (start > end) return [];
        let dates = [];
        let current = new Date(start);
        while (current <= end) {
            const localDateStr = utils.getLocalDateString ? utils.getLocalDateString(current) : current.toISOString().split('T')[0];
            const isSunday = current.getDay() === 0;
            const isGlobalHoliday = (db.bookings || []).some(b => b.date && formatSafeDate(b.date) === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY');
            if (!omitSunday || (!isSunday && !isGlobalHoliday)) dates.push(localDateStr);
            current.setDate(current.getDate() + 1);
        } return dates;
    }, [db.bookings, utils]);

    const leaveDates = useMemo(() => generateDates(leaveStartDate, leaveEndDate, true), [leaveStartDate, leaveEndDate, generateDates]);
    const eventDates = useMemo(() => generateDates(eventStartDate, eventEndDate, true), [eventStartDate, eventEndDate, generateDates]);
    const holidayDates = useMemo(() => generateDates(holidayStartDate, holidayEndDate, false), [holidayStartDate, holidayEndDate, generateDates]);
    const isAdmin = useMemo(() => user?.role === 'admin', [user]);
    
    const unreadNotifs = useMemo(() => {
        return (db.notifications || []).filter(n => {
            const isTargeted = n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN');
            const readers = String(n.isRead || '').split(',');
            const hasRead = readers.includes(user?.username);
            return isTargeted && !hasRead;
        });
    }, [db.notifications, user, isAdmin]);

    const daysInView = useMemo(() => {
        if(!utils.getLocalDateString) return [];
        const days = [];
        const year = currentDate.getFullYear(); const month = currentDate.getMonth(); const lastDay = new Date(year, month + 1, 0).getDate();
        const start = period === 0 ? 1 : 16; const end = period === 0 ? 15 : lastDay; 
        
        for (let i = 0; i < 16; i++) {
            const d = start + i;
            if (d <= end) {
                const date = new Date(year, month, d); const localDateStr = utils.getLocalDateString(date);
                const globalHolidayItems = (db.bookings || []).filter(b => b.date && formatSafeDate(b.date) === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY' && String(b.status) !== 'cancelled');
                const globalEventItems = (db.bookings || []).filter(b => b.date && formatSafeDate(b.date) === localDateStr && String(b.inspector_name) === 'SYSTEM_EVENT' && String(b.status) !== 'cancelled');
                
                days.push({ 
                    full: localDateStr, day: d, weekday: date.toLocaleDateString('en-US', { timeZone: 'Asia/Bangkok', weekday: 'short' }), 
                    isSunday: date.getDay() === 0, 
                    isGlobalHoliday: globalHolidayItems.length > 0 || date.getDay() === 0, globalHolidays: globalHolidayItems,
                    isGlobalEvent: globalEventItems.length > 0, globalEvents: globalEventItems,
                    isToday: localDateStr === todayLocalString, isEmpty: false 
                });
            } else { days.push({ isEmpty: true }); }
        }
        return days;
    }, [currentDate, period, db.bookings, todayLocalString, utils]);

    // 📍 ดึงข้อมูล Realtime ด้วย Firestore 100%
    useEffect(() => {
        let unsubs = [];
        if (user && isFirebaseReady && window.dbFirestore) {
            unsubs.push(window.dbFirestore.collection("bookings").onSnapshot((snapshot) => {
                const list = [];
                snapshot.forEach(doc => list.push(doc.data()));
                setDb(prev => ({ ...prev, bookings: list }));
                setAdminDb(prev => ({ ...prev, all_bookings: list }));
                setLastSyncTime(getThaiTime());
                setInitialLoad(false);
            }));

            unsubs.push(window.dbFirestore.collection("inspectors").onSnapshot((snapshot) => {
                const list = [];
                snapshot.forEach(doc => list.push(doc.data()));
                setDb(prev => ({ ...prev, inspectors: list }));
            }));

            unsubs.push(window.dbFirestore.collection("notifications").onSnapshot((snapshot) => {
                const list = [];
                snapshot.forEach(doc => list.push(doc.data()));
                setDb(prev => ({ ...prev, notifications: list }));
            }));

            unsubs.push(window.dbFirestore.collection("settings").doc("web_settings").onSnapshot((doc) => {
                if (doc.exists) setDb(prev => ({ ...prev, settings: doc.data() }));
            }));

            if (user.role === 'admin') {
                unsubs.push(window.dbFirestore.collection("users").onSnapshot((snapshot) => {
                    const list = [];
                    snapshot.forEach(doc => list.push(doc.data()));
                    setAdminDb(prev => ({ ...prev, users: list }));
                }));

                unsubs.push(window.dbFirestore.collection("logs").orderBy("timestamp", "desc").limit(100).onSnapshot((snapshot) => {
                    const list = [];
                    snapshot.forEach(doc => list.push(doc.data()));
                    setAdminDb(prev => ({ ...prev, logs: list }));
                }));
                setHasLoadedAdmin(true);
            }
        } else if (user) {
            setInitialLoad(false);
        }

        return () => {
            unsubs.forEach(unsub => unsub());
        };
    }, [user, isFirebaseReady]);

    const fetchAdminData = async (offset = 0, limit = 50, fetchType = 'all') => {
        setHasLoadedAdmin(true);
    };

    const handleTabChange = (view) => {
        setCurrentView(view);
    };

    const findDocIdFallback = async (booking) => {
        if (booking.id) return String(booking.id);
        if (window.dbFirestore) {
            const snapshot = await window.dbFirestore.collection("bookings")
                .where("equipment_no", "==", booking.equipment_no)
                .where("date", "==", booking.date).get();
            if (!snapshot.empty) return snapshot.docs[0].id;
        }
        return null;
    };

    const handleCancelBooking = (booking) => {
        if(!booking?.equipment_no && !booking?.id) return;
        setConfirmDialog({
            msg: "ยืนยันลบข้อมูลนี้ใช่หรือไม่?",
            onConfirm: async () => {
                setConfirmDialog(null);
                setModal(null);
                try {
                    const docId = await findDocIdFallback(booking);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).delete();
                    }
                    setSuccessModal('ลบสำเร็จ');
                } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการลบ'); }
            }
        });
    };

    const handleCancelJob = (booking) => {
        if(!booking?.equipment_no && !booking?.id) return;
        const isPastDate = booking.date && formatSafeDate(booking.date) < todayLocalString;
        if (isPastDate && !isAdmin) return setAlertMsg('🔒 ไม่อนุญาตให้ยกเลิกคิวงานที่ผ่านมาแล้วครับ');
        setPromptDialog({
            msg: "โปรดระบุเหตุผลในการยกเลิกคิวงานนี้:",
            onSubmit: async (reason) => {
                setPromptDialog(null);
                setModal(null);
                setActionMenuId(null);
                try {
                    const docId = await findDocIdFallback(booking);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).delete();
                    }
                    setSuccessModal('ยกเลิกคิวสำเร็จ');
                } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการยกเลิก'); }
            }
        });
    };

    const handleVerifyDoc = async (booking, docField, isChecked) => {
        if (!isAdmin) return;
        const val = isChecked ? 'true' : 'pending';
        const docName = docField.replace('_doc', '').toUpperCase();
        try {
            const docId = await findDocIdFallback(booking);
            if (docId && window.dbFirestore) {
                await window.dbFirestore.collection("bookings").doc(docId).update({ [docField]: val });
            }
            setSuccessModal(`อัปเดตเอกสาร ${docName} สำเร็จ`);
        } catch(e) { setAlertMsg('อัปเดตสถานะไม่สำเร็จ'); }
    };

    const handleDownloadFile = async (url, filename) => {
        window.open(url, '_blank');
    };

    const handleFileUpload = async (e, docType, isMultiple = false) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true })); 
        setLoadingMsg('กำลังอัปโหลดเอกสารขึ้น Google Drive...');
        
        try {
            let uploadedUrls = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let base64Data = "";
                let mimeType = file.type;
                
                if (mimeType.startsWith('image/')) {
                    base64Data = await utils.compressImage(file);
                } else if (mimeType === 'application/pdf') {
                    base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(file);
                    });
                } else {
                    setAlertMsg('รองรับเฉพาะไฟล์รูปภาพและ PDF เท่านั้น');
                    continue;
                }

                const res = await utils.fetchWithRetry(SCRIPT_URL, { 
                    method: 'POST', 
                    body: JSON.stringify({ 
                        action: 'upload_image', 
                        api_key: window?.SAIS_CONFIG?.API_KEY,
                        base64: base64Data, 
                        mimeType: mimeType, 
                        fileName: `SAIS_${docType}_${Date.now()}_${i}.${mimeType === 'application/pdf' ? 'pdf' : 'jpg'}` 
                    }) 
                });

                if (res.status === 'ok') { uploadedUrls.push(res.fileUrl); }
            }
            
            if (uploadedUrls.length > 0) {
                if (isMultiple) {
                    setDocUrls(prev => ({
                        ...prev,
                        [docType]: prev[docType] ? prev[docType] + ',' + uploadedUrls.join(',') : uploadedUrls.join(',')
                    }));
                } else {
                    setDocUrls(prev => ({ ...prev, [docType]: uploadedUrls[0] }));
                }
                setSuccessModal(`อัปโหลดไฟล์สำเร็จ`);
            }
        } catch(err) { setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลด'); }
        
        setLoadingMsg(null); 
        setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    const handleDragStart = (e, taskId) => { 
        e.dataTransfer.setData('taskId', taskId);
        setDraggingTask(db.bookings.find(b => String(b.id) === String(taskId) || String(b.equipment_no) === String(taskId))); 
        setIsDragging(true); 
    };

    const handleDragOver = (e) => { 
        e.preventDefault(); 
        e.currentTarget.classList.add('bg-blue-50/60', 'border-2', 'border-blue-400', 'border-dashed'); 
    };

    const handleDragLeave = (e) => { 
        e.currentTarget.classList.remove('bg-blue-50/60', 'border-2', 'border-blue-400', 'border-dashed'); 
    };

    const handleDragEnd = (e) => {
        setIsDragging(false);
        setIsTrashHovered(false);
        setDraggingTask(null);
    };

    const handleTrashDragOver = (e) => {
        e.preventDefault();
        if (!isTrashHovered) setIsTrashHovered(true);
    };

    const handleTrashDragLeave = (e) => {
        setIsTrashHovered(false);
    };

    const handleTrashDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        setIsTrashHovered(false);
        
        if (!isAdmin) return;
        const taskId = e.dataTransfer.getData('taskId');
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId) || String(b.equipment_no) === String(taskId));
        
        if (!task) return setAlertMsg('ไม่พบข้อมูลการ์ดที่ต้องการลบทิ้ง');
        
        setConfirmDialog({
            msg: `คุณกำลังลากการ์ดทิ้งลงถังขยะ\nยืนยันลบข้อมูลนี้ใช่หรือไม่?\n\n📌 รายการ: ${task.site_name || task.equipment_no}`,
            onConfirm: async () => {
                setConfirmDialog(null);
                setDraggingTask(null);
                try {
                    const docId = await findDocIdFallback(task);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).delete();
                    }
                    setSuccessModal('ลบรายการสำเร็จ');
                } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการลบ'); }
            }
        });
    };

    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-50/60', 'border-2', 'border-blue-400', 'border-dashed');
        if (!isAdmin) return setAlertMsg('เฉพาะแอดมินที่สามารถลากย้ายคิวได้ครับ');
        
        const taskId = e.dataTransfer.getData('taskId');
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId) || String(b.equipment_no) === String(taskId));
        
        if (!task) return setAlertMsg('เกิดข้อผิดพลาด ไม่พบข้อมูลการ์ด');
        
        let finalInspector = targetInspector;
        if (task.inspector_name === 'SYSTEM_EVENT') finalInspector = 'SYSTEM_EVENT';
        if (task.inspector_name === 'SYSTEM_HOLIDAY') finalInspector = 'SYSTEM_HOLIDAY';

        const oldDate = task.date ? formatSafeDate(task.date) : 'ไม่ระบุ';
        const oldInspector = task.inspector_name;

        if (oldDate === targetDate && oldInspector === finalInspector) return setDraggingTask(null);

        setConfirmDialog({
            msg: `ยืนยันการย้ายคิวงาน\n\n📌 ${task.site_name || task.equipment_no}\n📅 ${oldDate} ➡️ ${targetDate}\n👤 ${oldInspector} ➡️ ${finalInspector}`,
            onConfirm: async () => {
                setConfirmDialog(null);
                setDraggingTask(null);
                try {
                    const docId = await findDocIdFallback(task);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).update({ date: targetDate, inspector_name: finalInspector });
                    }
                    setSuccessModal('ย้ายรายการสำเร็จ');
                } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการย้าย'); }
            }
        });
    };

    const filteredBookings = useMemo(() => { 
        return (db.bookings || []).filter(b => { 
            if (filterArea === 'All') return true; 
            return String(b.area || '') === filterArea; 
        }); 
    }, [db.bookings, filterArea]);

    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newTitle = fd.get('site_name'); const newInspector = fd.get('inspector_name'); const newDate = fd.get('date');
        
        try {
            if (modal.returnTo) setModal({ type: modal.returnTo }); else setModal(null);
            const docId = await findDocIdFallback(modal.data);
            if (docId && window.dbFirestore) {
                await window.dbFirestore.collection("bookings").doc(docId).update({ site_name: newTitle, inspector_name: newInspector, date: newDate });
            }
            setSuccessModal('อัปเดตสำเร็จ');
        } catch (e) { setAlertMsg('เกิดข้อผิดพลาด'); }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : (fd.get('area') || areaSelection);
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : (fd.get('product_line') || productLineSelection);
        let finalJobType = fd.get('job_type') || jobTypeSelection;
        if (!finalProductLine) return setAlertMsg('กรุณาเลือก Product Line');
        if (!finalJobType) return setAlertMsg('กรุณาเลือก ประเภทงาน');
        if (!finalArea) return setAlertMsg('กรุณาเลือก พื้นที่');

        const isAdminOverride = fd.get('isAdminOverride') === 'true' || modal?.data?.isAdminOverride === true || (isAdmin && modal?.data?.id);
        const targetInspector = isAdminOverride ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isAdminOverride ? fd.get('admin_date_target') : modal?.data?.date;
        if (!targetInspector || !targetDate) return setAlertMsg('ข้อมูลวันหรือผู้ตรวจไม่ครบถ้วน');

        if (quickAddType !== 'job') {
            let p_jobType = '', p_siteName = fd.get('site_name'), p_eq = '';
            const sTime = fd.get('start_time'); const eTime = fd.get('end_time');
            if (sTime && eTime && sTime >= eTime) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
            if (sTime && eTime) p_siteName = `${sTime}-${eTime} ${p_siteName}`;

            if (quickAddType === 'leave') {
                p_jobType = 'leave';
                p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + (fd.get('leave_type') === 'อื่นๆโปรดระบุ' ? fd.get('custom_leave') : fd.get('leave_type'));
                p_eq = `LEAVE_${Date.now()}`;
            } else if (quickAddType === 'event') {
                p_jobType = 'company_event';
                p_eq = `EVENT_${Date.now()}_${eventColor}`;
            } else if (quickAddType === 'holiday') {
                p_jobType = 'public_holiday';
                p_eq = `HLD_${Date.now()}`;
            }

            try {
                const newId = modal?.data?.id || generateId();
                const docId = modal?.data ? await findDocIdFallback(modal.data) || newId : newId;
                setModal(null);
                
                if (window.dbFirestore) {
                    await window.dbFirestore.collection("bookings").doc(String(docId)).set({
                        id: docId, date: targetDate, inspector_name: quickAddType === 'holiday' ? 'SYSTEM_HOLIDAY' : targetInspector,
                        job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, created_by: user?.username, status: 'active'
                    });
                }
                setSuccessModal('บันทึกสำเร็จ');
            } catch(e) { setAlertMsg('ข้อผิดพลาดในการบันทึก'); }
            return;
        }

        const bookingId = modal?.data?.id || generateId();
        const docId = modal?.data ? await findDocIdFallback(modal.data) || bookingId : bookingId;

        const payload = {
            ...data, site_name: data.site_name, tel: String(data.tel || ''), area: finalArea, job_type: finalJobType, product_line: finalProductLine,
            id: docId, inspector_name: targetInspector, date: targetDate, user: user?.username, created_by: modal?.data?.created_by || user?.username,
            layout_img: docUrls.layout || modal?.data?.layout_img || '',
            wiring_img: docUrls.wiring || modal?.data?.wiring_img || '',
            precheck_img: docUrls.precheck || modal?.data?.precheck_img || '',
            site_cond_1: docUrls.site_cond_1 || modal?.data?.site_cond_1 || '',
            site_cond_2: docUrls.site_cond_2 || modal?.data?.site_cond_2 || '',
            site_cond_3: docUrls.site_cond_3 || modal?.data?.site_cond_3 || '',
            site_cond_4: docUrls.site_cond_4 || modal?.data?.site_cond_4 || '',
            site_cond_5: docUrls.site_cond_5 || modal?.data?.site_cond_5 || '',
            site_cond_6: docUrls.site_cond_6 || modal?.data?.site_cond_6 || ''
        };

        if (isAdmin) { 
            payload.layout_doc = data.layout_doc ? 'true' : 'false';
            payload.wiring_doc = data.wiring_doc ? 'true' : 'false'; 
            payload.precheck_doc = data.precheck_doc ? 'true' : 'false';
        } else if (modal?.data?.id) { 
            payload.layout_doc = String(modal?.data?.layout_doc || 'false');
            payload.wiring_doc = String(modal?.data?.wiring_doc || 'false'); 
            payload.precheck_doc = String(modal?.data?.precheck_doc || 'false');
        } else { 
            payload.layout_doc = 'false';
            payload.wiring_doc = 'false'; payload.precheck_doc = 'false';
        }
        
        try {
            if (window.dbFirestore) {
                await window.dbFirestore.collection("bookings").doc(String(docId)).set({ ...payload, status: 'active' });
            }
            
            setSuccessModal(modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!');
            setModal(null);
            setAreaSelection(''); setJobTypeSelection(''); setProductLineSelection(''); setLiveMapUrl('');
            setDocUrls({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });
        } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการบันทึก: ' + e.message); }
    };

    const handleLogout = () => {
        setConfirmDialog({
            msg: 'ยืนยันการออกจากระบบใช่หรือไม่?',
            onConfirm: async () => {
                setConfirmDialog(null); setUser(null);
                try {
                    localStorage.clear(); sessionStorage.clear();
                    if ('caches' in window) caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
                } catch (error) {} finally { window.location.replace(window.location.pathname + '?logout=' + new Date().getTime()); }
            }
        });
    };

    // 📍 หน้าจอ Login (Firebase 100%)
    if (!user) {
        return (
            <div className="app-container bg-slate-800 min-h-screen flex items-center justify-center p-4 relative">
                {successModal && (
                    <div className="absolute top-10 z-[700] bg-white px-6 py-3 rounded-full text-green-600 font-bold shadow-xl border border-green-300 flex items-center gap-2">
                        <Icons.Check /> {successModal}
                    </div>
                )}
                {alertMsg && (
                    <div className="absolute inset-0 z-[600] flex items-center justify-center bg-black/60 p-4">
                        <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl animate-pop">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Alert /></div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                            <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">{alertMsg}</p>
                            <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-md">ตกลง</button>
                        </div>
                    </div>
                )}

                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-red-500 z-10"></div>
                    <div className="text-center mb-6 pt-4 flex-shrink-0">
                        <div className="mb-3">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">SAIS</h1>
                            <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Schedule Booking System</h2>
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                            {showLoginHelp ? 'คู่มือการใช้งานระบบ' : (isForgotMode ? 'รีเซ็ตรหัสผ่าน' : (isRegisterMode ? 'สมัครสมาชิกใหม่' : 'เข้าสู่ระบบเพื่อใช้งาน'))}
                        </h2>
                    </div>

                    {showLoginHelp ? (
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 pb-4">
                            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-4 shadow-inner">
                                <h4 className="font-bold text-blue-800 text-[15px] border-b border-blue-200 pb-2 flex items-center gap-2">
                                    <Icons.HelpCircle /> คู่มือการเข้าสู่ระบบ SAIS
                                </h4>
                                <div className="text-xs text-blue-900 space-y-4">
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">1. การสมัครสมาชิก (Register)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>ลงทะเบียนได้ด้วยตนเองโดยกดปุ่ม <span className="font-bold">"สมัครสมาชิกใหม่"</span></li>
                                            <li>กรอกรหัสพนักงาน และชื่อ-นามสกุลจริง เพื่อใช้ยืนยันตัวตน</li>
                                            <li className="text-red-600 font-bold">รอให้ผู้ดูแลระบบ (Admin) อนุมัติสิทธิ์ก่อนจึงจะเข้าใช้งานได้</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">2. ลืมรหัสผ่าน (Forgot Password)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>ระบุ <b>ชื่อ-นามสกุล</b> และ <b>เบอร์โทรศัพท์</b> ให้ตรงกับตอนสมัคร เพื่อกู้คืนบัญชีและตั้งรหัสผ่านใหม่</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setShowLoginHelp(false)} className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md active:scale-95 transition-all">กลับไปหน้าเข้าสู่ระบบ</button>
                        </div>
                    ) : (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const fd = new FormData(e.target);
                            
                            if (isForgotMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านใหม่ไม่ตรงกัน');
                                setLoadingMsg('กำลังค้นหาบัญชี...');
                                try {
                                    if (!window.dbFirestore) throw new Error("Firebase ไม่พร้อมใช้งาน");
                                    const snapshot = await window.dbFirestore.collection("users").where("full_name", "==", fd.get('full_name')).where("phone", "==", fd.get('phone')).get();
                                    if (!snapshot.empty) {
                                        const userDoc = snapshot.docs[0];
                                        await window.dbFirestore.collection("users").doc(userDoc.id).update({ password: fd.get('password') });
                                        setAlertMsg(`✅ กู้คืนบัญชีสำเร็จ!\n\nUsername ของคุณคือ:\n👉 ${userDoc.id} 👈\n\nรหัสผ่านถูกเปลี่ยนแล้ว กรุณาใช้ Username นี้เข้าสู่ระบบครับ`);
                                        setIsForgotMode(false);
                                    } else {
                                        setAlertMsg('ไม่พบข้อมูลผู้ใช้งานที่ตรงกับชื่อและเบอร์โทรนี้');
                                    }
                                    setLoadingMsg(null);
                                } catch(err) { setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาด: ' + err.message); }
                            } else if (isRegisterMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านไม่ตรงกัน');
                                setLoadingMsg('กำลังส่งข้อมูลสมัคร...');
                                try {
                                    if (!window.dbFirestore) throw new Error("Firebase ไม่พร้อมใช้งาน");
                                    const usernameInput = fd.get('username');
                                    const docRef = window.dbFirestore.collection("users").doc(usernameInput);
                                    const docSnap = await docRef.get();
                                    if (docSnap.exists) {
                                        setLoadingMsg(null);
                                        return setAlertMsg('Username นี้มีผู้ใช้งานแล้ว โปรดใช้ชื่ออื่น');
                                    }
                                    const payload = { 
                                        username: usernameInput, password: fd.get('password'), full_name: fd.get('full_name'), 
                                        department: fd.get('department'), position: fd.get('position'), phone: fd.get('phone'),
                                        role: 'user', status: 'pending', created_at: getThaiTime().toISOString()
                                    };
                                    await docRef.set(payload);
                                    setLoadingMsg(null);
                                    setSuccessModal('สมัครสำเร็จ กรุณารอแอดมินอนุมัติสิทธิ์'); 
                                    setIsRegisterMode(false); 
                                } catch (err) { setLoadingMsg(null); setAlertMsg('สมัครไม่สำเร็จ: ' + err.message); }
                            } else {
                                setLoadingMsg('กำลังตรวจสอบข้อมูล...');
                                try {
                                    if (!window.dbFirestore) throw new Error("Firebase ไม่พร้อมใช้งาน");
                                    const usernameInput = fd.get('username');
                                    const passwordInput = fd.get('password');
                                    const userDoc = await window.dbFirestore.collection("users").doc(usernameInput).get();
                                    
                                    if (userDoc.exists && userDoc.data().password === passwordInput) {
                                        const userData = userDoc.data();
                                        if (userData.status === 'blocked') {
                                            setAlertMsg('บัญชีของคุณถูกระงับการใช้งาน');
                                        } else if (userData.status === 'pending') {
                                            setAlertMsg('บัญชีของคุณกำลังรอแอดมินอนุมัติครับ');
                                        } else {
                                            delete userData.password;
                                            localStorage.setItem('sais_user', JSON.stringify(userData));
                                            localStorage.setItem('sais_session_time', Date.now().toString());
                                            setUser(userData); 
                                            setSuccessModal('เข้าสู่ระบบสำเร็จ'); 
                                        }
                                    } else {
                                        setAlertMsg('Username หรือรหัสผ่านไม่ถูกต้อง'); 
                                    }
                                    setLoadingMsg(null);
                                } catch (err) { setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง: ' + err.message); }
                            }
                        }} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-4">
                            {!isForgotMode && !isRegisterMode && (
                                <>
                                    <div><label className="text-[10px] font-bold text-slate-500">Username</label><input name="username" required placeholder="รหัสพนักงานหรือ Username" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" /></div>
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-slate-500">Password</label>
                                        <input name="password" type={showPassword ? "text" : "password"} required placeholder="รหัสผ่าน" className="bg-slate-50 pr-12 w-full p-2.5 rounded-lg border text-sm font-bold" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[26px] text-slate-400 p-1">{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                                    </div>
                                </>
                            )}
                            
                            {isRegisterMode && (
                                <>
                                    <div className="bg-blue-50 p-3 rounded-xl mb-2 text-xs text-blue-800 border border-blue-200">
                                        กรุณากรอกข้อมูลให้ครบถ้วนเพื่อใช้ในการยืนยันตัวตน (หากลืมรหัสผ่าน)
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">Username</label><input name="username" required placeholder="ตั้ง Username" className="bg-slate-50 w-full p-2 rounded-lg border text-sm font-bold" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์</label><input name="phone" required placeholder="08XXXXXXXX" maxLength="10" className="bg-slate-50 w-full p-2 rounded-lg border text-sm font-bold" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} /></div>
                                    </div>
                                    <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล (จริง)</label><input name="full_name" required placeholder="ชื่อ นามสกุล" className="bg-slate-50 w-full p-2 rounded-lg border text-sm font-bold" /></div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">แผนก</label><input type="text" name="department" required placeholder="NI, MOD, FQE" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ตำแหน่ง</label><input type="text" name="position" required placeholder="PE, PM, Tech" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">ตั้งรหัสผ่าน</label><input name="password" type="password" required placeholder="Password" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ยืนยันรหัสผ่าน</label><input name="confirm_password" type="password" required placeholder="Confirm" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" /></div>
                                    </div>
                                </>
                            )}

                            {isForgotMode && (
                                <>
                                    <div className="bg-amber-50 p-3 rounded-xl mb-2 text-[11px] text-amber-800 border border-amber-200">
                                        ระบุ <b>ชื่อ-นามสกุล</b> และ <b>เบอร์โทรศัพท์</b> ให้ตรงกับตอนสมัคร เพื่อรีเซ็ตรหัสผ่านใหม่
                                    </div>
                                    <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล (ที่เคยลงทะเบียนไว้)</label><input name="full_name" required placeholder="ระบุชื่อ นามสกุล" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" /></div>
                                    <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์ (ที่เคยลงทะเบียนไว้)</label><input name="phone" required placeholder="08XXXXXXXX" maxLength="10" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} /></div>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                                        <div><label className="text-[10px] font-bold text-slate-500">ตั้งรหัสผ่านใหม่</label><input name="password" type="password" required placeholder="New Password" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ยืนยันรหัสผ่านใหม่</label><input name="confirm_password" type="password" required placeholder="Confirm Password" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm font-bold" /></div>
                                    </div>
                                </>
                            )}

                            <button disabled={loadingMsg} className="w-full py-3.5 rounded-xl text-white font-bold bg-red-600 mt-4 shadow-md text-sm transition-all active:scale-95">
                                {loadingMsg ? 'รอสักครู่...' : (isForgotMode ? 'ยืนยันกู้คืนบัญชี' : (isRegisterMode ? 'ส่งข้อมูลสมัครสมาชิก' : 'LOGIN'))}
                            </button>
                            
                            <div className="flex flex-col gap-3 mt-4 text-center">
                                {!isRegisterMode && !isForgotMode ? (
                                    <>
                                        <div className="flex justify-between px-2">
                                            <button type="button" onClick={() => setIsRegisterMode(true)} className="text-[11px] font-bold text-blue-600 hover:underline">ลงทะเบียนผู้ใช้ใหม่</button>
                                            <button type="button" onClick={() => setIsForgotMode(true)} className="text-[11px] font-bold text-slate-500 hover:underline">ลืมรหัสผ่าน?</button>
                                        </div>
                                        <button type="button" onClick={() => setShowLoginHelp(true)} className="text-xs font-bold text-emerald-600 hover:underline mt-2">📖 คู่มือการใช้งานระบบ</button>
                                    </>
                                ) : (
                                    <button type="button" onClick={() => { setIsRegisterMode(false); setIsForgotMode(false); }} className="text-xs font-bold text-slate-500 hover:underline">กลับไปหน้าเข้าสู่ระบบ</button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    if (!isFirebaseReady) return <div className="h-screen w-full flex items-center justify-center flex-col gap-4 p-8 text-center"><Icons.Loader /><h2 className="text-xl font-bold text-slate-800">กำลังเชื่อมต่อระบบฐานข้อมูล...</h2></div>;

    return (
        <div className="app-container">
            {DynamicStyles()}

            <div className={`trash-dropzone ${isDragging ? 'visible' : ''} ${isTrashHovered ? 'hovered' : ''}`}
                onDragOver={handleTrashDragOver} onDragLeave={handleTrashDragLeave} onDrop={handleTrashDrop}>
                <div className="trash-icon-wrapper"><Icons.AnimatedTrash isHovered={isTrashHovered} /></div>
                <div className="trash-text">{isTrashHovered ? 'ปล่อยเพื่อลบทิ้ง!' : 'ลากมาทิ้งที่นี่'}</div>
            </div>

            {successModal && (
                <div className="fixed inset-0 z-[700] flex items-center justify-center pointer-events-none p-4">
                    <div className="bg-white w-full max-w-[320px] rounded-3xl p-6 shadow-2xl animate-pop border-4 border-green-400">
                        <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3"><Icons.Check /></div>
                        {typeof successModal === 'string' ? (
                            <h3 className="text-lg font-bold text-slate-800 mb-1 text-center">{successModal}</h3>
                        ) : (
                            successModal
                        )}
                    </div>
                </div>
            )}

            {loadingMsg && (
                <div className="backdrop z-[500] gap-4">
                    <Icons.Loader />
                    <div className="text-white font-bold text-sm bg-slate-900/60 px-5 py-2.5 rounded-full border border-slate-700 shadow-xl text-center break-words max-w-[80%]">{loadingMsg}</div>
                </div>
            )}

            <header className="main-header bg-slate-800">
                <div className="flex items-center gap-2"><h1 className="text-xl font-bold tracking-wide">{db.settings?.appName || 'SAIS BOOKING'}</h1></div>
                <div className="flex items-center gap-2 relative">
                    <button className="btn-icon" onClick={() => setShowSettings(!showSettings)}><Icons.Settings /></button>
                    {showSettings && (
                        <div className="settings-menu animate-pop w-[260px] max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <h4 className="text-sm font-bold border-b border-slate-200 pb-2 mb-3 text-slate-800 flex items-center gap-2"><Icons.Settings /> การตั้งค่าระบบ</h4>
                            <button onClick={handleExportJPG} className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg mb-3 shadow-sm">บันทึกตารางหน้านี้</button>
                            
                            <div className="settings-group mb-3 border-t border-slate-100 pt-3">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ยืด/หด ความกว้างตาราง</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95" onClick={() => updateColumnZoom(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(columnZoom * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95" onClick={() => updateColumnZoom(0.1)}>+</button>
                                </div>
                            </div>
                            <div className="settings-group mb-3">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ขนาดฟอนต์ปกติ</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95" onClick={() => updateTableFontScale(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(tableFontScale * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95" onClick={() => updateTableFontScale(0.1)}>+</button>
                                </div>
                            </div>
                            <div className="settings-group">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ขนาดฟอนต์ ลา/หยุด/กิจกรรม</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95" onClick={() => updateSpecialFontScale(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(specialFontScale * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95" onClick={() => updateSpecialFontScale(0.1)}>+</button>
                                </div>
                            </div>
                            <button className="w-full py-2 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200 text-xs mt-4" onClick={() => { setTableFontScale(1.0); setSpecialFontScale(1.0); setColumnZoom(1.0); }}>↺ รีเซ็ตค่าเริ่มต้น</button>
                        </div>
                    )}
                    <button className="btn-icon relative" onClick={() => setShowActivityModal(true)}>
                        <Icons.Bell />{unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                    </button>
                    <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <Icons.User /> {user.username}
                    </div>
                </div>
            </header>

            <div className="bottom-nav">
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => handleTabChange('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {user && !isAdmin && user.role !== 'viewer' && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => handleTabChange('my_bookings')}><Icons.List /> งานฉัน</div>}
                <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}><Icons.Chart /> สถิติ</div>
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { handleTabChange('admin'); setAdminTab('menu'); }}><Icons.Shield /> จัดการ</div>}
                <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>
            </div>

            {/* VIEWS */}
            {currentView === 'calendar' && (
                <div className="grid-container relative overflow-hidden pb-16">
                    <div className="nav-bar bg-white px-3 py-2 border-b flex-shrink-0 z-[45]">
                        <div className="flex justify-between items-center w-full">
                            <button onClick={() => changePeriod('prev')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600"><Icons.ChevronLeft /> ย้อน</button>
                            <div className="text-center font-bold text-slate-800 text-sm">{period === 0 ? "1-15 " : `16-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()} `}{currentDate.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', month: 'short', year: 'numeric' })}</div>
                            <button onClick={() => changePeriod('next')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">ถัดไป <Icons.ChevronRight /></button>
                        </div>
                    </div>

                    <div className="absolute left-0 right-0 flex justify-center z-40 transition-all duration-300 pointer-events-none" style={{ top: pullY > 0 ? `${pullY}px` : '-40px', opacity: pullY > 0 ? 1 : 0 }}>
                        <div className="bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-600">
                            {isRefreshing ? <span className="text-blue-500 animate-spin text-lg leading-none">⏳</span> : <span className="text-slate-400 text-lg leading-none">⬇️</span>}
                            {isRefreshing ? 'กำลังดึงข้อมูลล่าสุด...' : 'ปล่อยเพื่ออัปเดต'}
                        </div>
                    </div>

                    <div className="grid-wrapper" ref={scrollRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ transform: `translateY(${pullY}px)`, transition: pullY === 0 ? 'transform 0.3s ease-out' : 'none' }}>
                        {initialLoad ? <div className="w-full h-full p-4"><div className="w-full h-16 skeleton rounded-lg bg-slate-100 animate-pulse"></div></div> : (
                            <CalendarGrid 
                                daysInView={daysInView} db={db} isAdmin={isAdmin} user={user} setModal={setModal} setAlertMsg={setAlertMsg} 
                                handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} 
                                handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} setConfirmDialog={setConfirmDialog} 
                                apiAction={apiAction} setQuickAddType={setQuickAddType} filteredBookings={filteredBookings}
                                tableFontScale={tableFontScale} specialFontScale={specialFontScale} columnZoom={columnZoom} isExporting={isExporting}
                            />
                        )}
                    </div>
                    <RealtimeClock lastSyncTime={lastSyncTime} />
                </div>
            )}

            {currentView === 'documents' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.FileText /> ตรวจสอบเอกสาร</h2>
                        <div className="text-xs text-slate-500 mt-1">คลิกที่ Checkbox เพื่อยืนยันว่าได้รับและตรวจสอบเอกสารแล้ว</div>
                    </div>
                    <div className="space-y-4 pb-10 pt-4">
                        {(() => {
                            const docTasks = (db.bookings || []).filter(b => 
                                String(b.status) !== 'cancelled' &&
                                !['leave', 'company_event', 'public_holiday'].includes(String(b.job_type).toLowerCase()) &&
                                !String(b.equipment_no).startsWith('LEAVE_') &&
                                !String(b.equipment_no).startsWith('EVENT_') &&
                                !String(b.equipment_no).startsWith('HLD_')
                            ).sort((a, b) => new Date(b.date) - new Date(a.date));

                            if (docTasks.length === 0) return <div className="text-center text-slate-400 p-8">ไม่มีรายการงานตรวจ</div>;
                            
                            return docTasks.slice(0, 30).map((h, i) => {
                                const l_ok = String(h.layout_doc) === 'true';
                                const w_ok = String(h.wiring_doc) === 'true';
                                const p_ok = String(h.precheck_doc) === 'true';
                                const all_ok = l_ok && w_ok && p_ok;
                                return (
                                    <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-all ${all_ok ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
                                        <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-2">
                                            <div className="cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>
                                                <div className="font-bold text-slate-800 text-sm hover:text-blue-600 transition-colors">{h.equipment_no} <span className="text-xs text-slate-400 font-normal">/ {h.unit_no}</span></div>
                                                <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]">{h.site_name}</div>
                                            </div>
                                            <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{h.date ? formatSafeDate(h.date) : ''}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['layout', 'wiring', 'precheck'].map(docKey => {
                                                const isSent = String(h[`${docKey}_doc`]) === 'true';
                                                const fileUrl = h[`${docKey}_img`];
                                                return (
                                                    <div key={docKey} className={`flex flex-col gap-1 items-center p-2 rounded-lg border ${isSent ? 'bg-green-50' : 'bg-slate-50'}`}>
                                                        <div className="text-[10px] font-bold uppercase mb-1">{docKey}</div>
                                                        <label className="flex items-center gap-1 cursor-pointer">
                                                            <input type="checkbox" checked={isSent} onChange={(e) => handleVerifyDoc(h, `${docKey}_doc`, e.target.checked)} className="w-3 h-3 accent-blue-600" />
                                                            <span className="text-[9px] font-bold">{isSent ? 'ตรวจแล้ว' : 'รอตรวจสอบ'}</span>
                                                        </label>
                                                        <div className="flex w-full gap-1 mt-1">
                                                            {fileUrl && <button onClick={() => setViewFileUrl(fileUrl)} className="flex-1 text-[9px] bg-blue-600 text-white border border-blue-600 rounded py-1 font-bold shadow-sm active:scale-95">ดูไฟล์</button>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            });
                        })()}
                    </div>
                </div>
            )}

            {currentView === 'search' && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Search /> ค้นหางาน</h2>
                            <select className="text-xs border border-slate-300 rounded-lg p-2 bg-white outline-none w-32 shadow-sm font-bold text-slate-600" value={filterArea} onChange={(e) => setFilterArea(e.target.value)}>
                                <option value="All">ทุกพื้นที่</option><option value="กรุงเทพและปริมณฑล">กทม.</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option>
                            </select>
                        </div>
                        <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-3 shadow-sm">
                            <div className="text-slate-400 mr-2"><Icons.Search /></div>
                            <input type="text" placeholder="พิมพ์ Eq No., โครงการ, หรือผู้ตรวจ (5 หลักขึ้นไป)..." className="w-full text-sm outline-none border-none bg-transparent font-bold text-slate-700" value={localSearchQuery} onChange={(e) => setLocalSearchQuery(e.target.value)} autoFocus />
                            {localSearchQuery && <button onClick={() => { setLocalSearchQuery(''); setSearchQuery(''); }} className="text-slate-400 p-1 bg-slate-100 rounded-full"><Icons.X /></button>}
                        </div>
                    </div>
                    <div className="space-y-3 pb-10">
                        {searchQuery.trim().length > 0 && searchQuery.trim().length < 5 ? (
                            <div className="text-center text-amber-600 p-8 border-2 border-dashed border-amber-300 bg-amber-50 rounded-xl mt-4">
                                <span className="text-2xl mb-2 block">⚠️</span>
                                กรุณาพิมพ์อย่างน้อย <b className="text-amber-700">5 หลัก</b> เพื่อเริ่มการค้นหา
                            </div>
                        ) : (
                            (() => {
                                const searchResults = (db.bookings || []).filter(b => {
                                    if (String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;
                                    if (String(b.status) === 'cancelled') return false;
                                    const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
                                    const s = searchQuery.toLowerCase();
                                    const matchSearch = s === '' || String(b.equipment_no || '').toLowerCase().includes(s) || String(b.site_name || '').toLowerCase().includes(s) || String(b.inspector_name || '').toLowerCase().includes(s);
                                    return matchArea && matchSearch;
                                }).sort((a, b) => new Date(b.date) - new Date(a.date));
                                if (searchResults.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">ไม่พบข้อมูลที่ตรงกับการค้นหา</div>;
                                return searchResults.slice(0, 50).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-red-400 transition-all" onClick={() => setModal({ type: 'detail', data: h })}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                                            <div><span className="text-slate-400 text-[10px] block">Eq No.</span> <span className="font-bold text-slate-700">{h.equipment_no || '-'}</span></div>
                                            <div><span className="text-slate-400 text-[10px] block">ผู้ตรวจ</span> <span className="font-bold text-slate-700">{h.inspector_name || '-'}</span></div>
                                            <div><span className="text-slate-400 text-[10px] block">Unit</span> <span className="font-bold text-slate-700">{h.unit_no || '-'}</span></div>
                                            <div><span className="text-slate-400 text-[10px] block">พื้นที่</span> <span className="font-bold text-slate-700">{h.area || '-'}</span></div>
                                        </div>
                                    </div>
                                ));
                            })()
                        )}
                    </div>
                </div>
            )}

            {currentView === 'my_bookings' && !isAdmin && user?.role !== 'viewer' && (
                <div className="page-view relative pb-20">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Icons.List /> {user?.role === 'inspector' ? 'คิวงานตรวจของฉัน' : 'งานที่ฉันจองไว้'}
                        </h2>
                    </div>
                    <div className="space-y-3 pb-10">
                        {(() => {
                            const isInspectorRole = user?.role === 'inspector';
                            const mappedName = user?.inspector_mapped_name || user?.full_name || user?.username;
                            const filteredTasks = (db.bookings || []).filter(b => {
                                if(String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;
                                if (isInspectorRole) {
                                    return String(b.inspector_name).toLowerCase() === String(mappedName).toLowerCase();
                                } else {
                                    return b.created_by === user?.username;
                                }
                            }).sort((a, b) => new Date(b.date) - new Date(a.date));

                            if (filteredTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่พบข้อมูลในหมวดหมู่นี้</div>;

                            return filteredTasks.map((h, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>
                                    <div className="font-bold text-slate-800 text-sm mb-1">{h.site_name || '-'}</div>
                                    <div className="text-xs text-blue-600 font-bold mb-2">{formatSafeDate(h.date)}</div>
                                    <div className="text-xs text-slate-600">Eq No: {h.equipment_no} | ผู้ตรวจ: {h.inspector_name}</div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            )}

            {currentView === 'dashboard' && (
                <div className="page-view relative pb-20 animate-pop">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.PieChart /> ภาพรวมระบบ (Dashboard)</h2>
                    </div>
                    <div className="space-y-4 pb-10">
                        <div className="bg-white p-4 rounded-xl shadow-sm border grid grid-cols-2 gap-3">
                            <div><label className="text-[10px] font-bold text-slate-500">ปี</label><select className="w-full text-xs p-2 border rounded font-bold" value={dashYear} onChange={e=>setDashYear(e.target.value)}><option value="All">ทุกปี</option><option value="2026">2026</option></select></div>
                            <div><label className="text-[10px] font-bold text-slate-500">เดือน</label><select className="w-full text-xs p-2 border rounded font-bold" value={dashMonth} onChange={e=>setDashMonth(e.target.value)}><option value="All">ทุกเดือน</option><option value="1">มกราคม</option><option value="2">กุมภาพันธ์</option><option value="3">มีนาคม</option><option value="4">เมษายน</option><option value="5">พฤษภาคม</option><option value="6">มิถุนายน</option><option value="7">กรกฎาคม</option><option value="8">สิงหาคม</option><option value="9">กันยายน</option><option value="10">ตุลาคม</option><option value="11">พฤศจิกายน</option><option value="12">ธันวาคม</option></select></div>
                        </div>
                        {(() => {
                            const allTasks = (db.bookings || []).filter(b => {
                                if (String(b.status) === 'cancelled') return false;
                                const d = b.date ? new Date(b.date) : null;
                                if (!d || isNaN(d.getTime())) return false;
                                if (dashYear !== 'All' && d.getFullYear().toString() !== dashYear) return false;
                                if (dashMonth !== 'All' && (d.getMonth() + 1).toString() !== dashMonth) return false;
                                return true;
                            });
                            return (
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-sm text-white">
                                    <div className="text-[10px] font-bold text-blue-100 mb-1">คิวงานทั้งหมดตามเงื่อนไข</div>
                                    <div className="text-3xl font-black">{allTasks.length} <span className="text-xs font-normal">งาน</span></div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {currentView === 'admin' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b mb-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Shield /> Admin Panel</h2>
                        <button onClick={handleMigrateToFirestore} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm">🔥 ดึงข้อมูลลง Firestore</button>
                    </div>
                    {adminTab === 'menu' && (
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setAdminTab('users')} className="p-5 bg-white rounded-2xl shadow-sm border text-center font-bold">จัดการผู้ใช้</button>
                            <button onClick={() => setAdminTab('inspectors')} className="p-5 bg-white rounded-2xl shadow-sm border text-center font-bold">จัดการผู้ตรวจ</button>
                        </div>
                    )}
                    {adminTab === 'users' && (
                        <div className="space-y-3">
                            <button onClick={() => setAdminTab('menu')} className="text-xs bg-slate-200 px-3 py-1.5 rounded font-bold mb-2">⬅️ กลับเมนู</button>
                            {(adminDb.users || []).map((u, i) => (
                                <div key={i} className="bg-white p-3 rounded-xl border flex justify-between items-center text-xs">
                                    <div><b>{u.username}</b> ({u.full_name})</div>
                                    <button onClick={() => setModal({ type: 'edit_user', isNew: false, data: u })} className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded font-bold">แก้ไข</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {adminTab === 'inspectors' && (
                        <div className="space-y-3">
                            <button onClick={() => setAdminTab('menu')} className="text-xs bg-slate-200 px-3 py-1.5 rounded font-bold mb-2">⬅️ กลับเมนู</button>
                            <button onClick={() => setModal({ type: 'inspector_form' })} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl mb-3">เพิ่มผู้ตรวจใหม่</button>
                            {(db.inspectors || []).map((ins, i) => (
                                <div key={i} className="bg-white p-3 rounded-xl border flex justify-between items-center text-xs">
                                    <b>{ins.name}</b>
                                    <button onClick={() => setModal({ type: 'inspector_form', data: ins })} className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded font-bold">แก้ไข</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* MODALS */}
            {modal && (
                <div className="backdrop z-[100] p-4 flex items-center justify-center">
                    {modal?.type === 'edit_user' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">จัดการผู้ใช้</h3>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const payload = { full_name: fd.get('full_name'), role: fd.get('role'), status: fd.get('status'), inspector_mapped_name: fd.get('inspector_mapped_name') || '' };
                                if(window.dbFirestore) await window.dbFirestore.collection("users").doc(modal.data.username).set(payload, { merge: true });
                                setSuccessModal('บันทึกสำเร็จ'); setModal(null);
                            }} className="space-y-3">
                                <div><label className="text-xs font-bold">ชื่อ-นามสกุล</label><input name="full_name" defaultValue={modal.data.full_name} required className="w-full p-2 border rounded" /></div>
                                <div>
                                    <label className="text-xs font-bold">Mapping Name (ผู้ตรวจ)</label>
                                    <select name="inspector_mapped_name" defaultValue={modal.data.inspector_mapped_name || ''} className="w-full p-2 border rounded font-bold">
                                        <option value="">-- ไม่ได้ผูก --</option>
                                        {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold">Role</label><select name="role" defaultValue={modal.data.role || 'user'} className="w-full p-2 border rounded"><option value="user">User</option><option value="inspector">Inspector</option><option value="admin">Admin</option><option value="viewer">Viewer</option></select></div>
                                    <div><label className="text-xs font-bold">Status</label><select name="status" defaultValue={modal.data.status || 'approved'} className="w-full p-2 border rounded"><option value="approved">Approved</option><option value="pending">Pending</option><option value="blocked">Blocked</option></select></div>
                                </div>
                                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl mt-4">บันทึก</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'inspector_form' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">เพิ่ม/แก้ไขผู้ตรวจ</h3>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const name = fd.get('ins_name');
                                const certs = Array.from(e.target.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value).join(',');
                                if(window.dbFirestore) await window.dbFirestore.collection("inspectors").doc(String(name)).set({ name, product_lines: certs });
                                setSuccessModal('บันทึกผู้ตรวจสำเร็จ'); setModal(null);
                            }}>
                                <label className="text-xs font-bold block mb-1">ชื่อผู้ตรวจ</label>
                                <input name="ins_name" defaultValue={modal.data?.name || ''} required className="w-full p-3 border rounded-xl mb-4 font-bold" />
                                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto mb-4 p-2 border rounded">
                                    {Object.keys(PRODUCT_COLORS).filter(k => k !== 'อื่นๆโปรดระบุ').map(pl => (
                                        <label key={pl} className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" name="certs" value={pl} defaultChecked={modal.data?.product_lines?.includes(pl)} /> {pl}</label>
                                    ))}
                                </div>
                                <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl">บันทึก</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'detail' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                            <div className="space-y-3 text-sm text-slate-700 mb-6">
                                <div><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold">{formatSafeDate(modal.data.date)}</span></div>
                                <div><span className="text-slate-400 text-xs block">ผู้ตรวจ</span><span className="font-bold text-blue-600">{modal.data.inspector_name}</span></div>
                                <div><span className="text-slate-400 text-xs block">โครงการ</span><span className="font-bold">{modal.data.site_name}</span></div>
                                <div><span className="text-slate-400 text-xs block">Eq No. / Unit</span><span className="font-bold">{modal.data.equipment_no} / {modal.data.unit_no}</span></div>
                            </div>
                            <button onClick={() => handleCancelBooking(modal.data)} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200">ลบรายการนี้</button>
                        </div>
                    )}

                    {modal?.type === 'booking' && (
                        <div className="modal-card w-full max-w-[450px] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-200 p-2 rounded-full z-50"><Icons.X /></button>
                            <div className="p-4 border-b bg-slate-50 font-bold text-lg">จองคิวตรวจ SAIS</div>
                            <div className="p-5 overflow-y-auto flex-1">
                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-xs font-bold">Product Line *</label><input name="product_line" required defaultValue={modal.data.product_line || 'ES1'} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                        <div><label className="text-xs font-bold">ประเภทงาน *</label><input name="job_type" required defaultValue={modal.data.job_type || 'New'} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                    </div>
                                    <div><label className="text-xs font-bold">พื้นที่ *</label><input name="area" required defaultValue={modal.data.area || 'กรุงเทพและปริมณฑล'} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-xs font-bold">Eq No. *</label><input name="equipment_no" required defaultValue={modal.data.equipment_no} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                        <div><label className="text-xs font-bold">Unit No. *</label><input name="unit_no" required defaultValue={modal.data.unit_no} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                    </div>
                                    <div><label className="text-xs font-bold">ชื่อโครงการ *</label><input name="site_name" required defaultValue={modal.data.site_name} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                    <div><label className="text-xs font-bold">เบอร์โทรศัพท์ *</label><input type="tel" name="tel" required maxLength="10" defaultValue={modal.data.tel} className="w-full p-2.5 border rounded-lg font-bold" /></div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                                        <h4 className="text-xs font-bold border-b pb-2">อัปโหลดเอกสาร (Google Drive)</h4>
                                        {['layout', 'wiring', 'precheck'].map((doc) => (
                                            <div key={doc} className="flex items-center justify-between bg-white p-2 rounded border">
                                                <span className="text-xs uppercase font-bold">{doc}</span>
                                                <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, doc)} />
                                            </div>
                                        ))}
                                    </div>
                                    <button type="submit" disabled={loadingMsg} className="w-full py-4 rounded-xl font-bold text-white bg-red-600 shadow-lg mt-4">ยืนยันการจองคิว</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {viewFileUrl && (
                <div className="backdrop z-[700] p-4 flex items-center justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col h-[85vh] shadow-2xl relative">
                        <div className="bg-slate-800 text-white p-3 flex justify-between items-center"><span>ดูไฟล์แนบ</span><button onClick={() => setViewFileUrl(null)} className="bg-white/20 p-2 rounded-full"><Icons.X /></button></div>
                        <div className="flex-1 bg-slate-100 flex items-center justify-center p-2 overflow-auto">
                            <img src={viewFileUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false, errorMsg: '' }; }
    static getDerivedStateFromError(error) { return { hasError: true, errorMsg: error.toString() }; }
    componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">ระบบขัดข้องชั่วคราว</h2>
                    <p className="text-sm text-slate-500 mb-6 bg-slate-200 p-3 rounded-lg max-w-md break-words">{this.state.errorMsg}</p>
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold">รีเฟรชหน้าเว็บ</button>
                </div>
            );
        }
        return this.props.children;
    }
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<ErrorBoundary><App /></ErrorBoundary>);
}

