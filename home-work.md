# Texnik Topsiriq: "Online Forum"

## Loyihaning tuzilishi

1. **Auth Service**
    - Foydalanuvchilarni ro'yxatdan o'tkazish va autentifikatsiya qilish xizmatlari.
    - JWT yordamida autentifikatsiya.
2. **Forum Service**
    - Forum postlari, komentariyalar, kategoriyalar va taglarni boshqarish xizmatlari.

### Asosiy Jadvallar

1. **Users Table**
    - `user_id` (int, Primary Key)
    - `username` (varchar, 100)
    - `email` (varchar, 100)
    - `password` (varchar, 100)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
    - `deleted_at` (timestamp, nullable)
2. **Posts Table**
    - `post_id` (int, Primary Key)
    - `user_id` (int, Foreign Key)
    - `title` (varchar, 100)
    - `body` (text)
    - `category_id` (int, Foreign Key)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
    - `deleted_at` (timestamp, nullable)
3. **Comments Table**
    - `comment_id` (int, Primary Key)
    - `post_id` (int, Foreign Key)
    - `user_id` (int, Foreign Key)
    - `body` (text)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
    - `deleted_at` (timestamp, nullable)
4. **Categories Table**
    - `category_id` (int, Primary Key)
    - `name` (varchar, 100)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
    - `deleted_at` (timestamp, nullable)
5. **Tags Table**
    - `tag_id` (int, Primary Key)
    - `name` (varchar, 100)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
    - `deleted_at` (timestamp, nullable)
6. **PostTags Table**
    - `post_id` (int, Foreign Key)
    - `tag_id` (int, Foreign Key)
    - `created_at` (timestamp)

### Xizmatlar

### 1. Auth Service

-   **Register User**
    -   Foydalanuvchini ro'yxatdan o'tkazish uchun endpoint.
-   **Login User**
    -   Foydalanuvchini tizimga kiritish va JWT yaratish uchun endpoint.
-   **Get User Profile**
    -   JWT yordamida foydalanuvchi profilini olish uchun endpoint.

### 2. Forum Service

-   **Posts CRUD**
    -   Create, Read, Update, Delete Postlar.
-   **Comments CRUD**
    -   Create, Read, Update, Delete Kommentariyalar.
-   **Categories CRUD**
    -   Create, Read, Update, Delete Kategoriyalar.
-   **Tags CRUD**
    -   Create, Read, Update, Delete Taglar.
-   **Post Tags**
    -   Create, Read, Delete Postga tegishli taglar.
-   **Get All Posts**
    -   Get all posts with pagination and filtering.
-   **Get All Comments**
    -   Get all comments with pagination and filtering.
-   **Get All Categories**
    -   Get all categories with pagination and filtering.
-   **Get All Tags**
    -   Get all tags with pagination and filtering.

### Qo'shimcha API-lar

1. **Get Posts by User (`user_id` bo'yicha)**

    - Ma'lum bir foydalanuvchiga tegishli barcha postlarni olish.

    **Endpoint:** `GET /users/:user_id/posts`

2. **Get Posts by Category (`category_id` bo'yicha)**

    - Ma'lum bir kategoriya bo'yicha barcha postlarni olish.

    **Endpoint:** `GET /categories/:category_id/posts`

3. **Get Comments by Post (`post_id` bo'yicha)**

    - Ma'lum bir postga tegishli barcha komentariyalarini olish.

    **Endpoint:** `GET /posts/:post_id/comments`

4. **Get Posts by Tag (`tag_id` bo'yicha)**

    - Ma'lum bir tag bo'yicha barcha postlarni olish.

    **Endpoint:** `GET /tags/:tag_id/posts`

5. **Search Posts**

    - Postlarni nomi yoki mazmuni bo'yicha qidirish.

    **Endpoint:** `GET /posts/search`

    **Query Parameters:**

    - `title` (optional): Post nomi.
    - `body` (optional): Post mazmuni.

6. **Get Popular Tags**

    - Eng ko'p ishlatilgan taglarni olish.

    **Endpoint:** `GET /tags/popular`

### Tekshirishlar

-   CRUD operatsiyalari uchun unit testlar.
