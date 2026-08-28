// utils.js
if (typeof localforage !== 'undefined') {
    window.DB_CACHE = localforage.createInstance({ name: 'SAIS_DB_CACHE' });
    window.DB_QUEUE = localforage.createInstance({ name: 'SAIS_OFFLINE_QUEUE' });
} else {
    window.DB_CACHE = { getItem: async () => null, setItem: async () => null };
    window.DB_QUEUE = { getItem: async () => [], setItem: async () => null };
}

window.SAIS_UTILS = {
    getLocalDateString: (dateObj) => {
        if (!dateObj || isNaN(dateObj.getTime())) return new Date().toISOString().split('T')[0];
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    
    getMapEmbedUrl: (link) => {
        if (!link) return null;
        let strLink = String(link).trim();
        if (strLink.includes("output=embed") || strLink.includes("pb=")) return strLink.replace("http://", "https://");
        try {
            const coordRegex = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
            const matchCoord = strLink.match(coordRegex);
            if (matchCoord) return `https://maps.google.com/maps?q=${matchCoord[1]},${matchCoord[2]}&hl=th&z=16&output=embed`;
            return `https://maps.google.com/maps?q=${encodeURIComponent(strLink)}&hl=th&z=16&output=embed`;
        } catch (e) { return null; }
    },

    exportToCSV: (bookingsData) => {
        if (!bookingsData || bookingsData.length === 0) { alert("ไม่มีข้อมูลให้ดาวน์โหลด"); return; }
        const headers = ["วันที่", "Eq No.", "Product Line", "Unit", "โครงการ", "พื้นที่", "ประเภท", "ผู้ตรวจ", "Layout", "Wiring", "Pre-check", "ผู้จอง"];
        const rows = bookingsData.map(b => [
            b.date ? String(b.date).split('T')[0] : '', 
            `"${b.equipment_no || ''}"`, `"${b.product_line || ''}"`, `"${b.unit_no || ''}"`, `"${b.site_name || ''}"`, 
            b.area || '', b.job_type || '', b.inspector_name || '',
            String(b.layout_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', String(b.wiring_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', String(b.precheck_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', b.created_by || ''
        ]);
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a"); link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", `SAIS_Report.csv`); 
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    },

    // 📍 อัปเดตระบบถ่ายภาพให้เสถียร 100% ด้วยการ Clone Node (กันภาพแหว่ง และลดปัญหา Memory เครื่องเต็ม)
    exportToJPG: (elementId) => {
        return new Promise(async (resolve, reject) => {
            if (typeof html2canvas === 'undefined') {
                alert('ระบบเตรียมรูปภาพกำลังโหลด รบกวนกดอีกครั้งครับ');
                return reject();
            }
            const element = document.getElementById(elementId);
            if (!element) {
                alert('ไม่พบตารางข้อมูล');
                return reject();
            }

            // 1. จำลอง Node ออกมาซ่อนไว้ เพื่อกางตารางให้เต็ม 100% โดยไม่ต้องคำนึงถึง Scroll
            const clone = element.cloneNode(true);
            document.body.appendChild(clone);
            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '-9999px';
            clone.style.width = 'max-content';
            clone.style.height = 'max-content';
            clone.style.overflow = 'visible';
            clone.style.background = '#f1f5f9';

            try {
                // 2. แคปเจอร์ภาพจาก Node จำลอง (ลดสเกลเหลือ 1.5 เพื่อไม่ให้เบราว์เซอร์มือถือเด้ง)
                const canvas = await html2canvas(clone, {
                    scale: 1.5, 
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#f1f5f9'
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.90);
                const link = document.createElement('a');
                link.download = `SAIS_Calendar_${new Date().getTime()}.jpg`;
                link.href = imgData;
                link.click();
                resolve();
            } catch (err) {
                console.error("Export Error:", err);
                alert("เกิดข้อผิดพลาด: สเปคเครื่องหรือหน่วยความจำอาจไม่พอ");
                reject(err);
            } finally {
                // 3. ลบ Node จำลองทิ้งเพื่อคืนพื้นที่ Memory
                document.body.removeChild(clone);
            }
        });
    },

    fetchWithRetry: async (url, options, retries = 3, delay = 2000) => {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (err) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return window.SAIS_UTILS.fetchWithRetry(url, options, retries - 1, delay * 2);
            } else { throw err; }
        }
    },

    compressImage: (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH; canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.6)); 
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
};
