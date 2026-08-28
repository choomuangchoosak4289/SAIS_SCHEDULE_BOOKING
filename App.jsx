const { useState, useEffect, useMemo, useRef } = React;

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
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="realtime-clock flex flex-col gap-1 py-2 bg-slate-50 border-t border-slate-200 shadow-inner z-50">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700">
                <Icons.Clock />
                <span>{currentTime.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &nbsp;{currentTime.toLocaleTimeString('th-TH')}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-normal bg-white px-2 py-0.5 rounded-md border border-slate-100">
                อัปเดตข้อมูลล่าสุด: {Math.floor((new Date() - lastSyncTime) / 60000) < 1 ? 'เพิ่งอัปเดตเมื่อสักครู่' : `${Math.floor((new Date() - lastSyncTime) / 60000)} นาทีที่แล้ว`}
            </div>
        </div>
    );
});

const CalendarGrid = React.memo(({ daysInView, db, isAdmin, user, setShowLogin, setModal, setAlertMsg, handleDrop, handleDragOver, handleDragLeave, handleDragStart, handleDragEnd, setConfirmDialog, apiAction, setQuickAddType, filteredBookings, tableFontScale, columnZoom, specialFontScale, isExporting, setEventStartDate, setEventEndDate, setEventInspectors, setLeaveStartDate, setLeaveEndDate, setLeaveInspectors }) => {
    
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
                                        if (!isAdmin && isBlockedForNormalUser) return;
                                        if (!user) return setShowLogin(true);
                                        const todayLocalString = window.SAIS_UTILS?.getLocalDateString(new Date()) || new Date().toISOString().split('T')[0];
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
                                                onClick={(e) => { 
                                                    e.stopPropagation();
                                                    setModal({ type: 'detail', data: gh });
                                                }}
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
                                                onClick={(e) => { 
                                                    e.stopPropagation();
                                                    setModal({ type: 'detail', data: ge });
                                                }}
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModal({ type: 'detail', data: task });
                                                }}>
                                                
                                                <div className={`w-full flex flex-col justify-center items-center text-center`}>
                                                    {styleObj.isLeave ? (
                                                        <div className="font-black flex items-center justify-center leading-none" style={{ fontSize: `${(isSingleCard ? (isExporting ? 46 : 36) : (isExporting ? 32 : 24)) * specialFontScale}px` }}>
                                                            ลา
                                                        </div>
                                                    ) : isSingleCard ? (
                                                        <div className="format-multi-line flex flex-col justify-center items-center w-full !text-center">
                                                            {!styleObj.isSpecial ? (
                                                                <>
                                                                    <div className="leading-tight opacity-90 font-bold" style={{ fontSize: `${(isExporting ? 12 : 10) * dynamicScale * tableFontScale}px` }}>{task.equipment_no} <span className="opacity-60">/</span> {task.product_line || '-'} <span className="opacity-60">/</span> {task.unit_no}</div>
                                                                    <div className={`leading-tight font-black mt-[2px] w-full break-words`} style={{ fontSize: `${(isExporting ? 14 : 11) * dynamicScale * tableFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }}>{task.site_name}</div>
                                                                </>
                                                            ) : (
                                                                <div className={`whitespace-pre-wrap leading-tight font-black w-full break-words`} style={{ fontSize: `${(isExporting ? 15 : 12) * dynamicScale * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'pre-wrap' }}>{task.site_name}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className={`format-single-line font-black leading-tight w-full !text-center`} style={{ fontSize: `${(isExporting ? 12 : 10) * dynamicScale * (styleObj.isSpecial ? specialFontScale : tableFontScale)}px`, whiteSpace: isExporting ? 'normal' : 'nowrap', overflow: isExporting ? 'visible' : 'hidden' }}>
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

    const [currentDate, setCurrentDate] = useState(new Date());
    const [period, setPeriod] = useState(new Date().getDate() > 15 ? 1 : 0); 
    const todayLocalString = window?.SAIS_UTILS?.getLocalDateString(new Date()) || new Date().toISOString().split('T')[0];
    const [lastSyncTime, setLastSyncTime] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    
    const [isDragging, setIsDragging] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);
    const [pullY, setPullY] = useState(0);
    
    // 📍 1. เพิ่ม State เก็บค่า Dragging Task เพื่อแก้ปัญหา Mobile Drag & Drop ทำข้อมูลหาย
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
        } 
        catch(e) { return null; } 
    });
    
    const [initialLoad, setInitialLoad] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState(null);
    const [uploadingDoc, setUploadingDoc] = useState({ layout: false, wiring: false, precheck: false });
    const [alertMsg, setAlertMsg] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [promptDialog, setPromptDialog] = useState(null);
    const [successModal, setSuccessModal] = useState(null);
    const [currentView, setCurrentView] = useState('calendar');
    const [modal, setModal] = useState(null); 
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginHelp, setShowLoginHelp] = useState(false);
    const [showBookingHelp, setShowBookingHelp] = useState(false);
    
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityTab, setActivityTab] = useState('notif');
    const [showSettings, setShowSettings] = useState(false);
    const [tableFontScale, setTableFontScale] = useState(() => {
        try { const saved = localStorage.getItem('sais_table_font_scale'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; }
    });
    const [specialFontScale, setSpecialFontScale] = useState(() => {
        try { const saved = localStorage.getItem('sais_special_font_scale'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; }
    });
    const [columnZoom, setColumnZoom] = useState(() => {
        try { const saved = localStorage.getItem('sais_column_zoom'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; }
    });
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
    const [leaveStartTime, setLeaveStartTime] = useState('');
    const [leaveEndTime, setLeaveEndTime] = useState('');
    
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    
    const [eventInspectors, setEventInspectors] = useState([]);
    const [showEventDropdown, setShowEventDropdown] = useState(false);

    const [holidayStartDate, setHolidayStartDate] = useState('');
    const [holidayEndDate, setHolidayEndDate] = useState('');

    const [selectedLeavesToDelete, setSelectedLeavesToDelete] = useState([]);
    const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);
    const [selectedHolidaysToDelete, setSelectedHolidaysToDelete] = useState([]);

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (modal && modal.type === 'booking') {
            const currentArea = areaSelection === 'other' ? (modal.data?.area || 'ไม่ระบุ') : areaSelection;
            handleMapChange(currentArea);
        }
    }, [modal, areaSelection]);

    const getDiffLog = (oldData, newData, actionUser) => {
        const site = newData?.site_name || oldData?.site_name || '-';
        const eq = newData?.equipment_no || oldData?.equipment_no || '-';
        const pl = newData?.product_line || oldData?.product_line || '-';
        const jt = newData?.job_type || oldData?.job_type || '-';
        const inspector = newData?.inspector_name || oldData?.inspector_name || '-';
        const dateStr = newData?.date ? formatSafeDate(newData.date) : (oldData?.date ? formatSafeDate(oldData.date) : '-');
        
        let userFullName = actionUser || '-';
        if (adminDb && adminDb.users) {
            const userObj = adminDb.users.find(u => String(u.username) === String(actionUser));
            if (userObj && userObj.full_name) userFullName = `${userObj.full_name} (${actionUser})`;
        }

        if (!oldData) {
            return `[เพิ่มรายการใหม่]\nหัวข้อ/โครงการ: ${site}\nประเภทงาน: ${jt}\nEq No.: ${eq}\nผู้ตรวจ: ${inspector}\nวันที่ทำรายการ: ${dateStr}\nผู้ทำการ: ${userFullName}`;
        }
        
        let changes = [];
        const labels = {
            date: 'วันที่', inspector_name: 'ผู้ตรวจ', site_name: 'หัวข้อ/โครงการ',
            equipment_no: 'Eq No.', unit_no: 'Unit', job_type: 'ประเภทงาน', 
            area: 'พื้นที่', tel: 'เบอร์โทร', product_line: 'Product',
            layout_doc: 'เอกสาร Layout', wiring_doc: 'เอกสาร Wiring', precheck_doc: 'เอกสาร Precheck'
        };
        for (let key in labels) {
            let oldVal = String(oldData[key] || '').trim();
            let newVal = String(newData[key] || '').trim();
            if (oldVal !== newVal) {
                if (oldVal === 'false') oldVal = 'ยังไม่ส่ง';
                if (oldVal === 'true') oldVal = 'ส่งแล้ว';
                if (newVal === 'false') newVal = 'ยังไม่ส่ง';
                if (newVal === 'true') newVal = 'ส่งแล้ว';
                changes.push(`• ${labels[key]}: [${oldVal || '-'}] ➡️ [${newVal || '-'}]`);
            }
        }
        return changes.length > 0 ? `[อัปเดตข้อมูล]\nหัวข้อ/โครงการ: ${site}\nประเภทงาน: ${jt}\nผู้ทำการ: ${userFullName}\nรายละเอียดการเปลี่ยนแปลง:\n${changes.join('\n')}` : `บันทึกการแก้ไขโดยไม่มีการเปลี่ยนแปลง (หัวข้อ: ${site})`;
    };

    const calculateTimeDuration = (start, end) => {
        if (!start || !end) return null;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        let diffMins = (eh * 60 + em) - (sh * 60 + sm);
        if (diffMins < 0) return 0;
        return diffMins; 
    };

    const formatDuration = (totalMins) => {
        if (!totalMins || totalMins <= 0) return '';
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        if (h > 0 && m > 0) return `${h} ชม. ${m} นาที`;
        if (h > 0) return `${h} ชม.`;
        return `${m} นาที`;
    };

    const leaveMins = calculateTimeDuration(leaveStartTime, leaveEndTime) || 0;
    const eventMins = calculateTimeDuration(eventStartTime, eventEndTime) || 0;

    useEffect(() => {
        if (successModal) {
            const timer = setTimeout(() => { setSuccessModal(null); }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successModal]);

    useEffect(() => { localStorage.setItem('sais_table_font_scale', tableFontScale.toString()); }, [tableFontScale]);
    useEffect(() => { localStorage.setItem('sais_special_font_scale', specialFontScale.toString()); }, [specialFontScale]);
    useEffect(() => { localStorage.setItem('sais_column_zoom', columnZoom.toString()); }, [columnZoom]);

    const updateTableFontScale = (adjustment) => { setTableFontScale(prev => { const newVal = Math.max(0.3, Math.min(5.0, prev + adjustment)); return Math.round(newVal * 10) / 10; }); };
    const updateSpecialFontScale = (adjustment) => { setSpecialFontScale(prev => { const newVal = Math.max(0.3, Math.min(5.0, prev + adjustment)); return Math.round(newVal * 10) / 10; }); };
    const updateColumnZoom = (adjustment) => { setColumnZoom(prev => { const newVal = Math.max(0.3, Math.min(3.0, prev + adjustment)); return Math.round(newVal * 10) / 10; }); };

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

    const handleExportJPG = () => {
        setShowSettings(false);
        setCurrentView('calendar');
        setLoadingMsg('กำลังสร้างและปรับความคมชัดภาพตาราง... (รอสักครู่)');
        setIsExporting(true);
        setTimeout(() => {
            const targetNode = document.getElementById('calendar-export-area');
            if(targetNode) {
                html2canvas(targetNode, { 
                    scale: 2, 
                    useCORS: true, 
                    backgroundColor: '#f8fafc',
                    windowWidth: targetNode.scrollWidth, 
                    windowHeight: targetNode.scrollHeight 
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
                setIsExporting(false);
                setLoadingMsg(null); setAlertMsg('ไม่พบตาราง');
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
                        setLoadingMsg(null);
                        setAlertMsg('เกิดข้อผิดพลาดในการลบ'); 
                    }
                } catch(e) { 
                    setLoadingMsg(null);
                    setAlertMsg('การเชื่อมต่อขัดข้อง'); 
                }
            }
        });
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
    const isAdmin = useMemo(() => user?.username === ADMIN_USERNAME || user?.role === 'admin', [user]);
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
                    full: localDateStr, day: d, weekday: date.toLocaleDateString('en-US', { weekday: 'short' }), 
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
                    if (currentCache && currentCache.bookings) {
                        setDb(currentCache);
                        setInitialLoad(false); 
                    }
                } catch(e) {}
            }
            
            const isFirstLoad = !currentCache || !currentCache.bookings || currentCache.bookings.length === 0;
            await fetchCoreData(isFirstLoad, currentCache);
            setInitialLoad(false); 
        }
        if(SCRIPT_URL) load();

        let timeoutId;
        const scheduleNextFetch = () => {
            const jitter = Math.floor(Math.random() * 60000); 
            const baseInterval = 180000; 
            const nextFetchIn = baseInterval + jitter;

            timeoutId = setTimeout(() => {
                const idleTime = Date.now() - lastActivityTime.current;
                const isIdle = idleTime > 15 * 60 * 1000;
                if (!isIdle && document.visibilityState === 'visible' && !modal && !showLogin && !showActivityModal && !alertMsg && !confirmDialog && !promptDialog && !loadingMsg && !successModal && SCRIPT_URL && !isExporting) {
                    fetchCoreData(false, dbRef.current).finally(() => scheduleNextFetch());
                } else {
                    scheduleNextFetch();
                }
            }, nextFetchIn);
        };

        scheduleNextFetch();

        return () => clearTimeout(timeoutId);
    }, [modal, showLogin, showActivityModal, alertMsg, confirmDialog, promptDialog, loadingMsg, successModal, SCRIPT_URL, isExporting]);

    const fetchCoreData = async (needPast = false, currentCache = null) => {
        if (!SCRIPT_URL) return;
        try {
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const startFetchDate = utils.getLocalDateString ? utils.getLocalDateString(new Date(currentYear, currentMonth - 1, 1)) : '';
            const endFetchDate = utils.getLocalDateString ? utils.getLocalDateString(new Date(currentYear, currentMonth + 2, 0)) : '';
            const res = await fetch(SCRIPT_URL, { 
                method: 'POST', 
                body: JSON.stringify({ 
                    action: 'sync_core', 
                    fetch_past: needPast,
                    start_date: startFetchDate,
                    end_date: endFetchDate
                }) 
            });
            const result = await res.json();
            
            if (result.status === 'ok') {
                let finalDb = result.data;
                if (!needPast && currentCache && currentCache.bookings) {
                    const today = new Date();
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
                setLastSyncTime(new Date()); 
                if (window.DB_CACHE) window.DB_CACHE.setItem('sais_core_db', finalDb);
            }
        } catch (e) { console.error("Core Fetch Error"); }
    };

    const fetchAdminData = async (offset = 0, limit = 50, fetchType = 'all') => {
        if (!SCRIPT_URL) return;
        try {
            const payload = { action: 'sync_admin', offset: offset, limit: limit, fetch_type: fetchType };
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
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
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
        if (pullY > 50 && !isRefreshing) { setIsRefreshing(true);
            setPullY(50); await fetchCoreData(false, dbRef.current); setIsRefreshing(false); }
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

    const handleToggleDoc = async (bookingId, docType, currentValue) => {
        const newValue = String(currentValue) === 'true' ? 'false' : 'true';
        setDb(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === bookingId ? { ...b, [docType]: newValue } : b) }));
        const docName = docType === 'layout_doc' ? 'Layout' : docType === 'wiring_doc' ? 'Wiring' : 'Precheck';
        const statusName = newValue === 'true' ? 'อนุมัติ (ได้รับแล้ว)' : 'ยกเลิก (ยังไม่ได้รับ)';
        const targetJob = db.bookings.find(b => b.id === bookingId);
        const logDetail = `[อัปเดตเอกสาร]\nโดย: ${user?.username}\nเปลี่ยนสถานะเอกสาร ${docName} เป็น ➡️ "${statusName}"\nEq No.: ${targetJob?.equipment_no}\nโครงการ: ${targetJob?.site_name}`;
        await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'update_booking', id: bookingId, user: user?.username, [docType]: newValue, reason: logDetail }) });
    };

    const markNotifAsRead = async (id) => {
        if (!SCRIPT_URL) return;
        setDb(prev => ({ ...prev, notifications: prev.notifications.map(n => n.id === id ? {...n, isRead: 'true'} : n) }));
        fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'read_notification', id: id }) });
    };

    const handleImageUpload = async (e, docType) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return setAlertMsg('กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น');
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true })); setLoadingMsg('กำลังบีบอัดและอัปโหลดรูปภาพ...');
        try {
            const base64Img = await utils.compressImage(file);
            const res = await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'upload_image', base64: base64Img, mimeType: file.type, fileName: `SAIS_${docType}_${Date.now()}.jpg` }) });
            if (res.status === 'ok') { document.getElementById(`${docType}_img_input`).value = res.fileUrl; setSuccessModal(`อัปโหลดเอกสาร ${docType} สำเร็จ`);
            } else { setAlertMsg('อัปโหลดไม่สำเร็จ'); }
        } catch(err) { setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลด'); }
        setLoadingMsg(null); setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    // 📍 2. อัปเกรดระบบ Drag & Drop: เพิ่ม state draggingTask เพื่อความสมบูรณ์และแม่นยำสูงสุด
    const handleDragStart = (e, taskId) => { 
        e.dataTransfer.setData('taskId', taskId);
        setDraggingTask(db.bookings.find(b => String(b.id) === String(taskId))); // Back-up ป้องกัน dataTransfer คืนค่าว่างบนมือถือ
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
                const ok = await apiAction({ action: 'delete_booking', id: task.id, user: user?.username || 'admin', reason: logDetail, job_type: task.job_type }, 'กำลังลบทิ้ง...');
                if(ok) setSuccessModal('ลบรายการลงถังขยะสำเร็จ');
            }
        });
    };

    // 📍 2. ปรับปรุง handleDrop ให้ย้ายวัน ย้ายคนได้อย่างสมบูรณ์แบบ
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

        // ถ้าย้ายลงช่องเดิมเป๊ะ ให้ข้ามการทำงานไปเลย
        if (oldDate === targetDate && oldInspector === finalInspector) return setDraggingTask(null);
        
        // เช็คการจองซ้ำ Eq No. ในวันนั้นๆ
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
                    action: 'update_booking', 
                    id: task.id, 
                    date: targetDate, 
                    inspector_name: finalInspector, 
                    user: user?.username || 'admin', 
                    reason: logDetail,
                    job_type: task.job_type
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
            ...modal.data, 
            action: 'update_booking', 
            id: modal.data.id, 
            site_name: newTitle, 
            inspector_name: newInspector, 
            date: newDate, 
            user: user?.username, 
            reason: logDetail,
            job_type: modal.data.job_type 
        };
        const ok = await apiAction(payload, 'กำลังอัปเดตข้อมูล...');
        if(ok) { 
            setSuccessModal('อัปเดตสำเร็จ');
            if (modal.returnTo) {
                setModal({ type: modal.returnTo });
            } else {
                setModal(null);
            }
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
            layout_img: fd.get('layout_img') || modal?.data?.layout_img || '',
            wiring_img: fd.get('wiring_img') || modal?.data?.wiring_img || '',
            precheck_img: fd.get('precheck_img') || modal?.data?.precheck_img || ''
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
                setAreaSelection(''); 
                setJobTypeSelection(''); 
                setProductLineSelection('');
                setLiveMapUrl('');
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

    if (!SCRIPT_URL) return <div className="h-screen w-full flex items-center justify-center flex-col gap-4 p-8 text-center"><div className="text-4xl text-red-500"><Icons.Alert /></div><h2 className="text-xl font-bold text-slate-800">เกิดข้อผิดพลาด</h2><p className="text-slate-600 text-sm">ไม่พบการตั้งค่าเชื่อมต่อฐานข้อมูล (URL)</p></div>;

    return (
        <div className="app-container">
            
            <div 
                className={`trash-dropzone ${isDragging ? 'visible' : ''} ${isTrashHovered ? 'hovered' : ''}`}
                onDragOver={handleTrashDragOver}
                onDragLeave={handleTrashDragLeave}
                onDrop={handleTrashDrop}
            >
                <div className="trash-icon-wrapper">
                    <Icons.AnimatedTrash isHovered={isTrashHovered} />
                </div>
                <div className="trash-text">
                    {isTrashHovered ? 'ปล่อยเพื่อลบทิ้ง!' : 'ลากมาทิ้งที่นี่'}
                </div>
            </div>

            {successModal && (
                <div className="fixed inset-0 z-[700] flex items-center justify-center pointer-events-none">
                    <div className="bg-white w-[85%] max-w-[280px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-4 border-green-400">
                        <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                            <Icons.Check />
                        </div>
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

            <header className={`main-header ${user ? 'bg-slate-800' : 'bg-red-600'}`}>
                <div className="flex items-center gap-2"><h1 className="text-xl font-bold tracking-wide">SAIS BOOKING</h1></div>
                <div className="flex items-center gap-2 relative">
                    <button className="btn-icon" onClick={() => setShowSettings(!showSettings)}><Icons.Settings /></button>
                    
                    {showSettings && (
                        <div className="settings-menu animate-pop w-[260px] max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <h4 className="text-sm font-bold border-b border-slate-200 pb-2 mb-3 text-slate-800 flex items-center gap-2">
                                <Icons.Settings /> การตั้งค่าระบบ
                            </h4>
                            
                            <div className="settings-group mb-4 bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-sm">
                                <h5 className="text-[11px] font-bold text-blue-800 mb-2 flex items-center gap-1"><Icons.Image /> Export ตารางเป็นรูปภาพ (JPG)</h5>
                                <button onClick={handleExportJPG} className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.Download /> บันทึกตารางหน้านี้
                                </button>
                                <p className="text-[8px] text-blue-500 mt-2 leading-tight">* ระบบจะบันทึกรูปภาพตารางในช่วงครึ่งเดือนที่คุณกำลังเปิดดูอยู่ ณ ปัจจุบัน</p>
                            </div>

                            <div className="settings-group mb-3 border-t border-slate-100 pt-3">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ยืด/หด ความกว้างตาราง (คอลัมน์)</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateColumnZoom(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(columnZoom * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateColumnZoom(0.1)}>+</button>
                                </div>
                            </div>
                            <div className="settings-group mb-3">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ปรับสเกลตัวอักษรปกติ (30% - 500%)</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateTableFontScale(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(tableFontScale * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateTableFontScale(0.1)}>+</button>
                                </div>
                            </div>
                            <div className="settings-group">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ขนาดฟอนต์ ลา/หยุด/กิจกรรม (30% - 500%)</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateSpecialFontScale(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(specialFontScale * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateSpecialFontScale(0.1)}>+</button>
                                </div>
                            </div>
                            <button className="mt-4 w-full py-2 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200 text-xs active:scale-95 transition-all" onClick={() => { setTableFontScale(1.0); setSpecialFontScale(1.0); setColumnZoom(1.0); }}>
                                ↺ รีเซ็ตค่าเริ่มต้น
                            </button>
                        </div>
                    )}

                    <button className="btn-icon relative" onClick={() => { setShowActivityModal(true); if(!hasLoadedAdmin) fetchAdminData(0, 50, 'all'); }}>
                        <Icons.Bell />
                        {unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                    </button>
                    
                    {!user ? <button className="ml-1 bg-white text-red-700 px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm" onClick={() => setShowLogin(true)}>LOGIN <Icons.User /></button>
                        : <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.User /> {user.username}</div>}
                </div>
            </header>

            <div className="bottom-nav" style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, 
                transform: isNavVisible ? 'translateY(0)' : 'translateY(100%)', 
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)', zIndex: 50
            }}>
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => handleTabChange('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {user && !isAdmin && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => handleTabChange('my_bookings')}><Icons.List /> งานฉัน</div>}
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { handleTabChange('admin'); setAdminTab('menu'); }}><Icons.Shield /> จัดการ</div>}
                {user && <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>}
            </div>

            {currentView === 'calendar' && (
                <div className="grid-container relative overflow-hidden pb-16">
                    <div className="nav-bar bg-white px-3 py-2 border-b flex-shrink-0 z-[45]">
                        <div className="flex justify-between items-center w-full">
                            <button onClick={() => changePeriod('prev')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1"><Icons.ChevronLeft /> ย้อนกลับ</button>
                            <div className="text-center font-bold text-slate-800 text-sm flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-4 py-1.5 rounded-xl border border-transparent hover:border-slate-200 transition-all" onClick={() => setShowMonthPicker(!showMonthPicker)}>
                                {period === 0 ? "1-15 " : `16-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()} `}
                                {currentDate.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}
                                <span className="text-slate-400 text-xs ml-1">▼</span>
                            </div>
                            <button onClick={() => changePeriod('next')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">ถัดไป <Icons.ChevronRight /></button>
                        </div>
                    </div>

                    {showMonthPicker && (
                        <div className="absolute top-[52px] left-0 right-0 bg-white border-b border-slate-200 p-4 z-[60] shadow-xl animate-pop">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <button onClick={() => setPickerYear(prev => prev - 1)} className="p-2 bg-slate-100 rounded-lg font-bold text-slate-600 active:scale-95"><Icons.ChevronLeft /></button>
                                <div className="font-bold text-lg text-red-600">ปี {pickerYear + 543}</div>
                                <button onClick={() => setPickerYear(prev => prev + 1)} className="p-2 bg-slate-100 rounded-lg font-bold text-slate-600 active:scale-95"><Icons.ChevronRight /></button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'].map((m, i) => (
                                    <button key={i} onClick={() => { setCurrentDate(new Date(pickerYear, i, 1)); setPeriod(0); setShowMonthPicker(false); }} className={`py-3 rounded-xl text-sm font-bold border transition-all ${currentDate.getMonth() === i && currentDate.getFullYear() === pickerYear ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 active:scale-95'}`}>{m}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="absolute left-0 right-0 flex justify-center z-40 transition-all duration-300 pointer-events-none" style={{ top: pullY > 0 ? `${pullY}px` : '-40px', opacity: pullY > 0 ? 1 : 0 }}>
                        <div className="bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-600">
                            {isRefreshing ? <span className="text-blue-500 animate-spin text-lg leading-none">⏳</span> : <span className="text-slate-400 text-lg leading-none">⬇️</span>}
                            {isRefreshing ? 'กำลังดึงข้อมูลล่าสุด...' : 'ปล่อยเพื่ออัปเดต'}
                        </div>
                    </div>

                    <div className="grid-wrapper" ref={scrollRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ transform: `translateY(${pullY}px)`, transition: pullY === 0 ? 'transform 0.3s ease-out' : 'none' }}>
                        {initialLoad ? (
                            <div className="w-full h-full flex flex-col p-4 gap-2">
                                {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-16 skeleton rounded-lg bg-slate-100 animate-pulse"></div>)}
                            </div>
                        ) : (
                            <CalendarGrid 
                                daysInView={daysInView} db={db} isAdmin={isAdmin} user={user} setShowLogin={setShowLogin} 
                                setModal={setModal} setAlertMsg={setAlertMsg} handleDrop={handleDrop} handleDragOver={handleDragOver} 
                                handleDragLeave={handleDragLeave} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} setConfirmDialog={setConfirmDialog} 
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
                        <div className="text-xs text-slate-500 mt-1">แตะที่กล่องเพื่อ อนุมัติ/ยกเลิก เอกสารแบบรวดเร็ว</div>
                    </div>
                    <div className="space-y-4 pb-10 pt-4">
                        {(() => {
                            const docTasks = (db.bookings || []).filter(b => String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.inspector_name) !== 'SYSTEM_EVENT' && !String(b.equipment_no).startsWith('LEAVE_') && !String(b.equipment_no).startsWith('EVENT_') && String(b.status) !== 'cancelled').sort((a, b) => new Date(b.date) - new Date(a.date));
                            if (docTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการงานตรวจ</div>;
                            return docTasks.slice(0, 30).map((h, i) => {
                                const l_ok = String(h.layout_doc) === 'true';
                                const w_ok = String(h.wiring_doc) === 'true';
                                const p_ok = String(h.precheck_doc) === 'true';
                                const all_ok = l_ok && w_ok && p_ok;
                                return (
                                    <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-all ${all_ok ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
                                        <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-2">
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">{h.equipment_no} <span className="text-xs text-slate-400 font-normal">/ {h.unit_no}</span></div>
                                                <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]">{h.site_name}</div>
                                            </div>
                                            <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{h.date ? formatSafeDate(h.date) : ''}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div onClick={() => handleToggleDoc(h.id, 'layout_doc', h.layout_doc)} className={`doc-toggle ${l_ok ? 'approved' : 'pending'}`}>
                                                <div className="toggle-box">{l_ok && <Icons.Check />}</div>
                                                <div className="text-[10px] leading-tight">Layout</div>
                                            </div>
                                            <div onClick={() => handleToggleDoc(h.id, 'wiring_doc', h.wiring_doc)} className={`doc-toggle ${w_ok ? 'approved' : 'pending'}`}>
                                                <div className="toggle-box">{w_ok && <Icons.Check />}</div>
                                                <div className="text-[10px] leading-tight">Wiring</div>
                                            </div>
                                            <div onClick={() => handleToggleDoc(h.id, 'precheck_doc', h.precheck_doc)} className={`doc-toggle ${p_ok ? 'approved' : 'pending'}`}>
                                                <div className="toggle-box">{p_ok && <Icons.Check />}</div>
                                                <div className="text-[10px] leading-tight">Precheck</div>
                                            </div>
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

            {currentView === 'my_bookings' && !isAdmin && (
                <div className="page-view relative pb-20">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.List /> งานที่ฉันจองไว้</h2>
                    <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
                        <button onClick={() => setMyBookingsTab('pending')} className={`flex-1 py-2 text-xs font-bold rounded-md ${myBookingsTab === 'pending' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>⏳ รอดำเนินการ</button>
                        <button onClick={() => setMyBookingsTab('approved')} className={`flex-1 py-2 text-xs font-bold rounded-md ${myBookingsTab === 'approved' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500'}`}>✅ อนุมัติแล้ว</button>
                        <button onClick={() => setMyBookingsTab('completed')} className={`flex-1 py-2 text-xs font-bold rounded-md ${myBookingsTab === 'completed' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>🗄️ ประวัติ</button>
                    </div>
                    <div className="space-y-3 pb-10">
                        {(() => {
                            const filteredTasks = (db.bookings || []).filter(b => {
                                if(String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT' || b.created_by !== user?.username) return false;
                                if(String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;

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
                                            {myBookingsTab === 'pending' && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border"><Icons.MoreVertical /></button>
                                                    {actionMenuId === h.id && (
                                                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-xs">
                                                            <button onClick={() => { setAreaSelection(h.area || ''); setJobTypeSelection(h.job_type || ''); setProductLineSelection(h.product_line || ''); setModal({ type: 'booking', data: h }); setActionMenuId(null); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                            <button onClick={() => handleCancelJob(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ยกเลิกคิวงาน</button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className="cursor-pointer pr-10" onClick={() => setModal({ type: 'detail', data: h })}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div>
                                                </div>
                                                <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                                                    <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                    <div><b>ผู้ตรวจ:</b> {h.inspector_name || '-'}</div><div><b>พื้นที่:</b> {h.area || '-'}</div>
                                                </div>
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
            
            {currentView === 'admin' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Icons.Shield /> Admin Panel
                                {!hasLoadedAdmin && <span className="text-[10px] text-blue-500 animate-pulse ml-2 font-normal border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">ดึงข้อมูล...</span>}
                            </h2>
                            {adminTab !== 'menu' && (
                                <button onClick={() => setAdminTab('menu')} className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border shadow-sm active:scale-95">
                                    <Icons.ChevronLeft /> กลับเมนู
                                </button>
                            )}
                        </div>
                    </div>

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
                        </div>
                    )}

                    {adminTab === 'special_management' && (
                        <div className="animate-pop pb-10 space-y-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden mb-6">
                                <div className="bg-blue-50 p-3 border-b border-blue-100 flex items-center gap-2">
                                    <div className="text-blue-600"><Icons.Info /></div>
                                    <h3 className="font-bold text-blue-900 text-sm">คู่มือการใช้งาน: จัดการวันพิเศษ</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-black">1</div>
                                        <div><h4 className="font-bold text-slate-800 text-sm">การสร้าง (Create)</h4><p className="text-xs text-slate-600 leading-relaxed">เลือกหมวดหมู่ที่ต้องการ (ลา/กิจกรรม/หยุด) ➡️ ระบุวันที่เริ่มต้นและสิ้นสุด ➡️ ระบบจะสร้างการ์ดลงตารางให้โดยอัตโนมัติ <i>(สามารถระบุเวลาแบบละเอียดได้)</i></p></div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 font-black">2</div>
                                        <div><h4 className="font-bold text-slate-800 text-sm">การลบแบบกลุ่ม (Bulk Delete)</h4><p className="text-xs text-slate-600 leading-relaxed">ติ๊ก <input type="checkbox" checked readOnly className="accent-amber-500 align-middle"/> หน้าชื่อรายการที่ต้องการลบหลายๆ อันพร้อมกัน แล้วกดปุ่ม <b>"ลบที่เลือก"</b> มุมขวาบน</p></div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-black">3</div>
                                        <div><h4 className="font-bold text-slate-800 text-sm">ลบลากทิ้ง (Drag & Drop)</h4><p className="text-xs text-slate-600 leading-relaxed">ในหน้าตารางปฏิทิน คุณสามารถแตะค้างที่การ์ดแล้วลากมาทิ้งที่ <b>ไอคอนถังขยะมุมซ้ายล่าง</b> เพื่อลบทิ้งอย่างรวดเร็วได้ทันที</p></div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setModal({ type: 'manage_leaves' })} className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-amber-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0"><Icons.User /></div>
                                <span className="font-bold text-amber-800 text-sm text-left flex-1">จัดการวันลา (เพิ่ม / แก้ไข / ลบ)</span>
                                <Icons.ChevronRight />
                            </button>

                            <button onClick={() => setModal({ type: 'manage_events' })} className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-emerald-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0"><Icons.Star /></div>
                                <span className="font-bold text-emerald-800 text-sm text-left flex-1">จัดการกิจกรรมบริษัท (เพิ่ม / แก้ไข / ลบ)</span>
                                <Icons.ChevronRight />
                            </button>

                            <button onClick={() => setModal({ type: 'manage_holidays' })} className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-red-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0"><Icons.CalendarX /></div>
                                <span className="font-bold text-red-800 text-sm text-left flex-1">จัดการวันหยุดบริษัท (เพิ่ม / แก้ไข / ลบ)</span>
                                <Icons.ChevronRight />
                            </button>
                        </div>
                    )}

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
                                                <div>
                                                    <div className="font-black text-slate-800 text-base">{ins.name}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setModal({ type: 'inspector_form', data: ins })} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"><Icons.Edit /></button>
                                                <button onClick={() => setConfirmDialog({msg:`ยืนยันการลบผู้ตรวจ "${ins.name}" ออกจากระบบ?`, onConfirm: async() => {
                                                    setConfirmDialog(null);
                                                    const ok = await apiAction({action: 'manage_inspector', sub_action: 'delete', old_name: ins.name}, 'กำลังลบ...');
                                                    if(ok) setSuccessModal('ลบสำเร็จ');
                                                }})} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"><Icons.Trash /></button>
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

                    {adminTab === 'all_bookings' && (
                        <div className="space-y-3 mt-4 animate-pop">
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : 
                            (adminDb.all_bookings || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูล</div> :
                            <>
                                {(adminDb.all_bookings || []).slice(0, adminBookingsLimit).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border"><Icons.MoreVertical /></button>
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
                                            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
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
                                    }} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                        โหลดเพิ่มเติม ({adminBookingsLimit} / {(adminDb.all_bookings || []).length})
                                    </button>
                                )}
                            </>
                            }
                        </div>
                    )}

                    {adminTab === 'users' && (
                        <div className="space-y-3 mt-4 animate-pop pb-10">
                            
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden mb-6">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white flex items-center gap-2">
                                    <Icons.User /> <h3 className="font-bold text-sm">คู่มือ: การจัดการสิทธิ์ผู้ใช้งาน</h3>
                                </div>
                                <div className="p-4 bg-blue-50/50">
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0"><Icons.Clock /></div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-xs">สถานะ: รออนุมัติ (Pending)</div>
                                                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">เมื่อมีผู้สมัครสมาชิกใหม่ ข้อมูลจะไปแสดงฝั่งแอดมิน (บน Google Sheets) แต่ยังไม่แสดงในหน้านี้จนกว่าจะอนุมัติ</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-sm relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-8 -mt-8"></div>
                                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10"><Icons.Check /></div>
                                            <div className="z-10">
                                                <div className="font-bold text-emerald-800 text-xs">วิธีอนุมัติ (Approve)</div>
                                                <div className="text-[10px] text-slate-600 leading-tight mt-0.5">เข้าไปที่ <b>Google Sheets</b> เลือกชีต "Users" แล้วเปลี่ยนคอลัมน์ Approved ให้เป็น <b>TRUE</b> ผู้ใช้จะล็อกอินได้ทันที</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0"><Icons.Shield /></div>
                                            <div>
                                                <div className="font-bold text-red-800 text-xs">การให้สิทธิ์ Admin</div>
                                                <div className="text-[10px] text-slate-600 leading-tight mt-0.5">ใน Google Sheets พิมพ์คำว่า <b>admin</b> ลงในคอลัมน์ Role ของผู้ใช้นั้นๆ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-1 mb-2">
                                <h3 className="font-bold text-slate-800 text-sm">ผู้ใช้งานที่ผ่านการอนุมัติแล้ว ({(adminDb.users || []).length})</h3>
                            </div>
                            
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : (adminDb.users || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูลผู้ใช้</div> :
                            (adminDb.users || []).map((u, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:border-blue-300 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black">
                                            {u.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 flex items-center gap-2">
                                                {u.username}
                                                {u.role === 'admin' && <span className="bg-red-100 text-red-600 text-[9px] px-2 py-0.5 rounded-full font-black border border-red-200 tracking-wide">ADMIN</span>}
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-1">อัปเดต: {u.updated_at ? formatSafeDate(u.updated_at) : '-'}</div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> อนุมัติแล้ว
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
       {/* 📍 MODALS & DIALOGS */}
            {modal && (
                <div className="backdrop z-[100] p-4 flex items-center justify-center">
                    
                    {modal?.type === 'inspector_form' && (
                        <div className="modal-card p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl animate-pop relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 transition-all"><Icons.X /></button>
                            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                                    {modal.data ? <Icons.Edit /> : <Icons.UserPlus />}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{modal.data ? 'แก้ไขสิทธิ์ผู้ตรวจ' : 'เพิ่มผู้ตรวจใหม่'}</h3>
                                    <p className="text-[10px] text-slate-500 mt-0.5">ระบุชื่อและเลือก Product Line ที่อนุญาต</p>
                                </div>
                            </div>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const name = fd.get('ins_name');
                                const certs = Array.from(e.target.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value).join(',');
                                const payload = {
                                    action: 'manage_inspector',
                                    sub_action: modal.data ? 'update' : 'add',
                                    old_name: modal.data?.name || '',
                                    new_name: name,
                                    product_lines: certs,
                                    user: user?.username
                                };
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

                    {modal?.type === 'admin_cell_action' && (
                        <div className="modal-card p-6 text-center animate-pop w-full max-w-sm bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 transition-all"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-100 pb-3 leading-tight">จองคิวตรวจ SAIS / เพิ่มรายการกิจกรรม-วันลา-วันหยุด</h3>
                            <p className="text-sm text-slate-500 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">วันที่: <span className="font-bold text-blue-600">{modal.data.date}</span><br/>ผู้ตรวจ: <span className="font-bold text-blue-600">{modal.data.inspector_name}</span></p>
                            
                            <div className="space-y-3">
                                <button onClick={() => { 
                                    setAreaSelection('');
                                    setJobTypeSelection(''); 
                                    setProductLineSelection(''); 
                                    setModal({ type: 'booking', data: modal.data }); 
                                }} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.Plus /> จองคิวตรวจ SAIS
                                </button>
                                <button onClick={() => { 
                                    setEventStartDate(modal.data.date);
                                    setEventEndDate(modal.data.date);
                                    setEventInspectors([]); // Reset
                                    setModal({ type: 'manage_events' }); 
                                }} className="w-full py-3.5 bg-emerald-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.Star /> เพิ่มกิจกรรม
                                </button>
                                <button onClick={() => { 
                                    setLeaveStartDate(modal.data.date);
                                    setLeaveEndDate(modal.data.date);
                                    setLeaveInspectors([modal.data.inspector_name]); // Set default inspector
                                    setModal({ type: 'manage_leaves' }); 
                                }} className="w-full py-3.5 bg-amber-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.User /> จองวันลา
                                </button>
                                <button onClick={() => { 
                                    setHolidayStartDate(modal.data.date);
                                    setHolidayEndDate(modal.data.date);
                                    setModal({ type: 'manage_holidays' }); 
                                }} className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.CalendarX /> เพิ่มวันหยุดนักขัตฤกษ์
                                </button>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'detail' && (
                        <div className="modal-card p-6 w-full max-w-md animate-pop bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 transition-all"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                             
                            <div className="space-y-3 text-sm text-slate-700 mb-6">
                                <div><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold">{modal.data.date ? formatSafeDate(modal.data.date) : '-'}</span></div>
                                <div><span className="text-slate-400 text-xs block">ผู้ตรวจ</span><span className="font-bold">{modal.data.inspector_name === 'SYSTEM_HOLIDAY' || modal.data.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : modal.data.inspector_name}</span></div>
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
                                        
                                        <div className="grid grid-cols-1 gap-2 mt-2">
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Product Line</span>
                                                <span className={`font-bold text-white px-3 py-1 rounded-lg inline-block shadow-sm ${PRODUCT_COLORS[modal.data.product_line] || 'bg-slate-500'}`}>
                                                    {modal.data.product_line || 'ไม่ระบุ'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1"><Icons.FileCheck /> สถานะการส่งเอกสาร</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${String(modal.data.layout_doc) === 'true' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    <div className="text-[10px] mb-1">Layout</div>
                                                    <div className="text-xs font-bold">{String(modal.data.layout_doc) === 'true' ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                </div>
                                                
                                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${String(modal.data.wiring_doc) === 'true' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    <div className="text-[10px] mb-1">Wiring</div>
                                                    <div className="text-xs font-bold">{String(modal.data.wiring_doc) === 'true' ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                </div>
                                                
                                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${String(modal.data.precheck_doc) === 'true' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    <div className="text-[10px] mb-1">Precheck</div>
                                                    <div className="text-xs font-bold">{String(modal.data.precheck_doc) === 'true' ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                
                                {modal.data.map_link && (
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-700 mb-2">📍 แผนที่ (Google Maps)</h4>
                                        <iframe src={utils.getMapEmbedUrl(modal.data.map_link)} className="w-full h-48 rounded-xl border border-slate-200 bg-slate-50" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>
                                        <a href={modal.data.map_link} target="_blank" className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-blue-100 transition-all w-full justify-center">
                                            เปิดนำทางในแอป Google Maps
                                        </a>
                                    </div>
                                )}
                            </div>

                            {(isAdmin || user?.username === modal.data.created_by) && (
                                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-3">
                                    <button onClick={() => {
                                        const isSpecial = String(modal.data.job_type).includes('leave') || String(modal.data.job_type).includes('event') || String(modal.data.job_type).includes('holiday');
                                        if(isSpecial) {
                                            setModal({ type: 'edit_special', data: modal.data });
                                        } else {
                                            setAreaSelection(modal.data.area || '');
                                            setJobTypeSelection(modal.data.job_type || ''); 
                                            setProductLineSelection(modal.data.product_line || ''); 
                                            setModal({ type: 'booking', data: modal.data });
                                        }
                                    }} className="py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                                        <Icons.Edit /> แก้ไขข้อมูล
                                    </button>

                                    <button onClick={() => handleCancelBooking(modal.data)} className="py-3 bg-red-50 text-red-700 font-bold rounded-xl border border-red-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                                        <Icons.Trash /> ลบรายการนี้
                                    </button>

                                    {/* 📍 ฟังก์ชันใหม่: แอดมินกดจองคิวเพิ่มต่อเนื่องในโครงการเดียวกันได้เลย */}
                                    {isAdmin && !String(modal.data.job_type).includes('leave') && !String(modal.data.job_type).includes('event') && !String(modal.data.job_type).includes('holiday') && (
                                        <button onClick={() => {
                                            setAreaSelection(modal.data.area || '');
                                            setJobTypeSelection(modal.data.job_type || ''); 
                                            setProductLineSelection(modal.data.product_line || ''); 
                                            setModal({ 
                                                type: 'booking', 
                                                data: { 
                                                    date: formatSafeDate(modal.data.date), 
                                                    inspector_name: modal.data.inspector_name,
                                                    site_name: modal.data.site_name,
                                                    area: modal.data.area,
                                                    job_type: modal.data.job_type,
                                                    product_line: modal.data.product_line,
                                                    tel: modal.data.tel,
                                                    map_link: modal.data.map_link
                                                } 
                                            });
                                        }} className="py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 mt-2">
                                            <Icons.Plus /> จองคิวงานเพิ่ม (โครงการนี้)
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                    {modal?.type === 'edit_special' && (
                        <div className="modal-card p-6 w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-pop relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95"><Icons.X /></button>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">✏️ แก้ไขข้อมูลพิเศษ</h3>
                            <form onSubmit={handleEditSpecialSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">เปลี่ยนวันที่</label>
                                    <input type="date" name="date" defaultValue={modal.data?.date ? formatSafeDate(modal.data.date) : ''} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold text-blue-600" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ผู้ตรวจ</label>
                                    <select name="inspector_name" defaultValue={modal.data?.inspector_name} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold">
                                        <option value="SYSTEM_EVENT">✅ ทุกคน (กิจกรรมรวม)</option>
                                        <option value="SYSTEM_HOLIDAY">✅ ทุกคน (วันหยุดรวม)</option>
                                        {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>👤 เฉพาะ: {i.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อรายการ (รวมถึงเวลา)</label>
                                    <input type="text" name="site_name" defaultValue={modal.data?.site_name} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none" />
                                </div>
                                <button disabled={loadingMsg} className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-md transition-all active:scale-95">บันทึกการแก้ไข</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'booking' && (
                        <div className="modal-card w-full max-w-[450px] animate-pop flex flex-col max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                            <button onClick={() => { setModal(null); setShowBookingHelp(false); }} className="absolute top-4 right-4 bg-slate-200 text-slate-500 hover:bg-slate-300 p-2 rounded-full z-50"><Icons.X /></button>
                            
                            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center pr-14">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Icons.FileCheck /> {showBookingHelp ? 'คู่มือจองคิวงาน' : (modal.data.id ? '✏️ แก้ไขคิวงาน' : '📝 จองคิวงานใหม่')}
                                </h3>
                                {/* 📍 ปุ่มเปิดคู่มือจองคิวงาน */}
                                {!showBookingHelp && (
                                    <button type="button" onClick={() => setShowBookingHelp(true)} className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1 active:scale-95 shadow-sm">
                                        <Icons.HelpCircle /> วิธีใช้งาน
                                    </button>
                                )}
                            </div>

                            {/* 📍 คู่มือการจองคิวงานอย่างละเอียด (แสดงเมื่อกดปุ่มวิธีใช้งาน) */}
                            {showBookingHelp ? (
                                <div className="p-5 overflow-y-auto max-h-[75vh] custom-scrollbar space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                        <p className="text-xs text-blue-800 leading-relaxed font-bold flex items-center gap-2"><Icons.Info /> ขั้นตอนและวิธีจองคิวงาน</p>
                                    </div>
                                    
                                    <div className="space-y-3 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                        {/* Step 1 */}
                                        <div className="relative flex items-start gap-3 group">
                                           <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-black shadow flex items-center justify-center shrink-0 z-10 text-sm">1</div>
                                           <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex-1">
                                               <h4 className="font-bold text-sm text-slate-800 mb-1">เลือกข้อมูลหลัก</h4>
                                               <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-4">
                                                   <li><b>Product Line:</b> เลือกใบเซอร์ที่ตรงกับหน้างาน (หากเลือก 'อื่นๆ' ให้พิมพ์ระบุเอง)</li>
                                                   <li><b>ประเภทงาน:</b> เช่น New, MOD, Re-ins</li>
                                                   <li><b>พื้นที่:</b> ระบุกทม. หรือ ต่างจังหวัด</li>
                                               </ul>
                                           </div>
                                        </div>
                                        {/* Step 2 */}
                                        <div className="relative flex items-start gap-3 group">
                                           <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black shadow flex items-center justify-center shrink-0 z-10 text-sm">2</div>
                                           <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex-1">
                                               <h4 className="font-bold text-sm text-slate-800 mb-1">กรอกรายละเอียดงาน</h4>
                                               <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-4">
                                                   <li><b>Eq No. / Unit No.:</b> ระบุหมายเลขเครื่อง (บังคับ) และ Unit</li>
                                                   <li><b>ชื่อโครงการ:</b> ระบุชื่อไซต์งานให้ชัดเจน</li>
                                                   <li><b>เบอร์โทร:</b> กรอก 10 หลัก (ไม่ต้องมีขีด -) เพื่อให้ผู้ตรวจติดต่อได้</li>
                                                   <li><b>แผนที่:</b> วางลิงก์ Google Maps เพื่อให้ผู้ตรวจเดินทางถูก (ไม่บังคับ แต่แนะนำ)</li>
                                               </ul>
                                           </div>
                                        </div>
                                        {/* Step 3 */}
                                        <div className="relative flex items-start gap-3 group">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black shadow flex items-center justify-center shrink-0 z-10 text-sm">3</div>
                                           <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex-1">
                                               <h4 className="font-bold text-sm text-slate-800 mb-1">อัปโหลดเอกสาร (ทำภายหลังได้)</h4>
                                               <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-4">
                                                   <li>แนบไฟล์ภาพ Layout, Wiring, Precheck ที่หน้างานจริง</li>
                                                   <li>คุณสามารถกดข้ามไปก่อน แล้วเข้ามาอัปโหลดเพิ่มเติมในเมนู <b>"งานฉัน"</b> ภายหลังได้</li>
                                               </ul>
                                           </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
                                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1"><Icons.Edit /> การแก้ไข / ยกเลิกคิวงาน</h4>
                                        <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                                            คุณสามารถแก้ไขหรือยกเลิกคิวงานที่ <b>"ยังไม่ถึงกำหนดวันที่จอง"</b> ได้ด้วยตนเอง โดย:
                                        </p>
                                        <ol className="text-[10px] text-slate-600 space-y-1 list-decimal pl-4 mb-2">
                                            <li>ไปที่เมนูด้านล่าง <b><Icons.List /> งานฉัน</b></li>
                                            <li>หาคิวงานที่ต้องการ กดที่ปุ่ม <b><Icons.MoreVertical /> (จุด 3 จุด)</b> มุมขวาบนของการ์ด</li>
                                            <li>เลือก <b>✏️ แก้ไขข้อมูล</b> หรือ <b>🗑️ ยกเลิกคิวงาน</b></li>
                                        </ol>
                                        <div className="bg-red-50 p-2 rounded border border-red-100 text-red-600 text-[9px] font-bold">
                                            * หากเลยกำหนดวันที่จองไปแล้ว จะไม่สามารถแก้ไข/ยกเลิกด้วยตนเองได้ ต้องติดต่อ Admin เท่านั้น
                                        </div>
                                    </div>

                                    <button type="button" onClick={() => setShowBookingHelp(false)} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl mt-4 shadow-md active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                                        เข้าใจแล้ว, กลับไปหน้าฟอร์มจองคิว
                                    </button>
                                </div>
                            ) : (
                                <div className="p-5 overflow-y-auto max-h-[75vh] custom-scrollbar">
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
                                                        <h4 className="text-xs font-bold text-amber-800 mb-2 border-b border-amber-200 pb-1">⚙️ [Admin] แก้ไขวันที่/ผู้ตรวจ</h4>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="text-[10px] font-bold text-amber-700">แก้ไขวันที่</label>
                                                                <input type="date" name="admin_date_target" defaultValue={modal.data.date ? formatSafeDate(modal.data.date) : ''} className="w-full text-sm p-2 rounded-lg border border-amber-300 outline-none" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[10px] font-bold text-amber-700">ย้ายผู้ตรวจ</label>
                                                                <select name="admin_inspector_target" defaultValue={modal.data.inspector_name} className="w-full text-sm p-2 rounded-lg border border-amber-300 outline-none font-bold">
                                                                {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <input type="hidden" name="isAdminOverride" value="true" />
                                                    </div>
                                                )}

                                                {!isAdmin && (
                                                    <div className="flex gap-2">
                                                        <div className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-200"><span className="text-[10px] text-slate-500 block">วันที่จอง</span><span className="font-bold text-slate-800 text-sm">{formatSafeDate(modal.data.date)}</span></div>
                                                        <div className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-200"><span className="text-[10px] text-slate-500 block">ผู้ตรวจ</span><span className="font-bold text-blue-600 text-sm">{modal.data.inspector_name}</span></div>
                                                    </div>
                                                )}
                                                
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Product Line <span className="text-red-500">*</span></label>
                                                        <select name="product_line" value={productLineSelection} onChange={e => setProductLineSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                            <option value="" disabled>--เลือก--</option>
                                                            {allowedCerts.map(cert => (
                                                                <option key={cert} value={cert}>{cert}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 mb-1 block">ประเภทงาน <span className="text-red-500">*</span></label>
                                                        <select name="job_type" value={jobTypeSelection} onChange={e => setJobTypeSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                            <option value="" disabled>--เลือก--</option>
                                                            <option value="New">New</option>
                                                            <option value="MOD">MOD</option>
                                                            <option value="Re-ins temporary power supply">Re-ins temporary</option>
                                                            <option value="Re-ins builder lift">Re-ins builder lift</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {productLineSelection === 'อื่นๆโปรดระบุ' && <div><input type="text" name="custom_product_line" required placeholder="โปรดระบุ Product Line..." className="w-full text-sm p-2.5 rounded-lg bg-yellow-50 border border-yellow-300" defaultValue={modal.data.product_line} /></div>}

                                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">พื้นที่ <span className="text-red-500">*</span></label>
                                                <select name="area" value={areaSelection} onChange={e => setAreaSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                    <option value="" disabled>--เลือก--</option>
                                                    <option value="กรุงเทพและปริมณฑล">กรุงเทพและปริมณฑล</option>
                                                    <option value="other">ต่างจังหวัด (โปรดระบุ)</option>
                                                </select></div>
                                                {areaSelection === 'other' && <div><input type="text" name="custom_area" required placeholder="ระบุจังหวัด..." className="w-full text-sm p-2.5 rounded-lg bg-pink-50 border border-pink-300" defaultValue={modal.data.area} /></div>}

                                                {/* 📍 ปรับแก้ placeholder ตามที่ต้องการ */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Eq No. <span className="text-red-500">*</span></label>
                                                        <input type="text" name="equipment_no" required placeholder="เช่น 11731095" defaultValue={modal.data.equipment_no} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Unit No. {!isAdmin && <span className="text-red-500">*</span>}</label>
                                                        <input type="text" name="unit_no" required={!isAdmin} placeholder="เช่น L1,PL1,SL1,FL1" defaultValue={modal.data.unit_no} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" />
                                                    </div>
                                                </div>

                                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อโครงการ <span className="text-red-500">*</span></label><input type="text" name="site_name" required placeholder="ระบุชื่อโครงการ" defaultValue={modal.data.site_name ? modal.data.site_name.replace(/^\d{2}:\d{2}-\d{2}:\d{2}\s/, '') : ''} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                                
                                                {isAdmin && (
                                                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                                        <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่มงาน (ไม่บังคับ)</label><input type="time" name="job_start_time" className="w-full text-sm p-2 border border-slate-300 rounded-lg outline-none" defaultValue={modal.data.site_name ? (modal.data.site_name.match(/^(\d{2}:\d{2})-\d{2}:\d{2}/) ? modal.data.site_name.match(/^(\d{2}:\d{2})-\d{2}:\d{2}/)[1] : '') : ''} /></div>
                                                        <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเลิกงาน (ไม่บังคับ)</label><input type="time" name="job_end_time" className="w-full text-sm p-2 border border-slate-300 rounded-lg outline-none" defaultValue={modal.data.site_name ? (modal.data.site_name.match(/^\d{2}:\d{2}-(\d{2}:\d{2})/) ? modal.data.site_name.match(/^\d{2}:\d{2}-(\d{2}:\d{2})/)[1] : '') : ''} /></div>
                                                    </div>
                                                )}

                                                {/* 📍 ปรับแก้ Label ตามที่ต้องการ */}
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">เบอร์ติดต่อหน้างาน {!isAdmin && <span className="text-red-500">*</span>}</label>
                                                    <input type="tel" name="tel" required={!isAdmin} maxLength="10" placeholder="08XXXXXXXX" defaultValue={modal.data.tel} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} />
                                                </div>

                                                {/* 📍 ปรับแก้ Label และ Placeholder ตามที่ต้องการ */}
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Google Maps (ตำแหน่งของไซต์งาน)</label>
                                                    <input type="text" name="map_link" placeholder="ใส่ชื่อสถานที่หรือ link ระบบจะหาตำแหน่งให้" defaultValue={modal.data.map_link} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" onChange={(e) => handleMapChange(e.target.value)} />
                                                    {liveMapUrl && <iframe src={liveMapUrl} className="map-preview mt-2 w-full h-48 rounded-xl border border-slate-200 bg-slate-50" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>}
                                                </div>

                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mt-4">
                                                    <h4 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2"><Icons.Upload /> อัปโหลดเอกสารแนบ (รูปภาพ)</h4>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                            <div className="flex-1"><label className="text-xs font-bold text-slate-700 block">1. Layout</label><input type="hidden" name="layout_img" id="layout_img_input" defaultValue={modal.data.layout_img} /></div>
                                                            <div className="flex items-center gap-2">
                                                                {modal.data.layout_img && <a href={modal.data.layout_img} target="_blank" className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded">ดูไฟล์</a>}
                                                                <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700">{uploadingDoc.layout ? 'กำลังอัปโหลด...' : 'เลือกรูป'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'layout')} disabled={uploadingDoc.layout} /></label>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                            <div className="flex-1"><label className="text-xs font-bold text-slate-700 block">2. Wiring</label><input type="hidden" name="wiring_img" id="wiring_img_input" defaultValue={modal.data.wiring_img} /></div>
                                                            <div className="flex items-center gap-2">
                                                                {modal.data.wiring_img && <a href={modal.data.wiring_img} target="_blank" className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded">ดูไฟล์</a>}
                                                                <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700">{uploadingDoc.wiring ? 'กำลังอัปโหลด...' : 'เลือกรูป'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'wiring')} disabled={uploadingDoc.wiring} /></label>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                            <div className="flex-1"><label className="text-xs font-bold text-slate-700 block">3. Pre-check</label><input type="hidden" name="precheck_img" id="precheck_img_input" defaultValue={modal.data.precheck_img} /></div>
                                                            <div className="flex items-center gap-2">
                                                                {modal.data.precheck_img && <a href={modal.data.precheck_img} target="_blank" className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded">ดูไฟล์</a>}
                                                                <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700">{uploadingDoc.precheck ? 'กำลังอัปโหลด...' : 'เลือกรูป'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'precheck')} disabled={uploadingDoc.precheck} /></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {isAdmin && (
                                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-4">
                                                        <h4 className="text-sm font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2 flex items-center gap-2"><Icons.Shield /> สำหรับ Admin ตรวจเอกสาร</h4>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <label className="admin-check-item flex flex-col items-center justify-center p-2 bg-white rounded-lg border cursor-pointer hover:bg-slate-50"><input type="checkbox" name="layout_doc" defaultChecked={String(modal.data.layout_doc) === 'true'} /> <span className="text-xs mt-1 font-bold text-slate-700">Layout</span></label>
                                                            <label className="admin-check-item flex flex-col items-center justify-center p-2 bg-white rounded-lg border cursor-pointer hover:bg-slate-50"><input type="checkbox" name="wiring_doc" defaultChecked={String(modal.data.wiring_doc) === 'true'} /> <span className="text-xs mt-1 font-bold text-slate-700">Wiring</span></label>
                                                            <label className="admin-check-item flex flex-col items-center justify-center p-2 bg-white rounded-lg border cursor-pointer hover:bg-slate-50"><input type="checkbox" name="precheck_doc" defaultChecked={String(modal.data.precheck_doc) === 'true'} /> <span className="text-xs mt-1 font-bold text-slate-700">Precheck</span></label>
                                                        </div>
                                                    </div>
                                                )}

                                                {isAdmin && !modal.data.id && (
                                                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mt-4 flex items-center gap-3">
                                                        <input type="checkbox" id="keep_open" name="keep_open" className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                                                        <label htmlFor="keep_open" className="text-sm font-bold text-emerald-800 cursor-pointer select-none">
                                                            จองคิวงานต่อเนื่อง <span className="text-xs font-normal">(ไม่ปิดหน้าต่างนี้)</span>
                                                        </label>
                                                    </div>
                                                )}

                                                <button disabled={loadingMsg || uploadingDoc.layout || uploadingDoc.wiring || uploadingDoc.precheck} className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 shadow-md mt-6 active:scale-95 transition-all text-sm">
                                                    {loadingMsg ? 'กำลังบันทึก...' : (modal.data.id ? 'บันทึกการแก้ไข' : 'ยืนยันการจองคิว')}
                                                </button>
                                            </form>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    )}

                    {modal?.type === 'manage_leaves' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-amber-500 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.User /> จัดการวันลา</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มวันลาใหม่</h4>
                                    <div className="space-y-3">
                                        
                                        {/* 📍 Dropdown เลือกพนักงานแบบ Multi-select */}
                                        <div className="relative">
                                            <div className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white font-bold cursor-pointer flex justify-between items-center" onClick={() => setShowLeaveDropdown(!showLeaveDropdown)}>
                                                <span className={`truncate ${leaveInspectors.length === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                                                    {leaveInspectors.length === 0 ? '-- เลือกพนักงาน --' : leaveInspectors.includes('ALL') ? 'ทุกคน' : leaveInspectors.join(', ')}
                                                </span>
                                                <span className="text-slate-400 text-xs">▼</span>
                                            </div>
                                            {showLeaveDropdown && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
                                                    <label className="flex items-center gap-2 p-3 hover:bg-amber-50 cursor-pointer border-b border-slate-100">
                                                        <input type="checkbox" checked={leaveInspectors.includes('ALL')} onChange={(e) => {
                                                            if (e.target.checked) setLeaveInspectors(['ALL']);
                                                            else setLeaveInspectors([]);
                                                        }} className="accent-amber-500 w-4 h-4" />
                                                        <span className="font-bold text-amber-800 text-sm">ทุกคน</span>
                                                    </label>
                                                    {(db.inspectors || []).map(i => (
                                                        <label key={i.name} className="flex items-center gap-2 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0">
                                                            <input type="checkbox" checked={leaveInspectors.includes(i.name)} onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setLeaveInspectors(prev => prev.includes('ALL') ? [i.name] : [...prev, i.name]);
                                                                } else {
                                                                    setLeaveInspectors(prev => prev.filter(name => name !== i.name));
                                                                }
                                                            }} className="accent-amber-500 w-4 h-4" />
                                                            <span className="text-slate-700 font-bold text-sm">{i.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={leaveStartDate} onChange={(e) => setLeaveStartDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={leaveEndDate} onChange={(e) => setLeaveEndDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่ม (ถ้ามี)</label><input type="time" value={leaveStartTime} onChange={(e) => setLeaveStartTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาสิ้นสุด (ถ้ามี)</label><input type="time" value={leaveEndTime} onChange={(e) => setLeaveEndTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs" /></div>
                                        </div>
                                        <select className="w-full p-2.5 text-sm border border-slate-300 rounded-lg font-bold" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                            <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option><option value="อื่นๆโปรดระบุ">อื่นๆ (ระบุเอง)</option>
                                        </select>
                                        {leaveType === 'อื่นๆโปรดระบุ' && <input type="text" placeholder="ระบุประเภทการลา..." value={customLeaveType} onChange={(e) => setCustomLeaveType(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-amber-50" />}
                                        <button onClick={async () => {
                                            if(leaveInspectors.length === 0 || !leaveStartDate || !leaveEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ และเลือกพนักงานที่ต้องการลา');
                                            if(leaveStartDate > leaveEndDate) return setAlertMsg('วันที่เริ่มต้องไม่มากกว่าวันสิ้นสุด');
                                            
                                            let finalType = leaveType === 'อื่นๆโปรดระบุ' ? customLeaveType : leaveType;
                                            if(leaveStartTime && leaveEndTime) finalType = `${leaveStartTime}-${leaveEndTime} ${finalType}`;
                                            
                                            setLoadingMsg('กำลังสร้างวันลา...');
                                            let targets = leaveInspectors.includes('ALL') ? (db.inspectors || []).map(i => i.name) : leaveInspectors;
                                            let successCount = 0;
                                            
                                            for (let target of targets) {
                                                const logDetail = `[เพิ่มวันลา]\nโดย: ${user?.username}\nพนักงาน: ${target}\nประเภท: ${finalType}\nตั้งแต่วันที่: ${leaveStartDate} ถึง ${leaveEndDate}`;
                                                const payload = { action: 'create_multiple_bookings', dates: leaveDates, inspector_name: target, job_type: 'leave', site_name: finalType, equipment_no: `LEAVE_${Date.now()}_${Math.floor(Math.random()*1000)}`, user: user?.username, reason: logDetail };
                                                const ok = await apiAction(payload, null, true); // ปิด auto sync ชั่วคราว
                                                if(ok) successCount++;
                                            }
                                            
                                            await fetchCoreData(true, null); // อัปเดตข้อมูลเมื่อทำลูปเสร็จ
                                            setLoadingMsg(null);
                                            setSuccessModal(`เพิ่มวันลาสำเร็จ ${successCount} รายการ`); 
                                            setLeaveStartDate(''); setLeaveEndDate(''); setLeaveStartTime(''); setLeaveEndTime(''); 
                                            setLeaveInspectors([]); setShowLeaveDropdown(false);
                                        }} className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl active:scale-95 shadow-md flex justify-center items-center gap-2"><Icons.Plus /> เพิ่มวันลา ({leaveDates.length} วัน)</button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                    <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-slate-700 text-sm">รายการวันลาทั้งหมด</h4>{selectedLeavesToDelete.length > 0 && <button onClick={() => handleBulkDelete('leave', selectedLeavesToDelete)} className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">ลบที่เลือก ({selectedLeavesToDelete.length})</button>}</div>
                                    <div className="space-y-2">
                                        {(db.bookings || []).filter(b => b.job_type === 'leave' || String(b.equipment_no).startsWith('LEAVE_')).map(l => (
                                            <div key={l.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="w-4 h-4 accent-amber-500" checked={selectedLeavesToDelete.includes(l.id)} onChange={(e) => setSelectedLeavesToDelete(prev => e.target.checked ? [...prev, l.id] : prev.filter(id => id !== l.id))} />
                                                    <div><div className="font-bold text-slate-800 text-xs">{l.inspector_name}</div><div className="text-[10px] text-amber-600">{formatSafeDate(l.date)} • {l.site_name}</div></div>
                                                </div>
                                                <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_leaves' })} className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Icons.Edit /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_events' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-emerald-500 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.Star /> จัดการกิจกรรม</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มกิจกรรมใหม่</h4>
                                    <div className="space-y-3">
                                        <input type="text" id="event_name_input" placeholder="ชื่อกิจกรรม..." className="w-full p-2.5 text-sm border border-slate-300 rounded-lg font-bold" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่ม (ถ้ามี)</label><input type="time" value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาสิ้นสุด (ถ้ามี)</label><input type="time" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs" /></div>
                                        </div>
                                        
                                        {/* 📍 Dropdown เลือกพนักงานเข้าร่วมกิจกรรมแบบ Multi-select */}
                                        <div className="relative">
                                            <div className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white font-bold cursor-pointer flex justify-between items-center" onClick={() => setShowEventDropdown(!showEventDropdown)}>
                                                <span className={`truncate ${eventInspectors.length === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                                                    {eventInspectors.length === 0 ? '-- เลือกผู้เข้าร่วม --' : eventInspectors.includes('ALL') ? 'ทุกคน (กิจกรรมรวม)' : eventInspectors.join(', ')}
                                                </span>
                                                <span className="text-slate-400 text-xs">▼</span>
                                            </div>
                                            {showEventDropdown && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
                                                    <label className="flex items-center gap-2 p-3 hover:bg-emerald-50 cursor-pointer border-b border-slate-100">
                                                        <input type="checkbox" checked={eventInspectors.includes('ALL')} onChange={(e) => {
                                                            if (e.target.checked) setEventInspectors(['ALL']);
                                                            else setEventInspectors([]);
                                                        }} className="accent-emerald-500 w-4 h-4" />
                                                        <span className="font-bold text-emerald-800 text-sm">ทุกคน (แสดงเป็นการ์ดรวม)</span>
                                                    </label>
                                                    {(db.inspectors || []).map(i => (
                                                        <label key={i.name} className="flex items-center gap-2 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0">
                                                            <input type="checkbox" checked={eventInspectors.includes(i.name)} onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setEventInspectors(prev => prev.includes('ALL') ? [i.name] : [...prev, i.name]);
                                                                } else {
                                                                    setEventInspectors(prev => prev.filter(name => name !== i.name));
                                                                }
                                                            }} className="accent-emerald-500 w-4 h-4" />
                                                            <span className="text-slate-700 font-bold text-sm">{i.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <button onClick={async () => {
                                            const eName = document.getElementById('event_name_input').value;
                                            if(!eName || !eventStartDate || !eventEndDate || eventInspectors.length === 0) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ และเลือกผู้เข้าร่วมกิจกรรม');
                                            
                                            let finalName = eName; 
                                            if(eventStartTime && eventEndTime) finalName = `${eventStartTime}-${eventEndTime} ${eName}`;
                                            
                                            setLoadingMsg('กำลังสร้างกิจกรรม...');
                                            
                                            let targets = eventInspectors.includes('ALL') ? ['SYSTEM_EVENT'] : eventInspectors;
                                            let successCount = 0;
                                            
                                            for (let target of targets) {
                                                const logDetail = `[เพิ่มกิจกรรม]\nโดย: ${user?.username}\nชื่อ: ${finalName}\nผู้เข้าร่วม: ${target}\nตั้งแต่วันที่: ${eventStartDate} ถึง ${eventEndDate}`;
                                                const payload = { 
                                                    action: 'create_multiple_bookings', 
                                                    dates: eventDates, 
                                                    inspector_name: target, 
                                                    job_type: 'company_event', 
                                                    site_name: finalName, 
                                                    equipment_no: `EVENT_${Date.now()}_${Math.floor(Math.random()*1000)}`, 
                                                    user: user?.username, 
                                                    reason: logDetail 
                                                };
                                                const res = await apiAction(payload, null, true); // ปิด auto sync
                                                if(res) successCount++;
                                            }
                                            
                                            await fetchCoreData(true, null); // โหลดทีเดียวตอนจบลูป
                                            setLoadingMsg(null);
                                            setSuccessModal(`สร้างกิจกรรมสำเร็จ ${successCount} รายการ`);
                                            setEventStartDate(''); setEventEndDate(''); setEventStartTime(''); setEventEndTime(''); 
                                            document.getElementById('event_name_input').value = ''; 
                                            setEventInspectors([]); setShowEventDropdown(false);
                                        }} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl active:scale-95 shadow-md flex justify-center items-center gap-2">
                                            <Icons.Plus /> สร้างกิจกรรม
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                    <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-slate-700 text-sm">รายการกิจกรรมทั้งหมด</h4>{selectedEventsToDelete.length > 0 && <button onClick={() => handleBulkDelete('event', selectedEventsToDelete)} className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">ลบที่เลือก ({selectedEventsToDelete.length})</button>}</div>
                                    <div className="space-y-2">
                                        {(db.bookings || []).filter(b => b.inspector_name === 'SYSTEM_EVENT' || String(b.equipment_no).startsWith('EVENT_')).map(l => (
                                            <div key={l.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="w-4 h-4 accent-emerald-500" checked={selectedEventsToDelete.includes(l.id)} onChange={(e) => setSelectedEventsToDelete(prev => e.target.checked ? [...prev, l.id] : prev.filter(id => id !== l.id))} />
                                                    <div><div className="font-bold text-slate-800 text-xs">{l.site_name}</div><div className="text-[10px] text-emerald-600">{formatSafeDate(l.date)} • {l.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : l.inspector_name}</div></div>
                                                </div>
                                                <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_events' })} className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Icons.Edit /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_holidays' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-red-600 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.CalendarX /> จัดการวันหยุด</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
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
                                            const logDetail = `[เพิ่มวันหยุด]\nโดย: ${user?.username}\nชื่อวันหยุด: ${hName}\nตั้งแต่วันที่: ${holidayStartDate} ถึง ${holidayEndDate}`;
                                            const ok = await apiAction({ action: 'create_multiple_bookings', dates: holidayDates, inspector_name: 'SYSTEM_HOLIDAY', job_type: 'public_holiday', site_name: hName, equipment_no: `HLD_${Date.now()}`, user: user?.username, reason: logDetail }, 'กำลังสร้างวันหยุด...');
                                            if(ok) { setSuccessModal(`สร้างวันหยุดสำเร็จ ${holidayDates.length} วัน`); setHolidayStartDate(''); setHolidayEndDate(''); document.getElementById('holiday_name_input').value = ''; }
                                        }} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl active:scale-95 shadow-md flex justify-center items-center gap-2"><Icons.Plus /> กำหนดวันหยุด ({holidayDates.length} วัน)</button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                    <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-slate-700 text-sm">รายการวันหยุดทั้งหมด</h4>{selectedHolidaysToDelete.length > 0 && <button onClick={() => handleBulkDelete('holiday', selectedHolidaysToDelete)} className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">ลบที่เลือก ({selectedHolidaysToDelete.length})</button>}</div>
                                    <div className="space-y-2">
                                        {(db.bookings || []).filter(b => b.inspector_name === 'SYSTEM_HOLIDAY' || String(b.equipment_no).startsWith('HLD_')).map(l => (
                                            <div key={l.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="w-4 h-4 accent-red-600" checked={selectedHolidaysToDelete.includes(l.id)} onChange={(e) => setSelectedHolidaysToDelete(prev => e.target.checked ? [...prev, l.id] : prev.filter(id => id !== l.id))} />
                                                    <div><div className="font-bold text-slate-800 text-xs">{l.site_name}</div><div className="text-[10px] text-red-600">{formatSafeDate(l.date)}</div></div>
                                                </div>
                                                <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_holidays' })} className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Icons.Edit /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Basic Dialogs (Alert, Confirm, Prompt, etc.) */}
            {alertMsg && (
                <div className="backdrop z-[500] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl animate-pop">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                        <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95 shadow-md">ตกลง</button>
                    </div>
                </div>
            )}
            {confirmDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยันการทำรายการ</h3>
                        <div className="text-sm text-slate-600 mb-6 whitespace-pre-line">{confirmDialog.msg}</div>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm active:scale-95">ยกเลิก</button>
                            <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95">ยืนยัน</button>
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
                            <button onClick={() => setPromptDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm active:scale-95">ยกเลิก</button>
                            <button onClick={() => { const v = document.getElementById('prompt_input').value; if(!v) return setAlertMsg('กรุณาระบุเหตุผล'); promptDialog.onSubmit(v); }} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 📍 Notification & History Modal */}
            {showActivityModal && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6 h-[85vh] flex flex-col">
                        <button onClick={() => setShowActivityModal(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 flex-shrink-0">ศูนย์แจ้งเตือนและประวัติ</h3>
                        
                        {!hasLoadedAdmin && activityTab === 'logs' ? (
                             <div className="flex flex-col items-center justify-center p-10 text-slate-400 gap-4 flex-1">
                                  <Icons.Loader /> กำลังดึงประวัติระบบ...
                             </div>
                        ) : (
                            <>
                                <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg flex-shrink-0">
                                    <button onClick={() => setActivityTab('notif')} className={`flex-1 py-2 text-xs font-bold rounded-md ${activityTab === 'notif' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>การแจ้งเตือน</button>
                                    <button onClick={() => { setActivityTab('logs'); if(!hasLoadedAdmin) fetchAdminData(0, 50, 'logs'); }} className={`flex-1 py-2 text-xs font-bold rounded-md ${activityTab === 'logs' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>Audit Trail (ประวัติ)</button>
                                </div>

                                {activityTab === 'logs' && (
                                    <div className="mb-3 flex-shrink-0">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Icons.Search /></div>
                                            <input type="text" placeholder="ค้นหา หัวข้อโครงการ หรือ ผู้ทำการ..." 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-400 font-bold text-slate-700"
                                                value={localLogSearchQuery} onChange={(e) => setLocalLogSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scrollbar">
                                    {activityTab === 'notif' && (
                                        <>
                                            {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN') || (!user && n.target === 'ALL')).map((n, i) => (
                                                <div key={i} onClick={() => markNotifAsRead(n.id)} className={`p-3 rounded-xl border cursor-pointer transition-all ${String(n.isRead) === 'true' ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-blue-50 border-blue-200 shadow-sm'}`}>
                                                    <div className="text-xs font-bold text-slate-800">{n.message}</div>
                                                    <div className="text-[9px] text-slate-400 mt-1 text-right">{new Date(n.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</div>
                                                </div>
                                            ))}
                                            {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN') || (!user && n.target === 'ALL')).length === 0 && <p className="text-center text-slate-400 text-sm py-10">ไม่มีข้อความใหม่</p>}
                                        </>
                                    )}
                                    
                                    {activityTab === 'logs' && (
                                        <>
                                            {(() => {
                                                const filteredLogs = (adminDb.logs || []).filter(log => {
                                                    if (!logSearchQuery) return true;
                                                    const q = logSearchQuery.toLowerCase();
                                                    return String(log.user || '').toLowerCase().includes(q) || 
                                                           String(log.action || '').toLowerCase().includes(q) || 
                                                           String(log.details || '').toLowerCase().includes(q);
                                                }).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

                                                if (filteredLogs.length === 0) return <div className="text-center text-slate-400 text-sm py-10">ไม่พบประวัติที่ค้นหา</div>;

                                                return (
                                                    <>
                                                        {filteredLogs.slice(0, logsLimit).map((log, i) => (
                                                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Icons.User /></div>
                                                                        <div className="text-[10px] font-bold text-slate-700">{log.user}</div>
                                                                    </div>
                                                                    <div className="text-[9px] text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                                        {new Date(log.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                    </div>
                                                                </div>
                                                            
                                                                <div className="mb-2">
                                                                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold inline-block
                                                                        ${String(log.action).includes('CREATE') || String(log.action).includes('เพิ่ม') ? 'bg-green-100 text-green-700' : 
                                                                          String(log.action).includes('UPDATE') || String(log.action).includes('แก้ไข') ? 'bg-blue-100 text-blue-700' : 
                                                                          String(log.action).includes('DELETE') || String(log.action).includes('ลบ') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                                                                        {log.action}
                                                                    </span>
                                                                </div>

                                                                <div className="text-[11px] font-mono text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                                    {log.details}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {logsLimit < filteredLogs.length && (
                                                            <button onClick={() => {
                                                                setLogsLimit(prev => prev + 20);
                                                                fetchAdminData(logsLimit, 20, 'logs');
                                                            }} className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs mt-2 hover:bg-blue-100 transition-all">
                                                                โหลดประวัติเพิ่มเติม... ({logsLimit} / {filteredLogs.length})
                                                            </button>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
               </div>
            )}

            {/* 📍 Login & Register Modal พร้อมคู่มือสมัครสมาชิก */}
            {showLogin && (
                <div className="backdrop z-[250]">
                    <div className="modal-card p-6 relative overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-red-500 z-10"></div>
                        <button onClick={() => { setShowLogin(false); setIsRegisterMode(false); setIsForgotMode(false); setShowLoginHelp(false); }} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 z-10"><Icons.X /></button>
                        
                        <div className="text-center mb-6 pt-4 flex-shrink-0">
                            <div className="mb-3">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">SAIS</h1>
                                <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Schedule Booking System</h2>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                                    {showLoginHelp ? 'คู่มือการสมัครสมาชิก' : (isForgotMode ? 'รีเซ็ตรหัสผ่าน' : (isRegisterMode ? 'สมัครสมาชิกใหม่' : 'เข้าสู่ระบบ'))}
                                </h2>
                                {!showLoginHelp && (
                                    <button onClick={() => setShowLoginHelp(true)} className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1 active:scale-95"><Icons.HelpCircle /> วิธีสมัคร</button>
                                )}
                            </div>
                        </div>

                        {showLoginHelp ? (
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 pb-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                    <p className="text-xs text-slate-600 leading-relaxed text-center font-bold">เพื่อความปลอดภัยของข้อมูลคิวงาน การเข้าใช้งานระบบ SAIS Booking ต้องได้รับการอนุมัติจาก Admin เท่านั้น</p>
                                </div>
                                
                                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                    
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">1</div>
                                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl shadow-sm border border-slate-200 ml-4 md:ml-0">
                                            <div className="flex items-center gap-2 mb-2"><Icons.UserPlus /><h4 className="font-bold text-sm text-slate-800">กรอกข้อมูลสมัคร</h4></div>
                                            <p className="text-[10px] text-slate-500 leading-relaxed">กดปุ่ม <b>"ยังไม่มีบัญชี? สมัครสมาชิกที่นี่"</b> ในหน้าล็อกอิน กรอกชื่อ, แผนก, อีเมล (schindler.com) และตั้ง Username/Password ให้ครบถ้วน แล้วกดยืนยัน</p>
                                        </div>
                                    </div>

                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-500 text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">2</div>
                                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl shadow-sm border border-slate-200 ml-4 md:ml-0">
                                            <div className="flex items-center gap-2 mb-2"><Icons.Clock /><h4 className="font-bold text-sm text-slate-800">รอ Admin อนุมัติ</h4></div>
                                            <p className="text-[10px] text-slate-500 leading-relaxed">ข้อมูลของคุณจะถูกส่งเข้าระบบ รอให้แอดมินหรือหัวหน้างานตรวจสอบและกด <b>"อนุมัติ (Approve)"</b> ในฐานข้อมูล</p>
                                        </div>
                                    </div>

                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-500 text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">3</div>
                                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl shadow-sm border border-slate-200 ml-4 md:ml-0">
                                            <div className="flex items-center gap-2 mb-2"><Icons.Shield /><h4 className="font-bold text-sm text-slate-800">เข้าสู่ระบบได้ทันที</h4></div>
                                            <p className="text-[10px] text-slate-500 leading-relaxed">เมื่อได้รับการอนุมัติแล้ว คุณสามารถใช้ Username และ Password ที่ตั้งไว้ เข้าสู่ระบบเพื่อเริ่มจองคิวงานได้เลย!</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => { setShowLoginHelp(false); setIsRegisterMode(true); }} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md mt-2 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">ไปหน้าสมัครสมาชิก <Icons.ChevronRight /></button>
                                <button onClick={() => setShowLoginHelp(false)} className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl mt-2 active:scale-95 transition-all text-sm">กลับไปหน้าล็อกอิน</button>
                            </div>
                        ) : (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                
                                if (isForgotMode) {
                                    if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านใหม่ไม่ตรงกัน');
                                    const payload = { 
                                        action: 'reset_password', 
                                        username: fd.get('username'), 
                                        full_name: fd.get('full_name'), 
                                        phone: fd.get('phone'),
                                        new_password: fd.get('password')
                                    };
                                    const res = await apiAction(payload, 'กำลังรีเซ็ตรหัสผ่าน...');
                                    if (res) { 
                                        setSuccessModal('เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบใหม่');
                                        setIsForgotMode(false); 
                                    }
                                } 
                                else if (isRegisterMode) {
                                    if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านไม่ตรงกัน');
                                    const payload = { 
                                        action: 'register', 
                                        username: fd.get('username'), 
                                        password: fd.get('password'),
                                        full_name: fd.get('full_name'), 
                                        department: fd.get('department'), 
                                        position: fd.get('position'), 
                                        email: fd.get('email'), 
                                        phone: fd.get('phone')
                                    };
                                    const res = await apiAction(payload, 'กำลังส่งข้อมูลสมัครสมาชิก...');
                                    if (res) { setSuccessModal('สมัครสำเร็จ รอแอดมินอนุมัติ'); setIsRegisterMode(false); }
                                } 
                                else {
                                    setLoadingMsg('กำลังตรวจสอบข้อมูล...');
                                    try {
                                        const result = await utils.fetchWithRetry(SCRIPT_URL, { 
                                            method: 'POST', 
                                            body: JSON.stringify({ action: 'login', username: fd.get('username'), password: fd.get('password') }) 
                                        });
                                        setLoadingMsg(null);
                                        if (result.status === 'ok') { 
                                            localStorage.setItem('sais_user', JSON.stringify(result.user));
                                            localStorage.setItem('sais_session_time', Date.now().toString());
                                            setUser(result.user); 
                                            setShowLogin(false); 
                                            setSuccessModal('เข้าสู่ระบบสำเร็จ'); 
                                        } else {
                                            setAlertMsg(result.message || 'รหัสผ่านไม่ถูกต้อง');
                                        }
                                    } catch (err) { 
                                        setLoadingMsg(null);
                                        setAlertMsg('การเชื่อมต่อขัดข้อง หรือเซิร์ฟเวอร์ไม่ตอบสนอง');
                                    }
                                }
                            }} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-4">
                                

                                {isForgotMode ? (
                                    <div className="space-y-3 pb-2 border-b border-slate-100">
                                        <div><label className="text-[10px] font-bold text-slate-500">Username</label><input name="username" required placeholder="ระบุ Username ของคุณ" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล (ที่ใช้สมัคร)</label><input name="full_name" required placeholder="ระบุชื่อ-นามสกุล" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์ (ที่ใช้สมัคร)</label><input type="tel" name="phone" required placeholder="08XXXXXXXX" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                    </div>
                                ) : isRegisterMode && (
                                    <div className="space-y-3 pb-2 border-b border-slate-100">
                                        <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล</label><input name="full_name" required placeholder="ระบุชื่อ-นามสกุล" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500">แผนก</label><input name="department" required placeholder="เช่น NI , MOD" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500">ตำแหน่ง</label><input name="position" required placeholder="เช่น PE,PM" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500">อีเมล</label><input type="email" name="email" required placeholder="@schindler.com" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์</label><input type="tel" name="phone" required placeholder="08XXXXXXXX" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        </div>
                                    </div>
                                )}
                                
                                {!isForgotMode && (
                                    <div><label className="text-[10px] font-bold text-slate-500">Username (ใช้ล็อกอิน)</label><input name="username" required placeholder="Username" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm font-bold" /></div>
                                )}
                                
                                <div className="relative">
                                    <label className="text-[10px] font-bold text-slate-500">{isForgotMode ? 'ตั้งรหัสผ่านใหม่' : 'Password'}</label>
                                    <input name="password" type={showPassword ? "text" : "password"} required placeholder={isForgotMode ? "New Password" : "Password"} className="bg-slate-50 pr-12 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm font-bold" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[26px] text-slate-400 p-1 hover:bg-slate-200 rounded-full">{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                                </div>
                                
                                {(isRegisterMode || isForgotMode) && (
                                    <div><label className="text-[10px] font-bold text-slate-500">ยืนยันรหัสผ่านอีกครั้ง</label><input name="confirm_password" type={showPassword ? "text" : "password"} required placeholder="Confirm Password" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm font-bold" /></div>
                                )}

                                <button disabled={loadingMsg} className="w-full py-3.5 rounded-xl text-white font-bold bg-red-600 mt-4 shadow-md active:scale-95 transition-all text-sm">
                                    {loadingMsg ? 'รอสักครู่...' : (isForgotMode ? 'ยืนยันการเปลี่ยนรหัสผ่าน' : (isRegisterMode ? 'ส่งข้อมูลสมัครสมาชิก' : 'LOGIN'))}
                                </button>
                                
                                <div className="text-center mt-4">
                                    {!isForgotMode && !isRegisterMode && (
                                        <>
                                            <button type="button" onClick={() => setIsForgotMode(true)} className="text-xs font-bold text-red-500 hover:underline mb-3 block w-full">ลืมรหัสผ่าน?</button>
                                            <button type="button" onClick={() => setIsRegisterMode(true)} className="text-xs font-bold text-blue-600 hover:underline block w-full">ยังไม่มีบัญชี? สมัครสมาชิกที่นี่</button>
                                        </>
                                    )}
                                    {(isRegisterMode || isForgotMode) && (
                                        <button type="button" onClick={() => { setIsRegisterMode(false); setIsForgotMode(false); }} className="text-xs font-bold text-slate-500 hover:underline">กลับไปหน้าเข้าสู่ระบบ</button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// 📍 Error Boundary (ดักจับข้อผิดพลาดไม่ให้จอขาว)
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false, errorMsg: '' }; }
    static getDerivedStateFromError(error) { return { hasError: true, errorMsg: error.toString() }; }
    componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                    <div className="text-red-500 mb-4">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">ระบบขัดข้องชั่วคราว</h2>
                    <p className="text-sm text-slate-500 mb-6 bg-slate-200 p-3 rounded-lg max-w-md break-words">{this.state.errorMsg}</p>
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95">รีเฟรชหน้าเว็บ</button>
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
