const { useState, useEffect, useMemo, useRef } = React;

// 📍 คงระบบล็อกเวลาไทย (Asia/Bangkok) ไว้ตามเดิมอย่างถูกต้อง
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
            <g style={{ transformOrigin: '100% 20%', transform: isHovered ? 'rotate(35deg) translate(2px, -2px)' : 'rotate(0deg)', transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

const getCardStyle = (task) => {
    const jobType = String(task.job_type || '').toLowerCase();
    const area = String(task.area || '').trim();
    const siteStr = String(task.site_name || '').toLowerCase();
    const eqStr = String(task.equipment_no || '').toLowerCase();
    const combinedStr = siteStr + ' ' + eqStr;

    const isLeave = jobType === 'leave' || combinedStr.includes('leave_') || combinedStr.includes('ลา') || combinedStr === 'ลา';

    if (jobType === 'public_holiday' || combinedStr.includes('hld_')) return { bg: '#D0021B', text: '#ffffff', isSpecial: true, isLeave: false };
    if (jobType === 'company_event' || combinedStr.includes('event_') || combinedStr.includes('meeting') || combinedStr.includes('office') || combinedStr.includes('อบรม') || combinedStr.includes('s&q') || combinedStr.includes('family')) return { bg: '#22c55e', text: '#ffffff', isSpecial: true, isLeave: false };
    if (isLeave) return { bg: '#eab308', text: '#ffffff', isSpecial: true, isLeave: true };
    if (area !== '' && area !== 'กรุงเทพและปริมณฑล' && area !== 'ไม่ระบุ') return { bg: '#f472b6', text: '#ffffff', isSpecial: false, isLeave: false };
    if (jobType === 'mod') return { bg: '#64748b', text: '#ffffff', isSpecial: false, isLeave: false };
    if (jobType.includes('re-ins') || jobType.includes('temporary') || jobType.includes('builder lift')) return { bg: '#fef08a', text: '#854d0e', isSpecial: false, isLeave: false };
    return { bg: '#e2e8f0', text: '#1e293b', isSpecial: false, isLeave: false };
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
                <span>{currentTime.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &nbsp;{currentTime.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' })}</span>
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
    const colWidthPx = Math.floor(((screenWidth - 45) / 3) * columnZoom);
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
                                        if (user?.role === 'viewer') return setAlertMsg('สิทธิ์ของคุณคือ "ดูข้อมูลอย่างเดียว" ไม่สามารถทำรายการจองหรือแก้ไขได้ครับ');
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
                                                draggable={isAdmin}
                                                onDragStart={(e) => handleDragStart(e, gh.id)}
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 bg-[#D0021B] text-white ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
                                                style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
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
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 bg-[#22c55e] text-white ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
                                                style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                                onClick={(e) => { e.stopPropagation(); setModal({ type: 'detail', data: ge }); }}
                                            >
                                                {ge.site_name}
                                            </div>
                                        );
                                    })}
                                    
                                    {cellTasks.map((task, tIdx) => {
                                        const styleObj = getCardStyle(task);
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
                                                className={`task-content relative w-full flex items-center justify-center p-1 rounded-md ${isAdmin ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50 shadow-sm' : 'cursor-pointer'} ${isSingleCard ? 'h-full min-h-[40px]' : 'flex-1 min-h-[26px] border-b border-white/25'} ${isExporting ? '!overflow-visible !py-2 !min-h-[50px]' : 'overflow-hidden'}`}
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

    const [db, setDb] = useState({ bookings: [], inspectors: [], notifications: [] });
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
    const [isExporting, setIsExporting] = useState(false);
    
    const [docUrls, setDocUrls] = useState({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });
    const [viewFileUrl, setViewFileUrl] = useState(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);
    const [pullY, setPullY] = useState(0);
    const [draggingTask, setDraggingTask] = useState(null);
    const touchStartY = useRef(0);
    const lastActivityTime = useRef(Date.now());

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
    const [showLoginHelp, setShowLoginHelp] = useState(false);
    const [showBookingHelp, setShowBookingHelp] = useState(false);
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

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

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

    const getDiffLog = (oldData, newData, actionUser) => {
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
                if (oldVal === 'false' || oldVal === 'pending') oldVal = 'ยังไม่ส่ง/รอตรวจ';
                if (oldVal === 'true') oldVal = 'ตรวจสอบแล้ว';
                if (newVal === 'false' || newVal === 'pending') newVal = 'ยังไม่ส่ง/รอตรวจ';
                if (newVal === 'true') newVal = 'ตรวจสอบแล้ว';
                changes.push(`• ${labels[key]}: [${oldVal || '-'}] ➡️ [${newVal || '-'}]`);
            }
        }
        return changes.length > 0 ? `[อัปเดตข้อมูล]\nหัวข้อ/โครงการ: ${site}\nโดย: ${userFullName}\nการเปลี่ยนแปลง:\n${changes.join('\n')}` : `บันทึกการแก้ไขโดยไม่มีการเปลี่ยนแปลง (หัวข้อ: ${site})`;
    };

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

    const [isNavVisible, setIsNavVisible] = useState(true);
    useEffect(() => {
        let navTimer;
        const handleUserActivity = () => { setIsNavVisible(true); clearTimeout(navTimer); navTimer = setTimeout(() => setIsNavVisible(false), 3500); };
        window.addEventListener('touchstart', handleUserActivity); window.addEventListener('click', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity, true); window.addEventListener('mousemove', handleUserActivity);
        handleUserActivity(); 
        return () => {
            window.removeEventListener('touchstart', handleUserActivity); window.removeEventListener('click', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity, true); window.removeEventListener('mousemove', handleUserActivity);
            clearTimeout(navTimer);
        }
    }, []);

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

    const generateDates = (startStr, endStr, omitSunday = true) => {
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
    };

    const leaveDates = useMemo(() => generateDates(leaveStartDate, leaveEndDate, true), [leaveStartDate, leaveEndDate, db.bookings]);
    const eventDates = useMemo(() => generateDates(eventStartDate, eventEndDate, true), [eventStartDate, eventEndDate, db.bookings]);
    const holidayDates = useMemo(() => generateDates(holidayStartDate, holidayEndDate, false), [holidayStartDate, holidayEndDate]);
    const isAdmin = useMemo(() => user?.role === 'admin', [user]);
    const unreadNotifs = useMemo(() => (db.notifications || []).filter(n => (n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')) && String(n.isRead) !== 'true'), [db.notifications, user, isAdmin]);

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
    }, [currentDate, period, db.bookings, todayLocalString]);

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
            // 📍 แก้ไข: เพิ่มรอบระยะเวลาดึงข้อมูลเป็น 5 นาที (300000 ms) เพื่อลดปัญหาโควตาเต็ม
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
                // 📍 เพิ่ม api_key
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
            // 📍 เพิ่ม api_key
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
        if ((view === 'admin' || view === 'search') && !hasLoadedAdmin) fetchAdminData(0, 50, 'all');
    };

    const apiAction = async (payload, customLoadMsg = 'กำลังบันทึกข้อมูล...', disableAutoSync = false) => {
        if (!SCRIPT_URL) return false;
        if(customLoadMsg) setLoadingMsg(customLoadMsg);
        try {
            // 📍 เพิ่ม api_key ลงในทุกๆ payload ก่อนส่ง
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

    const handleTouchStart = (e) => { if (scrollRef.current && scrollRef.current.scrollTop === 0) touchStartY.current = e.touches[0].clientY; };
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
        setPullY(0); touchStartY.current = 0;
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
                const ok = await apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail, job_type: booking.job_type }, 'กำลังลบ...');
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
                apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail, job_type: booking.job_type }, 'กำลังยกเลิกคิวงาน...').then(ok => {
                    if(ok) { setModal(null); setActionMenuId(null); setSuccessModal('ยกเลิกคิวสำเร็จ'); }
                });
            }
        });
    };

    // 📍 คืนค่าฟังก์ชันจัดการสถานะด้วย Checkbox ของ Admin
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

                // 📍 เพิ่ม api_key สำหรับการอัปโหลด
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
        setIsDragging(false); setIsTrashHovered(false); setDraggingTask(null);
    };

    const handleTrashDrop = async (e) => {
        e.preventDefault(); setIsDragging(false); setIsTrashHovered(false);
        if (!isAdmin) return;
        const taskId = e.dataTransfer.getData('taskId');
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId));
        if (!task) return setAlertMsg('ไม่พบข้อมูลการ์ดที่ต้องการลบทิ้ง');
        
        setConfirmDialog({
            msg: `คุณกำลังลากการ์ดทิ้งลงถังขยะ\nยืนยันลบข้อมูลนี้ใช่หรือไม่?\n\n📌 รายการ: ${task.site_name || task.equipment_no}`,
            onConfirm: async () => {
                setConfirmDialog(null); setDraggingTask(null);
                const logDetail = `[ลบรายการด้วย Drag & Drop ถังขยะ]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${task.site_name || '-'}`;
                const ok = await apiAction({ action: 'delete_booking', id: task.id, user: user?.username || 'admin', reason: logDetail, job_type: task.job_type }, 'กำลังลบทิ้ง...');
                if(ok) setSuccessModal('ลบรายการลงถังขยะสำเร็จ');
            }
        });
    };

    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault(); e.currentTarget.classList.remove('bg-blue-50/60', 'border-2', 'border-blue-400', 'border-dashed');
        if (!isAdmin) return setAlertMsg('เฉพาะแอดมินที่สามารถลากย้ายคิวได้ครับ');
        const taskId = e.dataTransfer.getData('taskId');
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId));
        if (!task) return setAlertMsg('เกิดข้อผิดพลาด ไม่พบข้อมูลการ์ด กรุณาลองลากใหม่อีกครั้ง');
        
        let finalInspector = targetInspector;
        if (task.inspector_name === 'SYSTEM_EVENT') finalInspector = 'SYSTEM_EVENT';
        if (task.inspector_name === 'SYSTEM_HOLIDAY') finalInspector = 'SYSTEM_HOLIDAY';

        const oldDate = task.date ? formatSafeDate(task.date) : 'ไม่ระบุ';
        const oldInspector = task.inspector_name;

        if (oldDate === targetDate && oldInspector === finalInspector) return setDraggingTask(null);
        
        setConfirmDialog({
            msg: `คุณต้องการย้ายรายการนี้ใช่หรือไม่?\nจากวันที่ ${oldDate} 👉 ${targetDate}`,
            onConfirm: async () => {
                setConfirmDialog(null); setDraggingTask(null);
                const logDetail = `[ย้ายคิวงาน]\nโดย: ${user?.username || '-'}\nวันที่: [${oldDate}] ➡️ [${targetDate}]`;
                const ok = await apiAction({ action: 'update_booking', id: task.id, date: targetDate, inspector_name: finalInspector, user: user?.username || 'admin', reason: logDetail, job_type: task.job_type }, 'กำลังย้ายข้อมูล...');
                if (ok) setSuccessModal('ลากย้ายรายการสำเร็จเรียบร้อย');
            }
        });
    };

    const filteredBookings = useMemo(() => { 
        return (db.bookings || []).filter(b => filterArea === 'All' ? true : String(b.area || '') === filterArea); 
    }, [db.bookings, filterArea]);

    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const payload = { 
            ...modal.data, action: 'update_booking', id: modal.data.id, 
            site_name: fd.get('site_name'), inspector_name: fd.get('inspector_name'), date: fd.get('date'), 
            user: user?.username, reason: `[แก้ไขคิวพิเศษ] เปลี่ยนวันที่เป็น ${fd.get('date')}`, job_type: modal.data.job_type 
        };
        const ok = await apiAction(payload, 'กำลังอัปเดตข้อมูล...');
        if(ok) { setSuccessModal('อัปเดตสำเร็จ'); setModal(null); }
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

        const isAdminOverride = fd.get('isAdminOverride') === 'true' || (isAdmin && modal?.data?.id);
        const targetInspector = isAdminOverride ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isAdminOverride ? fd.get('admin_date_target') : modal?.data?.date;

        if (!isAdmin && quickAddType === 'job') {
            const hasLayout = docUrls.layout || modal?.data?.layout_img;
            const hasWiring = docUrls.wiring || modal?.data?.wiring_img;
            const hasPrecheck = docUrls.precheck || modal?.data?.precheck_img;
            if (!hasLayout || !hasWiring || !hasPrecheck) {
                return setAlertMsg('⚠️ ไม่สามารถบันทึกคิวงานได้!\nกรุณาอัปโหลดเอกสารแนบให้ครบทั้ง 3 ส่วน (Layout, Wiring, Pre-check)');
            }
        }

        if (quickAddType !== 'job') {
            let p_jobType = '', p_siteName = fd.get('site_name'), p_eq = '';
            if (quickAddType === 'leave') {
                p_jobType = 'leave';
                p_siteName = fd.get('leave_type') === 'อื่นๆโปรดระบุ' ? fd.get('custom_leave') : fd.get('leave_type');
                p_eq = `LEAVE_${Date.now()}`;
            }
            const payload = { action: 'create_multiple_bookings', dates: [targetDate], inspector_name: targetInspector, job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, user: user?.username, reason: `[บันทึก${quickAddType}]` };
            const ok = await apiAction(payload, `กำลังบันทึก${quickAddType}...`);
            if(ok) { setModal(null); setSuccessModal('บันทึกสำเร็จ'); }
            return;
        }

        const payload = {
            action: modal?.data?.id ? 'update_booking' : 'create_booking',
            ...data, site_name: data.site_name, tel: String(data.tel || ''), area: finalArea, job_type: finalJobType, product_line: finalProductLine,
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

        // 📍 แก้ไข: กำหนดสถานะเป็น 'pending' ไว้รอ Admin ตรวจสอบ เพื่อให้สอดคล้องกับ Backend
        if (!modal?.data?.id) {
            payload.layout_doc = 'pending';
            payload.wiring_doc = 'pending'; 
            payload.precheck_doc = 'pending';
        } else {
            payload.layout_doc = modal.data.layout_doc || 'pending';
            payload.wiring_doc = modal.data.wiring_doc || 'pending';
            payload.precheck_doc = modal.data.precheck_doc || 'pending';
        }

        payload.reason = getDiffLog(modal?.data?.id ? modal.data : null, payload, user?.username);
        const ok = await apiAction(payload, modal?.data?.id ? 'กำลังอัปเดตข้อมูล...' : 'กำลังบันทึกคิวงาน...');
        if (ok) { 
            setSuccessModal(modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!');
            setModal(null);
            setAreaSelection(''); setJobTypeSelection(''); setProductLineSelection(''); setLiveMapUrl('');
            setDocUrls({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });
        }
    };

    const handleLogout = () => {
        setConfirmDialog({
            msg: 'ยืนยันการออกจากระบบใช่หรือไม่?',
            onConfirm: async () => {
                setConfirmDialog(null); setLoadingMsg('กำลังออกจากระบบ...'); setUser(null);
                try {
                    localStorage.clear(); sessionStorage.clear();
                } catch (error) {} finally { window.location.replace(window.location.pathname); }
            }
        });
    };

    // 📍 คงระบบ Block UI แบบเต็มจอ (Full Screen) สำหรับ Login ไว้ตามเดิมเพื่อป้องกันข้อมูล
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
                            <p className="text-sm text-slate-600 mb-6">{alertMsg}</p>
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
                            {showLoginHelp ? 'คู่มือการสมัครสมาชิก' : (isForgotMode ? 'รีเซ็ตรหัสผ่าน' : (isRegisterMode ? 'สมัครสมาชิกใหม่' : 'เข้าสู่ระบบเพื่อใช้งาน'))}
                        </h2>
                    </div>

                    {showLoginHelp ? (
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 pb-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border">
                                <p className="text-xs text-slate-600 leading-relaxed text-center font-bold">เพื่อความปลอดภัยของข้อมูลคิวงาน การเข้าใช้งานระบบ SAIS Booking ต้องได้รับการอนุมัติจาก Admin เท่านั้น สำหรับผู้ใช้ทั่วไป (Viewer) สามารถรับ ID/Password เฉพาะดูตารางได้จากผู้ดูแลระบบ</p>
                            </div>
                            <button onClick={() => setShowLoginHelp(false)} className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">กลับไปหน้าเข้าสู่ระบบ</button>
                        </div>
                    ) : (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const fd = new FormData(e.target);
                            
                            // 📍 เพิ่ม api_key ใน Request ล็อกอินและรีเซ็ตรหัส
                            if (isForgotMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านใหม่ไม่ตรงกัน');
                                setLoadingMsg('กำลังค้นหาบัญชี...');
                                const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'reset_password', api_key: window?.SAIS_CONFIG?.API_KEY, full_name: fd.get('full_name'), phone: fd.get('phone'), new_password: fd.get('password') }) });
                                const result = await res.json();
                                setLoadingMsg(null);
                                if (result.status === 'ok') { 
                                    setAlertMsg(`✅ กู้คืนบัญชีสำเร็จ! Username คือ: ${result.username}`);
                                    setIsForgotMode(false); 
                                } else { setAlertMsg(result.message || 'ไม่พบข้อมูล'); }
                            } else if (isRegisterMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านไม่ตรงกัน');
                                const payload = { action: 'register', username: fd.get('username'), password: fd.get('password'), full_name: fd.get('full_name') };
                                const ok = await apiAction(payload, 'กำลังสมัครสมาชิก...', true);
                                if (ok) { setSuccessModal('สมัครสำเร็จ รออนุมัติ'); setIsRegisterMode(false); }
                            } else {
                                setLoadingMsg('ตรวจสอบข้อมูล...');
                                try {
                                    const result = await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'login', api_key: window?.SAIS_CONFIG?.API_KEY, username: fd.get('username'), password: fd.get('password') }) });
                                    setLoadingMsg(null);
                                    if (result.status === 'ok') { 
                                        localStorage.setItem('sais_user', JSON.stringify(result.user));
                                        localStorage.setItem('sais_session_time', Date.now().toString());
                                        setUser(result.user); setSuccessModal('ยินดีต้อนรับเข้าสู่ระบบ'); 
                                    } else { setAlertMsg(result.message || 'รหัสผ่านผิดพลาด'); }
                                } catch (err) { setLoadingMsg(null); setAlertMsg('ระบบขัดข้อง'); }
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
                            {(isRegisterMode || isForgotMode) && (
                                <div className="p-4 border rounded-xl bg-slate-50 text-sm text-center text-slate-500">
                                    ติดต่อ Admin ผู้ดูแลระบบ เพื่อขอรับสิทธิ์ หรือ รีเซ็ตรหัสผ่าน ครับ
                                </div>
                            )}

                            <button disabled={loadingMsg} className="w-full py-3.5 rounded-xl text-white font-bold bg-red-600 mt-4 shadow-md text-sm">
                                {loadingMsg ? 'รอสักครู่...' : 'เข้าสู่ระบบ (LOGIN)'}
                            </button>
                            
                            <div className="text-center mt-4">
                                {!isForgotMode && !isRegisterMode && (
                                    <button type="button" onClick={() => setShowLoginHelp(true)} className="text-xs font-bold text-blue-600 hover:underline mb-3 block w-full">คลิกที่นี่ หากไม่มีบัญชีการใช้งาน</button>
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

            <header className="main-header bg-slate-800">
                <div className="flex items-center gap-2"><h1 className="text-xl font-bold tracking-wide">SAIS BOOKING</h1></div>
                <div className="flex items-center gap-2 relative">
                    <button className="btn-icon" onClick={() => setShowSettings(!showSettings)}><Icons.Settings /></button>
                    {showSettings && (
                        <div className="settings-menu animate-pop w-[260px] max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <h4 className="text-sm font-bold border-b border-slate-200 pb-2 mb-3 text-slate-800 flex items-center gap-2"><Icons.Settings /> การตั้งค่าระบบ</h4>
                            <button onClick={handleExportJPG} className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg mb-3">บันทึกตารางหน้านี้</button>
                            <button className="w-full py-2 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200 text-xs mt-4" onClick={() => { setTableFontScale(1.0); setSpecialFontScale(1.0); setColumnZoom(1.0); }}>↺ รีเซ็ตค่าเริ่มต้น</button>
                        </div>
                    )}
                    <button className="btn-icon relative" onClick={() => { setShowActivityModal(true); if(!hasLoadedAdmin) fetchAdminData(0, 50, 'all'); }}>
                        <Icons.Bell />{unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                    </button>
                    <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.User /> {user.username}</div>
                </div>
            </header>

            <div className="bottom-nav" style={{ transform: isNavVisible ? 'translateY(0)' : 'translateY(100%)', zIndex: 50 }}>
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => handleTabChange('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {user && !isAdmin && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => handleTabChange('my_bookings')}><Icons.List /> งานฉัน</div>}
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { handleTabChange('admin'); setAdminTab('menu'); }}><Icons.Shield /> จัดการ</div>}
                <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>
            </div>

            {currentView === 'calendar' && (
                <div className="grid-container relative overflow-hidden pb-16">
                    <div className="nav-bar bg-white px-3 py-2 border-b flex-shrink-0 z-[45]">
                        <div className="flex justify-between items-center w-full">
                            <button onClick={() => changePeriod('prev')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600"><Icons.ChevronLeft /> ย้อน</button>
                            <div className="text-center font-bold text-slate-800 text-sm">{period === 0 ? "1-15 " : `16-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()} `}{currentDate.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', month: 'short', year: 'numeric' })}</div>
                            <button onClick={() => changePeriod('next')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">ถัดไป <Icons.ChevronRight /></button>
                        </div>
                    </div>
                    <div className="grid-wrapper" ref={scrollRef}>
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
                            const docTasks = (db.bookings || []).filter(b => String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.inspector_name) !== 'SYSTEM_EVENT' && !String(b.equipment_no).startsWith('LEAVE_') && String(b.status) !== 'cancelled').sort((a, b) => new Date(b.date) - new Date(a.date));
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
                                            {/* 📍 คืนค่าระบบ Checkbox กลับมาให้แอดมินใช้ตรวจสอบสถานะการส่งเอกสาร */}
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
                                                            {fileUrl && <button onClick={() => handleDownloadFile(fileUrl, `${docKey}_${h.equipment_no}`)} className="flex-1 text-[9px] bg-emerald-600 text-white border border-emerald-600 rounded py-1 font-bold shadow-sm active:scale-95">โหลด</button>}
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

            {modal?.type === 'detail' && (
                <div className="modal-card p-6 w-full max-w-md animate-pop bg-white rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full z-50"><Icons.X /></button>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                    <div className="space-y-3 text-sm text-slate-700 mb-6">
                        <div><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold">{modal.data.date ? formatSafeDate(modal.data.date) : '-'}</span></div>
                        <div><span className="text-slate-400 text-xs block">ผู้ตรวจ</span><span className="font-bold text-blue-600">{modal.data.inspector_name}</span></div>
                        <div><span className="text-slate-400 text-xs block">ชื่อโครงการ</span><span className="font-bold">{modal.data.site_name}</span></div>
                        
                        {!String(modal.data.job_type).includes('leave') && !String(modal.data.job_type).includes('event') && (
                            <>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><span className="text-slate-400 text-xs block">Eq No.</span><span className="font-bold">{modal.data.equipment_no || '-'}</span></div>
                                    <div><span className="text-slate-400 text-xs block">Unit</span><span className="font-bold">{modal.data.unit_no || '-'}</span></div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1"><Icons.FileCheck /> สถานะเอกสาร</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['layout', 'wiring', 'precheck'].map(docKey => {
                                            const fileUrl = modal.data[`${docKey}_img`];
                                            const isSent = String(modal.data[`${docKey}_doc`]) === 'true';
                                            return (
                                                <div key={docKey} className={`flex flex-col items-center justify-center p-2 rounded-xl border relative ${isSent ? 'bg-green-50 border-green-200' : 'bg-slate-50'}`}>
                                                    <div className="text-[10px] mb-1 uppercase font-bold">{docKey}</div>
                                                    <div className="text-[9px] font-bold mb-1">{isSent ? '✅ ตรวจสอบแล้ว' : '⏳ รอตรวจ'}</div>
                                                    <div className="flex w-full gap-1 mt-auto">
                                                        {fileUrl && <button onClick={() => setViewFileUrl(fileUrl)} className="flex-1 text-[9px] bg-blue-600 text-white py-1 rounded shadow-sm font-bold">ดู</button>}
                                                        {(isAdmin || user?.role === 'inspector') && fileUrl && (
                                                            <button onClick={() => handleDownloadFile(fileUrl, `${docKey}_${modal.data.equipment_no}`)} className="flex-1 text-[9px] bg-emerald-600 text-white py-1 rounded shadow-sm font-bold">โหลด</button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            
            {viewFileUrl && (
                <div className="backdrop z-[700] p-4 flex flex-col items-center justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col h-[85vh] shadow-2xl animate-pop relative">
                        <div className="bg-slate-800 text-white p-3 flex justify-between items-center z-10 flex-shrink-0">
                            <span className="font-bold text-sm flex items-center gap-2"><Icons.FileText /> ดูไฟล์แนบ</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleDownloadFile(viewFileUrl)} className="bg-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500 shadow-sm">ดาวน์โหลด</button>
                                <button onClick={() => setViewFileUrl(null)} className="bg-white/20 p-1.5 rounded-full"><Icons.X /></button>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-100 flex items-center justify-center p-2 overflow-hidden relative">
                            {viewFileUrl.endsWith('.pdf') ? (
                                <iframe src={viewFileUrl} className="w-full h-full border-0 rounded-xl bg-white shadow-sm" allow="autoplay" />
                            ) : (
                                <img src={viewFileUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
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
 
