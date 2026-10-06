# 6-р ангийн Мэдээллийн технологи — Онлайн шалгалт

Файлууд:
- index.html — шалгалтын веб хуудас
- style.css — загвар
- script.js — 10 асуулт, оноо тооцоолол, Google Sheet рүү илгээх
- Code.gs — Google Apps Script сервер

## Google Sheet холбох

1. Google Drive -> New -> Google Sheets.
2. Extensions -> Apps Script.
3. Code.gs файлын кодыг хуулж оруулна.
4. Save.
5. Deploy -> New deployment.
6. Type: Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Deploy дарна.
10. Гарч ирсэн Web app URL-ийг хуулна.
11. script.js дотор:
   const WEB_APP_URL = "ЭНД_WEB_APP_URL_ХИЙНЭ";
12. Файлуудаа GitHub Pages, Netlify, Vercel зэрэг HTTPS hosting дээр байрлуулж болно.

Google Sheet-д:
Огноо | Нэр | Анги | Оноо | Нийт оноо | Хувь | Хугацаа | Timestamp

## Анхаарах зүйл

Зураг дээрх гар бичмэлийн зарим үг, хариултын хувилбар тодорхой бус тул script.js-д
сэдэвтэй нь нийцүүлэн цэвэрлэж оруулсан хувилбар байна. Хэрэв багшийн эх тестийн
асуулт/сонголтыг яг үг үсгээр нь оруулах шаардлагатай бол эх бичмэлийн тод зураг
эсвэл шивсэн эхийг ашиглан questions массивыг солино.
