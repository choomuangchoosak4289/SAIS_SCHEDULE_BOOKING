// sw.js
const CACHE_NAME = 'sais-enterprise-v3';

self.addEventListener('install', (event) => {
  // บังคับให้ Service Worker ตัวใหม่ติดตั้งและทำงานทันที ไม่ต้องรอให้ผู้ใช้ปิดแอป
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  // ล้าง Cache ตัวเก่าทิ้งทั้งหมดทันที
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  // เข้าควบคุมหน้าเว็บทันที
  self.clients.claim(); 
});

self.addEventListener('fetch', (event) => {
  // ข้ามการแคช API ของ Google ทิ้งไปเลย ป้องกันข้อมูลค้าง
  if (event.request.url.includes('script.google.com') || event.request.url.includes('googleusercontent.com')) {
    return;
  }
  
  // 📍 กลยุทธ์ Network First: พยายามดึงไฟล์ล่าสุดจากเซิร์ฟเวอร์ก่อนเสมอ!
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // ถ้าดึงไฟล์จาก GitHub สำเร็จ ให้เอาไฟล์ใหม่ไปเก็บลงแคชด้วย
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => {
        // ถ้าไม่มีเน็ต (ออฟไลน์) ค่อยเอาไฟล์จากแคชมาแสดงผล
        return caches.match(event.request);
      })
  );
});
