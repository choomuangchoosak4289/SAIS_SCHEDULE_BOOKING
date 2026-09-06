const { useState, useEffect, useMemo, useRef, useCallback } = React;

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
    Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 0 2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2 2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    HelpCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    UserPlus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>,
    AnimatedTrash: ({ isHovered }) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g style={{ transformOrigin: '100% 20%', transform: isHovered ? 'rotate(35deg) translate(2px, -2px)' : 'rotate(0deg)', transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </g>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
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
                                    onDragOver={user?.role === 'viewer' ? undefined : handleDragOver} 
                                    onDragLeave={user?.role === 'viewer' ? undefined : handleDragLeave} 
                                    onDrop={user?.role === 'viewer' ? undefined : ((e) => handleDrop(e, d.full, ins.name))}
                                    className={cellClassName}
                                    onClick={() => {
                                        try {
                                            if (!user) return typeof setAlertMsg === 'function' && setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการจองคิวตรวจครับ');
                                            if (user.role === 'viewer') return; 
                                            if (!isAdmin && isBlockedForNormalUser) return;
                                            
                                            const todayLocalString = window.SAIS_UTILS?.getLocalDateString(getThaiTime()) || getThaiTime().toISOString().split('T')[0];
                                            if (d.full < todayLocalString && !isAdmin) return typeof setAlertMsg === 'function' && setAlertMsg('ไม่สามารถจองคิวงานย้อนหลังได้ครับ');
                                            
                                            if (isAdmin) {
                                                if(typeof setModal === 'function') setModal({ type: 'admin_cell_action', data: { date: d.full, inspector_name: ins.name } });
                                            } else {
                                                if(typeof setQuickAddType === 'function') setQuickAddType('job');
                                                if(typeof setModal === 'function') setModal({ type: 'booking', data: { date: d.full, inspector_name: ins.name } });
                                            }
                                        } catch (error) { console.error("Calendar click error:", error); }
                                    }}>

                                    {d.isGlobalHoliday && d.globalHolidays.map((gh, ghi) => {
                                        const isCard = cellTasks.length > 0;
                                        return (
                                            <div key={'gh'+ghi} 
                                                draggable={isAdmin && user?.role !== 'viewer'}
                                                onDragStart={(e) => handleDragStart(e, gh.id || gh.equipment_no)}
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-center ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
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
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-white/50' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-center ${isAdmin && user?.role !== 'viewer' ? 'cursor-grab active:cursor-grabbing hover:opacity-80' : 'cursor-pointer'}`} 
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

// 📍 COMPONENT หลักของระบบ
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
    const [initialLoad, setInitialLoad] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState(null);
    const [uploadingDoc, setUploadingDoc] = useState({ layout: false, wiring: false, precheck: false, site_cond_1: false, site_cond_2: false, site_cond_3: false, site_cond_4: false, site_cond_5: false, site_cond_6: false });
    const [alertMsg, setAlertMsg] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [promptDialog, setPromptDialog] = useState(null);
    const [successModal, setSuccessModal] = useState(null);
    const [currentView, setCurrentView] = useState('calendar');
    
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
    const [searchInspector, setSearchInspector] = useState('All');

    const [logSearchQuery, setLogSearchQuery] = useState('');
    const [localLogSearchQuery, setLocalLogSearchQuery] = useState('');

    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const [leaveInspectors, setLeaveInspectors] = useState([]); 
    const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
    const [leaveType, setLeaveType] = useState('ลาพักร้อน');
    const [customLeaveType, setCustomLeaveType] = useState(''); 
    
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventInspectors, setEventInspectors] = useState([]);
    const [showEventDropdown, setShowEventDropdown] = useState(false);
    const [eventColor, setEventColor] = useState('#22c55e');
    
    const [holidayStartDate, setHolidayStartDate] = useState('');
    const [holidayEndDate, setHolidayEndDate] = useState('');

    const [selectedLeavesToDelete, setSelectedLeavesToDelete] = useState([]);
    const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);
    const [selectedHolidaysToDelete, setSelectedHolidaysToDelete] = useState([]);

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

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
// 📍 COMPONENT หลักของระบบ
const App = () => {
    const SCRIPT_URL = window?.SAIS_CONFIG?.SCRIPT_URL || "";
    const ADMIN_USERNAME = window?.SAIS_CONFIG?.ADMIN_USERNAME || "jiraphong2227";
    const utils = window?.SAIS_UTILS || {};

    // 📍 1. สร้าง State ทั้งหมด (จัดเรียงใหม่ให้อยู่บนสุดก่อนเงื่อนไข Return ป้องกันหน้าจอขาว)
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
    const [initialLoad, setInitialLoad] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState(null);
    const [uploadingDoc, setUploadingDoc] = useState({ layout: false, wiring: false, precheck: false, site_cond_1: false, site_cond_2: false, site_cond_3: false, site_cond_4: false, site_cond_5: false, site_cond_6: false });
    const [alertMsg, setAlertMsg] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [promptDialog, setPromptDialog] = useState(null);
    const [successModal, setSuccessModal] = useState(null);
    const [currentView, setCurrentView] = useState('calendar');
    
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
    const [searchInspector, setSearchInspector] = useState('All');

    const [logSearchQuery, setLogSearchQuery] = useState('');
    const [localLogSearchQuery, setLocalLogSearchQuery] = useState('');

    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const [leaveInspectors, setLeaveInspectors] = useState([]); 
    const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
    const [leaveType, setLeaveType] = useState('ลาพักร้อน');
    const [customLeaveType, setCustomLeaveType] = useState(''); 
    
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventInspectors, setEventInspectors] = useState([]);
    const [showEventDropdown, setShowEventDropdown] = useState(false);
    const [eventColor, setEventColor] = useState('#22c55e');
    
    const [holidayStartDate, setHolidayStartDate] = useState('');
    const [holidayEndDate, setHolidayEndDate] = useState('');

    const [selectedLeavesToDelete, setSelectedLeavesToDelete] = useState([]);
    const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);
    const [selectedHolidaysToDelete, setSelectedHolidaysToDelete] = useState([]);

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

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
    // 📍 2. โหลด Firebase อย่างปลอดภัย
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const existingScript = document.querySelector(`script[src="${src}"]`);
                if (existingScript) {
                    if (existingScript.getAttribute('data-loaded') === 'true') {
                        return resolve();
                    }
                    existingScript.addEventListener('load', resolve);
                    existingScript.addEventListener('error', reject);
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    script.setAttribute('data-loaded', 'true');
                    resolve();
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initFirebase = async () => {
            if (window.firebase && window.dbFirestore && window.dbStorage) {
                setIsFirebaseReady(true); return;
            }
            try {
                await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
                await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js");
                await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-storage-compat.js"); 

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
                window.dbStorage = window.firebase.storage();
                setIsFirebaseReady(true);
            } catch (e) { 
                console.error("Firebase Load Error:", e);
                setAlertMsg("ไม่สามารถเชื่อมต่อฐานข้อมูล Firebase ได้ กรุณารีเฟรชหน้าเว็บ");
            }
        };
        initFirebase();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => setSearchQuery(localSearchQuery), 400);
        return () => clearTimeout(handler);
    }, [localSearchQuery]);

    useEffect(() => {
        const handler = setTimeout(() => setLogSearchQuery(localLogSearchQuery), 400); 
        return () => clearTimeout(handler);
    }, [localLogSearchQuery]);

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

    const availableInspectors = useMemo(() => {
        return (db.inspectors || []).filter(ins => {
            return !(adminDb.users || []).some(u => u.inspector_mapped_name === ins.name && u.username !== modal?.data?.username);
        });
    }, [db.inspectors, adminDb.users, modal]);

    // 📍 ดึงข้อมูล Realtime ด้วย Firestore 
    useEffect(() => {
        if (!isFirebaseReady || !window.dbFirestore) return;

        const unsubSettings = window.dbFirestore.collection("settings").doc("web_settings").onSnapshot(doc => {
            if(doc.exists) setDb(prev => ({ ...prev, settings: doc.data() }));
        });

        const unsubInspectors = window.dbFirestore.collection("inspectors").onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => list.push(doc.data()));
            setDb(prev => ({ ...prev, inspectors: list }));
        });

        const unsubBookings = window.dbFirestore.collection("bookings").onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => list.push(doc.data()));
            setDb(prev => ({ ...prev, bookings: list }));
            setAdminDb(prev => ({ ...prev, all_bookings: list }));
            setLastSyncTime(getThaiTime());
            setInitialLoad(false);
        });

        let unsubUsers, unsubLogs;
        if (user && user.role === 'admin') {
            unsubUsers = window.dbFirestore.collection("users").onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => list.push(doc.data()));
                setAdminDb(prev => ({ ...prev, users: list }));
            });
            unsubLogs = window.dbFirestore.collection("logs").orderBy("timestamp", "desc").limit(100).onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => list.push(doc.data()));
                setAdminDb(prev => ({ ...prev, logs: list }));
            });
            setHasLoadedAdmin(true);
        }

        return () => {
            unsubSettings();
            unsubInspectors();
            unsubBookings();
            if(unsubUsers) unsubUsers();
            if(unsubLogs) unsubLogs();
        };
    }, [isFirebaseReady, user]);
    // 📍 3. ตรวจสอบการเลือกพื้นที่ในฟอร์มเพื่อแสดง Google Maps
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

    // 📍 4. ตัวกรองคิวงานในตารางปฏิทิน
    const filteredBookings = useMemo(() => { 
        return (db.bookings || []).filter(b => filterArea === 'All' ? true : String(b.area || '') === filterArea); 
    }, [db.bookings, filterArea]);

    // 📍 5. ระบบบันทึกประวัติการใช้งาน (Log) ลง Firebase 100%
    const logActivity = async (action, details) => {
        if (!window.dbFirestore || !user) return;
        try {
            await window.dbFirestore.collection("logs").add({
                action: action,
                details: details,
                user: user.username,
                timestamp: getThaiTime().toISOString()
            });
        } catch (e) { console.error("Log Error:", e); }
    };

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
            const timer = setTimeout(() => { setSuccessModal(null); }, 3500); 
            return () => clearTimeout(timer);
        }
    }, [successModal]);

    // 📍 5. การตั้งค่า UI
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

    // 📍 6. ระบบ Background Sync (Backup ไปยัง Google Sheets เสมอเพื่อความปลอดภัยของข้อมูล)
    const apiAction = async (payload, customLoadMsg = null, disableAutoSync = false) => {
        if (!SCRIPT_URL) return false;
        if (customLoadMsg) setLoadingMsg(customLoadMsg);
        try {
            const payloadWithAuth = { ...payload, api_key: window?.SAIS_CONFIG?.API_KEY };
            const fetchPromise = fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payloadWithAuth) })
                .then(res => res.json())
                .then(result => {
                    if (result.status !== 'ok' && !String(result.message).includes('ไม่พบ ID')) {
                        console.warn('Backup Sync Note:', result.message);
                    }
                }).catch(e => console.warn('Background Sync Error:', e));

            if (customLoadMsg) {
                await fetchPromise;
                setLoadingMsg(null);
            }
            return true;
        } catch (e) { 
            if (customLoadMsg) setLoadingMsg(null);
            return false; 
        }
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
            setTimeout(() => { setIsRefreshing(false); setPullY(0); }, 800); 
        } else {
            setPullY(0); 
        }
        touchStartY.current = 0;
    };
    // 📍 7. ระบบลบข้อมูลแบบกลุ่ม (Bulk Delete)
    const handleBulkDelete = async (type, ids) => {
        if (ids.length === 0) return;
        setConfirmDialog({
            msg: `ยืนยันลบข้อมูลที่เลือกทั้ง ${ids.length} รายการ?`,
            onConfirm: async () => {
                setConfirmDialog(null); 
                setLoadingMsg('กำลังลบข้อมูลแบบกลุ่ม...');
                try {
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
                    
                    logActivity(`DELETE MULTIPLE (${type})`, `ลบข้อมูลจำนวน ${ids.length} รายการ`);
                    setLoadingMsg(null);
                    setSuccessModal(
                        <div className="text-center">
                            <div className="font-black text-sm mb-1">ลบข้อมูลสำเร็จ!</div>
                            <div className="text-xs text-slate-600">รายการหมวดหมู่: {type}</div>
                            <div className="text-xs text-slate-600">จำนวนที่ถูกลบ: <span className="font-bold text-red-500">{ids.length} รายการ</span></div>
                        </div>
                    );
                    const logDetail = `[ลบข้อมูลแบบกลุ่ม]\nหมวดหมู่: ${type}\nจำนวน: ${ids.length} รายการ`;
                    apiAction({ action: 'delete_multiple', ids: ids, user: user?.username, reason: logDetail }, null, true);
                } catch(e) {
                    setLoadingMsg(null);
                    setAlertMsg('เกิดข้อผิดพลาดในการลบข้อมูล: ' + e.message);
                }
            }
        });
    };

    const handleCancelBooking = (booking) => {
        if(!booking?.equipment_no) return;
        setConfirmDialog({
            msg: "ยืนยันลบข้อมูลนี้ใช่หรือไม่?",
            onConfirm: async () => {
                setConfirmDialog(null);
                setModal(null);
                
                const isSpecial = String(booking.job_type).includes('leave') || String(booking.job_type).includes('event') || String(booking.job_type).includes('holiday');
                let logDetail = '';
                if (isSpecial) {
                    logDetail = `[ลบรายการ]\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
                } else {
                    logDetail = `[ลบรายการ]\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nProduct: ${booking.product_line || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
                }
                
                try {
                    setLoadingMsg('กำลังลบข้อมูลออกจากระบบ...');
                    const docId = await findDocIdFallback(booking);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).delete();
                    }
                    
                    logActivity('DELETE BOOKING', logDetail);
                    setLoadingMsg(null);
                    
                    setSuccessModal(
                        <div className="text-center">
                            <div className="font-black text-sm mb-1 text-red-600">ลบข้อมูลสำเร็จ!</div>
                            <div className="text-xs text-slate-600">รายการ: {booking.site_name || booking.equipment_no}</div>
                            <div className="text-xs text-slate-600">วันที่: {formatSafeDate(booking.date)}</div>
                        </div>
                    );

                    apiAction({ action: 'delete_booking', id: docId || booking.id || '', user: user?.username || 'admin', reason: logDetail, job_type: booking.job_type, equipment_no: booking.equipment_no }, null, true);
                } catch(e) { console.error(e); setAlertMsg('เกิดข้อผิดพลาดในการลบข้อมูล: ' + e.message); setLoadingMsg(null); }
            }
        });
    };

    const handleCancelJob = (booking) => {
        if(!booking?.equipment_no) return;
        const isPastDate = booking.date && formatSafeDate(booking.date) < todayLocalString;
        if (isPastDate && !isAdmin) return setAlertMsg('🔒 ไม่อนุญาตให้ยกเลิกคิวงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        
        setPromptDialog({
            msg: "โปรดระบุเหตุผลในการยกเลิกคิวงานนี้:",
            onSubmit: async (reason) => {
                setPromptDialog(null);
                setModal(null);
                setActionMenuId(null);
                
                const logDetail = `[ยกเลิกคิวงาน]\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nเหตุผล: ${reason || 'ไม่ระบุ'}`;
                
                try {
                    setLoadingMsg('กำลังยกเลิกคิวงาน...');
                    const docId = await findDocIdFallback(booking);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).delete();
                    }
                    
                    logActivity('CANCEL BOOKING', logDetail);
                    setLoadingMsg(null);
                    
                    setSuccessModal(
                        <div className="text-center">
                            <div className="font-black text-sm mb-1 text-red-600">ยกเลิกคิวงานสำเร็จ!</div>
                            <div className="text-xs text-slate-600">โครงการ: {booking.site_name || booking.equipment_no}</div>
                            <div className="text-xs text-slate-600">เหตุผล: {reason}</div>
                        </div>
                    );

                    apiAction({ action: 'delete_booking', id: docId || booking.id || '', user: user?.username || 'admin', reason: logDetail, job_type: booking.job_type, equipment_no: booking.equipment_no }, null, true);
                } catch(e) { console.error(e); setAlertMsg('เกิดข้อผิดพลาดในการยกเลิก: ' + e.message); setLoadingMsg(null); }
            }
        });
    };

    // 📍 8. ระบบตรวจเอกสาร (Admin)
    const handleVerifyDoc = async (booking, docField, isChecked) => {
        if (!isAdmin) return;
        const val = isChecked ? 'true' : 'pending';
        const docName = docField.replace('_doc', '').toUpperCase();
        const logDetail = `[อัปเดตสถานะเอกสาร]\nโดย: ${user?.username}\nเอกสาร: ${docName} -> ${isChecked ? 'ตรวจสอบแล้ว' : 'รอตรวจสอบ'}\nโครงการ: ${booking.site_name}`;
        
        try {
            setLoadingMsg(`กำลังอัปเดตสถานะ ${docName}...`);
            const docId = await findDocIdFallback(booking);
            if (docId && window.dbFirestore) {
                await window.dbFirestore.collection("bookings").doc(docId).update({ [docField]: val });
            }
            
            logActivity('VERIFY DOCUMENT', logDetail);
            setLoadingMsg(null);
            
            setSuccessModal(
                <div className="text-center">
                    <div className="font-black text-sm mb-1 text-green-600">อัปเดตเอกสารสำเร็จ!</div>
                    <div className="text-xs text-slate-600">เอกสาร: <span className="font-bold">{docName}</span></div>
                    <div className="text-xs text-slate-600">โครงการ: {booking.site_name || booking.equipment_no}</div>
                </div>
            );

            apiAction({ ...booking, action: 'update_booking', id: docId || booking.id, [docField]: val, reason: logDetail }, null, true);
        } catch(e) { setAlertMsg('อัปเดตสถานะไม่สำเร็จ: ' + e.message); setLoadingMsg(null); }
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
        } catch (e) { window.open(url, '_blank'); }
    };

    const handleFileUpload = async (e, docType, isMultiple = false) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true })); 
        setLoadingMsg('กำลังอัปโหลดเอกสารขึ้น Storage...');
        
        try {
            let uploadedUrls = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let mimeType = file.type;
                let downloadUrl = "";

                if (window.dbStorage) {
                    const storageRef = window.dbStorage.ref();
                    const fileName = `sais_documents/${docType}_${Date.now()}_${i}`;

                    if (mimeType.startsWith('image/')) {
                        const base64Data = await utils.compressImage(file);
                        const fileRef = storageRef.child(`${fileName}.jpg`);
                        await fileRef.putString(base64Data, 'data_url');
                        downloadUrl = await fileRef.getDownloadURL();
                    } else if (mimeType === 'application/pdf') {
                        const fileRef = storageRef.child(`${fileName}.pdf`);
                        await fileRef.put(file);
                        downloadUrl = await fileRef.getDownloadURL();
                    } else {
                        setAlertMsg('ระบบรองรับเฉพาะไฟล์รูปภาพและ PDF เท่านั้นครับ');
                        continue;
                    }
                    if (downloadUrl) uploadedUrls.push(downloadUrl);
                } else { throw new Error("ไม่สามารถเชื่อมต่อ Firebase Storage ได้ในขณะนี้"); }
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
                
                setSuccessModal(
                    <div className="text-center">
                        <div className="font-black text-sm mb-1">อัปโหลดไฟล์สำเร็จ!</div>
                        <div className="text-xs text-slate-600">แนบไฟล์จำนวน {uploadedUrls.length} ไฟล์ เรียบร้อยแล้ว</div>
                    </div>
                );
            }
        } catch(err) { 
            console.error(err);
            setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ' + err.message); 
        }
        setLoadingMsg(null); 
        setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    // 📍 10. ระบบ Drag & Drop ทิ้งลงถังขยะ และ ย้ายวัน
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
        setIsDragging(false); setIsTrashHovered(false); setDraggingTask(null);
    };

    const handleTrashDragOver = (e) => { e.preventDefault(); if (!isTrashHovered) setIsTrashHovered(true); };
    const handleTrashDragLeave = (e) => { setIsTrashHovered(false); };

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
                    setLoadingMsg('กำลังลบทิ้ง...');
                    const docId = await findDocIdFallback(task);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).delete();
                    }
                    
                    logActivity('DELETE VIA TRASH', `[ลบรายการด้วย Drag & Drop]\nรายการ: ${task.site_name || task.equipment_no}`);
                    setLoadingMsg(null);
                    
                    setSuccessModal(
                        <div className="text-center">
                            <div className="font-black text-sm mb-1 text-red-600">ทิ้งรายการลงถังขยะสำเร็จ!</div>
                            <div className="text-xs text-slate-600">รายการ: {task.site_name || task.equipment_no}</div>
                        </div>
                    );

                    const isSpecial = String(task.job_type).includes('leave') || String(task.job_type).includes('event') || String(task.job_type).includes('holiday');
                    let logDetail = '';
                    if (isSpecial) {
                        logDetail = `เหตุผล: [ลบรายการ (Drag & Drop)]\nโดย: ${user?.username || 'admin'}\nประเภทงาน: ${task.job_type || '-'}\nวันที่: ${task.date ? formatSafeDate(task.date) : '-'}`;
                    } else {
                        logDetail = `[ลบรายการด้วย Drag & Drop ถังขยะ]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${task.site_name || '-'}\nEq No.: ${task.equipment_no || '-'}`;
                    }
                    apiAction({ action: 'delete_booking', id: docId || task.id, user: user?.username || 'admin', reason: logDetail, job_type: task.job_type, equipment_no: task.equipment_no }, null, true);

                } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการลบทิ้ง: ' + e.message); setLoadingMsg(null); }
            }
        });
    };

    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault(); e.currentTarget.classList.remove('bg-blue-50/60', 'border-2', 'border-blue-400', 'border-dashed');
        if (!isAdmin) return setAlertMsg('เฉพาะแอดมินที่สามารถลากย้ายคิวได้ครับ');
        
        const taskId = e.dataTransfer.getData('taskId');
        const task = draggingTask || db.bookings.find(b => String(b.id) === String(taskId) || String(b.equipment_no) === String(taskId));
        
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
                
                try {
                    setLoadingMsg('กำลังย้ายข้อมูล...');
                    const docId = await findDocIdFallback(task);
                    if (docId && window.dbFirestore) {
                        await window.dbFirestore.collection("bookings").doc(docId).update({ date: targetDate, inspector_name: finalInspector });
                    }
                    
                    logActivity('MOVE BOOKING (Drag Drop)', `[ย้ายคิวงาน]\nรายการ: ${task.site_name || task.equipment_no}\nวันที่: [${oldDate}] ➡️ [${targetDate}]\nผู้ตรวจ: [${oldInspector}] ➡️ [${finalInspector}]`);
                    setLoadingMsg(null);
                    
                    setSuccessModal(
                        <div className="text-center">
                            <div className="font-black text-sm mb-1 text-green-600">ย้ายรายการสำเร็จ!</div>
                            <div className="text-xs text-slate-600 font-bold mb-1">{task.site_name || task.equipment_no}</div>
                            {oldDate !== targetDate && <div className="text-[10px] text-slate-600">วันที่: {oldDate} ➡️ {targetDate}</div>}
                            {oldInspector !== finalInspector && <div className="text-[10px] text-slate-600">ผู้ตรวจ: {oldInspector} ➡️ {finalInspector}</div>}
                        </div>
                    );

                    const logDetail = `[ย้ายคิวงานด้วยวิธีลากวางบนตาราง]\nโดย: ${user?.username || '-'}\nรายการ: ${task.site_name || task.equipment_no}\nวันที่: [${oldDate}] ➡️ [${targetDate}]\nผู้ตรวจ: [${oldInspector}] ➡️ [${finalInspector}]`;
                    apiAction({ 
                        action: 'update_booking', id: docId || task.id, date: targetDate, inspector_name: finalInspector, 
                        user: user?.username || 'admin', reason: logDetail, job_type: task.job_type, equipment_no: task.equipment_no
                    }, null, true);
                } catch(e) { setAlertMsg('เกิดข้อผิดพลาดในการย้าย: ' + e.message); setLoadingMsg(null); }
            }
        });
    };
    // 📍 11. ฟังก์ชันแก้ไขข้อมูลพิเศษ (วันลา วันหยุด กิจกรรม)
    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newTitle = fd.get('site_name'); const newInspector = fd.get('inspector_name'); const newDate = fd.get('date');
        
        try {
            setLoadingMsg('กำลังอัปเดตข้อมูล...');
            if (modal.returnTo) setModal({ type: modal.returnTo }); else setModal(null);
            
            const docId = await findDocIdFallback(modal.data);
            if (docId && window.dbFirestore) {
                await window.dbFirestore.collection("bookings").doc(docId).update({ site_name: newTitle, inspector_name: newInspector, date: newDate });
            }
            
            logActivity('EDIT SPECIAL', `[แก้ไขข้อมูลพิเศษ]\nหัวข้อ: ${newTitle}\nวันที่: ${newDate}\nผู้ตรวจ: ${newInspector}`);
            setLoadingMsg(null);
            
            setSuccessModal(
                <div className="text-center">
                    <div className="font-black text-sm mb-1">อัปเดตข้อมูลสำเร็จ!</div>
                    <div className="text-xs text-slate-600">รายการ: {newTitle}</div>
                    <div className="text-xs text-slate-600">วันที่: {newDate}</div>
                </div>
            );

            const logDetail = `[แก้ไขคิวพิเศษ]\nโดย: ${user?.username}\nเปลี่ยนวันที่เป็น ${newDate}\nผู้ตรวจ: ${newInspector}\nหัวข้อ: ${newTitle}`;
            const payload = { 
                ...modal.data, action: 'update_booking', id: docId || modal.data.id, 
                site_name: newTitle, inspector_name: newInspector, date: newDate, 
                user: user?.username, reason: logDetail, job_type: modal.data.job_type, equipment_no: modal.data.equipment_no 
            };
            apiAction(payload, null, true);
        } catch (e) { console.error(e); setAlertMsg('เกิดข้อผิดพลาด: ' + e.message); setLoadingMsg(null); }
    };

    // 📍 12. ฟังก์ชัน Submit การจองคิวงาน และเพิ่มคิวพิเศษ (The Core Function)
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : (fd.get('area') || areaSelection);
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : (fd.get('product_line') || productLineSelection);
        let finalJobType = fd.get('job_type') || jobTypeSelection;

        const isAdminOverride = fd.get('isAdminOverride') === 'true' || modal?.data?.isAdminOverride === true || (isAdmin && modal?.data?.id);
        const targetInspector = isAdminOverride ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isAdminOverride ? fd.get('admin_date_target') : modal?.data?.date;
        
        const isPastDate = targetDate < todayLocalString;
        if (isPastDate && !isAdmin && modal?.data?.id && quickAddType === 'job') {
            return setAlertMsg('🔒 ไม่อนุญาตให้แก้ไขข้อมูลงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        }

        // กรณีเพิ่มวันหยุด/วันลา/กิจกรรม (ข้ามการเช็ค Validation เอกสาร)
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
                p_eq = `EVENT_${Date.now()}_${eventColor}`;
            } else if (quickAddType === 'holiday') {
                p_jobType = 'public_holiday';
                p_eq = `HLD_${Date.now()}`;
            }

            try {
                setLoadingMsg(`กำลังบันทึกข้อมูล${quickAddType}ลง Firebase...`);
                const newId = modal?.data?.id || (window.SAIS_UTILS?.generateId ? window.SAIS_UTILS.generateId() : Date.now().toString());
                const docId = modal?.data ? await findDocIdFallback(modal.data) || newId : newId;
                setModal(null);
                
                if (window.dbFirestore) {
                    await window.dbFirestore.collection("bookings").doc(String(docId)).set({
                        id: docId, date: targetDate, inspector_name: quickAddType === 'holiday' ? 'SYSTEM_HOLIDAY' : targetInspector,
                        job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, created_by: user?.username, status: 'active'
                    });
                }
                
                logActivity(`CREATE ${quickAddType.toUpperCase()}`, `[บันทึก${quickAddType}]\nวันที่: ${targetDate}\nหัวข้อ: ${p_siteName}\nผู้ตรวจ: ${targetInspector}`);
                setLoadingMsg(null);
                
                setSuccessModal(
                    <div className="text-center">
                        <div className="font-black text-sm mb-1">บันทึกข้อมูลสำเร็จ!</div>
                        <div className="text-xs text-slate-600">รายการ: {p_siteName}</div>
                        <div className="text-xs text-slate-600">วันที่: {targetDate}</div>
                    </div>
                );

                const logDetail = `[บันทึก${quickAddType}]\nโดย: ${user?.username}\nวันที่: ${targetDate}\nหัวข้อ: ${p_siteName}\nผู้ตรวจ: ${targetInspector}`;
                apiAction({ action: 'create_multiple_bookings', dates: [targetDate], inspector_name: quickAddType === 'holiday' ? 'SYSTEM_HOLIDAY' : targetInspector, job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, user: user?.username, reason: logDetail }, null, true);

            } catch(e) { console.error(e); setAlertMsg('ข้อผิดพลาดในการบันทึก: ' + e.message); setLoadingMsg(null); }
            return;
        }

        // กรณีจองคิวงานปกติ (Validation 100%)
        const missingFields = [];
        if (!data.site_name || String(data.site_name).trim() === '') missingFields.push('• ชื่อโครงการ / รายการ');
        if (!data.equipment_no || String(data.equipment_no).trim() === '') missingFields.push('• หมายเลข Eq No.');
        if (!data.unit_no || String(data.unit_no).trim() === '') missingFields.push('• หมายเลข Unit');
        if (!finalProductLine || finalProductLine === '' || finalProductLine === 'ไม่ระบุ') missingFields.push('• Product Line');
        if (!finalJobType || finalJobType === '') missingFields.push('• ประเภทงาน (Job Type)');
        if (!finalArea || finalArea === '' || finalArea === 'ไม่ระบุ') missingFields.push('• พื้นที่หน้างาน');
        if (!targetDate) missingFields.push('• วันที่ต้องการจอง (Date)');
        if (!targetInspector) missingFields.push('• ผู้ตรวจ (Inspector)');
        if (!isAdmin && (!data.tel || String(data.tel).trim() === '')) missingFields.push('• เบอร์โทรศัพท์ติดต่อหน้างาน');

        if (missingFields.length > 0) {
            return setAlertMsg(`❌ กรุณากรอกข้อมูลในช่องต่อไปนี้ให้ครบถ้วน:\n\n${missingFields.join('\n')}`);
        }

        if (!isAdmin && !/^\d{10}$/.test(data.tel)) return setAlertMsg('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก (เฉพาะตัวเลข)');
        if (isAdmin && data.tel && !/^\d{10}$/.test(data.tel)) return setAlertMsg('เบอร์โทรศัพท์ต้องมี 10 หลัก (หรือเว้นว่างไว้)');

        const missingDocs = [];
        if (!(docUrls.layout || modal?.data?.layout_img)) missingDocs.push('• เอกสาร Layout');
        if (!(docUrls.wiring || modal?.data?.wiring_img)) missingDocs.push('• เอกสาร Wiring');
        if (!(docUrls.precheck || modal?.data?.precheck_img)) missingDocs.push('• เอกสาร Precheck');
        
        if (!(docUrls.site_cond_1 || modal?.data?.site_cond_1)) missingDocs.push('• รูปถ่ายจุดที่ 1. หน้าตู้คอนโทรล');
        if (!(docUrls.site_cond_2 || modal?.data?.site_cond_2)) missingDocs.push('• รูปถ่ายจุดที่ 2. บนหลังคาลิฟต์');
        if (!(docUrls.site_cond_3 || modal?.data?.site_cond_3)) missingDocs.push('• รูปถ่ายจุดที่ 3. ด้านบนปล่อง');
        if (!(docUrls.site_cond_4 || modal?.data?.site_cond_4)) missingDocs.push('• รูปถ่ายจุดที่ 4. ก้นบ่อลิฟต์');
        if (!(docUrls.site_cond_5 || modal?.data?.site_cond_5)) missingDocs.push('• รูปถ่ายจุดที่ 5. ภายในตู้ลิฟต์');
        if (!(docUrls.site_cond_6 || modal?.data?.site_cond_6)) missingDocs.push('• รูปถ่ายจุดที่ 6. หน้าชั้นและรอบวงกบประตูนอก');

        if (missingDocs.length > 0 && !isAdmin) {
            return setAlertMsg(`❌ กรุณาแนบเอกสารและรูปภาพหน้างานให้ครบ 100%\nขาดรายการดังนี้:\n\n${missingDocs.join('\n')}`);
        }

        if (Object.values(uploadingDoc).some(status => status === true)) {
            return setAlertMsg('⏳ ระบบกำลังอัปโหลดไฟล์...\nกรุณารอให้ระบบอัปโหลดไฟล์เสร็จสมบูรณ์ 100% ก่อนกดยืนยันครับ');
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

        const jStart = fd.get('job_start_time'); const jEnd = fd.get('job_end_time');
        if (jStart && jEnd && jStart >= jEnd) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
        let finalSiteName = data.site_name;
        if (jStart && jEnd) finalSiteName = `${jStart}-${jEnd} ${finalSiteName}`;

        const bookingId = modal?.data?.id || (window.SAIS_UTILS?.generateId ? window.SAIS_UTILS.generateId() : Date.now().toString());
        const docId = modal?.data ? await findDocIdFallback(modal.data) || bookingId : bookingId;

        const payload = {
            ...data, site_name: finalSiteName, tel: String(data.tel || ''), area: finalArea, job_type: finalJobType, product_line: finalProductLine,
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
            setLoadingMsg(modal?.data?.id ? 'กำลังอัปเดตข้อมูลลง Firebase...' : 'กำลังบันทึกคิวงานลง Firebase...');
            
            if (window.dbFirestore) {
                await window.dbFirestore.collection("bookings").doc(String(docId)).set({ ...payload, status: 'active' });
            }
            
            logActivity(modal?.data?.id ? 'UPDATE BOOKING' : 'CREATE BOOKING', getDiffLog(modal?.data?.id ? modal.data : null, payload, user?.username));
            setLoadingMsg(null);
            
            setSuccessModal(
                <div className="text-center">
                    <div className="font-black text-sm mb-1">{modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!'}</div>
                    <div className="text-xs text-slate-600 font-bold mb-1">{finalSiteName}</div>
                    <div className="text-[10px] text-slate-600">วันที่: {targetDate}</div>
                    <div className="text-[10px] text-slate-600">ผู้ตรวจ: {targetInspector}</div>
                </div>
            );
            
            if (isAdmin && !modal?.data?.id && fd.get('keep_open')) {
                e.target.equipment_no.value = '';
                if (e.target.unit_no) e.target.unit_no.value = '';
                e.target.equipment_no.focus(); 
            } else {
                setModal(null);
                setAreaSelection(''); setJobTypeSelection(''); setProductLineSelection(''); setLiveMapUrl('');
                setDocUrls({ layout: '', wiring: '', precheck: '', site_cond_1: '', site_cond_2: '', site_cond_3: '', site_cond_4: '', site_cond_5: '', site_cond_6: '' });
            }

            const finalPayload = { ...payload, action: modal?.data?.id ? 'update_booking' : 'create_booking', reason: getDiffLog(modal?.data?.id ? modal.data : null, payload, user?.username) };
            apiAction(finalPayload, null, true);
        } catch(e) { console.error(e); setAlertMsg('เกิดข้อผิดพลาดในการบันทึก: ' + e.message); setLoadingMsg(null); }
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
    // 📍 14. หน้าจอ Login (ระบบ Hybrid: Google Sheets รับหน้าที่ตรวจสอบ User)
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
                            <p className="text-sm text-slate-600 mb-6 whitespace-pre-line text-left">{alertMsg}</p>
                            <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform">ตกลง</button>
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
                                            <li>เพื่อความปลอดภัยของข้อมูลโครงการ คิวงานจะถูกจัดการภายในเท่านั้น</li>
                                            <li>ผู้ใช้งานใหม่ต้อง <span className="font-bold text-red-600">ติดต่อ Admin ประจำแผนก</span> เพื่อขอรับ Username และ Password</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">2. การเข้าสู่ระบบ (Login)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>ใช้ รหัสพนักงาน หรือ Username ที่ได้รับจากแอดมิน</li>
                                            <li>ระบบจะจดจำการเข้าระบบไว้ 24 ชั่วโมง</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">3. ลืมรหัสผ่าน (Forgot Password)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>แจ้ง Admin เพื่อทำการตั้งค่ารหัสผ่านให้ใหม่จากระบบหลังบ้าน</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[13px] block mb-1">4. ระดับสิทธิ์ผู้ใช้งาน (Roles)</span>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li><b>Viewer:</b> จองคิวงาน, ดูตาราง, แนบเอกสารหน้างาน</li>
                                            <li><b>Inspector:</b> ดูคิวงานของตนเอง, อัปโหลด Site Conditions</li>
                                            <li><b>Admin:</b> จัดการวันหยุด, ตรวจเอกสาร, จัดการผู้ใช้</li>
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
                                    <button type="button" onClick={() => setShowLoginHelp(true)} className="text-xs font-bold text-blue-600 hover:underline mb-3 block w-full">คลิกที่นี่ หากไม่มีบัญชีการใช้งาน / คู่มือ</button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    if (!isFirebaseReady) return <div className="h-screen w-full flex items-center justify-center flex-col gap-4 p-8 text-center"><Icons.Loader /><h2 className="text-xl font-bold text-slate-800">กำลังเตรียมระบบฐานข้อมูล...</h2></div>;

    // 📍 15. MAIN UI LAYOUT
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
                    <div className="bg-white w-[85%] max-w-[280px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-4 border-green-400">
                        <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3"><Icons.Check /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">สำเร็จ</h3>
                        {typeof successModal === 'string' ? <p className="text-sm text-slate-600">{successModal}</p> : successModal}
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
                    <button className="btn-icon relative" onClick={() => setShowActivityModal(true)}>
                        <Icons.Bell />{unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                    </button>
                    <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <Icons.User /> {user.username}
                    </div>
                </div>
            </header>

            {/* 📍 แถบเมนูด้านล่าง (Bottom Nav) ล็อคติดล่างเสมอ */}
            <div className="bottom-nav">
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => handleTabChange('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {user && !isAdmin && user.role !== 'viewer' && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => handleTabChange('my_bookings')}><Icons.List /> งานฉัน</div>}
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
                        <div className="flex justify-between items-center mb-4 gap-2">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap"><Icons.Search /> ค้นหา</h2>
                            <div className="flex gap-2 w-full justify-end">
                                <select className="text-[11px] border border-slate-300 rounded-lg p-2 bg-white outline-none w-24 shadow-sm font-bold text-slate-600" value={filterArea} onChange={(e) => setFilterArea(e.target.value)}>
                                    <option value="All">ทุกพื้นที่</option><option value="กรุงเทพและปริมณฑล">กทม.</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option>
                                </select>
                                <select className="text-[11px] border border-slate-300 rounded-lg p-2 bg-white outline-none w-28 shadow-sm font-bold text-slate-600" value={searchInspector} onChange={(e) => setSearchInspector(e.target.value)}>
                                    <option value="All">ทุกผู้ตรวจ</option>
                                    {(db.inspectors || []).map(ins => (
                                        <option key={ins.name} value={ins.name}>{ins.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-3 shadow-sm focus-within:border-blue-400 transition-colors">
                            <div className="text-slate-400 mr-2"><Icons.Search /></div>
                            <input type="text" placeholder="พิมพ์ Eq No., โครงการ (5 หลักขึ้นไป)..." className="w-full text-sm outline-none border-none bg-transparent font-bold text-slate-700" value={localSearchQuery} onChange={(e) => setLocalSearchQuery(e.target.value)} autoFocus />
                            {localSearchQuery && <button onClick={() => { setLocalSearchQuery(''); setSearchQuery(''); }} className="text-slate-400 p-1 bg-slate-100 rounded-full"><Icons.X /></button>}
                        </div>
                    </div>
                    <div className="space-y-3 pb-10">
                        {!hasLoadedAdmin && isAdmin ? (
                             <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4"><Icons.Loader /> กำลังโหลดฐานข้อมูลทั้งหมด...</div>
                        ) : searchQuery.trim() === '' && filterArea === 'All' && searchInspector === 'All' ? (
                            <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">เลือกพื้นที่, เลือกผู้ตรวจ หรือพิมพ์ข้อมูลเพื่อเริ่มค้นหา...</div>
                        ) : searchQuery.trim().length > 0 && searchQuery.trim().length < 5 ? (
                            <div className="text-center text-amber-600 p-8 border-2 border-dashed border-amber-300 bg-amber-50 rounded-xl mt-4">
                                <span className="text-2xl mb-2 block">⚠️</span>
                                กรุณาพิมพ์ตัวอักษรหรือตัวเลขอย่างน้อย <b className="text-amber-700">5 หลัก</b><br/>เพื่อเริ่มการค้นหาด้วยข้อความ...
                            </div>
                        ) : (
                            (() => {
                                const searchResults = ((isAdmin ? adminDb.all_bookings : db.bookings) || []).filter(b => {
                                    if (String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;
                                    if (String(b.status) === 'cancelled') return false;
                                    
                                    const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
                                    const matchInspector = searchInspector === 'All' ? true : String(b.inspector_name || '') === searchInspector;
                                    
                                    let matchSearch = true;
                                    if (searchQuery.trim().length >= 5) {
                                        const s = searchQuery.toLowerCase();
                                        matchSearch = String(b.equipment_no || '').toLowerCase().includes(s) || 
                                                      String(b.site_name || '').toLowerCase().includes(s) || 
                                                      String(b.inspector_name || '').toLowerCase().includes(s);
                                    }

                                    return matchArea && matchInspector && matchSearch;
                                }).sort((a, b) => new Date(b.date) - new Date(a.date));
                                
                                if (searchResults.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">ไม่พบข้อมูลที่ตรงกับการค้นหา</div>;
                                
                                return searchResults.slice(0, 50).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-blue-400 transition-all" onClick={() => setModal({ type: 'detail', data: h })}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 whitespace-nowrap">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mt-2 border border-slate-100">
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
            {/* 4. หน้างานของฉัน (สำหรับ User และ Inspector) */}
            {currentView === 'my_bookings' && !isAdmin && user?.role !== 'viewer' && (
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
                                    <li><b>⏳ คิวรอตรวจ:</b> แสดงคิวงานที่ถูกจองชื่อคุณไว้ แต่แอดมินยังตรวจเอกสาร (Layout/Wiring/Precheck) ไม่ครบ 100%</li>
                                    <li><b>✅ เอกสารครบแล้ว:</b> งานที่พร้อมดำเนินการ (แอดมินยืนยันเอกสารครบแล้ว)[span_0](start_span)[span_0](end_span)</li>
                                    <li><b>🌴 วันลาของฉัน:</b> จัดการวันหยุดพักผ่อน, ลาป่วย, ลากิจ ของคุณได้เองที่แท็บนี้[span_1](start_span)[span_1](end_span)</li>
                                </ul>
                            ) : (
                                <ul className="list-disc pl-4 space-y-1.5 text-slate-200">
                                    <li><b>⏳ รอดำเนินการ:</b> คิวงานที่คุณกดจองไว้ และระบบกำลังรอให้ Admin ทำการตรวจสอบเอกสารแนบของคุณ[span_2](start_span)[span_2](end_span)</li>
                                    <li><b>✅ อนุมัติแล้ว:</b> คิวงานที่ Admin ตรวจตรวจสอบเอกสารครบถ้วนแล้ว (คิวสมบูรณ์)[span_3](start_span)[span_3](end_span)</li>
                                    <li><b>แก้ไข/ยกเลิก:</b> กดปุ่มจุดสามจุด (⋮) มุมขวาบนของการ์ด เพื่อแก้ไขรายละเอียด หรือยกเลิกคิวงาน <span className="text-red-400">(เฉพาะคิวที่ยังไม่ถึงวันตรวจจริง)</span>[span_4](start_span)[span_4](end_span)</li>
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

            {/* 5. หน้า Dashboard */}
            {currentView === 'dashboard' && (
                <div className="page-view relative pb-20 animate-pop">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.PieChart /> ภาพรวมระบบ (Dashboard)</h2>
                        <p className="text-xs text-slate-500 mt-1">วิเคราะห์ข้อมูลเชิงลึกและสถิติการทำงานในระบบทั้งหมด</p>
                    </div>

                    {!isAdmin && !hasLoadedAdmin ? (
                        <div className="text-center text-slate-400 p-10 flex flex-col items-center justify-center gap-4">
                            <Icons.Loader /> กำลังประมวลผลข้อมูลสถิติ...
                        </div>
                    ) : (
                        <div className="space-y-4 pb-10">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-1">ปี (Year)</label>
                                    <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 font-bold outline-none text-slate-700" value={dashYear} onChange={e=>setDashYear(e.target.value)}>
                                        <option value="All">ทุกปี</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-1">เดือน (Month)</label>
                                    <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 font-bold outline-none text-slate-700" value={dashMonth} onChange={e=>setDashMonth(e.target.value)}>
                                        <option value="All">ทุกเดือน</option><option value="1">มกราคม</option><option value="2">กุมภาพันธ์</option><option value="3">มีนาคม</option><option value="4">เมษายน</option><option value="5">พฤษภาคม</option><option value="6">มิถุนายน</option><option value="7">กรกฎาคม</option><option value="8">สิงหาคม</option><option value="9">กันยายน</option><option value="10">ตุลาคม</option><option value="11">พฤศจิกายน</option><option value="12">ธันวาคม</option>
                                    </select>
                                </div>
                            </div>

                            {(() => {
                                const sourceData = isAdmin ? (adminDb.all_bookings || []) : (db.bookings || []);
                                const allTasks = sourceData.filter(b => {
                                    if (String(b.status) === 'cancelled') return false;
                                    if (['leave', 'company_event', 'public_holiday'].includes(String(b.job_type).toLowerCase())) return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_') || String(b.equipment_no).startsWith('HLD_')) return false;
                                    const d = b.date ? new Date(b.date) : null;
                                    if (!d || isNaN(d.getTime())) return false;
                                    if (dashYear !== 'All' && d.getFullYear().toString() !== dashYear) return false;
                                    if (dashMonth !== 'All' && (d.getMonth() + 1).toString() !== dashMonth) return false;
                                    return true;
                                });
                                const totalJobs = allTasks.length;
                                const docStats = allTasks.reduce((acc, task) => {
                                    const isComplete = String(task.layout_doc)==='true' && String(task.wiring_doc)==='true' && String(task.precheck_doc)==='true';
                                    if (isComplete) acc.complete++; else acc.pending++;
                                    return acc;
                                }, { complete: 0, pending: 0 });
                                const successRate = totalJobs > 0 ? Math.round((docStats.complete / totalJobs) * 100) : 0;

                                return (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-sm text-white">
                                            <div className="text-[10px] font-bold text-blue-100 mb-1">คิวงานตามเงื่อนไข</div>
                                            <div className="text-3xl font-black">{totalJobs} <span className="text-xs font-normal opacity-80">งาน</span></div>
                                        </div>
                                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 rounded-2xl shadow-sm text-white relative overflow-hidden">
                                            <div className="text-[10px] font-bold text-emerald-100 mb-1">อัตราเอกสารผ่าน</div>
                                            <div className="text-3xl font-black">{successRate}%</div>
                                            <div className="text-[9px] font-normal opacity-80 mt-1">({docStats.complete} จาก {totalJobs} งาน)</div>
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>
                    )}
                </div>
            )}

            {/* 6. หน้า Admin Panel */}
            {currentView === 'admin' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Shield /> Admin Panel</h2>
                            <div className="flex gap-2">
                                <button onClick={handleMigrateToFirestore} className="text-[11px] font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg shadow-sm">🔥 ย้ายเข้า Firebase</button>
                                {adminTab !== 'menu' && <button onClick={() => setAdminTab('menu')} className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border">กลับเมนู</button>}
                            </div>
                        </div>
                    </div>

                    {adminTab === 'menu' && (
                        <div className="grid grid-cols-2 gap-4 animate-pop pb-10">
                            <button onClick={() => setAdminTab('users')} className="p-5 bg-white rounded-2xl shadow-sm border flex flex-col items-center gap-2"><Icons.User /><span className="font-bold text-sm">จัดการผู้ใช้งาน</span></button>
                            <button onClick={() => setAdminTab('inspectors')} className="p-5 bg-white rounded-2xl shadow-sm border flex flex-col items-center gap-2"><Icons.FileCheck /><span className="font-bold text-sm">ผู้ตรวจ & Certificate</span></button>
                            <button onClick={() => setAdminTab('special_management')} className="p-5 bg-white rounded-2xl shadow-sm border flex flex-col items-center gap-2 col-span-2"><Icons.Clock /><span className="font-bold text-sm text-amber-800">จัดการวันกิจกรรม/วันลา/วันหยุด</span></button>
                            <button onClick={() => setAdminTab('all_bookings')} className="p-5 bg-white rounded-2xl shadow-sm border flex flex-col items-center gap-2 col-span-2"><Icons.List /><span className="font-bold text-sm">งานทั้งหมดในระบบ</span></button>
                            <button onClick={() => setAdminTab('web_settings')} className="p-5 bg-white rounded-2xl shadow-sm border flex flex-col items-center gap-2 col-span-2"><Icons.Settings /><span className="font-bold text-sm">ตั้งค่าสีเว็บไซต์ / ตาราง</span></button>
                        </div>
                    )}

                    {adminTab === 'web_settings' && (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const fd = new FormData(e.target);
                            const settingsObj = Object.fromEntries(fd);
                            try {
                                setLoadingMsg('กำลังบันทึกการตั้งค่า...');
                                if (window.dbFirestore) await window.dbFirestore.collection("settings").doc("web_settings").set(settingsObj);
                                setLoadingMsg(null);
                                setSuccessModal('บันทึกการตั้งค่าสำเร็จ');
                            } catch(err) { setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาด: ' + err.message); }
                        }} className="bg-white p-5 rounded-2xl border space-y-4">
                            <div><label className="text-xs font-bold block mb-1">ชื่อระบบ (App Name)</label><input type="text" name="appName" defaultValue={db.settings?.appName || 'SAIS BOOKING'} className="w-full p-2.5 border rounded-lg text-sm font-bold bg-slate-50" /></div>
                            <div className="grid grid-cols-3 gap-2">
                                <div><label className="text-[10px] font-bold block mb-1">สี Header</label><input type="color" name="headerBg" defaultValue={db.settings?.headerBg || '#1e293b'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                <div><label className="text-[10px] font-bold block mb-1">สีข้อความ Header</label><input type="color" name="headerText" defaultValue={db.settings?.headerText || '#ffffff'} className="w-full h-10 border rounded cursor-pointer" /></div>
                                <div><label className="text-[10px] font-bold block mb-1">สีพื้นหลัง App</label><input type="color" name="appBg" defaultValue={db.settings?.appBg || '#f8fafc'} className="w-full h-10 border rounded cursor-pointer" /></div>
                            </div>
                            <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-md">บันทึกการตั้งค่า</button>
                        </form>
                    )}

                    {adminTab === 'users' && (
                        <div className="space-y-3 pb-10">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-slate-800 text-sm">ผู้ใช้งานทั้งหมด ({(adminDb.users || []).length})</h3>
                                <button onClick={() => setModal({ type: 'edit_user', isNew: true, data: { username: '', full_name: '', department: '', position: '', phone: '', role: 'user', status: 'approved' } })} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"><Icons.Plus /> สร้างผู้ใช้งาน</button>
                            </div>
                            {(adminDb.users || []).map((u, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <div><span className="font-bold text-slate-800 text-sm">{u.username}</span> <span className="text-[10px] text-slate-500">({u.full_name || '-'})</span></div>
                                        <span className="text-[10px] font-bold text-emerald-600">{u.status}</span>
                                    </div>
                                    <div className="flex gap-2 pt-2 border-t">
                                        <button onClick={() => setModal({ type: 'edit_user', isNew: false, data: u })} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold border">แก้ไข/เปลี่ยนสิทธิ์</button>
                                        <button onClick={() => {
                                            setConfirmDialog({
                                                msg: `ยืนยันลบผู้ใช้ ${u.username}?`,
                                                onConfirm: async () => {
                                                    setConfirmDialog(null);
                                                    if (window.dbFirestore) await window.dbFirestore.collection("users").doc(u.username).delete();
                                                    setSuccessModal('ลบผู้ใช้สำเร็จ');
                                                }
                                            });
                                        }} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold border">ลบ</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {adminTab === 'inspectors' && (
                        <div className="space-y-3 pb-10">
                            <button onClick={() => setModal({ type: 'inspector_form' })} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md mb-4 flex items-center justify-center gap-2"><Icons.UserPlus /> เพิ่มผู้ตรวจใหม่</button>
                            {(db.inspectors || []).map((ins, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                                    <div><div className="font-black text-slate-800">{ins.name}</div><div className="text-[10px] text-slate-500">เซอร์: {ins.product_lines || 'ค่าเริ่มต้น'}</div></div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setModal({ type: 'inspector_form', data: ins })} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Icons.Edit /></button>
                                        <button onClick={() => {
                                            setConfirmDialog({
                                                msg: `ยืนยันลบผู้ตรวจ ${ins.name}?`,
                                                onConfirm: async () => {
                                                    setConfirmDialog(null);
                                                    if (window.dbFirestore) await window.dbFirestore.collection("inspectors").doc(ins.name).delete();
                                                    setSuccessModal('ลบผู้ตรวจสำเร็จ');
                                                }
                                            });
                                        }} className="p-2 bg-red-50 text-red-600 rounded-lg"><Icons.Trash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {adminTab === 'special_management' && (
                        <div className="space-y-4 pb-10">
                            <button onClick={() => setModal({ type: 'manage_leaves' })} className="w-full p-4 bg-white rounded-2xl border font-bold text-amber-800 flex justify-between items-center">จัดการวันลาพนักงาน <Icons.ChevronRight /></button>
                            <button onClick={() => setModal({ type: 'manage_events' })} className="w-full p-4 bg-white rounded-2xl border font-bold text-emerald-800 flex justify-between items-center">จัดการกิจกรรมบริษัท <Icons.ChevronRight /></button>
                            <button onClick={() => setModal({ type: 'manage_holidays' })} className="w-full p-4 bg-white rounded-2xl border font-bold text-red-800 flex justify-between items-center">จัดการวันหยุดบริษัท <Icons.ChevronRight /></button>
                        </div>
                    )}

                    {adminTab === 'all_bookings' && (
                        <div className="space-y-3 pb-10">
                            {(adminDb.all_bookings || []).slice(0, adminBookingsLimit).map((h, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-sm text-slate-800">{h.site_name}</div>
                                        <div className="text-[10px] text-slate-500">Eq: {h.equipment_no} | วันที่: {formatSafeDate(h.date)} | ผู้ตรวจ: {h.inspector_name}</div>
                                    </div>
                                    <button onClick={() => handleCancelBooking(h)} className="p-2 bg-red-50 text-red-600 rounded-lg"><Icons.Trash /></button>
                                </div>
                            ))}
                            {adminBookingsLimit < (adminDb.all_bookings || []).length && (
                                <button onClick={() => setAdminBookingsLimit(prev => prev + 20)} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl mt-4">โหลดเพิ่มเติม</button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* =========================================
                MODALS
            ========================================= */}
            {modal && (
                <div className="backdrop z-[100] p-4 flex items-center justify-center">
                    {modal?.type === 'booking' && (
                        <div className="modal-card w-full max-w-[450px] bg-white rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">📝 จองคิวงานตรวจ</h3>
                            <form onSubmit={handleBookingSubmit} className="space-y-3">
                                <div><label className="text-xs font-bold block mb-1">ชื่อโครงการ *</label><input type="text" name="site_name" required className="w-full p-2.5 border rounded-lg text-sm font-bold" /></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold block mb-1">Eq No. *</label><input type="text" name="equipment_no" required className="w-full p-2.5 border rounded-lg text-sm font-bold" /></div>
                                    <div><label className="text-xs font-bold block mb-1">Unit No. *</label><input type="text" name="unit_no" required className="w-full p-2.5 border rounded-lg text-sm font-bold" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-bold block mb-1">Product Line *</label>
                                        <select name="product_line" value={productLineSelection} onChange={e=>setProductLineSelection(e.target.value)} required className="w-full p-2.5 border rounded-lg text-sm bg-white">
                                            <option value="">--เลือก--</option>
                                            {Object.keys(PRODUCT_COLORS).map(k => <option key={k} value={k}>{k}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold block mb-1">ประเภทงาน *</label>
                                        <select name="job_type" value={jobTypeSelection} onChange={e=>setJobTypeSelection(e.target.value)} required className="w-full p-2.5 border rounded-lg text-sm bg-white">
                                            <option value="">--เลือก--</option>
                                            <option value="New">New</option><option value="MOD">MOD</option><option value="Re-ins temporary power supply">Re-ins temporary</option>
                                        </select>
                                    </div>
                                </div>
                                <div><label className="text-xs font-bold block mb-1">เบอร์โทรติดต่อ *</label><input type="tel" name="tel" required maxLength="10" placeholder="08XXXXXXXX" className="w-full p-2.5 border rounded-lg text-sm font-bold" /></div>
                                <div className="bg-slate-50 p-3 rounded-xl border space-y-2">
                                    <div className="text-xs font-bold">อัปโหลดเอกสาร (Layout, Wiring, Precheck) *</div>
                                    {['layout', 'wiring', 'precheck'].map(doc => (
                                        <label key={doc} className="flex justify-between items-center p-2 bg-white border rounded cursor-pointer text-xs font-bold">
                                            <span>{doc} {docUrls[doc] && '✅'}</span>
                                            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, doc)} />
                                        </label>
                                    ))}
                                </div>
                                <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md mt-4">ยืนยันการจองคิว</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'edit_user' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">แก้ไขข้อมูลผู้ใช้</h3>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                if (window.dbFirestore) {
                                    await window.dbFirestore.collection("users").doc(modal.data.username).update({
                                        full_name: fd.get('full_name'), role: fd.get('role'), status: fd.get('status'), inspector_mapped_name: fd.get('inspector_mapped_name') || ''
                                    });
                                    setSuccessModal('อัปเดตผู้ใช้สำเร็จ'); setModal(null);
                                }
                            }} className="space-y-3">
                                <div><label className="text-xs font-bold block mb-1">ชื่อ-นามสกุล</label><input type="text" name="full_name" defaultValue={modal.data.full_name} required className="w-full p-2.5 border rounded-lg text-sm" /></div>
                                {modal.data.role === 'inspector' && (
                                    <div>
                                        <label className="text-xs font-bold text-amber-800 block mb-1">🔗 ผูกชื่อในตาราง (Mapping Name)</label>
                                        <select name="inspector_mapped_name" defaultValue={modal.data.inspector_mapped_name || ''} className="w-full p-2.5 border rounded-lg bg-white font-bold">
                                            <option value="">-- ไม่ได้ผูกชื่อ --</option>
                                            {availableInspectors.map(ins => <option key={ins.name} value={ins.name}>{ins.name}</option>)}
                                        </select>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold block mb-1">สิทธิ์ (Role)</label><select name="role" defaultValue={modal.data.role} className="w-full p-2.5 border rounded-lg bg-white font-bold"><option value="user">User</option><option value="inspector">Inspector</option><option value="admin">Admin</option></select></div>
                                    <div><label className="text-xs font-bold block mb-1">สถานะ</label><select name="status" defaultValue={modal.data.status} className="w-full p-2.5 border rounded-lg bg-white font-bold"><option value="approved">อนุมัติ</option><option value="pending">รอตรวจสอบ</option><option value="blocked">ระงับ</option></select></div>
                                </div>
                                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md mt-4">บันทึก</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'inspector_form' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">จัดการผู้ตรวจ</h3>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const name = fd.get('ins_name');
                                const certs = Array.from(e.target.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value).join(',');
                                if (window.dbFirestore) {
                                    await window.dbFirestore.collection("inspectors").doc(String(name)).set({ name: name, product_lines: certs });
                                    setSuccessModal('บันทึกผู้ตรวจสำเร็จ'); setModal(null);
                                }
                            }} className="space-y-3">
                                <input type="text" name="ins_name" defaultValue={modal.data?.name || ''} required placeholder="ชื่อผู้ตรวจ..." className="w-full p-3 border rounded-xl font-bold" />
                                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded-xl">
                                    {Object.keys(PRODUCT_COLORS).filter(k => k !== 'อื่นๆโปรดระบุ').map(pl => (
                                        <label key={pl} className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" name="certs" value={pl} defaultChecked={modal.data?.product_lines?.includes(pl)} className="w-4 h-4" /> {pl}</label>
                                    ))}
                                </div>
                                <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md">บันทึก</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'admin_cell_action' && (
                        <div className="modal-card p-6 text-center animate-pop w-full max-w-sm bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-3">จัดการคิวตรวจ / วันพิเศษ</h3>
                            <p className="text-sm text-slate-500 mb-5 bg-slate-50 p-3 rounded-xl border">วันที่: <span className="font-bold text-blue-600">{modal.data.date}</span><br/>ผู้ตรวจ: <span className="font-bold text-blue-600">{modal.data.inspector_name}</span></p>
                            <div className="space-y-3">
                                <button onClick={() => setModal({ type: 'booking', data: modal.data })} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md"><Icons.Plus /> จองคิวตรวจ</button>
                                <button onClick={() => setModal({ type: 'manage_events' })} className="w-full py-3.5 bg-emerald-500 text-white font-bold rounded-xl shadow-md"><Icons.Star /> เพิ่มกิจกรรม</button>
                                <button onClick={() => setModal({ type: 'manage_leaves' })} className="w-full py-3.5 bg-amber-500 text-white font-bold rounded-xl shadow-md"><Icons.User /> จองวันลา</button>
                                <button onClick={() => setModal({ type: 'manage_holidays' })} className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-md"><Icons.CalendarX /> เพิ่มวันหยุด</button>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'detail' && (
                        <div className="modal-card p-6 w-full max-w-md animate-pop bg-white rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                            <div className="space-y-2 text-sm text-slate-700 mb-4">
                                <div><b>วันที่:</b> {formatSafeDate(modal.data.date)}</div>
                                <div><b>ผู้ตรวจ:</b> {modal.data.inspector_name}</div>
                                <div><b>ชื่อโครงการ:</b> {modal.data.site_name}</div>
                                {modal.data.equipment_no && <div><b>Eq No:</b> {modal.data.equipment_no}</div>}
                                {modal.data.map_link && <button onClick={() => handleMapClick(modal.data.map_link)} className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-xl border mt-2">📍 เปิดแผนที่นำทาง</button>}
                            </div>
                            {(isAdmin || user?.username === modal.data.created_by) && (
                                <button onClick={() => handleCancelBooking(modal.data)} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200">ลบรายการนี้</button>
                            )}
                        </div>
                    )}

                    {modal?.type === 'manage_leaves' && (
                        <div className="modal-card w-full max-w-md bg-white rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-amber-600">จัดการวันลาพนักงาน</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold block mb-1">เริ่ม</label><input type="date" value={leaveStartDate} onChange={e=>setLeaveStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                    <div><label className="text-xs font-bold block mb-1">ถึง</label><input type="date" value={leaveEndDate} onChange={e=>setLeaveEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                </div>
                                <select className="w-full p-2.5 border rounded-lg font-bold text-sm" value={leaveType} onChange={e=>setLeaveType(e.target.value)}>
                                    <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option>
                                </select>
                                <button onClick={async () => {
                                    if(!leaveStartDate || !leaveEndDate) return setAlertMsg('กรุณากรอกวันที่ให้ครบถ้วน');
                                    setLoadingMsg('กำลังบันทึกวันลา...');
                                    if (window.dbFirestore) {
                                        const batch = window.dbFirestore.batch();
                                        const targets = (db.inspectors || []).map(i => i.name);
                                        for(let target of targets) {
                                            for(let date of leaveDates) {
                                                const newId = Date.now().toString() + Math.random();
                                                batch.set(window.dbFirestore.collection("bookings").doc(newId), {
                                                    id: newId, date: date, inspector_name: target, job_type: 'leave', site_name: leaveType, equipment_no: `LEAVE_${Date.now()}`, status: 'active'
                                                });
                                            }
                                        }
                                        await batch.commit();
                                    }
                                    setLoadingMsg(null); setSuccessModal('บันทึกวันลาสำเร็จ'); setModal(null);
                                }} className="w-full py-3.5 bg-amber-500 text-white font-bold rounded-xl shadow-md">บันทึกวันลา</button>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_events' && (
                        <div className="modal-card w-full max-w-md bg-white rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-emerald-600">จัดการกิจกรรมบริษัท</h3>
                            <div className="space-y-3">
                                <input type="text" id="event_name_input" placeholder="ชื่อกิจกรรม..." className="w-full p-3 border rounded-xl font-bold text-sm" />
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold block mb-1">เริ่ม</label><input type="date" value={eventStartDate} onChange={e=>setEventStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                    <div><label className="text-xs font-bold block mb-1">ถึง</label><input type="date" value={eventEndDate} onChange={e=>setEventEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                </div>
                                <button onClick={async () => {
                                    const eName = document.getElementById('event_name_input').value;
                                    if(!eName || !eventStartDate || !eventEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
                                    setLoadingMsg('กำลังสร้างกิจกรรม...');
                                    if (window.dbFirestore) {
                                        const batch = window.dbFirestore.batch();
                                        for(let date of eventDates) {
                                            const newId = Date.now().toString() + Math.random();
                                            batch.set(window.dbFirestore.collection("bookings").doc(newId), {
                                                id: newId, date: date, inspector_name: 'SYSTEM_EVENT', job_type: 'company_event', site_name: eName, equipment_no: `EVENT_${Date.now()}`, status: 'active'
                                            });
                                        }
                                        await batch.commit();
                                    }
                                    setLoadingMsg(null); setSuccessModal('สร้างกิจกรรมสำเร็จ'); setModal(null);
                                }} className="w-full py-3.5 bg-emerald-500 text-white font-bold rounded-xl shadow-md">สร้างกิจกรรม</button>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_holidays' && (
                        <div className="modal-card w-full max-w-md bg-white rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-red-600">จัดการวันหยุดบริษัท</h3>
                            <div className="space-y-3">
                                <input type="text" id="holiday_name_input" placeholder="ชื่อวันหยุด..." className="w-full p-3 border rounded-xl font-bold text-sm" />
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs font-bold block mb-1">เริ่ม</label><input type="date" value={holidayStartDate} onChange={e=>setHolidayStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                    <div><label className="text-xs font-bold block mb-1">ถึง</label><input type="date" value={holidayEndDate} onChange={e=>setHolidayEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                </div>
                                <button onClick={async () => {
                                    const hName = document.getElementById('holiday_name_input').value;
                                    if(!hName || !holidayStartDate || !holidayEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
                                    setLoadingMsg('กำลังสร้างวันหยุด...');
                                    if (window.dbFirestore) {
                                        const batch = window.dbFirestore.batch();
                                        for(let date of holidayDates) {
                                            const newId = Date.now().toString() + Math.random();
                                            batch.set(window.dbFirestore.collection("bookings").doc(newId), {
                                                id: newId, date: date, inspector_name: 'SYSTEM_HOLIDAY', job_type: 'public_holiday', site_name: hName, equipment_no: `HLD_${Date.now()}`, status: 'active'
                                            });
                                        }
                                        await batch.commit();
                                    }
                                    setLoadingMsg(null); setSuccessModal('สร้างวันหยุดสำเร็จ'); setModal(null);
                                }} className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-md">บันทึกวันหยุด</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Global Modal สำหรับเปิดดูไฟล์แนบ */}
            {viewFileUrl && (
                <div className="backdrop z-[700] p-4 flex flex-col items-center justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col h-[85vh] shadow-2xl animate-pop relative">
                        <div className="bg-slate-800 text-white p-3 flex justify-between items-center z-10 flex-shrink-0">
                            <span className="font-bold text-sm flex items-center gap-2"><Icons.FileText /> ดูไฟล์แนบ</span>
                            <div className="flex gap-2">
                                <button onClick={() => window.open(viewFileUrl, '_blank')} className="bg-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500 active:scale-95 transition-all shadow-sm">เปิดแท็บใหม่</button>
                                <button onClick={() => setViewFileUrl(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 active:scale-95 transition-all"><Icons.X /></button>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-100 flex items-center justify-center p-2 overflow-hidden relative">
                            {viewFileUrl.endsWith('.pdf') || viewFileUrl.includes('preview') || viewFileUrl.includes('firebasestorage.googleapis.com') ? (
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
                        <p className="text-sm text-slate-600 mb-6 whitespace-pre-line text-left">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform">ตกลง</button>
                    </div>
                </div>
            )}
            
            {confirmDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยันการทำรายการ</h3>
                        <div className="text-sm text-slate-600 mb-6 whitespace-pre-line">{confirmDialog.msg}</div>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm active:scale-95 transition-transform">ยกเลิก</button>
                            <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}
            
            {promptDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ระบุเหตุผล</h3>
                        <p className="text-xs text-slate-500 mb-4">{promptDialog.msg}</p>
                        <input type="text" id="prompt_input" className="w-full p-3 border rounded-xl mb-4 bg-slate-50 font-bold text-sm outline-none focus:border-blue-400" placeholder="พิมพ์เหตุผล..." autoFocus />
                        <div className="flex gap-3">
                            <button onClick={() => setPromptDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl active:scale-95 transition-transform">ยกเลิก</button>
                            <button onClick={() => { const v = document.getElementById('prompt_input').value; if(!v) return setAlertMsg('กรุณาระบุเหตุผล'); promptDialog.onSubmit(v); }} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {/* หน้าต่าง Activity Modal */}
            {showActivityModal && (
                <div className="backdrop z-[200] p-4 flex items-center justify-center">
                    <div className="modal-card p-6 w-full max-w-lg bg-white rounded-3xl shadow-2xl h-[85vh] flex flex-col animate-pop relative">
                        <button onClick={() => setShowActivityModal(false)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 z-10"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2 flex-shrink-0 mt-1"><Icons.List /> ประวัติและการแจ้งเตือน</h3>
                        
                        <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-xl flex-shrink-0">
                            <button onClick={() => setActivityTab('notif')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activityTab === 'notif' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
                                🔔 แจ้งเตือน ({unreadNotifs.length})
                            </button>
                            <button onClick={() => setActivityTab('log')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activityTab === 'log' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
                                🗄️ ประวัติระบบ (Logs)
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scrollbar">
                            {activityTab === 'notif' ? (
                                (() => {
                                    const userNotifs = (db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
                                    if (userNotifs.length === 0) return <div className="text-center text-slate-400 text-sm py-12">ไม่มีรายการแจ้งเตือน</div>;
                                    return userNotifs.map((notif, i) => (
                                        <div key={i} className="p-4 rounded-xl border bg-white shadow-sm">
                                            <div className="font-bold text-sm text-slate-800 mb-1">{notif.title || 'แจ้งเตือน'}</div>
                                            <div className="text-xs text-slate-600">{notif.message}</div>
                                        </div>
                                    ));
                                })()
                            ) : (
                                (() => {
                                    const logs = adminDb.logs || [];
                                    if (logs.length === 0) return <div className="text-center text-slate-400 text-sm py-10">ไม่พบประวัติ</div>;
                                    return logs.map((log, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="flex justify-between items-start mb-1 text-[10px] text-slate-500">
                                                <span>👤 {log.user}</span><span>{new Date(log.timestamp).toLocaleString('th-TH')}</span>
                                            </div>
                                            <div className="mb-1"><span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">{log.action}</span></div>
                                            <div className="text-[11px] font-mono text-slate-600 whitespace-pre-wrap bg-slate-50 p-2 rounded border">{log.details}</div>
                                        </div>
                                    ));
                                })()
                            )}
                        </div>
                    </div>
               </div>
            )}
        </div>
    );
};

// 📍 Error Boundary ป้องกันหน้าจอขาวแบบเด็ดขาด
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false, errorMsg: '' }; }
    static getDerivedStateFromError(error) { return { hasError: true, errorMsg: error.toString() }; }
    componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                    <div className="text-red-500 mb-4 bg-red-50 p-4 rounded-full shadow-sm"><Icons.Alert /></div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">ระบบขัดข้องชั่วคราว</h2>
                    <p className="text-sm text-slate-500 mb-6 bg-white p-3 rounded-lg max-w-md border">{this.state.errorMsg}</p>
                    <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform">รีเฟรชหน้าเว็บ</button>
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
