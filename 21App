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
    Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
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

    if (jobType === 'public_holiday' || combinedStr.includes('hld_')) return { bg: settings.holidayBg || '#D0021B', text: settings.holidayText || '#ffffff', isSpecial: true, isLeave: false };
    if (jobType === 'company_event' || combinedStr.includes('event_') || combinedStr.includes('meeting')) return { bg: settings.eventBg || '#22c55e', text: settings.eventText || '#ffffff', isSpecial: true, isLeave: false };
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

// 📍 CalendarGrid: รองรับแสดงผลสีจาก Settings 100%
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
                let headerClass = '';
                if (d.isGlobalHoliday) headerClass = 'is-sunday-col';
                else if (d.isGlobalEvent) headerClass = 'is-global-event-col';
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
                                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, d.full, ins.name)}
                                    className={cellClassName}
                                    onClick={() => {
                                        if (!user) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการจองคิวตรวจครับ');
                                        if (!isAdmin && isBlockedForNormalUser) return;
                                        
                                        const todayLocalString = window.SAIS_UTILS?.getLocalDateString(getThaiTime()) || getThaiTime().toISOString().split('T')[0];
                                        if (d.full < todayLocalString && !isAdmin) return setAlertMsg('ไม่สามารถจองคิวงานย้อนหลังได้ครับ');
                                        
                                        // 📍 หากเป็นแอดมิน ให้เปิดเมนูรวม (Admin Cell Action) 
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
                                                draggable={isAdmin}
                                                onDragStart={(e) => handleDragStart(e, gh.id)}
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
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
                                        return (
                                            <div key={'ge'+gei} 
                                                draggable={isAdmin}
                                                onDragStart={(e) => handleDragStart(e, ge.id)}
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
                                                style={{ 
                                                    backgroundColor: isCard ? (db.settings?.eventBg || '#22c55e') : undefined,
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
                                                draggable={isAdmin} 
                                                onDragStart={(e) => handleDragStart(e, task.id)} 
                                                onDragEnd={handleDragEnd}
                                                className={`task-content relative w-full flex items-center justify-center p-1 rounded-md ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-black/20 shadow-sm' : 'cursor-pointer'} ${isSingleCard ? 'h-full min-h-[40px]' : 'flex-1 min-h-[26px] border-b border-black/10'} ${isExporting ? '!overflow-visible !py-2 !min-h-[50px]' : 'overflow-hidden'}`}
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
    
    // 📍 ระบบ Pull-to-refresh
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullY, setPullY] = useState(0);
    const touchStartY = useRef(0);
    
    const [isExporting, setIsExporting] = useState(false);
    
    // 📍 State สำหรับ Modal เปิดดูรูปภาพหรือเอกสาร
    const [viewFileUrl, setViewFileUrl] = useState(null);
    const [docUrls, setDocUrls] = useState({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });

    const [isDragging, setIsDragging] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);
    const [draggingTask, setDraggingTask] = useState(null);
    const lastActivityTime = useRef(Date.now());

    // 📍 ประกาศ State ควบคุมคู่มือการใช้งาน
    const [showBookingHelp, setShowBookingHelp] = useState(false);
    const [showLoginHelp, setShowLoginHelp] = useState(false);
    const [showAdminHelp, setShowAdminHelp] = useState(false);
    const [showRoleHelp, setShowRoleHelp] = useState(false);

    // 📍 State สำหรับ Dashboard อัจฉริยะ (กำหนดค่าเริ่มต้นเป็นเดือนและปีปัจจุบันเสมอ)
    const [dashYear, setDashYear] = useState(getThaiTime().getFullYear().toString());
    const [dashMonth, setDashMonth] = useState((getThaiTime().getMonth() + 1).toString()); 
    const [dashArea, setDashArea] = useState('All');
    const [dashJobType, setDashJobType] = useState('All');

    // ตรวจจับการใช้งานเพื่อหยุด Polling ถ้ายูสเซอร์ไม่ได้ขยับ
    useEffect(() => {
        const updateActivity = () => { lastActivityTime.current = Date.now(); };
        window.addEventListener('mousemove', updateActivity);
        window.addEventListener('keydown', updateActivity);
        window.addEventListener('touchstart', updateActivity);
        window.addEventListener('scroll', updateActivity, true);
        return () => {
            window.removeEventListener('mousemove', updateActivity);
            window.removeEventListener('keydown', updateActivity);
            window.removeEventListener('touchstart', updateActivity);
            window.removeEventListener('scroll', updateActivity, true);
        };
    }, []);

    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && !window.MobileDragDropPolyfillLoaded) {
            window.MobileDragDropPolyfillLoaded = true;
            const css = document.createElement('link');
            css.rel = "stylesheet";
            css.href = "https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/default.min.css";
            document.head.appendChild(css);

            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/index.min.js";
            script.onload = () => {
                const scrollScript = document.createElement('script');
                scrollScript.src = "https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/scroll-behaviour.min.js";
                scrollScript.onload = () => {
                    window.MobileDragDrop.polyfill({
                        dragImageTranslateOverride: window.MobileDragDrop.scrollBehaviourDragImageTranslateOverride
                    });
                    window.addEventListener('touchmove', () => {}, { passive: false }); 
                };
                document.head.appendChild(scrollScript);
            };
            document.head.appendChild(script);
        }
    }, []);

    const [user, setUser] = useState(() => { 
        try { 
            const saved = localStorage.getItem('sais_user'); 
            const savedTime = localStorage.getItem('sais_session_time');
            if (saved && savedTime) {
                if (Date.now() - parseInt(savedTime) > 86400000) {
                    localStorage.removeItem('sais_user'); localStorage.removeItem('sais_session_time');
                    return null;
                }
                return JSON.parse(saved); 
            }
            return null;
        } catch(e) { return null; } 
    });
    
    const [initialLoad, setInitialLoad] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState(null);
    const [uploadingDoc, setUploadingDoc] = useState({ layout: false, wiring: false, precheck: false, site_cond_1: false, site_cond_2: false, site_cond_3: false, site_cond_4: false, site_cond_5: false, site_cond_6: false });
    const [alertMsg, setAlertMsg] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [promptDialog, setPromptDialog] = useState(null);
    const [successModal, setSuccessModal] = useState(null);
    const [currentView, setCurrentView] = useState('calendar');
    const [modal, setModal] = useState(null); 
    
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityTab, setActivityTab] = useState('notif');
    const [showSettings, setShowSettings] = useState(false);
    
    const [tableFontScale, setTableFontScale] = useState(() => { try { const saved = localStorage.getItem('sais_table_font_scale'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; } });
    const [specialFontScale, setSpecialFontScale] = useState(() => { try { const saved = localStorage.getItem('sais_special_font_scale'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; } });
    const [columnZoom, setColumnZoom] = useState(() => { try { const saved = localStorage.getItem('sais_column_zoom'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; } });
    
    const [filterArea, setFilterArea] = useState('All');
    const [areaSelection, setAreaSelection] = useState('');
    const [jobTypeSelection, setJobTypeSelection] = useState('');
    const [productLineSelection, setProductLineSelection] = useState('');
    const [adminTab, setAdminTab] = useState('menu'); 
    const [adminBookingsLimit, setAdminBookingsLimit] = useState(20);
    
    const [myBookingsTab, setMyBookingsTab] = useState('pending');
    const [myBookingsLimit, setMyBookingsLimit] = useState(20);
    const [actionMenuId, setActionMenuId] = useState(null); 
    const [logsLimit, setLogsLimit] = useState(20);
    const [quickAddType, setQuickAddType] = useState('job');

    const [searchQuery, setSearchQuery] = useState('');
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    useEffect(() => {
        const handler = setTimeout(() => setSearchQuery(localSearchQuery), 400);
        return () => clearTimeout(handler);
    }, [localSearchQuery]);

    const [logSearchQuery, setLogSearchQuery] = useState('');
    const [localLogSearchQuery, setLocalLogSearchQuery] = useState('');
    useEffect(() => {
        const handler = setTimeout(() => setLogSearchQuery(localLogSearchQuery), 400); 
        return () => clearTimeout(handler);
    }, [localLogSearchQuery]);

    // ตัวแปรสำหรับจองวันลา วันกิจกรรม วันหยุด
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const [leaveInspectors, setLeaveInspectors] = useState([]); 
    const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
    const [leaveType, setLeaveType] = useState('ลาพักร้อน');
    const [customLeaveType, setCustomLeaveType] = useState(''); 
    
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventInspectors, setEventInspectors] = useState([]);
    
    const [holidayStartDate, setHolidayStartDate] = useState('');
    const [holidayEndDate, setHolidayEndDate] = useState('');

    // State สำหรับลบแบบกลุ่ม
    const [selectedLeavesToDelete, setSelectedLeavesToDelete] = useState([]);
    const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);
    const [selectedHolidaysToDelete, setSelectedHolidaysToDelete] = useState([]);

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

    // 📍 Dynamic CSS Variables Injector สำหรับปรับแต่งเว็บไซต์แบบ Real-time
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
        setLoadingMsg('กำลังสร้างและปรับความคมชัดภาพตาราง... (รอสักครู่)');
        setIsExporting(true);
        setTimeout(() => {
            const targetNode = document.getElementById('calendar-export-area');
            if(targetNode) {
                html2canvas(targetNode, { 
                    scale: 2, useCORS: true, backgroundColor: '#f8fafc',
                    windowWidth: targetNode.scrollWidth, windowHeight: targetNode.scrollHeight 
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `SAIS_Schedule_${currentDate.getFullYear()}_${currentDate.getMonth()+1}_P${period+1}.jpg`;
                    link.href = canvas.toDataURL('image/jpeg', 0.9);
                    link.click();
                    setIsExporting(false); setLoadingMsg(null); setSuccessModal('บันทึกรูปภาพสำเร็จ');
                }).catch(err => {
                    setIsExporting(false); setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาดในการบันทึกภาพ');
                });
            } else {
                setIsExporting(false); setLoadingMsg(null); setAlertMsg('ไม่พบตาราง');
            }
        }, 1500); 
    };

    const handleBulkDelete = async (type, ids) => {
        if (ids.length === 0) return;
        setConfirmDialog({
            msg: `ยืนยันลบข้อมูลที่เลือกทั้ง ${ids.length} รายการ?`,
            onConfirm: async () => {
                setConfirmDialog(null); setLoadingMsg('กำลังลบข้อมูลแบบกลุ่ม...');
                try {
                    const logDetail = `[ลบข้อมูลแบบกลุ่ม]\nหมวดหมู่: ${type}\nจำนวน: ${ids.length} รายการ`;
                    const res = await utils.fetchWithRetry(SCRIPT_URL, { 
                        method: 'POST', body: JSON.stringify({ action: 'delete_multiple', ids: ids, user: user?.username, reason: logDetail }) 
                    });
                    if (res.status === 'ok') {
                        if (type === 'leave') setSelectedLeavesToDelete([]);
                        if (type === 'event') setSelectedEventsToDelete([]);
                        if (type === 'holiday') setSelectedHolidaysToDelete([]);
                        await fetchCoreData(true, null); 
                        setLoadingMsg(null);
                        setSuccessModal(`ลบสำเร็จ ${res.deleted} รายการ`);
                    } else { 
                        setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาดในการลบ'); 
                    }
                } catch(e) { 
                    setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง'); 
                }
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

    useEffect(() => {
        const load = async () => {
            let currentCache = null;
            if (window.DB_CACHE) {
                try {
                    currentCache = await window.DB_CACHE.getItem('sais_core_db');
                    if (currentCache && currentCache.bookings) { setDb(currentCache); setInitialLoad(false); }
                } catch(e) {}
            }
            const isFirstLoad = !currentCache || !currentCache.bookings || currentCache.bookings.length === 0;
            if(user) await fetchCoreData(isFirstLoad, currentCache);
            setInitialLoad(false); 
        }
        if(SCRIPT_URL) load();

        let timeoutId;
        const scheduleNextFetch = () => {
            const jitter = Math.floor(Math.random() * 60000); 
            const baseInterval = 300000; 
            const nextFetchIn = baseInterval + jitter;

            timeoutId = setTimeout(() => {
                const idleTime = Date.now() - lastActivityTime.current;
                const isIdle = idleTime > 15 * 60 * 1000;
                
                if (!isIdle && document.visibilityState === 'visible' && user && !modal && !showActivityModal && !alertMsg && !confirmDialog && !promptDialog && !loadingMsg && !successModal && SCRIPT_URL && !isExporting && !viewFileUrl) {
                    fetchCoreData(false, dbRef.current).finally(() => scheduleNextFetch());
                } else {
                    scheduleNextFetch();
                }
            }, nextFetchIn);
        };
        scheduleNextFetch();
        return () => clearTimeout(timeoutId);
    }, [modal, showActivityModal, alertMsg, confirmDialog, promptDialog, loadingMsg, successModal, SCRIPT_URL, isExporting, viewFileUrl, user]);

    const fetchCoreData = async (needPast = false, currentCache = null) => {
        if (!SCRIPT_URL || !user) return;
        try {
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const startFetchDate = utils.getLocalDateString ? utils.getLocalDateString(new Date(currentYear, currentMonth - 1, 1)) : '';
            const endFetchDate = utils.getLocalDateString ? utils.getLocalDateString(new Date(currentYear, currentMonth + 2, 0)) : '';
            const res = await fetch(SCRIPT_URL, { 
                method: 'POST', 
                body: JSON.stringify({ action: 'sync_core', api_key: window?.SAIS_CONFIG?.API_KEY, fetch_past: needPast, start_date: startFetchDate, end_date: endFetchDate }) 
            });
            const result = await res.json();
            
            if (result.status === 'ok') {
                let finalDb = result.data;
                if (!needPast && currentCache && currentCache.bookings) {
                    const today = getThaiTime();
                    today.setHours(0,0,0,0);
                    const fetchedIds = new Set(result.data.bookings.map(b => b.id));
                    const pastCachedBookings = currentCache.bookings.filter(b => {
                        if (!b.date) return false;
                        const bDate = new Date(b.date);
                        return bDate < today && !fetchedIds.has(b.id);
                    });
                    finalDb.bookings = [...pastCachedBookings, ...result.data.bookings];
                }
                setDb(finalDb);
                setLastSyncTime(getThaiTime()); 
                if (window.DB_CACHE) window.DB_CACHE.setItem('sais_core_db', finalDb);
            }
        } catch (e) { console.error("Core Fetch Error"); }
    };

    const fetchAdminData = async (offset = 0, limit = 50, fetchType = 'all') => {
        if (!SCRIPT_URL || !user) return;
        try {
            const payload = { action: 'sync_admin', api_key: window?.SAIS_CONFIG?.API_KEY, offset: offset, limit: limit, fetch_type: fetchType };
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
            const result = await res.json();
            if (result.status === 'ok') { 
                setAdminDb(prev => {
                    if (offset === 0) return result.data;
                    return {
                        ...prev,
                        logs: fetchType === 'logs' ? [...(prev.logs || []), ...(result.data.logs || [])] : prev.logs,
                        all_bookings: fetchType === 'bookings' ? [...(prev.all_bookings || []), ...(result.data.all_bookings || [])] : prev.all_bookings
                    };
                });
                setHasLoadedAdmin(true); 
            }
        } catch (e) { console.error("Admin Fetch Error"); }
    };

    const handleTabChange = (view) => {
        setCurrentView(view);
        if ((view === 'admin' || view === 'search' || view === 'dashboard') && !hasLoadedAdmin) fetchAdminData(0, 50, 'all');
    };

    const apiAction = async (payload, customLoadMsg = 'กำลังบันทึกข้อมูล...', disableAutoSync = false) => {
        if (!SCRIPT_URL) return false;
        if(customLoadMsg) setLoadingMsg(customLoadMsg);
        try {
            const payloadWithAuth = { ...payload, api_key: window?.SAIS_CONFIG?.API_KEY };
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payloadWithAuth) });
            const text = await res.text(); 
            try {
                const result = JSON.parse(text);
                if (result.status === 'ok') { 
                    if(!disableAutoSync) {
                        await fetchCoreData(true, null);
                        if(hasLoadedAdmin) await fetchAdminData(0, 50, 'all');
                    }
                    if(customLoadMsg) setLoadingMsg(null); 
                    return true;
                } else { 
                    if(customLoadMsg) setLoadingMsg(null);
                    setAlertMsg(result.message || 'ไม่ทราบสาเหตุ'); 
                    return false; 
                }
            } catch(e) { 
                if(customLoadMsg) setLoadingMsg(null);
                setAlertMsg('ข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่'); 
                return false; 
            }
        } catch (e) { 
            if(customLoadMsg) setLoadingMsg(null);
            setAlertMsg('การเชื่อมต่อเครือข่ายขัดข้อง'); 
            return false; 
        }
    };

    const handleTouchStart = (e) => { 
        if (scrollRef.current && scrollRef.current.scrollTop === 0) touchStartY.current = e.touches[0].clientY; 
    };
    
    const handleTouchMove = (e) => {
        if (scrollRef.current && scrollRef.current.scrollTop === 0 && touchStartY.current > 0) {
            const diff = e.touches[0].clientY - touchStartY.current;
            if (diff > 0 && diff < 80) setPullY(diff);
        }
    };
    
    const handleTouchEnd = async () => {
        if (pullY > 50 && !isRefreshing) { 
            setIsRefreshing(true);
            setPullY(50); 
            await fetchCoreData(false, dbRef.current); 
            setIsRefreshing(false); 
        }
        setPullY(0); 
        touchStartY.current = 0;
    };
    const handleCancelBooking = (booking) => {
        if(!booking?.id) return;
        setConfirmDialog({
            msg: "ยืนยันลบข้อมูลนี้ใช่หรือไม่?",
            onConfirm: async () => {
                setConfirmDialog(null);
                const isSpecial = String(booking.job_type).includes('leave') || String(booking.job_type).includes('event') || String(booking.job_type).includes('holiday');
                let logDetail = '';
                if (isSpecial) {
                    logDetail = `เหตุผล: [ลบรายการ]\nโดย: ${user?.username || 'admin'}\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
                } else {
                    logDetail = `[ลบรายการ]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nProduct: ${booking.product_line || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
                }
                const ok = await apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail, job_type: booking.job_type, equipment_no: booking.equipment_no }, 'กำลังลบ...');
                if(ok) { setSuccessModal('ลบสำเร็จ'); setModal(null); }
            }
        });
    };

    const handleCancelJob = (booking) => {
        if(!booking?.id) return;
        const isPastDate = booking.date && formatSafeDate(booking.date) < todayLocalString;
        if (isPastDate && !isAdmin) return setAlertMsg('🔒 ไม่อนุญาตให้ยกเลิกคิวงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        setPromptDialog({
            msg: "โปรดระบุเหตุผลในการยกเลิกคิวงานนี้:",
            onSubmit: (reason) => {
                const isSpecial = String(booking.job_type).includes('leave') || String(booking.job_type).includes('event') || String(booking.job_type).includes('holiday');
                let logDetail = '';
                if (isSpecial) {
                    logDetail = `เหตุผล: [ยกเลิกรายการ: ${reason || 'ไม่ระบุ'}]\nโดย: ${user?.username || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
                } else {
                    logDetail = `[ยกเลิกคิวงาน]\nโดย: ${user?.username || '-'}\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nProduct: ${booking.product_line || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nเหตุผล: ${reason || 'ไม่ระบุ'}`;
                }
                apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail, job_type: booking.job_type, equipment_no: booking.equipment_no }, 'กำลังยกเลิกคิวงาน...').then(ok => {
                    if(ok) { setModal(null); setActionMenuId(null); setSuccessModal('ยกเลิกคิวสำเร็จ'); }
                });
            }
        });
    };

    const handleVerifyDoc = async (booking, docField, isChecked) => {
        if (!isAdmin) return;
        const val = isChecked ? 'true' : 'pending';
        const docName = docField.replace('_doc', '').toUpperCase();
        const logDetail = `[อัปเดตสถานะเอกสาร]\nโดย: ${user?.username}\nเอกสาร: ${docName} -> ${isChecked ? 'ตรวจสอบแล้ว' : 'รอตรวจสอบ'}\nโครงการ: ${booking.site_name}`;
        
        const payload = {
            ...booking, action: 'update_booking', [docField]: val, reason: logDetail
        };
        const ok = await apiAction(payload, `กำลังอัปเดตสถานะ ${docName}...`);
        if (ok) setSuccessModal(`อัปเดตเอกสาร ${docName} สำเร็จ`);
    };

    const handleDownloadFile = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = blobUrl;
            link.download = filename || 'SAIS_Document';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
        } catch (e) {
            window.open(url, '_blank');
        }
    };

    const handleFileUpload = async (e, docType, isMultiple = false) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true })); 
        setLoadingMsg('กำลังอัปโหลดเอกสาร/รูปภาพ...');
        
        try {
            let uploadedUrls = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let base64Data = "";
                let mimeType = file.type;
                
                if (mimeType.startsWith('image/')) {
                    base64Data = await utils.compressImage(file);
                } else if (mimeType === 'application/pdf') {
                    base64Data = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
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

                if (res.status === 'ok') { 
                    uploadedUrls.push(res.fileUrl); 
                }
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
                setSuccessModal(`อัปโหลดเอกสารสำเร็จ`);
            }
        } catch(err) { 
            setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลด'); 
        }
        
        setLoadingMsg(null); 
        setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    const handleDragStart = (e, taskId) => { 
        e.dataTransfer.setData('taskId', taskId);
        setDraggingTask(db.bookings.find(b => String(b.id) === String(taskId))); 
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
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId));
        
        if (!task) return setAlertMsg('ไม่พบข้อมูลการ์ดที่ต้องการลบทิ้ง');
        
        setConfirmDialog({
            msg: `คุณกำลังลากการ์ดทิ้งลงถังขยะ\nยืนยันลบข้อมูลนี้ใช่หรือไม่?\n\n📌 รายการ: ${task.site_name || task.equipment_no}`,
            onConfirm: async () => {
                setConfirmDialog(null);
                setDraggingTask(null);
                const isSpecial = String(task.job_type).includes('leave') || String(task.job_type).includes('event') || String(task.job_type).includes('holiday');
                let logDetail = '';
                if (isSpecial) {
                    logDetail = `เหตุผล: [ลบรายการ (Drag & Drop)]\nโดย: ${user?.username || 'admin'}\nประเภทงาน: ${task.job_type || '-'}\nวันที่: ${task.date ? formatSafeDate(task.date) : '-'}`;
                } else {
                    logDetail = `[ลบรายการด้วย Drag & Drop ถังขยะ]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${task.site_name || '-'}\nEq No.: ${task.equipment_no || '-'}`;
                }
                const ok = await apiAction({ action: 'delete_booking', id: task.id, user: user?.username || 'admin', reason: logDetail, job_type: task.job_type, equipment_no: task.equipment_no }, 'กำลังลบทิ้ง...');
                if(ok) setSuccessModal('ลบรายการลงถังขยะสำเร็จ');
            }
        });
    };

    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-50/60', 'border-2', 'border-blue-400', 'border-dashed');
        if (!isAdmin) return setAlertMsg('เฉพาะแอดมินที่สามารถลากย้ายคิวได้ครับ');
        
        const taskId = e.dataTransfer.getData('taskId');
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId));
        
        if (!task) return setAlertMsg('เกิดข้อผิดพลาด ไม่พบข้อมูลการ์ด กรุณาลองลากใหม่อีกครั้ง');
        
        const jobTypeLower = String(task.job_type).toLowerCase();
        const isSpecial = jobTypeLower.includes('leave') || jobTypeLower.includes('event') || jobTypeLower.includes('holiday');
        
        let finalInspector = targetInspector;
        if (task.inspector_name === 'SYSTEM_EVENT') finalInspector = 'SYSTEM_EVENT';
        if (task.inspector_name === 'SYSTEM_HOLIDAY') finalInspector = 'SYSTEM_HOLIDAY';

        const oldDate = task.date ? formatSafeDate(task.date) : 'ไม่ระบุ';
        const oldInspector = task.inspector_name;

        if (oldDate === targetDate && oldInspector === finalInspector) return setDraggingTask(null);
        
        if (!isSpecial) {
            const isDup = db.bookings.some(b => formatSafeDate(b.date) === targetDate && String(b.equipment_no) === String(task.equipment_no) && String(b.id) !== String(task.id) && String(b.status) !== 'cancelled');
            if (isDup) return setAlertMsg('ไม่สามารถย้ายได้ เนื่องจาก Eq No. นี้ถูกจองไปแล้วในวันที่คุณเลือก');
        }

        let confirmMsgNode = (
            <div className="text-left mt-2">
                <div className="text-sm font-black text-slate-800 mb-3 text-center bg-slate-100 p-2 rounded-lg">
                    📌 {task.site_name || task.equipment_no}
                </div>
                <div className="space-y-2">
                    {oldDate !== targetDate && (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                            <span className="text-slate-500 font-bold">📅 เลื่อนวันที่:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-red-500 line-through decoration-red-300">{oldDate}</span>
                                <span>➡️</span>
                                <span className="text-green-600 font-black">{targetDate}</span>
                            </div>
                        </div>
                    )}
                    {oldInspector !== finalInspector && finalInspector !== 'SYSTEM_EVENT' && finalInspector !== 'SYSTEM_HOLIDAY' && (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                            <span className="text-slate-500 font-bold">👤 ย้ายผู้ตรวจ:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-red-500 line-through decoration-red-300">{oldInspector}</span>
                                 <span>➡️</span>
                                <span className="text-blue-600 font-black">{finalInspector}</span>
                            </div>
                        </div>
                     )}
                </div>
                <div className="mt-3 text-[10px] text-red-500 text-center font-bold">
                    *โปรดตรวจสอบข้อมูลก่อนกดยืนยันการย้าย*
                </div>
            </div>
        );
        
        setConfirmDialog({
            msg: confirmMsgNode,
            onConfirm: async () => {
                setConfirmDialog(null);
                setDraggingTask(null);
                const logDetail = `[ย้ายคิวงานด้วยวิธีลากวางบนตาราง]\nโดย: ${user?.username || '-'}\nรายการ: ${task.site_name || task.equipment_no}\nวันที่: [${oldDate}] ➡️ [${targetDate}]\nผู้ตรวจ: [${oldInspector}] ➡️ [${finalInspector}]`;
                
                const ok = await apiAction({ 
                    action: 'update_booking', id: task.id, date: targetDate, inspector_name: finalInspector, 
                    user: user?.username || 'admin', reason: logDetail, job_type: task.job_type, equipment_no: task.equipment_no
                }, 'กำลังย้ายข้อมูล...');
                
                if (ok) setSuccessModal('ลากย้ายรายการสำเร็จเรียบร้อย');
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
        const logDetail = `[แก้ไขคิวพิเศษ]\nโดย: ${user?.username}\nเปลี่ยนวันที่เป็น ${newDate}\nผู้ตรวจ: ${newInspector}\nหัวข้อ: ${newTitle}`;
        const payload = { 
            ...modal.data, action: 'update_booking', id: modal.data.id, 
            site_name: newTitle, inspector_name: newInspector, date: newDate, 
            user: user?.username, reason: logDetail, job_type: modal.data.job_type, equipment_no: modal.data.equipment_no 
        };
        const ok = await apiAction(payload, 'กำลังอัปเดตข้อมูล...');
        if(ok) { 
            setSuccessModal('อัปเดตสำเร็จ');
            if (modal.returnTo) setModal({ type: modal.returnTo });
            else setModal(null);
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : (fd.get('area') || areaSelection);
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : (fd.get('product_line') || productLineSelection);
        let finalJobType = fd.get('job_type') || jobTypeSelection;
        if (!finalProductLine || finalProductLine === '') return setAlertMsg('กรุณาเลือก Product Line');
        if (!finalJobType || finalJobType === '') return setAlertMsg('กรุณาเลือก ประเภทงาน');
        if (!finalArea || finalArea === '') return setAlertMsg('กรุณาเลือก พื้นที่');

        const isAdminOverride = fd.get('isAdminOverride') === 'true' || modal?.data?.isAdminOverride === true || (isAdmin && modal?.data?.id);
        const targetInspector = isAdminOverride ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isAdminOverride ? fd.get('admin_date_target') : modal?.data?.date;
        const isPastDate = targetDate < todayLocalString;
        if (isPastDate && !isAdmin && modal?.data?.id && quickAddType === 'job') return setAlertMsg('🔒 ไม่อนุญาตให้แก้ไขข้อมูลงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        if (!targetInspector || !targetDate) return setAlertMsg('ข้อมูลวันหรือผู้ตรวจไม่ครบถ้วน กรุณาเลือกวันที่และผู้ตรวจให้ชัดเจน');

        if (quickAddType !== 'job') {
            let p_jobType = '', p_siteName = fd.get('site_name'), p_eq = '';
            const sTime = fd.get('start_time'); const eTime = fd.get('end_time');
            if (sTime && eTime && sTime >= eTime) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
            if (sTime && eTime) p_siteName = `${sTime}-${eTime} ${p_siteName}`;

            if (quickAddType === 'leave') {
                p_jobType = 'leave';
                if (fd.get('leave_type') === 'อื่นๆโปรดระบุ') p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('custom_leave');
                else p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('leave_type');
                p_eq = `LEAVE_${Date.now()}`;
            } else if (quickAddType === 'event') {
                p_jobType = 'company_event';
                p_eq = `EVENT_${Date.now()}`;
            } else if (quickAddType === 'holiday') {
                p_jobType = 'public_holiday';
                p_eq = `HLD_${Date.now()}`;
            }

            const logDetail = `[บันทึก${quickAddType}]\nโดย: ${user?.username}\nวันที่: ${targetDate}\nหัวข้อ: ${p_siteName}\nผู้ตรวจ: ${targetInspector}`;
            const payload = { action: 'create_multiple_bookings', dates: [targetDate], inspector_name: quickAddType === 'holiday' ? 'SYSTEM_HOLIDAY' : targetInspector, job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, user: user?.username, reason: logDetail };
            
            const ok = await apiAction(payload, `กำลังบันทึก${quickAddType}...`);
            if(ok) { setModal(null); setSuccessModal('บันทึกสำเร็จ'); }
            return;
        }

        const isDup = (db.bookings || []).some(b => {
            const sameDate = b.date && formatSafeDate(b.date) === targetDate;
            if (!sameDate) return false;
            if (b.id === modal?.data?.id) return false;
            if (String(b.inspector_name) === 'SYSTEM_HOLIDAY') return false;
            if (String(b.status) === 'cancelled') return false;
            if (String(b.equipment_no) === String(data.equipment_no)) return true;
            if (!isAdmin && String(b.inspector_name) === targetInspector) return true;
            return false;
        });
        if (isDup) return setAlertMsg(isAdmin ? `เลข Eq No. ${data.equipment_no} ถูกจองไปแล้วในวันนี้` : 'ผู้ตรวจคิวเต็มแล้วในวันนี้');
        
        const targetInspectorObj = (db.inspectors || []).find(i => i.name === targetInspector);
        let allowedCerts = ['ES1', '3300', 'S-villas'];
        if (targetInspectorObj && targetInspectorObj.product_lines && targetInspectorObj.product_lines.trim() !== '') {
            allowedCerts = targetInspectorObj.product_lines.split(',').map(s => s.trim());
        }
        if (!allowedCerts.includes(finalProductLine) && finalProductLine !== 'ไม่ระบุ') {
            return setAlertMsg(`ผู้ตรวจ "${targetInspector}" ไม่ได้รับสิทธิ์ให้ตรวจ Product Line: ${finalProductLine}\n(สิทธิ์ปัจจุบัน: ${allowedCerts.join(', ')})`);
        }

        if (!isAdmin && !/^\d{10}$/.test(data.tel)) return setAlertMsg('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก');
        if (isAdmin && data.tel && !/^\d{10}$/.test(data.tel)) return setAlertMsg('เบอร์โทรศัพท์ต้องมี 10 หลัก (หรือเว้นว่างไว้)');

        const jStart = fd.get('job_start_time'); const jEnd = fd.get('job_end_time');
        if (jStart && jEnd && jStart >= jEnd) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
        let finalSiteName = data.site_name;
        if (jStart && jEnd) finalSiteName = `${jStart}-${jEnd} ${finalSiteName}`;

        const payload = {
            action: modal?.data?.id ? 'update_booking' : 'create_booking',
            ...data, site_name: finalSiteName, tel: String(data.tel || ''), area: finalArea, job_type: finalJobType, product_line: finalProductLine,
            id: modal?.data?.id, inspector_name: targetInspector, date: targetDate, user: user?.username,
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

        payload.reason = getDiffLog(modal?.data?.id ? modal.data : null, payload, user?.username);
        const ok = await apiAction(payload, modal?.data?.id ? 'กำลังอัปเดตข้อมูล...' : 'กำลังบันทึกคิวงาน...');
        if (ok) { 
            setSuccessModal(modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!');
            if (isAdmin && !modal?.data?.id && fd.get('keep_open')) {
                e.target.equipment_no.value = '';
                if (e.target.unit_no) e.target.unit_no.value = '';
                e.target.equipment_no.focus(); 
            } else {
                setModal(null);
                setAreaSelection(''); setJobTypeSelection(''); setProductLineSelection(''); setLiveMapUrl('');
                setDocUrls({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });
            }
        }
    };

    const handleLogout = () => {
        setConfirmDialog({
            msg: 'ยืนยันการออกจากระบบใช่หรือไม่?',
            onConfirm: async () => {
                setConfirmDialog(null); setLoadingMsg('กำลังออกจากระบบ...'); setUser(null);
                try {
                    localStorage.clear(); sessionStorage.clear();
                    if ('caches' in window) caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
                } catch (error) {} finally { window.location.replace(window.location.pathname + '?logout=' + new Date().getTime()); }
            }
        });
    };

    // 📍 หน้าจอ Login
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
                                            <li>สามารถลงทะเบียนได้ด้วยตนเองโดยกดปุ่ม <span className="font-bold">"สมัครสมาชิกใหม่"</span> ที่หน้าล็อกอิน</li>
                                            <li>กรอกรหัสพนักงาน และชื่อ-นามสกุลจริง เพื่อใช้ยืนยันตัวตน</li>
                                            <li className="text-red-600 font-bold">รอให้ผู้ดูแลระบบ (Admin) อนุมัติสิทธิ์ก่อนจึงจะเข้าใช้งานได้</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">2. การเข้าสู่ระบบ (Login)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>เข้าสู่ระบบด้วย Username และรหัสผ่านที่ตั้งไว้</li>
                                            <li>ระบบจะจดจำการเข้าระบบของคุณไว้เป็นเวลา 24 ชั่วโมง</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">3. ลืมรหัสผ่าน (Forgot Password)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>กดปุ่ม <span className="font-bold">"ลืมรหัสผ่าน?"</span> ที่หน้าล็อกอิน</li>
                                            <li>ระบุ <b>ชื่อ-นามสกุล</b> และ <b>เบอร์โทรศัพท์</b> ให้ตรงกับตอนที่สมัคร เพื่อกู้คืนบัญชีและตั้งรหัสผ่านใหม่ด้วยตนเอง</li>
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
                                setLoadingMsg('กำลังค้นหาบัญชีของคุณ...');
                                try {
                                    const res = await fetch(SCRIPT_URL, { 
                                        method: 'POST', 
                                        body: JSON.stringify({ action: 'reset_password', api_key: window?.SAIS_CONFIG?.API_KEY, full_name: fd.get('full_name'), phone: fd.get('phone'), new_password: fd.get('password') }) 
                                    });
                                    const result = await res.json();
                                    setLoadingMsg(null);
                                    if (result.status === 'ok') { 
                                        setAlertMsg(`✅ กู้คืนบัญชีสำเร็จ!\n\nUsername ของคุณคือ:\n👉 ${result.username} 👈\n\nรหัสผ่านถูกเปลี่ยนแล้ว กรุณาใช้ Username นี้เข้าสู่ระบบครับ`);
                                        setIsForgotMode(false); 
                                    } else {
                                        setAlertMsg(result.message || 'ไม่พบข้อมูลผู้ใช้งาน');
                                    }
                                } catch(err) {
                                    setLoadingMsg(null);
                                    setAlertMsg('การเชื่อมต่อขัดข้อง');
                                }
                            } else if (isRegisterMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านไม่ตรงกัน');
                                const payload = { action: 'register', username: fd.get('username'), password: fd.get('password'), full_name: fd.get('full_name'), department: fd.get('department'), position: fd.get('position'), email: fd.get('email'), phone: fd.get('phone') };
                                const ok = await apiAction(payload, 'กำลังส่งข้อมูลสมัคร...', true);
                                if (ok) { setSuccessModal('สมัครสำเร็จ รอแอดมินอนุมัติ'); setIsRegisterMode(false); }
                            } else {
                                setLoadingMsg('กำลังตรวจสอบข้อมูล...');
                                try {
                                    const result = await utils.fetchWithRetry(SCRIPT_URL, { 
                                        method: 'POST', body: JSON.stringify({ action: 'login', api_key: window?.SAIS_CONFIG?.API_KEY, username: fd.get('username'), password: fd.get('password') }) 
                                    });
                                    setLoadingMsg(null);
                                    if (result.status === 'ok') { 
                                        localStorage.setItem('sais_user', JSON.stringify(result.user));
                                        localStorage.setItem('sais_session_time', Date.now().toString());
                                        setUser(result.user); setSuccessModal('เข้าสู่ระบบสำเร็จ'); 
                                    } else { setAlertMsg(result.message || 'รหัสผ่านไม่ถูกต้อง'); }
                                } catch (err) { setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง'); }
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
                                        <div><label className="text-[10px] font-bold text-slate-500">แผนก</label><input name="department" required placeholder="NI , MOD" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ตำแหน่ง</label><input name="position" required placeholder="PE,PM" className="bg-slate-50 w-full p-2.5 rounded-lg border text-sm" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">ตั้งรหัสผ่าน</label><input name="password" type="password" required placeholder="Password" className="bg-slate-50 w-full p-2 rounded-lg border text-sm font-bold" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ยืนยันรหัสผ่าน</label><input name="confirm_password" type="password" required placeholder="Confirm" className="bg-slate-50 w-full p-2 rounded-lg border text-sm font-bold" /></div>
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

    if (!SCRIPT_URL) return <div className="h-screen w-full flex items-center justify-center flex-col gap-4 p-8 text-center"><div className="text-4xl text-red-500"><Icons.Alert /></div><h2 className="text-xl font-bold text-slate-800">เกิดข้อผิดพลาด</h2><p className="text-slate-600 text-sm">ไม่พบการตั้งค่าเชื่อมต่อฐานข้อมูล (URL)</p></div>;
    return (
        <div className="app-container">
            {DynamicStyles()}

            {/* 📍 Dropzone สำหรับการลบผ่านการลาก */}
            <div className={`trash-dropzone ${isDragging ? 'visible' : ''} ${isTrashHovered ? 'hovered' : ''}`}
                onDragOver={handleTrashDragOver} onDragLeave={handleTrashDragLeave} onDrop={handleTrashDrop}>
                <div className="trash-icon-wrapper"><Icons.AnimatedTrash isHovered={isTrashHovered} /></div>
                <div className="trash-text">{isTrashHovered ? 'ปล่อยเพื่อลบทิ้ง!' : 'ลากมาทิ้งที่นี่'}</div>
            </div>

            {/* Overlay แจ้งเตือนสถานะต่างๆ */}
            {successModal && (
                <div className="fixed inset-0 z-[700] flex items-center justify-center pointer-events-none">
                    <div className="bg-white w-[85%] max-w-[280px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-4 border-green-400">
                        <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3"><Icons.Check /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">สำเร็จ</h3>
                        <p className="text-sm text-slate-600">{successModal}</p>
                    </div>
                </div>
            )}

            {loadingMsg && (
                <div className="backdrop z-[500] gap-4">
                    <Icons.Loader />
                    <div className="text-white font-bold text-sm bg-slate-900/60 px-5 py-2.5 rounded-full border border-slate-700 shadow-xl">{loadingMsg}</div>
                </div>
            )}

            {/* ส่วนหัวของแอป (Header) */}
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
                    <button className="btn-icon relative" onClick={() => { setShowActivityModal(true); if(!hasLoadedAdmin) fetchAdminData(0, 50, 'all'); }}>
                        <Icons.Bell />{unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                    </button>
                    <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.User /> {user.username}</div>
                </div>
            </header>

            {/* 📍 แถบเมนูด้านล่าง (Bottom Nav) ปลดล็อกให้ออกระบบได้ทุกคน และแสดง Dashboard ให้ทุกคน */}
            <div className="bottom-nav">
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => handleTabChange('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {user && !isAdmin && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => handleTabChange('my_bookings')}><Icons.List /> งานฉัน</div>}
                <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}><Icons.Chart /> สถิติ</div>
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { handleTabChange('admin'); setAdminTab('menu'); }}><Icons.Shield /> จัดการ</div>}
                <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>
            </div>

            {/* =========================================
                VIEWS (หน้าจอต่างๆ)
            ========================================= */}

            {/* 1. หน้าตารางปฏิทิน */}
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

            {/* 2. หน้าตรวจเอกสาร (Admin) */}
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

            {/* 3. หน้าค้นหา */}
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
                            <input type="text" placeholder="พิมพ์ Eq No., โครงการ, หรือผู้ตรวจ..." className="w-full text-sm outline-none border-none bg-transparent font-bold text-slate-700" value={localSearchQuery} onChange={(e) => setLocalSearchQuery(e.target.value)} autoFocus />
                            {localSearchQuery && <button onClick={() => { setLocalSearchQuery(''); setSearchQuery(''); }} className="text-slate-400 p-1 bg-slate-100 rounded-full"><Icons.X /></button>}
                        </div>
                    </div>
                    <div className="space-y-3 pb-10">
                        {!hasLoadedAdmin ? (
                             <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4"><Icons.Loader /> กำลังโหลดฐานข้อมูลทั้งหมด...</div>
                        ) : searchQuery.trim() === '' && filterArea === 'All' ? (
                            <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">พิมพ์ข้อมูลหรือเลือกพื้นที่เพื่อเริ่มค้นหา...</div>
                        ) : (
                            (() => {
                                const searchResults = (adminDb.all_bookings || []).filter(b => {
                                    if (String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;
                                    if (String(b.status) === 'cancelled') return false;
                                    const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
                                    const s = searchQuery.toLowerCase();
                                    const matchSearch = String(b.equipment_no || '').toLowerCase().includes(s) || String(b.site_name || '').toLowerCase().includes(s) || String(b.inspector_name || '').toLowerCase().includes(s);
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

            {/* 4. หน้างานของฉัน (เพิ่มแท็บวันลาส่วนตัวของ Inspector) */}
            {currentView === 'my_bookings' && !isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Icons.List /> {user?.role === 'inspector' ? 'คิวงานตรวจของฉัน' : 'งานที่ฉันจองไว้'}
                        </h2>
                        <button onClick={() => setShowRoleHelp(!showRoleHelp)} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 flex items-center gap-1">
                            <Icons.HelpCircle /> วิธีใช้งานหน้านี้
                        </button>
                    </div>

                    {showRoleHelp && (
                        <div className="bg-slate-800 text-white p-4 rounded-xl mb-4 shadow-md text-xs leading-relaxed animate-pop relative">
                            <button onClick={() => setShowRoleHelp(false)} className="absolute top-3 right-3 text-slate-400 hover:text-white"><Icons.X /></button>
                            <h3 className="font-bold text-sm mb-2 text-blue-300">
                                {user?.role === 'inspector' ? '🛠️ คู่มือสำหรับ Inspector' : '📌 คู่มือสำหรับผู้จอง (Viewer)'}
                            </h3>
                            {user?.role === 'inspector' ? (
                                <ul className="list-disc pl-4 space-y-1.5 text-slate-200">
                                    <li><b>⏳ คิวรอตรวจ:</b> แสดงคิวงานที่ถูกจองชื่อคุณไว้ แต่แอดมินยังตรวจเอกสารไม่ครบ 100%</li>
                                    <li><b>✅ เอกสารครบแล้ว:</b> งานที่พร้อมดำเนินการ (แอดมินยืนยันเอกสารครบแล้ว)</li>
                                    <li><b>🌴 วันลาของฉัน:</b> จัดการวันหยุดพักผ่อน, ลาป่วย, ลากิจ ของคุณได้เองที่แท็บนี้</li>
                                </ul>
                            ) : (
                                <ul className="list-disc pl-4 space-y-1.5 text-slate-200">
                                    <li><b>⏳ รอดำเนินการ:</b> คิวงานที่คุณกดจองไว้ และระบบกำลังรอให้ Admin ทำการตรวจสอบเอกสารแนบของคุณ</li>
                                    <li><b>✅ อนุมัติแล้ว:</b> คิวงานที่ Admin ตรวจตรวจสอบเอกสารครบถ้วนแล้ว (คิวสมบูรณ์)</li>
                                    <li><b>แก้ไข/ยกเลิก:</b> กดปุ่มจุดสามจุด (⋮) มุมขวาบนของการ์ด เพื่อแก้ไขรายละเอียด หรือยกเลิกคิวงาน <span className="text-red-400">(เฉพาะคิวที่ยังไม่ถึงวันตรวจจริง)</span></li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* แท็บเมนูย่อยของหน้างานฉัน */}
                    <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg overflow-x-auto custom-scrollbar">
                        <button onClick={() => setMyBookingsTab('pending')} className={`flex-1 py-2 text-xs font-bold rounded-md whitespace-nowrap px-2 ${myBookingsTab === 'pending' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>
                            {user?.role === 'inspector' ? '⏳ คิวรอตรวจ' : '⏳ รอดำเนินการ'}
                        </button>
                        <button onClick={() => setMyBookingsTab('approved')} className={`flex-1 py-2 text-xs font-bold rounded-md whitespace-nowrap px-2 ${myBookingsTab === 'approved' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500'}`}>
                            {user?.role === 'inspector' ? '✅ เอกสารครบแล้ว' : '✅ อนุมัติแล้ว'}
                        </button>
                        <button onClick={() => setMyBookingsTab('completed')} className={`flex-1 py-2 text-xs font-bold rounded-md whitespace-nowrap px-2 ${myBookingsTab === 'completed' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
                            🗄️ ประวัติที่ผ่านมา
                        </button>
                        {user?.role === 'inspector' && (
                            <button onClick={() => setMyBookingsTab('leave')} className={`flex-1 py-2 text-xs font-bold rounded-md whitespace-nowrap px-2 ${myBookingsTab === 'leave' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>
                                🌴 วันลาของฉัน
                            </button>
                        )}
                    </div>
                    
                    {/* ปุ่มเพิ่มวันลา (แสดงเฉพาะแท็บวันลา) */}
                    {myBookingsTab === 'leave' && user?.role === 'inspector' && (
                        <div className="mb-4">
                            <button onClick={() => setModal({ type: 'inspector_leave_form', data: {} })} className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl shadow-md flex justify-center items-center gap-2 active:scale-95 transition-all">
                                <Icons.Plus /> แจ้งวันลาหยุด (ส่วนตัว)
                            </button>
                        </div>
                    )}

                    <div className="space-y-3 pb-10">
                        {(() => {
                            const isInspectorRole = user?.role === 'inspector';
                            const mappedName = user?.inspector_mapped_name || user?.full_name || user?.username;
                            
                            const filteredTasks = (db.bookings || []).filter(b => {
                                if(String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;

                                // 📍 แท็บวันลาส่วนตัวของ Inspector
                                if (myBookingsTab === 'leave') {
                                    const isAssigned = String(b.inspector_name).toLowerCase() === String(mappedName).toLowerCase();
                                    return isAssigned && String(b.job_type).toLowerCase() === 'leave' && String(b.status) !== 'cancelled';
                                }

                                if(String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;

                                if (isInspectorRole) {
                                    const isAssigned = String(b.inspector_name).toLowerCase() === String(user?.username).toLowerCase() || 
                                                       String(b.inspector_name).toLowerCase() === String(mappedName).toLowerCase();
                                    if (!isAssigned) return false;
                                } else {
                                    if (b.created_by !== user?.username) return false;
                                }

                                const isDocsOk = String(b.layout_doc) === 'true' && String(b.wiring_doc) === 'true' && String(b.precheck_doc) === 'true';
                                const isPast = new Date(formatSafeDate(b.date)) < new Date(todayLocalString); 

                                if (myBookingsTab === 'completed') return isPast;
                                if (myBookingsTab === 'approved') return isDocsOk && !isPast;
                                return !isDocsOk && !isPast; 
                            }).sort((a, b) => new Date(b.date) - new Date(a.date));

                            if (filteredTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่พบข้อมูลในหมวดหมู่นี้</div>;

                            return (
                                <>
                                    {filteredTasks.slice(0, myBookingsLimit).map((h, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                            {(!isInspectorRole && myBookingsTab === 'pending') || (isInspectorRole && myBookingsTab === 'leave') ? (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border shadow-sm"><Icons.MoreVertical /></button>
                                                    {actionMenuId === h.id && (
                                                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-xs">
                                                            {myBookingsTab === 'leave' ? (
                                                                <>
                                                                    <button onClick={() => { setModal({ type: 'inspector_leave_form', data: h }); setActionMenuId(null); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                                    <button onClick={() => handleCancelBooking(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ยกเลิกวันลา</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => { setAreaSelection(h.area || ''); setJobTypeSelection(h.job_type || ''); setProductLineSelection(h.product_line || ''); setModal({ type: 'booking', data: h }); setActionMenuId(null); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                                    <button onClick={() => handleCancelJob(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ยกเลิกคิวงาน</button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : null}
                                            
                                            <div className="cursor-pointer pr-6" onClick={() => setModal({ type: 'detail', data: h })}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div>
                                                </div>
                                                <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                                
                                                {myBookingsTab === 'leave' ? (
                                                    <div className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-bold flex items-center gap-2">
                                                        <Icons.User /> สถานะ: แจ้งลาระบบเรียบร้อย
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                                        <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                        <div><b>ผู้ตรวจ:</b> {h.inspector_name || '-'}</div><div><b>พื้นที่:</b> {h.area || '-'}</div>
                                                        {h.tel && <div className="col-span-2"><b>เบอร์ติดต่อ:</b> {h.tel}</div>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {myBookingsLimit < filteredTasks.length && (
                                        <button onClick={() => setMyBookingsLimit(prev => prev + 20)} className="w-full py-3 bg-slate-200 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                            โหลดรายการเพิ่มเติม... ({myBookingsLimit} / {filteredTasks.length})
                                        </button>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* 5. หน้าต่าง Dashboard วิเคราะห์ข้อมูลอัจฉริยะ (ทุกคนดูได้ และ Default เป็นเดือนปัจจุบัน) */}
            {currentView === 'dashboard' && (
                <div className="page-view relative pb-20 animate-pop">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.PieChart /> ภาพรวมระบบ (Dashboard)</h2>
                        <p className="text-xs text-slate-500 mt-1">วิเคราะห์ข้อมูลเชิงลึกและสถิติการทำงานในระบบทั้งหมด</p>
                    </div>

                    {!hasLoadedAdmin ? (
                        <div className="text-center text-slate-400 p-10 flex flex-col items-center justify-center gap-4">
                            <Icons.Loader /> กำลังประมวลผลข้อมูลสถิติ...
                        </div>
                    ) : (
                        <div className="space-y-4 pb-10">
                            {/* 📍 Filters กรองสถิติแบบละเอียด */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-1">ปี (Year)</label>
                                    <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 font-bold outline-none text-slate-700" value={dashYear} onChange={e=>setDashYear(e.target.value)}>
                                        <option value="All">ทุกปี</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-1">เดือน (Month)</label>
                                    <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 font-bold outline-none text-slate-700" value={dashMonth} onChange={e=>setDashMonth(e.target.value)}>
                                        <option value="All">ทุกเดือน</option>
                                        <option value="1">มกราคม</option>
                                        <option value="2">กุมภาพันธ์</option>
                                        <option value="3">มีนาคม</option>
                                        <option value="4">เมษายน</option>
                                        <option value="5">พฤษภาคม</option>
                                        <option value="6">มิถุนายน</option>
                                        <option value="7">กรกฎาคม</option>
                                        <option value="8">สิงหาคม</option>
                                        <option value="9">กันยายน</option>
                                        <option value="10">ตุลาคม</option>
                                        <option value="11">พฤศจิกายน</option>
                                        <option value="12">ธันวาคม</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-1">พื้นที่ (Area)</label>
                                    <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 font-bold outline-none text-slate-700" value={dashArea} onChange={e=>setDashArea(e.target.value)}>
                                        <option value="All">ทุกพื้นที่</option>
                                        <option value="กรุงเทพและปริมณฑล">กทม. และปริมณฑล</option>
                                        <option value="เชียงใหม่">เชียงใหม่</option>
                                        <option value="ภูเก็ต">ภูเก็ต</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-1">ประเภทงาน (Job Type)</label>
                                    <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 font-bold outline-none text-slate-700" value={dashJobType} onChange={e=>setDashJobType(e.target.value)}>
                                        <option value="All">ทุกประเภท</option>
                                        <option value="New">New</option>
                                        <option value="MOD">MOD</option>
                                        <option value="Re-ins temporary power supply">Re-ins temporary</option>
                                        <option value="Re-ins builder lift">Re-ins builder lift</option>
                                    </select>
                                </div>
                            </div>

                            {(() => {
                                // Data Processing
                                const allTasks = (adminDb.all_bookings || []).filter(b => {
                                    if (String(b.status) === 'cancelled') return false;
                                    if (['leave', 'company_event', 'public_holiday'].includes(String(b.job_type).toLowerCase())) return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_') || String(b.equipment_no).startsWith('HLD_')) return false;
                                    
                                    const d = b.date ? new Date(b.date) : null;
                                    if (!d || isNaN(d.getTime())) return false;
                                    
                                    if (dashYear !== 'All' && d.getFullYear().toString() !== dashYear) return false;
                                    if (dashMonth !== 'All' && (d.getMonth() + 1).toString() !== dashMonth) return false;
                                    if (dashArea !== 'All' && b.area !== dashArea && (dashArea !== 'other' || ['กรุงเทพและปริมณฑล', 'เชียงใหม่', 'ภูเก็ต'].includes(b.area))) return false;
                                    if (dashJobType !== 'All' && b.job_type !== dashJobType) return false;
                                    
                                    return true;
                                });
                                
                                const totalJobs = allTasks.length;
                                
                                // Group By Job Type
                                const jobTypeCounts = allTasks.reduce((acc, task) => {
                                    const type = task.job_type || 'ไม่ระบุ';
                                    acc[type] = (acc[type] || 0) + 1;
                                    return acc;
                                }, {});

                                // Document Completeness
                                const docStats = allTasks.reduce((acc, task) => {
                                    const isComplete = String(task.layout_doc)==='true' && String(task.wiring_doc)==='true' && String(task.precheck_doc)==='true';
                                    if (isComplete) acc.complete++; else acc.pending++;
                                    return acc;
                                }, { complete: 0, pending: 0 });

                                // Inspector Counts
                                const inspectorCounts = allTasks.reduce((acc, task) => {
                                    const name = task.inspector_name || 'ไม่ระบุ';
                                    acc[name] = (acc[name] || 0) + 1;
                                    return acc;
                                }, {});
                                
                                // 📍 เรียงผู้ตรวจตามลำดับเดียวกับตารางหน้าหลัก (เรียงจากฐานข้อมูล inspectors)
                                const sortedInspectors = (db.inspectors || []).map(ins => {
                                    return { name: ins.name, count: inspectorCounts[ins.name] || 0 };
                                });

                                return (
                                    <>
                                        {/* Summary Cards */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-sm text-white">
                                                <div className="text-[10px] font-bold text-blue-100 mb-1">คิวงานตามเงื่อนไข</div>
                                                <div className="text-3xl font-black">{totalJobs} <span className="text-xs font-normal opacity-80">งาน</span></div>
                                            </div>
                                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 rounded-2xl shadow-sm text-white">
                                                <div className="text-[10px] font-bold text-emerald-100 mb-1">เอกสารผ่านแล้ว</div>
                                                <div className="text-3xl font-black">{docStats.complete} <span className="text-xs font-normal opacity-80">งาน</span></div>
                                            </div>
                                        </div>

                                        {/* 📍 Top Inspectors Leaderboard (เรียงตามรายชื่อบนตาราง) */}
                                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.Award /> สถิติงานแยกตามผู้ตรวจ</h3>
                                            <div className="space-y-2">
                                                {sortedInspectors.map((ins, idx) => (
                                                    <div key={ins.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-sm">
                                                                {idx + 1}
                                                            </div>
                                                            <span className="font-bold text-slate-700 text-xs">{ins.name}</span>
                                                        </div>
                                                        <div className="font-black text-blue-600 text-sm">{ins.count} <span className="text-[10px] font-normal text-slate-400">คิว</span></div>
                                                    </div>
                                                ))}
                                                {sortedInspectors.length === 0 && <div className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-xl border-2 border-dashed">ไม่มีรายชื่อผู้ตรวจ</div>}
                                            </div>
                                        </div>

                                        {/* Job Type Breakdown Bar */}
                                        {totalJobs > 0 && (
                                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.Chart /> สัดส่วนประเภทงาน</h3>
                                                <div className="space-y-3">
                                                    {Object.entries(jobTypeCounts).sort((a,b)=>b[1]-a[1]).map(([type, count], idx) => {
                                                        const percent = totalJobs > 0 ? Math.round((count / totalJobs) * 100) : 0;
                                                        const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-slate-400'];
                                                        const colorClass = colors[idx % colors.length];
                                                        return (
                                                            <div key={type} className="relative">
                                                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                                    <span>{type}</span>
                                                                    <span>{count} งาน ({percent}%)</span>
                                                                </div>
                                                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                                                    <div className={`${colorClass} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )
                            })()}
                        </div>
                    )}
                </div>
            )}
            {/* 6. หน้า Admin Panel จัดการทุกอย่าง */}
            {currentView === 'admin' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Icons.Shield /> Admin Panel
                                {!hasLoadedAdmin && <span className="text-[10px] text-blue-500 animate-pulse ml-2 font-normal border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">ดึงข้อมูล...</span>}
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={() => setShowAdminHelp(!showAdminHelp)} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 flex items-center gap-1 active:scale-95">
                                    <Icons.HelpCircle /> คู่มือแอดมิน
                                </button>
                                {adminTab !== 'menu' && (
                                    <button onClick={() => setAdminTab('menu')} className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border shadow-sm active:scale-95 flex items-center gap-1">
                                        <Icons.ChevronLeft /> กลับเมนู
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {showAdminHelp && (
                        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 mb-4 shadow-sm text-sm animate-pop">
                            <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-3">
                                <h3 className="font-bold text-blue-800 flex items-center gap-2"><Icons.Shield /> คู่มือการใช้งานสำหรับ Admin</h3>
                                <button onClick={() => setShowAdminHelp(false)} className="text-blue-500 hover:text-blue-700"><Icons.X /></button>
                            </div>
                            <div className="space-y-4 text-blue-900 text-xs leading-relaxed">
                                <div><b>👥 จัดการผู้ใช้งาน:</b> สามารถกด "สร้างผู้ใช้งานใหม่" หรือ อนุมัติสิทธิ์พนักงาน (Pending ➡️ Approved) และรีเซ็ตรหัสผ่าน <br/><span className="text-red-600 font-bold">จุดสำคัญ:</span> สำหรับผู้ตรวจ (Inspector) แอดมินต้อง <b>"ผูกชื่อในตาราง (Mapping Name)"</b> ให้ตรงกับชื่อในปฏิทิน เพื่อให้งานเด้งไปที่หน้า "งานฉัน" ของผู้ตรวจท่านนั้น</div>
                                <div><b>📋 ผู้ตรวจ & Certificate:</b> กำหนดว่า Inspector แต่ละท่านสามารถตรวจ Product Line ใดได้บ้าง (เช่น ES1, 3300) หากไม่ได้เลือกไว้ ระบบจะไม่ให้ User จองคิวนั้น</div>
                                <div><b>🗓️ จัดการวันพิเศษ (ลาก/ย้ายคิว):</b> แอดมินสามารถกำหนดวันหยุดบริษัท, กิจกรรม (แสดงแถบสีเขียว), และวันลา (แสดงแถบสีเหลือง) พร้อมทั้งลบแบบกลุ่มได้ <br/> แอดมินสามารถ <b>คลิกค้างที่การ์ดแล้วลาก (Drag & Drop)</b> เพื่อย้ายคิวงานข้ามวันหรือเปลี่ยนคนตรวจได้ทันที</div>
                                <div><b>✅ ตรวจสอบเอกสาร:</b> ไปที่แท็บ "ตรวจเอกสาร" ด้านล่าง เพื่อกดยืนยัน (Check) ว่าได้รับ Layout, Wiring, Precheck เรียบร้อยแล้ว (สถานะจะเปลี่ยนเป็นตรวจแล้ว)</div>
                                <div><b>🎨 ตั้งค่าสีเว็บไซต์:</b> ปรับแต่งสีสัน, ความกว้างตาราง, และขนาดฟอนต์ได้ด้วยตนเองผ่านเมนู <b>"ตั้งค่าสีเว็บไซต์ / ตาราง"</b> โดยไม่ต้องแก้โค้ด</div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'menu' && (
                        <div className="grid grid-cols-2 gap-4 animate-pop pb-10">
                            <button onClick={() => setAdminTab('users')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-blue-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Icons.User /></div>
                                <span className="font-bold text-slate-700 text-sm">จัดการผู้ใช้งาน</span>
                            </button>

                            <button onClick={() => setAdminTab('inspectors')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-indigo-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><Icons.FileCheck /></div>
                                <span className="font-bold text-slate-700 text-sm">ผู้ตรวจ & Certificate</span>
                            </button>

                            <button onClick={() => setAdminTab('special_management')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-amber-400 transition-all col-span-2">
                                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><Icons.Clock /></div>
                                <span className="font-bold text-amber-800 text-sm text-center">จัดการวันกิจกรรม/วันลา/วันหยุด</span>
                            </button>

                            <button onClick={() => setAdminTab('all_bookings')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-slate-400 transition-all col-span-2">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"><Icons.List /></div>
                                <span className="font-bold text-slate-700 text-sm text-center">งานทั้งหมดในระบบ</span>
                            </button>

                            <button onClick={() => setAdminTab('web_settings')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-pink-400 transition-all col-span-2">
                                <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center"><Icons.Settings /></div>
                                <span className="font-bold text-slate-700 text-sm text-center">ตั้งค่าสีเว็บไซต์ / ตาราง (UI Settings)</span>
                            </button>
                        </div>
                    )}

                    {/* 📍 Tab ปรับแต่งเว็บไซต์ */}
                    {adminTab === 'web_settings' && (
                        <div className="space-y-4 animate-pop pb-10">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2"><Icons.Settings /> ปรับแต่งหน้าตาเว็บไซต์ (UI Customization)</h3>
                                <button onClick={() => {
                                    setConfirmDialog({
                                        msg: 'ต้องการรีเซ็ตการตั้งค่า UI ทั้งหมดให้กลับเป็นค่าเริ่มต้นหรือไม่?',
                                        onConfirm: async () => {
                                            setConfirmDialog(null);
                                            const ok = await apiAction({ action: 'save_settings', settings: {} }, 'กำลังรีเซ็ตค่าเริ่มต้น...');
                                            if (ok) { setSuccessModal('รีเซ็ตการตั้งค่าเรียบร้อยแล้ว'); fetchCoreData(false, dbRef.current); }
                                        }
                                    });
                                }} className="text-[10px] bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-200 font-bold active:scale-95 shadow-sm">
                                    ↺ รีเซ็ตค่าเริ่มต้น
                                </button>
                            </div>
                            
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const settingsObj = Object.fromEntries(fd);
                                const ok = await apiAction({ action: 'save_settings', settings: settingsObj }, 'กำลังบันทึกการตั้งค่า...');
                                if(ok) {
                                    setSuccessModal('อัปเดตสไตล์เว็บไซต์เรียบร้อยแล้ว');
                                    fetchCoreData(false, dbRef.current);
                                }
                            }} className="bg-white p-5 rounded-2xl border shadow-sm space-y-6">
                                
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-blue-700 bg-blue-50 p-2 rounded-lg">1. ทั่วไปและแถบหัวเรื่อง</h4>
                                    <div><label className="text-xs font-bold text-slate-700 block mb-1">ชื่อแถบหัวเรื่อง (App Name)</label><input type="text" name="appName" defaultValue={db.settings?.appName || 'SAIS BOOKING'} className="w-full p-3 border rounded-xl text-sm font-bold bg-slate-50" /></div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สีพื้นหลัง Header</label><input type="color" name="headerBg" defaultValue={db.settings?.headerBg || '#1e293b'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สีตัวอักษร Header</label><input type="color" name="headerText" defaultValue={db.settings?.headerText || '#ffffff'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สีพื้นหลังแอป (App BG)</label><input type="color" name="appBg" defaultValue={db.settings?.appBg || '#f8fafc'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">2. ขนาดและรูปแบบตาราง</h4>
                                    
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <label className="text-xs font-bold text-slate-700 block mb-2">ความกว้างคอลัมน์ (px)</label>
                                        <div className="flex items-center justify-between gap-3">
                                            <button type="button" className="w-12 h-12 bg-white border border-slate-300 rounded-xl font-black text-xl text-slate-600 shadow-sm active:scale-95" 
                                                onClick={(e) => {
                                                    const input = e.target.parentElement.querySelector('input');
                                                    const span = e.target.parentElement.querySelector('span');
                                                    let val = parseInt(input.value) - 5; if(val < 50) val = 50;
                                                    input.value = val; span.innerText = val;
                                                }}>-</button>
                                            <span className="font-black text-blue-600 text-lg">{db.settings?.gridColWidth || 115}</span>
                                            <button type="button" className="w-12 h-12 bg-white border border-slate-300 rounded-xl font-black text-xl text-slate-600 shadow-sm active:scale-95" 
                                                onClick={(e) => {
                                                    const input = e.target.parentElement.querySelector('input');
                                                    const span = e.target.parentElement.querySelector('span');
                                                    let val = parseInt(input.value) + 5; if(val > 400) val = 400;
                                                    input.value = val; span.innerText = val;
                                                }}>+</button>
                                            <input type="hidden" name="gridColWidth" defaultValue={db.settings?.gridColWidth || 115} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สีเส้นขอบตาราง</label><input type="color" name="tableBorder" defaultValue={db.settings?.tableBorder || '#cbd5e1'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สีหัวตาราง</label><input type="color" name="tableHeaderBg" defaultValue={db.settings?.tableHeaderBg || '#1e293b'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สีอักษรหัวตาราง</label><input type="color" name="tableHeaderText" defaultValue={db.settings?.tableHeaderText || '#ffffff'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-indigo-700 bg-indigo-50 p-2 rounded-lg">3. ขนาดและตัวอักษรภายในการ์ดงาน</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <label className="text-xs font-bold text-slate-700 block mb-2">ความโค้งมนของการ์ด (px)</label>
                                            <div className="flex items-center justify-between gap-3">
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseInt(el.value)-1; if(v<0) v=0; el.value=v; sp.innerText=v; }}>-</button>
                                                <span className="font-black text-blue-600">{db.settings?.cardRadius || 6}</span>
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseInt(el.value)+1; if(v>20) v=20; el.value=v; sp.innerText=v; }}>+</button>
                                                <input type="hidden" name="cardRadius" defaultValue={db.settings?.cardRadius || 6} />
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <label className="text-xs font-bold text-slate-700 block mb-2">ระยะขอบในการ์ด (Padding px)</label>
                                            <div className="flex items-center justify-between gap-3">
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseInt(el.value)-1; if(v<0) v=0; el.value=v; sp.innerText=v; }}>-</button>
                                                <span className="font-black text-blue-600">{db.settings?.cardPadding || 4}</span>
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseInt(el.value)+1; if(v>15) v=15; el.value=v; sp.innerText=v; }}>+</button>
                                                <input type="hidden" name="cardPadding" defaultValue={db.settings?.cardPadding || 4} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <label className="text-xs font-bold text-slate-700 block mb-2">ขนาดฟอนต์หัวข้อหลัก (px)</label>
                                            <div className="flex items-center justify-between gap-3">
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseFloat(el.value)-0.5; if(v<8) v=8; el.value=v; sp.innerText=v; }}>-</button>
                                                <span className="font-black text-indigo-600">{db.settings?.titleFontSize || 11}</span>
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseFloat(el.value)+0.5; if(v>24) v=24; el.value=v; sp.innerText=v; }}>+</button>
                                                <input type="hidden" name="titleFontSize" defaultValue={db.settings?.titleFontSize || 11} />
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <label className="text-xs font-bold text-slate-700 block mb-2">ขนาดฟอนต์รายละเอียด (px)</label>
                                            <div className="flex items-center justify-between gap-3">
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseFloat(el.value)-0.5; if(v<6) v=6; el.value=v; sp.innerText=v; }}>-</button>
                                                <span className="font-black text-indigo-600">{db.settings?.subFontSize || 10}</span>
                                                <button type="button" className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-600 shadow-sm active:scale-95" onClick={(e) => { const el = e.target.parentElement.querySelector('input'); const sp = e.target.parentElement.querySelector('span'); let v = parseFloat(el.value)+0.5; if(v>20) v=20; el.value=v; sp.innerText=v; }}>+</button>
                                                <input type="hidden" name="subFontSize" defaultValue={db.settings?.subFontSize || 10} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-amber-700 bg-amber-50 p-2 rounded-lg">4. สีการ์ดแยกตามประเภทงาน</h4>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                        <div className="border p-3 rounded-xl bg-slate-50"><label className="text-[10px] font-bold block mb-2 text-slate-700">งานปกติ (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="normalBg" defaultValue={db.settings?.normalBg || '#e2e8f0'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="normalText" defaultValue={db.settings?.normalText || '#1e293b'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                        <div className="border p-3 rounded-xl bg-slate-50"><label className="text-[10px] font-bold block mb-2 text-slate-700">งาน MOD (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="modBg" defaultValue={db.settings?.modBg || '#64748b'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="modText" defaultValue={db.settings?.modText || '#ffffff'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                        <div className="border p-3 rounded-xl bg-slate-50"><label className="text-[10px] font-bold block mb-2 text-slate-700">ต่างจังหวัด (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="upcBg" defaultValue={db.settings?.upcBg || '#f472b6'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="upcText" defaultValue={db.settings?.upcText || '#ffffff'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                        <div className="border p-3 rounded-xl bg-slate-50"><label className="text-[10px] font-bold block mb-2 text-slate-700">Re-ins/Temp (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="reinsBg" defaultValue={db.settings?.reinsBg || '#fef08a'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="reinsText" defaultValue={db.settings?.reinsText || '#854d0e'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                        <div className="border p-3 rounded-xl bg-red-50"><label className="text-[10px] font-bold block mb-2 text-red-600">วันหยุด (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="holidayBg" defaultValue={db.settings?.holidayBg || '#D0021B'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="holidayText" defaultValue={db.settings?.holidayText || '#ffffff'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                        <div className="border p-3 rounded-xl bg-amber-50"><label className="text-[10px] font-bold block mb-2 text-amber-600">วันลา (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="leaveBg" defaultValue={db.settings?.leaveBg || '#eab308'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="leaveText" defaultValue={db.settings?.leaveText || '#ffffff'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                        <div className="border p-3 rounded-xl bg-emerald-50 col-span-2"><label className="text-[10px] font-bold block mb-2 text-emerald-600">กิจกรรมบริษัท (พื้น / อักษร)</label>
                                            <div className="flex gap-2"><input type="color" name="eventBg" defaultValue={db.settings?.eventBg || '#22c55e'} className="w-1/2 h-10 border rounded cursor-pointer" /><input type="color" name="eventText" defaultValue={db.settings?.eventText || '#ffffff'} className="w-1/2 h-10 border rounded cursor-pointer" /></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="submit" className="w-full py-4 mt-6 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all text-sm flex items-center justify-center gap-2">
                                    <Icons.Check /> บันทึกการตั้งค่าทั้งหมด
                                </button>
                            </form>
                        </div>
                    )}

                    {/* เมนูจัดการผู้ใช้งาน (Users) */}
                    {adminTab === 'users' && (
                        <div className="space-y-3 mt-4 animate-pop pb-10">
                            
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden mb-6">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white flex items-center gap-2">
                                    <Icons.User /> <h3 className="font-bold text-sm">คู่มือ: การจัดการสิทธิ์ผู้ใช้งาน</h3>
                                </div>
                                <div className="p-4 bg-blue-50/50">
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                                            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0"><Icons.Clock /></div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-xs">สถานะ: รออนุมัติ (Pending)</div>
                                                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">เมื่อมีผู้ใช้สมัครใหม่ จะแสดงสถานะรออนุมัติ กดแก้ไขเพื่อปรับสถานะเป็น "อนุมัติ" ผู้ใช้ถึงจะเข้าล็อกอินได้</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0"><Icons.Info /></div>
                                            <div>
                                                <div className="font-bold text-indigo-800 text-xs">การให้สิทธิ์ Inspector (ผู้ตรวจ)</div>
                                                <div className="text-[10px] text-slate-600 leading-tight mt-0.5">เข้าไปที่ <b>"แก้ไข/เปลี่ยนสิทธิ์"</b> เปลี่ยนสิทธิ์เป็น Inspector แล้วเลือก <b>ผูกชื่อในตาราง (Mapping Name)</b> ให้ตรงกับรายชื่อผู้ตรวจ เพื่อให้คิวงานเชื่อมโยงไปยังหน้า "งานฉัน" ของคนๆ นั้น</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-1 mb-3">
                                <h3 className="font-bold text-slate-800 text-sm">จัดการผู้ใช้งานระบบ ({(adminDb.users || []).length})</h3>
                                <button onClick={() => setModal({ type: 'edit_user', isNew: true, data: { username: '', full_name: '', department: '', position: '', phone: '', role: 'user', status: 'approved' } })} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95">
                                    <Icons.Plus /> สร้างผู้ใช้งาน
                                </button>
                            </div>
                            
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : (adminDb.users || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูลผู้ใช้</div> :
                            (adminDb.users || []).map((u, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2 hover:border-blue-300 transition-all">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black">
                                                {u.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 flex items-center gap-2">
                                                    {u.username}
                                                    {u.role === 'admin' && <span className="bg-red-100 text-red-600 text-[9px] px-2 py-0.5 rounded-full font-black border border-red-200 tracking-wide">ADMIN</span>}
                                                    {u.role === 'inspector' && <span className="bg-indigo-100 text-indigo-600 text-[9px] px-2 py-0.5 rounded-full font-black border border-indigo-200 tracking-wide">INSPECTOR</span>}
                                                </div>
                                                <div className="text-[10px] text-slate-500 mt-1">{u.full_name || '-'} | {u.department || '-'}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-bold px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-1 bg-slate-50">
                                            {u.status === 'approved' ? <span className="text-emerald-600">✅ อนุมัติแล้ว</span> : 
                                             u.status === 'blocked' ? <span className="text-red-600">⛔ ระงับสิทธิ์</span> : 
                                             <span className="text-amber-600">⏳ รออนุมัติ</span>}
                                        </div>
                                    </div>
                                    
                                    {u.inspector_mapped_name && u.role === 'inspector' && (
                                        <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md mt-1 border border-amber-100">
                                            🔗 ผูกชื่อในตาราง: {u.inspector_mapped_name}
                                        </div>
                                    )}
                                    
                                    <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100">
                                        <button onClick={() => setModal({ type: 'edit_user', isNew: false, data: u })} className="text-[11px] bg-blue-50 text-blue-600 py-2 rounded-lg font-bold border border-blue-200 hover:bg-blue-100 flex items-center justify-center gap-1 col-span-2 shadow-sm">
                                            <Icons.Edit /> แก้ไข/เปลี่ยนสิทธิ์
                                        </button>
                                        <button onClick={() => apiAction({action: 'update_user_status', target_user: u.username, new_status: u.status === 'approved' ? 'pending' : 'approved', admin_user: user?.username}, 'กำลังอัปเดต...')} className={`text-[11px] py-2 rounded-lg font-bold border shadow-sm col-span-1 ${u.status === 'approved' ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'}`}>
                                            {u.status === 'approved' ? 'ระงับ' : 'อนุมัติ'}
                                        </button>
                                        <button onClick={() => {
                                            setConfirmDialog({
                                                msg: `ยืนยันการลบผู้ใช้ ${u.username} ถาวร?`,
                                                onConfirm: () => apiAction({action: 'delete_user', target_user: u.username, admin_user: user?.username}, 'กำลังลบ...').then(() => {
                                                    setConfirmDialog(null);
                                                    fetchAdminData(0, 50, 'users');
                                                })
                                            });
                                        }} className="text-[11px] bg-red-50 text-red-600 py-2 rounded-lg font-bold border border-red-200 hover:bg-red-100 col-span-1 shadow-sm">ลบ</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* เมนูผู้ตรวจ และ Certificate */}
                    {adminTab === 'inspectors' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <div className="bg-gradient-to-br from-indigo-800 to-indigo-600 p-5 rounded-2xl shadow-md text-white mb-6">
                                <div className="flex items-center gap-2 mb-3"><Icons.Shield /> <h3 className="font-bold text-lg">จัดการ Certificate ผู้ตรวจ</h3></div>
                                <p className="text-xs text-indigo-100 leading-relaxed mb-4">กำหนดสิทธิ์ว่าผู้ตรวจแต่ละท่านสามารถรับงานของ Product Line ใดได้บ้าง เพื่อป้องกันการจองคิวผิดประเภท</p>
                                <button onClick={() => setModal({ type: 'inspector_form' })} className="w-full py-3 bg-white text-indigo-700 font-black rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.UserPlus /> เพิ่มรายชื่อผู้ตรวจใหม่
                                </button>
                            </div>

                            <div className="flex justify-between items-center px-1 mb-2">
                                <h3 className="font-bold text-slate-800 text-sm">รายชื่อผู้ตรวจทั้งหมด ({(db.inspectors || []).length})</h3>
                            </div>

                            <div className="space-y-3">
                                {(db.inspectors || []).map((ins, i) => (
                                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3 relative overflow-hidden">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">{ins.name.charAt(0)}</div>
                                                <div><div className="font-black text-slate-800 text-base">{ins.name}</div></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setModal({ type: 'inspector_form', data: ins })} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 shadow-sm transition-all"><Icons.Edit /></button>
                                                <button onClick={() => setConfirmDialog({msg:`ยืนยันการลบผู้ตรวจ "${ins.name}" ออกจากระบบ?`, onConfirm: async() => {
                                                    setConfirmDialog(null);
                                                    const ok = await apiAction({action: 'manage_inspector', sub_action: 'delete', old_name: ins.name}, 'กำลังลบ...');
                                                    if(ok) setSuccessModal('ลบสำเร็จ');
                                                }})} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 shadow-sm transition-all"><Icons.Trash /></button>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                            <div className="text-[10px] text-slate-400 font-bold mb-1">ใบเซอร์ / สิทธิ์การตรวจ:</div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {ins.product_lines ? ins.product_lines.split(',').map((pl, idx) => (
                                                    <span key={idx} className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-indigo-200">{pl.trim()}</span>
                                                )) : <span className="text-[10px] text-slate-500 italic">ES1, 3300, S-villas (ค่าเริ่มต้น)</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(db.inspectors || []).length === 0 && <div className="text-center text-sm text-slate-400 py-10 bg-white rounded-2xl border-2 border-dashed">ไม่มีข้อมูลผู้ตรวจในระบบ</div>}
                            </div>
                        </div>
                    )}

                    {/* เมนูงานทั้งหมดในระบบ (All Bookings) */}
                    {adminTab === 'all_bookings' && (
                        <div className="space-y-3 mt-4 animate-pop">
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : 
                            (adminDb.all_bookings || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูล</div> :
                            <>
                                {(adminDb.all_bookings || []).slice(0, adminBookingsLimit).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border shadow-sm"><Icons.MoreVertical /></button>
                                            {actionMenuId === h.id && (
                                                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-xs">
                                                    <button onClick={() => { setAreaSelection(h.area || ''); setJobTypeSelection(h.job_type || ''); setProductLineSelection(h.product_line || ''); setModal({ type: 'booking', data: h }); setActionMenuId(null); setAdminTab('menu'); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                    <button onClick={() => handleCancelBooking(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ลบข้อมูล</button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="cursor-pointer pr-10" onClick={() => { setModal({ type: 'detail', data: h }); setAdminTab('menu'); }}>
                                            <div className="font-bold text-slate-800 text-sm mb-1 pr-6">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                                                <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                <div><b>ผู้ตรวจ:</b> {h.inspector_name || '-'}</div><div><b>ประเภท:</b> {h.job_type || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {adminBookingsLimit < (adminDb.all_bookings || []).length && (
                                    <button onClick={() => {
                                        setAdminBookingsLimit(prev => prev + 20);
                                        fetchAdminData(adminBookingsLimit, 20, 'bookings');
                                    }} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all shadow-sm">
                                        โหลดเพิ่มเติม ({adminBookingsLimit} / {(adminDb.all_bookings || []).length})
                                    </button>
                                )}
                            </>
                            }
                        </div>
                    )}
                </div>
            )}

            {/* 📍 MODALS ควบคุมการทำงานทั้งหมด */}
            {modal && (
                <div className="backdrop z-[100] p-4 flex items-center justify-center">
                    
                    {/* Modal แก้ไข/สร้างผู้ใช้งาน (Edit User) */}
                    {modal?.type === 'edit_user' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl animate-pop relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95"><Icons.X /></button>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
                                {modal.isNew ? <Icons.UserPlus /> : <Icons.User />} 
                                {modal.isNew ? 'สร้างผู้ใช้งานใหม่' : 'แก้ไขข้อมูลผู้ใช้งาน'}
                            </h3>
                            
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                
                                if (modal.isNew) {
                                    const regOk = await apiAction({
                                        action: 'register', username: fd.get('username'), password: fd.get('password'),
                                        full_name: fd.get('full_name'), department: fd.get('department'), position: fd.get('position'), phone: fd.get('phone')
                                    }, 'กำลังสร้างบัญชีใหม่...', true);
                                    
                                    if (regOk) {
                                        await apiAction({
                                            action: 'update_user_details', target_user: fd.get('username'), admin_user: user?.username,
                                            role: fd.get('role'), status: fd.get('status'), inspector_mapped_name: fd.get('inspector_mapped_name') || ''
                                        }, 'กำลังกำหนดสิทธิ์...');
                                        setSuccessModal('สร้างผู้ใช้งานใหม่สำเร็จ');
                                        setModal(null);
                                        fetchAdminData(0, 50, 'users');
                                    }
                                } else {
                                    const payload = {
                                        action: 'update_user_details',
                                        target_user: modal.data.username,
                                        admin_user: user?.username,
                                        full_name: fd.get('full_name'),
                                        department: fd.get('department'),
                                        position: fd.get('position'),
                                        phone: fd.get('phone'),
                                        role: fd.get('role'),
                                        status: fd.get('status'),
                                        inspector_mapped_name: fd.get('inspector_mapped_name') || ''
                                    };
                                    const ok = await apiAction(payload, 'กำลังอัปเดตข้อมูลผู้ใช้...');
                                    if (ok) { setSuccessModal('อัปเดตข้อมูลผู้ใช้สำเร็จ'); setModal(null); fetchAdminData(0, 50, 'users'); }
                                }
                            }} className="space-y-3">
                                
                                {modal.isNew ? (
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div><label className="text-xs font-bold text-slate-700 block mb-1">Username <span className="text-red-500">*</span></label><input type="text" name="username" required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                        <div><label className="text-xs font-bold text-slate-700 block mb-1">Password <span className="text-red-500">*</span></label><input type="text" name="password" required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-2">
                                        <span className="text-[10px] text-slate-500 block">Username (เปลี่ยนแปลงไม่ได้)</span>
                                        <span className="font-bold text-slate-800 text-sm">{modal.data.username}</span>
                                    </div>
                                )}
                                
                                {(modal.data?.role === 'inspector' || modal.isNew) && (
                                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-2 shadow-sm">
                                        <label className="text-xs font-bold text-amber-800 block mb-1">🔗 ชื่อผู้ตรวจในตาราง (Mapping Name)</label>
                                        <select name="inspector_mapped_name" defaultValue={modal.data.inspector_mapped_name || ''} className="w-full text-sm p-2.5 rounded-lg border border-amber-300 outline-none focus:border-amber-500 bg-white font-bold text-slate-700">
                                            <option value="">-- ไม่ได้ผูกชื่อ (ว่าง) --</option>
                                            {modal.data.inspector_mapped_name && !availableInspectors.some(i => i.name === modal.data.inspector_mapped_name) && (
                                                <option value={modal.data.inspector_mapped_name}>{modal.data.inspector_mapped_name}</option>
                                            )}
                                            {availableInspectors.map(ins => (
                                                <option key={ins.name} value={ins.name}>{ins.name}</option>
                                            ))}
                                        </select>
                                        <p className="text-[10px] text-amber-700 mt-1">เฉพาะไอดี Inspector เท่านั้น ใช้ผูกเพื่อให้หน้า <b>"งานฉัน"</b> แสดงข้อมูลถูกต้อง</p>
                                    </div>
                                )}

                                <div><label className="text-xs font-bold text-slate-700 block mb-1">ชื่อ-นามสกุล</label><input type="text" name="full_name" defaultValue={modal.data.full_name} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold text-slate-700 block mb-1">แผนก</label><input type="text" name="department" defaultValue={modal.data.department} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                    <div><label className="text-xs font-bold text-slate-700 block mb-1">ตำแหน่ง</label><input type="text" name="position" defaultValue={modal.data.position} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                </div>
                                <div><label className="text-xs font-bold text-slate-700 block mb-1">เบอร์โทรศัพท์</label><input type="tel" name="phone" defaultValue={modal.data.phone} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} /></div>
                                
                                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                                        <label className="text-xs font-bold text-blue-800 block mb-1">สิทธิ์ (Role)</label>
                                        <select name="role" defaultValue={modal.data.role || 'user'} className="w-full text-sm p-2.5 rounded-lg border border-blue-200 outline-none font-bold bg-white text-blue-900">
                                            <option value="user">User ทั่วไป</option><option value="inspector">Inspector (ผู้ตรวจ)</option><option value="admin">Admin ผู้ดูแล</option>
                                        </select>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <label className="text-xs font-bold text-slate-700 block mb-1">สถานะ (Status)</label>
                                        <select name="status" defaultValue={modal.data.status || 'approved'} className="w-full text-sm p-2.5 rounded-lg border border-slate-200 outline-none font-bold bg-white text-slate-700">
                                            <option value="approved">✅ อนุมัติ</option><option value="pending">⏳ รอตรวจสอบ</option><option value="blocked">⛔ ระงับการใช้งาน</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" disabled={loadingMsg} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md mt-4 active:scale-95 transition-all flex justify-center items-center gap-2">
                                    <Icons.Check /> {modal.isNew ? 'บันทึกผู้ใช้ใหม่' : 'บันทึกการเปลี่ยนแปลง'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Modal เพิ่ม/แก้ไขผู้ตรวจ (Inspector Form) */}
                    {modal?.type === 'inspector_form' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl animate-pop relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95"><Icons.X /></button>
                            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                                    {modal.data ? <Icons.Edit /> : <Icons.UserPlus />}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{modal.data ? 'แก้ไขสิทธิ์ผู้ตรวจ' : 'เพิ่มผู้ตรวจใหม่'}</h3>
                                    <p className="text-[10px] text-slate-500 mt-0.5">ระบุชื่อและเลือก Product Lineที่อนุญาตให้รับงาน</p>
                                </div>
                            </div>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const name = fd.get('ins_name');
                                const certs = Array.from(e.target.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value).join(',');
                                const payload = { action: 'manage_inspector', sub_action: modal.data ? 'update' : 'add', old_name: modal.data?.name || '', new_name: name, product_lines: certs, user: user?.username };
                                const ok = await apiAction(payload, 'กำลังบันทึกข้อมูลผู้ตรวจ...');
                                if(ok) { setSuccessModal('บันทึกข้อมูลผู้ตรวจสำเร็จ'); setModal(null); }
                            }}>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อผู้ตรวจ <span className="text-red-500">*</span></label>
                                <input type="text" name="ins_name" defaultValue={modal.data?.name || ''} required placeholder="ระบุชื่อ-นามสกุล หรือ รหัส..." className="w-full text-sm p-3.5 rounded-xl border border-slate-300 outline-none mb-5 font-bold bg-slate-50 focus:border-indigo-400 focus:bg-white transition-all" />
                                
                                <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-6">
                                    <div className="flex justify-between items-end mb-3">
                                        <label className="text-xs font-bold text-indigo-900">กำหนดสิทธิ์ (Certificate)</label>
                                    </div>
                                    <p className="text-[10px] text-indigo-500 mb-3 bg-white p-2 rounded-lg border border-indigo-50 leading-relaxed">
                                        <Icons.Info /> หากไม่ติ๊กเลือกรายการใดเลย ระบบจะกำหนดค่าเริ่มต้นเป็น <b>ES1, 3300</b> และ <b>S-villas</b> ให้โดยอัตโนมัติ
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                        {Object.keys(PRODUCT_COLORS).filter(k => k !== 'อื่นๆโปรดระบุ').map(pl => (
                                            <label key={pl} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer p-2 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl shadow-sm transition-all select-none">
                                                <input type="checkbox" name="certs" value={pl} defaultChecked={modal.data?.product_lines?.includes(pl)} className="accent-indigo-600 w-4 h-4 flex-shrink-0" />
                                                <span className="truncate">{pl}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setModal(null)} className="w-1/3 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm active:scale-95 transition-all">ยกเลิก</button>
                                    <button type="submit" disabled={loadingMsg} className="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                        {loadingMsg ? <Icons.Loader /> : <Icons.Check />}
                                        {modal.data ? 'บันทึกการแก้ไข' : 'ยืนยันเพิ่มผู้ตรวจ'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Modal กดช่องตาราง (Admin Cell Action) */}
                    {modal?.type === 'admin_cell_action' && (
                        <div className="modal-card p-6 text-center animate-pop w-full max-w-sm bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-3 leading-tight">จัดการคิวตรวจ / วันพิเศษ</h3>
                            <p className="text-sm text-slate-500 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">วันที่: <span className="font-bold text-blue-600">{modal.data.date}</span><br/>ผู้ตรวจ: <span className="font-bold text-blue-600">{modal.data.inspector_name}</span></p>
                            <div className="space-y-3">
                                <button onClick={() => { setAreaSelection(''); setJobTypeSelection(''); setProductLineSelection(''); setModal({ type: 'booking', data: modal.data }); }} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"><Icons.Plus /> จองคิวตรวจ SAIS</button>
                                <button onClick={() => { setEventStartDate(modal.data.date); setEventEndDate(modal.data.date); setEventInspectors([]); setModal({ type: 'manage_events' }); }} className="w-full py-3.5 bg-emerald-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"><Icons.Star /> เพิ่มกิจกรรมบริษัท</button>
                                <button onClick={() => { setLeaveStartDate(modal.data.date); setLeaveEndDate(modal.data.date); setLeaveInspectors([modal.data.inspector_name]); setModal({ type: 'manage_leaves' }); }} className="w-full py-3.5 bg-amber-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"><Icons.User /> จองวันลาให้พนักงาน</button>
                                <button onClick={() => { setHolidayStartDate(modal.data.date); setHolidayEndDate(modal.data.date); setModal({ type: 'manage_holidays' }); }} className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"><Icons.CalendarX /> เพิ่มวันหยุดบริษัท</button>
                            </div>
                        </div>
                    )}

                    {/* 📍 MODAL DETAIL (รายละเอียดงาน) */}
                    {modal?.type === 'detail' && (
                        <div className="modal-card p-6 w-full max-w-md animate-pop bg-white rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 z-50"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                            <div className="space-y-3 text-sm text-slate-700 mb-6">
                                <div><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold">{modal.data.date ? formatSafeDate(modal.data.date) : '-'}</span></div>
                                <div><span className="text-slate-400 text-xs block">ผู้ตรวจ</span><span className="font-bold text-blue-600">{modal.data.inspector_name === 'SYSTEM_HOLIDAY' || modal.data.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : modal.data.inspector_name}</span></div>
                                <div><span className="text-slate-400 text-xs block">ชื่อรายการ / โครงการ</span><span className="font-bold">{modal.data.site_name}</span></div>
                                
                                {!String(modal.data.job_type).includes('leave') && !String(modal.data.job_type).includes('event') && !String(modal.data.job_type).includes('holiday') && (
                                    <>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><span className="text-slate-400 text-xs block">Eq No.</span><span className="font-bold">{modal.data.equipment_no || '-'}</span></div>
                                            <div><span className="text-slate-400 text-xs block">Unit</span><span className="font-bold">{modal.data.unit_no || '-'}</span></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><span className="text-slate-400 text-xs block">ประเภทงาน</span><span className="font-bold">{modal.data.job_type || '-'}</span></div>
                                            <div><span className="text-slate-400 text-xs block">พื้นที่</span><span className="font-bold">{modal.data.area || '-'}</span></div>
                                        </div>
                                        {modal.data.tel && (
                                            <div><span className="text-slate-400 text-xs block">เบอร์ติดต่อหน้างาน</span><span className="font-bold text-slate-800">{modal.data.tel}</span></div>
                                        )}
                                        <div className="grid grid-cols-1 gap-2 mt-2">
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Product Line</span>
                                                <span className={`font-bold text-white px-3 py-1 rounded-lg inline-block shadow-sm ${PRODUCT_COLORS[modal.data.product_line] || 'bg-slate-500'}`}>{modal.data.product_line || 'ไม่ระบุ'}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1"><Icons.FileCheck /> สถานะเอกสาร</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['layout', 'wiring', 'precheck'].map(docKey => {
                                                    const isSent = String(modal.data[`${docKey}_doc`]) === 'true';
                                                    const fileUrl = modal.data[`${docKey}_img`];
                                                    return (
                                                        <div key={docKey} className={`flex flex-col items-center justify-center p-2 rounded-xl border relative ${isSent ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                            <div className="text-[10px] mb-1 uppercase font-bold">{docKey}</div>
                                                            <div className="text-xs font-bold mb-1">{isSent ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                            {fileUrl && (
                                                                <button onClick={(e) => { e.stopPropagation(); setViewFileUrl(fileUrl); }} className="mt-auto text-[9px] bg-blue-600 text-white px-2 py-1.5 rounded w-full text-center truncate shadow-sm active:scale-95 font-bold hover:bg-blue-700 transition-colors">
                                                                    เปิดดูไฟล์
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {(() => {
                                            const condLabels = {
                                                site_cond_1: '1. หน้าตู้คอนโทรล',
                                                site_cond_2: '2. บนหลังคาลิฟต์',
                                                site_cond_3: '3. ด้านบนปล่อง',
                                                site_cond_4: '4. ก้นบ่อลิฟต์',
                                                site_cond_5: '5. ภายในตู้ลิฟต์',
                                                site_cond_6: '6. หน้าชั้นและรอบวงกบประตูนอก'
                                            };
                                            const hasAnyCond = Object.keys(condLabels).some(k => Boolean(modal.data[k]));
                                            if (!hasAnyCond) return null;
                                            return (
                                                <div className="mt-4 pt-4 border-t border-slate-100">
                                                    <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1"><Icons.Image /> รูปภาพสภาพหน้างาน</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {Object.keys(condLabels).map(condKey => {
                                                            const condUrls = modal.data[condKey];
                                                            if (!condUrls) return null;
                                                            return condUrls.split(',').map((url, idx) => (
                                                                <button key={`${condKey}_${idx}`} onClick={(e) => { e.stopPropagation(); setViewFileUrl(url); }} className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1.5 rounded-lg shadow-sm font-bold hover:bg-indigo-100 active:scale-95 transition-all">
                                                                    📷 {condLabels[condKey].split('.')[1]} ({idx + 1})
                                                                </button>
                                                            ));
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        {modal.data.map_link && (
                                            <div className="mt-4 pt-4 border-t border-slate-100">
                                                <h4 className="text-xs font-bold text-slate-700 mb-2">📍 แผนที่ตำแหน่งไซต์งาน</h4>
                                                
                                                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 h-44 cursor-pointer shadow-sm group" onClick={() => window.open(modal.data.map_link, '_blank')}>
                                                    <div className="absolute inset-0 z-10 bg-black/5 hover:bg-transparent transition-colors"></div>
                                                    <iframe src={utils.getMapEmbedUrl ? utils.getMapEmbedUrl(modal.data.map_link) : modal.data.map_link} className="w-full h-full pointer-events-none" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>
                                                </div>
                                                
                                                <div className="text-xs text-blue-600 text-center mt-2 font-bold animate-pulse">
                                                    👇 กดที่ map เพื่อเปิดการนำทาง
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {(isAdmin || user?.username === modal.data.created_by || String(modal.data.inspector_name).toLowerCase() === String(user?.inspector_mapped_name || '').toLowerCase()) && (
                                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-3">
                                    <button onClick={() => {
                                        const isSpecial = String(modal.data.job_type).includes('leave') || String(modal.data.job_type).includes('event') || String(modal.data.job_type).includes('holiday');
                                        if(isSpecial && user?.role === 'inspector' && !isAdmin) {
                                            setModal({ type: 'inspector_leave_form', data: modal.data });
                                        } else if(isSpecial) {
                                            setModal({ type: 'edit_special', data: modal.data });
                                        } else {
                                            setAreaSelection(modal.data.area || ''); setJobTypeSelection(modal.data.job_type || ''); setProductLineSelection(modal.data.product_line || ''); 
                                            setModal({ type: 'booking', data: modal.data });
                                        }
                                    }} className="py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 flex items-center justify-center gap-2"><Icons.Edit /> แก้ไขข้อมูล</button>

                                    <button onClick={() => handleCancelBooking(modal.data)} className="py-3 bg-red-50 text-red-700 font-bold rounded-xl border border-red-200 flex items-center justify-center gap-2"><Icons.Trash /> ลบรายการนี้</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Modal แก้ไขข้อมูลพิเศษ */}
                    {modal?.type === 'edit_special' && (
                        <div className="modal-card p-6 w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-pop relative">
                            <button onClick={() => {
                                if (modal.returnTo) setModal({ type: modal.returnTo });
                                else setModal(null);
                            }} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">✏️ แก้ไขข้อมูลพิเศษ</h3>
                            <form onSubmit={handleEditSpecialSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">เปลี่ยนวันที่</label>
                                    <input type="date" name="date" defaultValue={modal.data?.date ? formatSafeDate(modal.data.date) : ''} required className="w-full text-sm p-3 rounded-lg border outline-none font-bold text-blue-600" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ผู้ตรวจ</label>
                                    <select name="inspector_name" defaultValue={modal.data?.inspector_name} className="w-full text-sm p-3 rounded-lg border outline-none font-bold">
                                        <option value="SYSTEM_EVENT">✅ ทุกคน (กิจกรรมรวม)</option>
                                        <option value="SYSTEM_HOLIDAY">✅ ทุกคน (วันหยุดรวม)</option>
                                        {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>👤 เฉพาะ: {i.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อรายการ (รวมถึงเวลา)</label>
                                    <input type="text" name="site_name" defaultValue={modal.data?.site_name} required className="w-full text-sm p-3 rounded-lg border outline-none" />
                                </div>
                                <button disabled={loadingMsg} className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-md">บันทึกการแก้ไข</button>
                            </form>
                        </div>
                    )}

                    {/* 📍 Modal แจ้งวันลาส่วนตัว (สำหรับ Inspector ทำเอง) */}
                    {modal?.type === 'inspector_leave_form' && (
                        <div className="modal-card p-6 w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-pop relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
                                <Icons.User /> {modal.data?.id ? 'แก้ไขวันลาของฉัน' : 'แจ้งวันลาหยุด (ส่วนตัว)'}
                            </h3>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const sDate = fd.get('start_date');
                                const eDate = fd.get('end_date') || sDate;
                                const lType = fd.get('leave_type') === 'อื่นๆ' ? fd.get('custom_leave') : fd.get('leave_type');
                                const targetName = user?.inspector_mapped_name || user?.full_name || user?.username;

                                if (modal.data?.id) {
                                    const ok = await apiAction({ action: 'update_booking', id: modal.data.id, date: sDate, site_name: lType, user: user?.username, reason: 'แก้ไขวันลาส่วนตัว' }, 'กำลังบันทึก...');
                                    if(ok) { setSuccessModal('อัปเดตวันลาสำเร็จ'); setModal(null); }
                                } else {
                                    const dates = generateDates(sDate, eDate, true);
                                    if(dates.length === 0) return setAlertMsg('วันที่ไม่ถูกต้อง');
                                    const ok = await apiAction({ action: 'create_multiple_bookings', dates: dates, inspector_name: targetName, job_type: 'leave', site_name: lType, equipment_no: `LEAVE_${Date.now()}_${Math.floor(Math.random()*1000)}`, user: user?.username, reason: 'แจ้งวันลาส่วนตัว' }, 'กำลังบันทึก...');
                                    if(ok) { setSuccessModal('แจ้งวันลาสำเร็จ'); setModal(null); }
                                }
                            }} className="space-y-4">
                                {modal.data?.id ? (
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">วันที่ลา</label>
                                        <input type="date" name="start_date" defaultValue={modal.data.date ? formatSafeDate(modal.data.date) : ''} required className="w-full text-sm p-3 rounded-lg border outline-none font-bold text-blue-600" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">เริ่มวันที่</label>
                                            <input type="date" name="start_date" required className="w-full text-sm p-3 rounded-lg border outline-none font-bold text-blue-600" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">ถึงวันที่</label>
                                            <input type="date" name="end_date" required className="w-full text-sm p-3 rounded-lg border outline-none font-bold text-blue-600" />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ประเภทการลา</label>
                                    <select name="leave_type" defaultValue={modal.data?.site_name || 'ลาพักร้อน'} className="w-full text-sm p-3 rounded-lg border outline-none font-bold" onChange={(e) => setLeaveType(e.target.value)}>
                                        <option value="ลาพักร้อน">ลาพักร้อน</option>
                                        <option value="ลาป่วย">ลาป่วย</option>
                                        <option value="ลากิจ">ลากิจ</option>
                                        <option value="อื่นๆ">อื่นๆ (ระบุเอง)</option>
                                    </select>
                                </div>
                                {leaveType === 'อื่นๆ' && (
                                    <div><input type="text" name="custom_leave" required placeholder="ระบุเหตุผล..." className="w-full text-sm p-3 rounded-lg border outline-none bg-amber-50" /></div>
                                )}
                                <button disabled={loadingMsg} className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-md">
                                    {modal.data?.id ? 'บันทึกการแก้ไข' : 'ยืนยันแจ้งวันลา'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* 📍 Modal Booking ฟอร์มจองคิว */}
                    {modal?.type === 'booking' && (
                        <div className="modal-card w-full max-w-[450px] animate-pop flex flex-col max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                            <button onClick={() => { setModal(null); setShowBookingHelp(false); }} className="absolute top-4 right-4 bg-slate-200 text-slate-500 p-2 rounded-full z-50"><Icons.X /></button>
                            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center pr-14">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Icons.FileCheck /> {showBookingHelp ? 'คู่มือจองคิวงาน' : (modal.data.id ? '✏️ แก้ไขคิวงาน' : '📝 จองคิวงานใหม่')}
                                </h3>
                                {!showBookingHelp && (
                                    <button type="button" onClick={() => setShowBookingHelp(true)} className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1 shadow-sm">
                                        <Icons.HelpCircle /> วิธีใช้งาน
                                    </button>
                                )}
                            </div>

                            {/* คู่มือแบบสมบูรณ์ของหน้าจองคิว */}
                            {showBookingHelp ? (
                                <div className="p-5 overflow-y-auto max-h-[75vh] custom-scrollbar space-y-4">
                                    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-4">
                                        <h4 className="font-bold text-blue-800 text-[15px] border-b border-blue-200 pb-2 flex items-center gap-2">
                                            <Icons.Info /> คู่มือจองคิวตรวจ / แก้ไข / ลบ
                                        </h4>
                                        <div className="text-xs text-blue-900 space-y-4 leading-relaxed">
                                            <div>
                                                <span className="font-bold text-blue-800 text-[13px]">📝 การจองคิวใหม่</span>
                                                <ul className="list-disc pl-4 mt-2 space-y-1.5 text-slate-700">
                                                    <li>คลิกวันที่และชื่อ Inspector ที่ว่างในตารางปฏิทิน</li>
                                                    <li>เลือก <b>Product Line</b> (เช่น ES1, 3300) และ <b>ประเภทงาน</b></li>
                                                    <li>กรอกข้อมูลสำคัญ: <b>Eq No., Unit No., ชื่อโครงการ, พื้นที่</b> ให้ถูกต้อง</li>
                                                    <li className="text-red-600 font-bold">เงื่อนไขบังคับ: ท่านต้องอัปโหลดเอกสาร Layout, Wiring และ Pre-check ให้ครบทั้ง 3 ช่อง ระบบจึงจะอนุญาตให้กดบันทึก</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <span className="font-bold text-blue-800 text-[13px]">📸 การแนบรูปภาพสภาพหน้างาน</span>
                                                <ul className="list-disc pl-4 mt-2 space-y-1.5 text-slate-700">
                                                    <li>สามารถแนบรูปหน้างานได้ 6 จุด (หน้าตู้, หลังคาลิฟต์, บ่อลิฟต์ ฯลฯ)</li>
                                                    <li>แนบได้สูงสุด <span className="font-bold">5 รูปต่อ 1 หัวข้อ</span></li>
                                                    <li><span className="font-bold text-red-600">ผู้ทำการจอง</span> จะต้องเป็นผู้อัพโหลดและรับผิดชอบการแนบรูปภาพหน้างานทุกครั้ง</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <span className="font-bold text-blue-800 text-[13px]">✏️ การแก้ไข และ 🗑️ การลบ</span>
                                                <ul className="list-disc pl-4 mt-2 space-y-1.5 text-slate-700">
                                                    <li><b>แก้ไข:</b> กดที่คิวงานของท่านในปฏิทิน เลือก "แก้ไขข้อมูล" เพื่ออัปเดตไฟล์หรือเบอร์โทร</li>
                                                    <li><b>ยกเลิกคิว:</b> กดจากปุ่ม "ยกเลิกคิวงาน" <span className="text-red-600 font-bold">หมายเหตุ: จะไม่สามารถยกเลิกคิวย้อนหลังที่ผ่านมาแล้วได้</span> ต้องติดต่อ Admin เท่านั้น</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => setShowBookingHelp(false)} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl mt-2 text-sm shadow-md active:scale-95 transition-all">เข้าใจแล้ว กลับไปฟอร์มจองคิว</button>
                                </div>
                            ) : (
                                <div className="p-5 overflow-y-auto max-h-[75vh] custom-scrollbar">
                                    
                                    {/* 📍 ป้ายแสดงข้อมูลยืนยันวันที่และผู้ตรวจ */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-2xl mb-5 flex justify-between items-center shadow-sm">
                                        <div className="flex-1">
                                            <div className="text-[10px] text-blue-500 font-bold mb-1 flex items-center gap-1"><Icons.Clock /> วันที่ทำรายการจอง</div>
                                            <div className="text-base font-black text-blue-900">{modal.data.date ? formatSafeDate(modal.data.date) : '-'}</div>
                                        </div>
                                        <div className="w-px h-10 bg-blue-200 mx-4"></div>
                                        <div className="flex-1 text-right">
                                            <div className="text-[10px] text-indigo-500 font-bold mb-1 flex items-center gap-1 justify-end"><Icons.User /> ผู้ตรวจที่จะรับงาน</div>
                                            <div className="text-base font-black text-indigo-900">{modal.data.inspector_name || '-'}</div>
                                        </div>
                                    </div>

                                    {(() => {
                                        let allowedCerts = ['ES1', '3300', 'S-villas'];
                                        if (modal?.data?.inspector_name) {
                                            const inspectorObj = (db.inspectors || []).find(i => i.name === modal.data.inspector_name);
                                            if (inspectorObj && inspectorObj.product_lines && inspectorObj.product_lines.trim() !== '') {
                                                allowedCerts = inspectorObj.product_lines.split(',').map(s => s.trim());
                                            }
                                        }
                                        if (!allowedCerts.includes('อื่นๆโปรดระบุ')) allowedCerts.push('อื่นๆโปรดระบุ');
                                        return (
                                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                                {isAdmin && modal.data.id && (
                                                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                                                        <h4 className="text-xs font-bold text-amber-800 mb-2 border-b pb-1">⚙️ [Admin] แก้ไขวันที่/ผู้ตรวจ</h4>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div><label className="text-[10px] font-bold text-amber-700">แก้ไขวันที่</label><input type="date" name="admin_date_target" defaultValue={modal.data.date ? formatSafeDate(modal.data.date) : ''} className="w-full text-sm p-2 rounded-lg border outline-none" /></div>
                                                            <div>
                                                                <label className="text-[10px] font-bold text-amber-700">ย้ายผู้ตรวจ</label>
                                                                <select name="admin_inspector_target" defaultValue={modal.data.inspector_name} className="w-full text-sm p-2 rounded-lg border font-bold">
                                                                    {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <input type="hidden" name="isAdminOverride" value="true" />
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Product Line <span className="text-red-500">*</span></label>
                                                        <select name="product_line" value={productLineSelection} onChange={e => setProductLineSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border bg-white">
                                                            <option value="" disabled>--เลือก--</option>
                                                            {allowedCerts.map(cert => <option key={cert} value={cert}>{cert}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 mb-1 block">ประเภทงาน <span className="text-red-500">*</span></label>
                                                        <select name="job_type" value={jobTypeSelection} onChange={e => setJobTypeSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border bg-white">
                                                            <option value="" disabled>--เลือก--</option>
                                                            <option value="New">New</option><option value="MOD">MOD</option>
                                                            <option value="Re-ins temporary power supply">Re-ins temporary</option>
                                                            <option value="Re-ins builder lift">Re-ins builder lift</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {productLineSelection === 'อื่นๆโปรดระบุ' && <div><input type="text" name="custom_product_line" required placeholder="โปรดระบุ Product Line..." className="w-full text-sm p-2.5 rounded-lg bg-yellow-50 border border-yellow-300" defaultValue={modal.data.product_line} /></div>}

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">พื้นที่ <span className="text-red-500">*</span></label>
                                                    <select name="area" value={areaSelection} onChange={e => setAreaSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border bg-white">
                                                        <option value="" disabled>--เลือก--</option>
                                                        <option value="กรุงเทพและปริมณฑล">กรุงเทพและปริมณฑล</option>
                                                        <option value="other">ต่างจังหวัด (โปรดระบุ)</option>
                                                    </select>
                                                </div>
                                                {areaSelection === 'other' && <div><input type="text" name="custom_area" required placeholder="ระบุจังหวัด..." className="w-full text-sm p-2.5 rounded-lg bg-pink-50 border border-pink-300" defaultValue={modal.data.area} /></div>}

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">Eq No. <span className="text-red-500">*</span></label><input type="text" name="equipment_no" required placeholder="เช่น 11731095" defaultValue={modal.data.equipment_no} className="w-full text-sm p-2.5 rounded-lg border outline-none" /></div>
                                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">Unit No. {!isAdmin && <span className="text-red-500">*</span>}</label><input type="text" name="unit_no" required={!isAdmin} placeholder="เช่น L1,PL1" defaultValue={modal.data.unit_no} className="w-full text-sm p-2.5 rounded-lg border outline-none" /></div>
                                                </div>

                                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อโครงการ <span className="text-red-500">*</span></label><input type="text" name="site_name" required placeholder="ระบุชื่อโครงการ" defaultValue={modal.data.site_name ? modal.data.site_name.replace(/^\d{2}:\d{2}-\d{2}:\d{2}\s/, '') : ''} className="w-full text-sm p-2.5 rounded-lg border outline-none" /></div>
                                                
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">เบอร์ติดต่อหน้างาน {!isAdmin && <span className="text-red-500">*</span>}</label>
                                                    <input type="tel" name="tel" required={!isAdmin} maxLength="10" placeholder="08XXXXXXXX" defaultValue={modal.data.tel} className="w-full text-sm p-2.5 rounded-lg border outline-none" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Google Maps</label>
                                                    <input type="text" name="map_link" placeholder="ใส่ชื่อสถานที่หรือ link" defaultValue={modal.data.map_link} className="w-full text-sm p-2.5 rounded-lg border outline-none" onChange={(e) => handleMapChange(e.target.value)} />
                                                    {liveMapUrl && <iframe src={liveMapUrl} className="map-preview mt-2 w-full h-48 rounded-xl border bg-slate-50" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>}
                                                </div>

                                                {!isAdmin && (
                                                    <div className="bg-red-50 text-red-600 text-[10px] p-3 rounded-lg border border-red-200 mt-2 font-bold flex items-center gap-2">
                                                        <Icons.Alert /> กรุณาอัปโหลดเอกสาร Layout, Wiring, Precheck ให้ครบทั้ง 3 ช่องเพื่อบันทึกคิวงาน
                                                    </div>
                                                )}

                                                <div className="bg-slate-50 p-4 rounded-xl border space-y-3 mt-4">
                                                    <h4 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2"><Icons.Upload /> อัปโหลดเอกสารแนบ (รูป/PDF)</h4>
                                                    {['layout', 'wiring', 'precheck'].map((doc) => {
                                                        const currentUrl = docUrls[doc] || modal.data[`${doc}_img`];
                                                        return (
                                                            <div key={doc} className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border shadow-sm">
                                                                <div className="flex-1">
                                                                    <label className="text-[11px] font-bold text-slate-700 uppercase">{doc} {!isAdmin && <span className="text-red-500">*</span>}</label>
                                                                    {currentUrl && <div className="text-[9px] text-emerald-600 mt-0.5">✅ อัปโหลดแล้ว</div>}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {currentUrl && (
                                                                        <button type="button" onClick={(e) => { e.preventDefault(); setViewFileUrl(currentUrl); }} className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1.5 rounded-md shadow-sm border border-blue-100 font-bold active:scale-95">ดูไฟล์</button>
                                                                    )}
                                                                    <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-md cursor-pointer active:scale-95 transition-all shadow-sm">
                                                                        {uploadingDoc[doc] ? 'รอ...' : 'เปลี่ยนไฟล์'}
                                                                        <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, doc)} disabled={uploadingDoc[doc]} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* 📍 ปรับปรุงข้อความ อัพโหลดรูปสภาพหน้างาน */}
                                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 space-y-3 mt-4">
                                                    <h4 className="text-sm font-bold text-blue-800 border-b border-blue-200 pb-2 flex items-center gap-2">
                                                        <Icons.Image /> อัพโหลดรูปสภาพหน้างาน <span className="text-[10px] text-red-500 font-normal bg-red-50 px-2 py-0.5 rounded-md ml-1 border border-red-100">(ผู้จองต้องแนบ 1-5 รูป)</span>
                                                    </h4>
                                                    {[
                                                        {id: 'site_cond_1', label: '1. หน้าตู้คอนโทรล'}, {id: 'site_cond_2', label: '2. บนหลังคาลิฟต์'},
                                                        {id: 'site_cond_3', label: '3. ด้านบนปล่อง'}, {id: 'site_cond_4', label: '4. ก้นบ่อลิฟต์'},
                                                        {id: 'site_cond_5', label: '5. ภายในตู้ลิฟต์'}, {id: 'site_cond_6', label: '6. หน้าชั้นและรอบวงกบประตูนอก'}
                                                    ].map((cond) => {
                                                        const currentCondUrl = docUrls[cond.id] || modal.data[cond.id];
                                                        return (
                                                            <div key={cond.id} className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-blue-100 shadow-sm">
                                                                <div className="flex-1">
                                                                    <label className="text-[11px] font-bold text-slate-700 block">{cond.label}</label>
                                                                    {currentCondUrl && <span className="text-[9px] text-emerald-600 block mt-1">อัพโหลดแล้ว {currentCondUrl.split(',').length} รูป</span>}
                                                                </div>
                                                                <div className="flex flex-col gap-1 items-end">
                                                                    {currentCondUrl && (
                                                                        <button type="button" onClick={(e) => { e.preventDefault(); setViewFileUrl(currentCondUrl.split(',')[0]); }} className="text-[9px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded shadow-sm border border-indigo-100 font-bold active:scale-95">ดูรูปแรก</button>
                                                                    )}
                                                                    <label className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer flex-shrink-0 shadow-sm active:scale-95 transition-transform">
                                                                        {uploadingDoc[cond.id] ? 'รอ...' : '+ แนบรูป (Max:5)'}
                                                                        <input type="file" accept="image/*" multiple className="hidden" 
                                                                            onChange={(e) => {
                                                                                if (e.target.files.length > 5) { setAlertMsg('สามารถแนบรูปภาพได้สูงสุดไม่เกิน 5 รูปต่อ 1 หัวข้อครับ'); e.target.value = ''; return; }
                                                                                const existingCount = currentCondUrl ? currentCondUrl.split(',').length : 0;
                                                                                if (existingCount + e.target.files.length > 5) { setAlertMsg(`หัวข้อนี้มีรูปอยู่แล้ว ${existingCount} รูป เพิ่มได้อีก ${5 - existingCount} รูป`); e.target.value = ''; return; }
                                                                                handleFileUpload(e, cond.id, true);
                                                                            }} 
                                                                            disabled={uploadingDoc[cond.id]} 
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <button disabled={loadingMsg} className="w-full py-4 rounded-xl font-bold text-white bg-red-600 shadow-lg mt-6 active:scale-95 text-sm transition-transform flex items-center justify-center gap-2">
                                                    {loadingMsg ? <Icons.Loader /> : <Icons.Check />} 
                                                    {modal.data.id ? 'บันทึกการแก้ไข' : 'ยืนยันการจองคิว'}
                                                </button>
                                            </form>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Modal จัดการวันลา (แก้ไขให้แสดง List และปุ่มแก้ไข/ลบ/ลบกลุ่ม) */}
                    {modal?.type === 'manage_leaves' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-amber-500 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.User /> จัดการวันลา</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มวันลาใหม่</h4>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="w-full p-2.5 text-sm border rounded-lg bg-white font-bold cursor-pointer flex justify-between items-center" onClick={() => setShowLeaveDropdown(!showLeaveDropdown)}>
                                                <span className={`truncate ${leaveInspectors.length === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                                                    {leaveInspectors.length === 0 ? '-- เลือกพนักงาน --' : leaveInspectors.includes('ALL') ? 'ทุกคน' : leaveInspectors.join(', ')}
                                                </span>
                                                <span className="text-slate-400 text-xs">▼</span>
                                            </div>
                                            {showLeaveDropdown && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                                    <label className="flex items-center gap-2 p-3 hover:bg-amber-50 cursor-pointer border-b">
                                                        <input type="checkbox" checked={leaveInspectors.includes('ALL')} onChange={(e) => {
                                                            if (e.target.checked) setLeaveInspectors(['ALL']); else setLeaveInspectors([]);
                                                        }} className="accent-amber-500 w-4 h-4" />
                                                        <span className="font-bold text-amber-800 text-sm">ทุกคน</span>
                                                    </label>
                                                    {(db.inspectors || []).map(i => (
                                                        <label key={i.name} className="flex items-center gap-2 p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0">
                                                            <input type="checkbox" checked={leaveInspectors.includes(i.name)} onChange={(e) => {
                                                                if (e.target.checked) setLeaveInspectors(prev => prev.includes('ALL') ? [i.name] : [...prev, i.name]);
                                                                else setLeaveInspectors(prev => prev.filter(name => name !== i.name));
                                                            }} className="accent-amber-500 w-4 h-4" />
                                                            <span className="text-slate-700 font-bold text-sm">{i.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={leaveStartDate} onChange={(e) => setLeaveStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={leaveEndDate} onChange={(e) => setLeaveEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <select className="w-full p-2.5 text-sm border rounded-lg font-bold" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                            <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option><option value="อื่นๆโปรดระบุ">อื่นๆ (ระบุเอง)</option>
                                        </select>
                                        {leaveType === 'อื่นๆโปรดระบุ' && <input type="text" placeholder="ระบุประเภทการลา..." value={customLeaveType} onChange={(e) => setCustomLeaveType(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-amber-50" />}
                                        <button onClick={async () => {
                                            if(leaveInspectors.length === 0 || !leaveStartDate || !leaveEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ และเลือกพนักงาน');
                                            let finalType = leaveType === 'อื่นๆโปรดระบุ' ? customLeaveType : leaveType;
                                            setLoadingMsg('กำลังสร้างวันลา...');
                                            let targets = leaveInspectors.includes('ALL') ? (db.inspectors || []).map(i => i.name) : leaveInspectors;
                                            for (let target of targets) {
                                                const logDetail = `[เพิ่มวันลา]\nโดย: ${user?.username}\nพนักงาน: ${target}\nประเภท: ${finalType}\nตั้งแต่วันที่: ${leaveStartDate} ถึง ${leaveEndDate}`;
                                                const payload = { action: 'create_multiple_bookings', dates: leaveDates, inspector_name: target, job_type: 'leave', site_name: finalType, equipment_no: `LEAVE_${Date.now()}_${Math.floor(Math.random()*1000)}`, user: user?.username, reason: logDetail };
                                                await apiAction(payload, null, true);
                                            }
                                            await fetchCoreData(true, null); setLoadingMsg(null); setSuccessModal('เพิ่มวันลาสำเร็จ'); 
                                            setLeaveStartDate(''); setLeaveEndDate(''); setLeaveInspectors([]); setShowLeaveDropdown(false);
                                        }} className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl shadow-md flex justify-center items-center gap-2"><Icons.Plus /> เพิ่มวันลา ({leaveDates.length} วัน)</button>
                                    </div>
                                </div>
                                
                                {/* 📍 แสดง List และฟังก์ชันแก้ไข/ลบ วันลา */}
                                <div className="mt-6 pt-4 border-t border-slate-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-slate-700 text-sm">รายการวันลาในระบบ</h4>
                                        {selectedLeavesToDelete.length > 0 && (
                                            <button onClick={() => handleBulkDelete('leave', selectedLeavesToDelete)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold active:scale-95 shadow-sm border border-red-200 transition-colors hover:bg-red-100">
                                                🗑️ ลบที่เลือก ({selectedLeavesToDelete.length})
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                                        {(db.bookings || []).filter(b => b.job_type === 'leave' && b.status !== 'cancelled').sort((a,b) => new Date(b.date) - new Date(a.date)).map(l => (
                                            <div key={l.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 transition-all">
                                                <input type="checkbox" checked={selectedLeavesToDelete.includes(l.id)} onChange={(e) => {
                                                    if (e.target.checked) setSelectedLeavesToDelete([...selectedLeavesToDelete, l.id]);
                                                    else setSelectedLeavesToDelete(selectedLeavesToDelete.filter(id => id !== l.id));
                                                }} className="accent-red-500 w-4 h-4 rounded shadow-sm cursor-pointer" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{l.site_name} <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full ml-1">👤 {l.inspector_name}</span></div>
                                                    <div className="text-[10px] text-slate-500 font-bold mt-1">📅 {formatSafeDate(l.date)}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_leaves' })} className="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-100 active:scale-95"><Icons.Edit /></button>
                                                    <button onClick={() => handleCancelBooking(l)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg shadow-sm border border-red-100 active:scale-95"><Icons.Trash /></button>
                                                </div>
                                            </div>
                                        ))}
                                        {(db.bookings || []).filter(b => b.job_type === 'leave' && b.status !== 'cancelled').length === 0 && <div className="text-center text-xs text-slate-400 py-6 border-2 border-dashed bg-white rounded-xl">ยังไม่มีการจองวันลา</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal จัดการกิจกรรม (แก้ไขให้แสดง List และปุ่มแก้ไข/ลบ/ลบกลุ่ม) */}
                    {modal?.type === 'manage_events' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-emerald-500 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.Star /> จัดการกิจกรรม</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มกิจกรรมใหม่</h4>
                                    <div className="space-y-3">
                                        <input type="text" id="event_name_input" placeholder="ชื่อกิจกรรม..." className="w-full p-2.5 text-sm border rounded-lg font-bold" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <button onClick={async () => {
                                            const eName = document.getElementById('event_name_input').value;
                                            if(!eName || !eventStartDate || !eventEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ');
                                            setLoadingMsg('กำลังสร้างกิจกรรม...');
                                            const payload = { action: 'create_multiple_bookings', dates: eventDates, inspector_name: 'SYSTEM_EVENT', job_type: 'company_event', site_name: eName, equipment_no: `EVENT_${Date.now()}`, user: user?.username, reason: 'สร้างกิจกรรม' };
                                            await apiAction(payload, null, true);
                                            await fetchCoreData(true, null); setLoadingMsg(null); setSuccessModal('สร้างกิจกรรมสำเร็จ');
                                        }} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-md flex justify-center items-center gap-2"><Icons.Plus /> สร้างกิจกรรม</button>
                                    </div>
                                </div>

                                {/* 📍 แสดง List และฟังก์ชันแก้ไข/ลบ กิจกรรม */}
                                <div className="mt-6 pt-4 border-t border-slate-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-slate-700 text-sm">รายการกิจกรรมในระบบ</h4>
                                        {selectedEventsToDelete.length > 0 && (
                                            <button onClick={() => handleBulkDelete('event', selectedEventsToDelete)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold active:scale-95 shadow-sm border border-red-200 transition-colors hover:bg-red-100">
                                                🗑️ ลบที่เลือก ({selectedEventsToDelete.length})
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                                        {(db.bookings || []).filter(b => b.job_type === 'company_event' && b.status !== 'cancelled').sort((a,b) => new Date(b.date) - new Date(a.date)).map(ge => (
                                            <div key={ge.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all">
                                                <input type="checkbox" checked={selectedEventsToDelete.includes(ge.id)} onChange={(e) => {
                                                    if (e.target.checked) setSelectedEventsToDelete([...selectedEventsToDelete, ge.id]);
                                                    else setSelectedEventsToDelete(selectedEventsToDelete.filter(id => id !== ge.id));
                                                }} className="accent-red-500 w-4 h-4 rounded shadow-sm cursor-pointer" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{ge.site_name}</div>
                                                    <div className="text-[10px] text-slate-500 font-bold mt-1">📅 {formatSafeDate(ge.date)}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => setModal({ type: 'edit_special', data: ge, returnTo: 'manage_events' })} className="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-100 active:scale-95"><Icons.Edit /></button>
                                                    <button onClick={() => handleCancelBooking(ge)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg shadow-sm border border-red-100 active:scale-95"><Icons.Trash /></button>
                                                </div>
                                            </div>
                                        ))}
                                        {(db.bookings || []).filter(b => b.job_type === 'company_event' && b.status !== 'cancelled').length === 0 && <div className="text-center text-xs text-slate-400 py-6 border-2 border-dashed bg-white rounded-xl">ไม่มีกิจกรรมในระบบ</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal จัดการวันหยุด (แก้ไขให้แสดง List และปุ่มแก้ไข/ลบ/ลบกลุ่ม) */}
                    {modal?.type === 'manage_holidays' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-red-600 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.CalendarX /> จัดการวันหยุด</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มวันหยุดใหม่</h4>
                                    <div className="space-y-3">
                                        <input type="text" id="holiday_name_input" placeholder="ชื่อวันหยุด..." className="w-full p-2.5 text-sm border rounded-lg font-bold" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={holidayStartDate} onChange={(e) => setHolidayStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={holidayEndDate} onChange={(e) => setHolidayEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <button onClick={async () => {
                                            const hName = document.getElementById('holiday_name_input').value;
                                            if(!hName || !holidayStartDate || !holidayEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ');
                                            const ok = await apiAction({ action: 'create_multiple_bookings', dates: holidayDates, inspector_name: 'SYSTEM_HOLIDAY', job_type: 'public_holiday', site_name: hName, equipment_no: `HLD_${Date.now()}`, user: user?.username, reason: 'เพิ่มวันหยุด' }, 'กำลังสร้างวันหยุด...');
                                            if(ok) { setSuccessModal('สร้างวันหยุดสำเร็จ'); setHolidayStartDate(''); setHolidayEndDate(''); document.getElementById('holiday_name_input').value = ''; }
                                        }} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-md flex justify-center items-center gap-2"><Icons.Plus /> กำหนดวันหยุด</button>
                                    </div>
                                </div>

                                {/* 📍 แสดง List และฟังก์ชันแก้ไข/ลบ วันหยุด */}
                                <div className="mt-6 pt-4 border-t border-slate-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-slate-700 text-sm">รายการวันหยุดในระบบ</h4>
                                        {selectedHolidaysToDelete.length > 0 && (
                                            <button onClick={() => handleBulkDelete('holiday', selectedHolidaysToDelete)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold active:scale-95 shadow-sm border border-red-200 transition-colors hover:bg-red-100">
                                                🗑️ ลบที่เลือก ({selectedHolidaysToDelete.length})
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                                        {(db.bookings || []).filter(b => b.job_type === 'public_holiday' && b.status !== 'cancelled').sort((a,b) => new Date(b.date) - new Date(a.date)).map(hd => (
                                            <div key={hd.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
                                                <input type="checkbox" checked={selectedHolidaysToDelete.includes(hd.id)} onChange={(e) => {
                                                    if (e.target.checked) setSelectedHolidaysToDelete([...selectedHolidaysToDelete, hd.id]);
                                                    else setSelectedHolidaysToDelete(selectedHolidaysToDelete.filter(id => id !== hd.id));
                                                }} className="accent-red-500 w-4 h-4 rounded shadow-sm cursor-pointer" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{hd.site_name}</div>
                                                    <div className="text-[10px] text-slate-500 font-bold mt-1">📅 {formatSafeDate(hd.date)}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => setModal({ type: 'edit_special', data: hd, returnTo: 'manage_holidays' })} className="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-100 active:scale-95"><Icons.Edit /></button>
                                                    <button onClick={() => handleCancelBooking(hd)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg shadow-sm border border-red-100 active:scale-95"><Icons.Trash /></button>
                                                </div>
                                            </div>
                                        ))}
                                        {(db.bookings || []).filter(b => b.job_type === 'public_holiday' && b.status !== 'cancelled').length === 0 && <div className="text-center text-xs text-slate-400 py-6 border-2 border-dashed bg-white rounded-xl">ไม่มีวันหยุดในระบบ</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 📍 Global Modal สำหรับคลิกเปิดดูไฟล์รูปภาพหรือเอกสาร */}
            {viewFileUrl && (
                <div className="backdrop z-[700] p-4 flex flex-col items-center justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col h-[85vh] shadow-2xl animate-pop relative">
                        <div className="bg-slate-800 text-white p-3 flex justify-between items-center z-10 flex-shrink-0">
                            <span className="font-bold text-sm flex items-center gap-2"><Icons.FileText /> ดูไฟล์แนบ</span>
                            <button onClick={() => setViewFileUrl(null)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 active:scale-95 transition-all"><Icons.X /></button>
                        </div>
                        <div className="flex-1 bg-slate-100 flex items-center justify-center p-2 overflow-hidden relative">
                            {viewFileUrl.endsWith('.pdf') || viewFileUrl.includes('preview') || viewFileUrl.includes('drive.google.com') ? (
                                <iframe src={viewFileUrl} className="w-full h-full border-0 rounded-xl bg-white shadow-sm" allow="autoplay" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black/5 rounded-xl overflow-auto p-2">
                                    <img src={viewFileUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {alertMsg && (
                <div className="backdrop z-[500] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl animate-pop">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                        <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-md">ตกลง</button>
                    </div>
                </div>
            )}
            
            {confirmDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยันการทำรายการ</h3>
                        <div className="text-sm text-slate-600 mb-6 whitespace-pre-line">{confirmDialog.msg}</div>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm">ยกเลิก</button>
                            <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-md">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}
            
            {promptDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ระบุเหตุผล</h3>
                        <p className="text-xs text-slate-500 mb-4">{promptDialog.msg}</p>
                        <input type="text" id="prompt_input" className="w-full p-3 border rounded-xl mb-4 bg-slate-50 font-bold text-sm" placeholder="พิมพ์เหตุผล..." autoFocus />
                        <div className="flex gap-3">
                            <button onClick={() => setPromptDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">ยกเลิก</button>
                            <button onClick={() => { const v = document.getElementById('prompt_input').value; if(!v) return setAlertMsg('กรุณาระบุเหตุผล'); promptDialog.onSubmit(v); }} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {showActivityModal && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6 h-[85vh] flex flex-col">
                        <button onClick={() => setShowActivityModal(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 flex-shrink-0"><Icons.List /> ประวัติและการแจ้งเตือน</h3>
                        
                        {!hasLoadedAdmin ? (
                             <div className="flex flex-col items-center justify-center p-10 text-slate-400 gap-4 flex-1"><Icons.Loader /> กำลังดึงประวัติระบบ...</div>
                        ) : (
                            <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scrollbar">
                                {(() => {
                                    const filteredLogs = (adminDb.logs || []).filter(log => {
                                        if (!logSearchQuery) return true;
                                        const q = logSearchQuery.toLowerCase();
                                        return String(log.user || '').toLowerCase().includes(q) || String(log.action || '').toLowerCase().includes(q) || String(log.details || '').toLowerCase().includes(q);
                                    }).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

                                    if (filteredLogs.length === 0) return <div className="text-center text-slate-400 text-sm py-10">ไม่พบประวัติ</div>;

                                    return filteredLogs.slice(0, logsLimit).map((log, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Icons.User /></div>
                                                    <div className="text-[10px] font-bold text-slate-700">{log.user}</div>
                                                </div>
                                                <div className="text-[9px] text-slate-400 bg-slate-50 px-2 py-1 rounded-md border">
                                                    {new Date(log.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <span className={`px-2 py-1 rounded-md text-[9px] font-bold inline-block ${String(log.action).includes('CREATE') || String(log.action).includes('เพิ่ม') ? 'bg-green-100 text-green-700' : String(log.action).includes('UPDATE') || String(log.action).includes('แก้ไข') ? 'bg-blue-100 text-blue-700' : String(log.action).includes('DELETE') || String(log.action).includes('ลบ') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>{log.action}</span>
                                            </div>
                                            <div className="text-[11px] font-mono text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border">{log.details}</div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        )}
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
                    <div className="text-red-500 mb-4"><Icons.Alert /></div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">ระบบขัดข้องชั่วคราว</h2>
                    <p className="text-sm text-slate-500 mb-6 bg-slate-200 p-3 rounded-lg max-w-md break-words">{this.state.errorMsg}</p>
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-md">รีเฟรชหน้าเว็บ</button>
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
