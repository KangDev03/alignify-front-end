## 📏 Hướng Dẫn Thiết Kế RESTful API (Backend)

Thiết kế API cho backend của Alignify (sử dụng Java Spring Boot) phải tuân thủ các nguyên tắc RESTful để đảm bảo tính nhất quán, dễ sử dụng và khả năng mở rộng:

- **Công nghệ cốt lõi**:

  - Xây dựng API bằng **Java Spring Boot**.
  - Sử dụng **MongoDB** làm cơ sở dữ liệu NoSQL.
  - Tích hợp **Cloudinary** để quản lý và lưu trữ tài nguyên đa phương tiện.
  - Xử lý tuần tự hóa/giải tuần tự hóa JSON bằng **Jackson**.
  - Tận dụng **RapidAPI** cho các tích hợp API bên ngoài khi cần.

- **Nguyên tắc RESTful chung**:

  - Sử dụng các danh từ số nhiều cho các tài nguyên (ví dụ: `/api/campaigns`, `/api/users`, `/api/contents`).
  - Sử dụng các phương thức HTTP chuẩn (`GET`, `POST`, `PUT`, `DELETE`) cho các hoạt động CRUD tương ứng.

- **Quy ước Đặt Tên Endpoint**:

  - Sử dụng **snake_case** cho các endpoint path.
  - Ví dụ:
    - `POST /api/campaigns` - Tạo chiến dịch mới.
    - `GET /api/campaigns/{id}` - Lấy thông tin chi tiết một chiến dịch.
    - `GET /api/users/{userId}/campaigns` - Lấy tất cả chiến dịch của một người dùng.

- **Các Phương Thức HTTP**:

  - `GET`: Lấy dữ liệu hoặc danh sách tài nguyên.
  - `POST`: Tạo mới một tài nguyên.
  - `PUT`: Cập nhật toàn bộ một tài nguyên hiện có.
  - `PATCH`: Cập nhật một phần của tài nguyên hiện có.
  - `DELETE`: Xóa một tài nguyên.

- **Định Dạng Phản Hồi (Response Format)**:

  - Tất cả các response phải tuân theo định dạng JSON chuẩn hóa như sau:
    ```json
    {
      "status": 200, // Mã HTTP Status
      "message": "Chi tiết thông báo",
      "data": { ... }, // Dữ liệu trả về (có thể là null)
      "timestamp": "2025-07-13T05:36:55.000+07:00[Asia/Ho_Chi_Minh]",
      "path": "/api/your_endpoint"
    }
    ```
  - Sử dụng lớp `ApiResponse` trong Spring Boot để đảm bảo tính nhất quán:
    ```java
    public class ApiResponse {
        public static <T> ResponseEntity<?> sendSuccess(int code, String message, T data, String path) {
            Map<String, Object> map = new HashMap<>();
            map.put("status", code);
            map.put("message", message);
            map.put("data", data);
            map.put("timestamp", ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
            map.put("path", path);
            return ResponseEntity.status(code).body(map);
        }
        public static ResponseEntity<?> sendError(int code, String error, String path) {
            Map<String, Object> map = new HashMap<>();
            map.put("status", code);
            map.put("error", error);
            map.put("timestamp", ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
            map.put("path", path);
            return ResponseEntity.status(code).body(map);
        }
    }
    ```

- **Xử Lý Lỗi (Error Handling)**:

  - Sử dụng các mã lỗi HTTP chuẩn xác:
    - `400 Bad Request`: Yêu cầu không hợp lệ (ví dụ: dữ liệu thiếu, định dạng sai).
    - `401 Unauthorized`: Không có thông tin xác thực hoặc thông tin xác thực không hợp lệ.
    - `403 Forbidden`: Người dùng đã xác thực nhưng không có quyền truy cập tài nguyên.
    - `404 Not Found`: Tài nguyên không tồn tại.
    - `500 Internal Server Error`: Lỗi không mong muốn từ phía server.
  - Trả về thông báo lỗi chi tiết trong response JSON theo định dạng:
    ```json
    {
      "status": 400, // Mã HTTP Status
      "error": "Chi tiết lỗi",
      "timestamp": "2025-07-13T05:36:55.000+07:00[Asia/Ho_Chi_Minh]",
      "path": "/api/your_endpoint"
    }
    ```

- **Xác Thực (Authentication)**:

  - Sử dụng **JWT Token** cho tất cả các endpoint yêu cầu xác thực.
  - Các endpoint không yêu cầu xác thực bao gồm: `login`, `register`, và các endpoint công khai khác.

- **Phân Trang (Pagination)**:

  - Sử dụng query parameters để hỗ trợ phân trang cho các API trả về danh sách dữ liệu.
  - Ví dụ: `GET /api/campaigns?page=1&limit=10` (trang 1, 10 mục mỗi trang).

- **Phiên Bản Hóa (Versioning)**:

  - Sử dụng versioning trong URL để quản lý các thay đổi API trong tương lai.
  - Ví dụ: `GET /api/v1/campaigns`.

- **Giới Hạn Tỷ Lệ (Rate Limiting)**:
  - Áp dụng giới hạn số lượng request bằng **Spring Security** hoặc thông qua các tính năng của **RapidAPI** để bảo vệ API khỏi các cuộc tấn công DDoS và lạm dụng.

---
