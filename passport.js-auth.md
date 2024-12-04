# Google va GitHub uchun **Client ID** va **Client Secret** olish bo'yicha batafsil yo'riqnoma taqdim etamiz.

Har bir bosqichda kerakli linklarni ham qo'shib boriladi.

---

# GOOGLE

## **Google uchun Client ID va Client Secret olish**

### **1. Google Cloud Platform konsoliga kiring**

-   **Link**: [Google Cloud Console](https://console.cloud.google.com/)

Agar sizda Google hisobingiz bo'lmasa, yangi hisob yarating.

### **2. Yangi loyiha yarating yoki mavjudini tanlang**

-   Yuqoridagi loyiha tanlash menyusidan foydalanib, yangi loyiha yarating yoki mavjud loyihani tanlang.

### **3. API va xizmatlarni yoqing**

-   Chap menyuda **APIs & Services** bo'limiga o'ting.

    **Link**: [APIs & Services Dashboard](https://console.cloud.google.com/apis/dashboard)

-   **+ ENABLE APIS AND SERVICES** tugmasini bosing.

-   Ochiq qidiruv panelida **People API** yoki **Google+ API** (agar kerak bo'lsa) ni qidirib, ularni yoqing.

**Eslatma**: Yangi ilovalar uchun **People API** dan foydalanish tavsiya etiladi.

### **4. OAuth Consent Screen ni sozlang**

-   **APIs & Services** bo'limida chap menyudan **OAuth consent screen** ni tanlang.

    **Link**: [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)

-   **User Type** sifatida **External** ni tanlang va **Create** tugmasini bosing.

-   Ilova ma'lumotlarini to'ldiring:

    -   **App name**: Ilovangiz nomi.
    -   **User support email**: Foydalanuvchilarga ko'rsatiladigan email.
    -   **Developer contact information**: Sizning email manzilingiz.

-   **Scopes** bo'limida hozircha hech narsa qo'shmasangiz ham bo'ladi yoki kerakli scope'larni qo'shishingiz mumkin.

-   **Save and Continue** tugmasini bosing.

**Eslatma**: Agar ilovangizni faqat o'zingiz sinab ko'rsangiz, uni **Testing** rejimida qoldirishingiz mumkin. Aks holda, ilovani **Publishing status** bo'limida "In production" holatiga o'tkazishingiz kerak bo'ladi.

### **5. OAuth Client ID yaratish**

-   **APIs & Services** bo'limida **Credentials** bo'limiga o'ting.

    **Link**: [Credentials](https://console.cloud.google.com/apis/credentials)

-   **+ CREATE CREDENTIALS** tugmasini bosing va **OAuth client ID** ni tanlang.

-   **Application type** sifatida **Web application** ni tanlang.

-   **Name**: Ilovangiz uchun nom kiriting (masalan, "Web Client 1").

-   **Authorized JavaScript origins** bo'limiga ilovangizning domenini qo'shing (masalan, `http://localhost:3000`).

-   **Authorized redirect URIs** bo'limiga quyidagi manzilni qo'shing:

    ```
    http://localhost:3000/auth/google/callback
    ```

-   **Create** tugmasini bosing.

### **6. Client ID va Client Secret ni oling**

-   Yaratilganidan so'ng, sizga **Client ID** va **Client Secret** taqdim etiladi.

-   ## Ularni xavfsiz joyda saqlang. Bu ma'lumotlarni ilovangizda `clientID` va `clientSecret` sifatida ishlatasiz.

---

# GITHUB

## **GitHub uchun Client ID va Client Secret olish**

### **1. GitHub hisobingizga kiring**

-   **Link**: [GitHub](https://github.com/)

Agar sizda GitHub hisobingiz bo'lmasa, yangi hisob yarating.

### **2. Developer Settings bo'limiga o'ting**

-   Profil rasmchingizga bosib, ochiladigan menyudan **Settings** ni tanlang.

    **Link**: [GitHub Settings](https://github.com/settings/profile)

-   Chap menyuda pastroqda **Developer settings** bo'limini tanlang.

    **Link**: [Developer settings](https://github.com/settings/apps)

### **3. OAuth Apps bo'limiga o'ting**

-   **OAuth Apps** bo'limini tanlang.

    **Link**: [OAuth Apps](https://github.com/settings/developers)

-   **New OAuth App** tugmasini bosing.

### **4. Ilova ma'lumotlarini to'ldiring**

-   **Application name**: Ilovangiz nomi.

-   **Homepage URL**: Ilovangizning asosiy URL manzili (masalan, `http://localhost:3000`).

-   **Authorization callback URL**:

    ```
    http://localhost:3000/auth/github/callback
    ```

-   **Register application** tugmasini bosing.

### **5. Client ID va Client Secret ni oling**

-   Yaratilgan ilovangiz sahifasida **Client ID** ko'rsatiladi.

-   **Client Secret** ni olish uchun **Generate a new client secret** tugmasini bosing.

-   Yaratilgan **Client Secret** ni xavfsiz joyda saqlang.

---

## **Qo'shimcha eslatmalar**

-   **Maxfiylik**: **Client Secret** ma'lumotlarini hech kim bilan bo'lishmang va ularni versiya nazorati tizimiga (masalan, Git) qo'shmang.

-   **Muhit o'zgaruvchilari**: **Client ID** va **Client Secret** ni kodingizda qattiq kodlash o'rniga, ularni muhit o'zgaruvchilari (.env fayli) orqali saqlashingiz tavsiya etiladi.

-   **`.env` fayli** misoli:

    ```
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

    GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
    ```

-   **`dotenv` paketini o'rnatish**:

    ```bash
    npm install dotenv
    ```

-   Kodingizda `dotenv` ni import qilish:

    ```javascript
    require('dotenv').config();

    // Passport strategiyalari sozlamalarida foydalanish
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    ```

---

## **Yakuniy qadamlar**

-   **Ilovangizni sozlang**: Endi sizda **Client ID** va **Client Secret** bor, ulardan Passport.js strategiyalari uchun foydalanishingiz mumkin.

-   **Testlash**: Ilovangizni ishga tushiring va autentifikatsiyani sinab ko'ring.

---

Agar yuqoridagi yo'riqnoma bo'yicha savollaringiz bo'lsa yoki muammolarga duch kelsangiz, bemalol so'rang. Sizga yordam berishdan mamnunman!

---

**Foydali linklar:**

-   **Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com/)
-   **APIs & Services Dashboard**: [Google APIs](https://console.cloud.google.com/apis/dashboard)
-   **OAuth consent screen**: [Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
-   **Credentials**: [Google Credentials](https://console.cloud.google.com/apis/credentials)

-   **GitHub Settings**: [GitHub Settings](https://github.com/settings/profile)
-   **Developer settings**: [GitHub Developer settings](https://github.com/settings/developers)
-   **OAuth Apps**: [GitHub OAuth Apps](https://github.com/settings/developers)

---
