## 🚀 Hướng Dẫn Chung cho GitHub Copilot

Là một **Expert Software Engineer** chịu trách nhiệm cho dự án **Alignify**, tôi mong muốn mọi đóng góp code và quy trình làm việc phải luôn tuân thủ nghiêm ngặt **file detailed design** của dự án. Mục tiêu là phát triển Alignify với chất lượng cao, tuân thủ các nguyên tắc thiết kế tốt nhất và được triển khai hiệu quả. Copilot cần hiểu rõ ngữ cảnh dự án Alignify, các chức năng chính như quản lý chiến dịch, đăng bài nội dung, hệ thống chat, và các vai trò (Brand, Influencer, Admin).

---

### 🌐 Tổng Quan Dự Án Alignify

Alignify là một nền tảng hỗ trợ kết nối và quản lý quá trình hợp tác giữa **Influencer** và **Brand**. Dự án có các chức năng chính như sau:

- **Chức năng cho Brand**:

  - **Đăng bài chiến dịch**: Brand có thể tạo và đăng các chiến dịch quảng bá.
  - **Quản lý trạng thái chiến dịch**: Brand có thể quản lý luồng trạng thái của chiến dịch: `DRAFT` -> `RECRUITING` -> `PENDING` -> `PARTICIPATING` -> `COMPLETED`.
  - **Gửi lời mời trực tiếp**: Brand có thể gửi lời mời hợp tác trực tiếp đến Influencer.
  - **Review tiến độ**: Brand có thể xem xét và xử lý (chấp nhận hoặc từ chối) tiến độ mà Influencer cập nhật trong giai đoạn `PARTICIPATING`.

- **Chức năng cho Influencer**:

  - **Đăng bài content/idea**: Influencer có thể chia sẻ các nội dung hoặc ý tưởng của mình.
  - **Ứng tuyển chiến dịch**: Influencer có thể nộp đơn vào các chiến dịch mà Brand đã đăng ở trạng thái `RECRUITING`.
  - **Chấp nhận/Từ chối lời mời**: Influencer có quyền chấp nhận hoặc từ chối lời mời trực tiếp từ Brand.
  - **Cập nhật tiến độ**: Influencer sẽ cập nhật tiến độ công việc trong giai đoạn `PARTICIPATING` của chiến dịch.

- **Chức năng chung**:

  - **Hệ thống chat**: Brand và Influencer có thể chat nhóm với nhau sau khi hợp tác.
  - **Tương tác bài viết**: Các bài viết content/idea của Influencer có thể được like hoặc comment từ bất kỳ người dùng nào.

- **Chức năng cho Admin**:
  - **Quản lý bài đăng**: Admin có quyền quản lý và xóa các bài đăng content/idea cũng như các chiến dịch.
  - **Quản lý người dùng**: Admin có thể cấm (ban) hoặc hạn chế quyền (restrict permission) của người dùng.
  - **Tiếp nhận báo cáo**: Admin nhận và xử lý các báo cáo/report từ người dùng.
  - **Tạo gói nâng cấp**: Admin có thể tạo các gói nâng cấp tài khoản cho người dùng.

Copilot cần hiểu rõ các vai trò (`ADMIN`, `BRAND`, `INFLUENCER`) và quyền hạn tương ứng của họ trong hệ thống.

---

### 📚 Các Hướng Dẫn Chi Tiết Khác

Để có được sự hỗ trợ chính xác nhất, Copilot hãy tham khảo thêm các file hướng dẫn chuyên biệt sau:

- **Phát triển Frontend (ReactJS)**: Để biết chi tiết về cấu trúc component, quản lý trạng thái, routing, UI/UX và testing, hãy tham khảo file:
  `./reactjs_development_instructions.prompt.md`

- **DevOps (GitHub Actions)**: Để hiểu rõ về quy trình CI/CD, chiến lược nhánh, kiểm soát chất lượng code và quản lý secrets, hãy tham khảo file:
  `./devops_instructions.prompt.md`

- **Thiết kế RESTful API (Backend)**: Để nắm vững các quy tắc đặt tên endpoint, phương thức HTTP, định dạng response, xử lý lỗi, xác thực, phân trang và versioning, hãy tham khảo file:
  `./restful_api_design_rules.prompt.md`

---

### 📚 Nếu Không Trụy Cập Được Các Chi Tiết Ở File Hướng Dẫn Khác Hãy Đọc Tại Đây

## 💻 Hướng Dẫn Phát Triển Frontend (ReactJS)

Đối với phát triển frontend của Alignify, hãy tuân thủ các nguyên tắc và công nghệ sau:

- **Công nghệ cốt lõi**:

  - Sử dụng **ReactJS 18** làm thư viện UI chính.
  - Sử dụng **Vite** cho quá trình build nhanh và trải nghiệm phát triển mượt mà.
  - Bắt buộc sử dụng **TypeScript** để đảm bảo kiểu dữ liệu an toàn và cải thiện khả năng bảo trì code.

- **Cấu trúc Component**:

  - Sử dụng **Shadcn UI** để xây dựng các thành phần giao diện (UI components) theo thiết kế chi tiết.
  - Tách biệt các thành phần UI thành các thư mục riêng biệt theo chức năng: `components`, `features`, `pages`.
  - Sử dụng **TypeScript** để định nghĩa kiểu dữ liệu rõ ràng cho tất cả các props và state.

- **Quản lý Trạng Thái**:

  - Triển khai quản lý trạng thái toàn cục bằng **Redux Toolkit**.
  - Sử dụng **RTK Query** để gọi API và quản lý cache dữ liệu hiệu quả.
  - Áp dụng **Redux Persist** để lưu trữ trạng thái người dùng (ví dụ: thông tin đăng nhập, token) trong `localStorage`.

- **Routing**:

  - Sử dụng **React Router** để quản lý điều hướng giữa các trang.
  - Áp dụng bảo mật cho các route bằng cách kiểm tra **JWT Token** trước khi cho phép truy cập vào các trang yêu cầu xác thực.

- **UI/UX**:

  - Sử dụng **Tailwind CSS 4** để xây dựng giao diện nhanh chóng và tuân thủ thiết kế chi tiết.
  - Tối ưu hóa giao diện cho cả desktop và mobile (**responsive design**).

- **Testing**:
  - Viết **unit test** cho các component quan trọng bằng **React Testing Library**.
  - Đảm bảo các API call được mock và kiểm tra bằng **MSW (Mock Service Worker)** để cô lập các test và đảm bảo tính tin cậy.

---

### 📝 Hướng Dẫn Chi Tiết cho Form Components

Khi tạo một component form mới, hãy tuân thủ các yêu cầu sau:

- **Quản lý trạng thái Form với `react-hook-form`**:

  - Luôn định nghĩa **TypeScript types** rõ ràng cho dữ liệu của form.
  - Ưu tiên sử dụng các **uncontrolled components** thông qua hàm `register` để quản lý input.
  - Sử dụng thuộc tính `defaultValues` trong `useForm` để ngăn chặn các lần re-render không cần thiết và khởi tạo giá trị mặc định cho form.

- **Xác thực Form với `zod` và `zodResolver`**:

  - Sử dụng thư viện **Zod** để định nghĩa các schema xác thực.
  - Tạo các **validation schemas** có thể tái sử dụng và đặt chúng trong các file riêng biệt (ví dụ: `src/lib/validation/schemas.ts`).
  - Sử dụng **TypeScript types** được suy ra từ Zod schemas để đảm bảo an toàn kiểu dữ liệu giữa form data và validation.
  - Tùy chỉnh các quy tắc xác thực để cung cấp trải nghiệm người dùng (UX) thân thiện, với các thông báo lỗi rõ ràng.

- **Thành phần UI và Icon**:
  - Sử dụng các thành phần UI có sẵn từ thư mục `src/components/ui`, bao gồm:
    - **`FormField`**: Để tích hợp các input của form với `react-hook-form` và hiển thị thông báo lỗi.
    - **`Input`**, **`Textarea`**, **`Select`**, v.v., và các component form control khác để xây dựng các trường nhập liệu.
    - **`useFieldArray`**: Khi cần quản lý các danh sách trường động (dynamic field arrays) trong form.
  - Sử dụng các Icon có sẵn từ thư mục `src/components/icons`.

---

### 📡 Hướng Dẫn Tương Tác API & Định Dạng Dữ Liệu

- **Định dạng Response từ RTK Query**:
  - Các response thành công mà frontend nhận được từ RTK Query **luôn phải** tuân thủ cấu trúc TypeScript sau:
    ```typescript
    export interface ApiResponseSuccess<T> {
      status: number | string;
      message: string;
      data: T | null;
      timestamp: Date;
      path: string;
    }
    ```
- **Xử lý Lỗi API**:

  - Khi gặp lỗi trong quá trình `try-catch` hoặc từ các phản hồi lỗi API, dữ liệu lỗi phải được chuyển đổi về cấu trúc TypeScript sau:

    ```typescript
    export interface ErrorData {
      status: number | string;
      error: string;
      timestamp: Date;
      path: string;
    }

    export interface ApiResponseError {
      status: number | string; // Mã HTTP status lỗi
      data: ErrorData; // Chi tiết lỗi
    }
    ```

  - Sử dụng hàm kiểm tra kiểu `isApiResponseError` được định nghĩa trong `src/utils` để xác định loại lỗi:
    ```typescript
    // src/utils/index.ts (hoặc file tương tự)
    export const isApiResponseError = (err: unknown): err is ApiResponseError => {
      return (
        typeof err === 'object' &&
        err !== null &&
        'status' in err &&
        'data' in err &&
        typeof err.data === 'object' &&
        err.data !== null &&
        'status' in err.data &&
        'error' in err.data &&
        'timestamp' in err.data &&
        'path' in err.data
      );
    };
    ```

---

### 💡 Hướng Dẫn Tiện Ích & Helpers

- **Định dạng Dữ liệu**:
  - Đối với các tác vụ định dạng dữ liệu như ngày tháng (`Date`), tiền tệ (`currency`), v.v., **luôn sử dụng các hàm format** được cung cấp trong thư mục `src/utils`. Điều này đảm bảo tính nhất quán trong toàn bộ ứng dụng.

---

### 💬 Hướng Dẫn Tích Hợp WebSocket (STOMP)

Dự án sử dụng WebSocket (qua SockJS và STOMP) để triển khai các tính năng thời gian thực như hệ thống chat và thông báo.

- **Quản lý Kết nối STOMP**:

  - Sử dụng hàm `getStompClient` từ `src/lib/stom-client.ts` để lấy hoặc thiết lập kết nối STOMP client:

    ```typescript
    // src/lib/stom-client.ts
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';

    import { host } from '@/config';

    let stompClient: Stomp.Client | null = null;
    let isConnected = false;
    let connectPromise: Promise<Stomp.Client> | null = null;

    export function getStompClient(token: string): Promise<Stomp.Client> {
      if (stompClient && isConnected) {
        return Promise.resolve(stompClient);
      }
      if (connectPromise) return connectPromise;

      connectPromise = new Promise((resolve, reject) => {
        const socket = new SockJS(`${host}/ws`);
        const client = Stomp.over(socket);
        client.debug = () => {}; // Tắt debug log của Stomp
        client.connect(
          { Authorization: `Bearer ${token}` }, // Gửi JWT Token để xác thực
          () => {
            stompClient = client;
            isConnected = true;
            resolve(client);
          },
          (error) => {
            isConnected = false;
            connectPromise = null;
            reject(error);
          },
        );
      });
      return connectPromise;
    }
    ```

  - Đảm bảo truyền **JWT Token** để xác thực kết nối WebSocket.

- **Gửi Thông báo (Notifications)**:

  - Sử dụng custom hook `useSendNotification` từ `src/hooks` để gửi thông báo đến người dùng khác:

    ```typescript
    // src/hooks/useSendNotification.ts
    import { useCallback } from 'react';
    import { useAppDispatch, useAppSelector } from '@/hooks/redux';
    import { getStompClient } from '@/lib/stom-client';
    import type { RootState } from '@/redux/store';
    import { setNotificationSending } from '../features/notification/notification.slice';
    import type { NotificationSending } from '../features/notification/notification.type';

    export function useSendNotification() {
      const dispatch = useAppDispatch();
      const { token } = useAppSelector((state: RootState) => state.auth);

      const sendNotification = useCallback(
        async (notification: NotificationSending) => {
          if (!notification.userId || !token) return;
          const stompClient = await getStompClient(token);
          if (stompClient) {
            stompClient.send(
              `/app/notify/${notification.userId}`, // Endpoint gửi notification
              { Authorization: `Bearer ${token}` },
              JSON.stringify(notification),
            );
            dispatch(setNotificationSending(notification));
          }
        },
        [dispatch, token],
      );
      return sendNotification;
    }
    ```

  - Đường dẫn gửi notification là `/app/notify/{userId}`.

- **Gửi và Nhận Tin nhắn Chat**:
  - Trong các component chat (ví dụ: `ChatRoom`), sử dụng `getStompClient` để subscribe và gửi tin nhắn.
  - Subscribe đến topic `/topic/messages/{chatRoomId}` để nhận tin nhắn mới.
  - Gửi tin nhắn đến `/app/chat/{chatRoomId}`.
  - Luôn bao gồm **JWT Token** trong header `Authorization` khi gửi tin nhắn.
  - Xử lý các tin nhắn nhận được, cập nhật trạng thái tin nhắn (ví dụ: `isSending: false` sau khi nhận phản hồi từ server).
  - Đảm bảo xử lý lỗi khi parsing tin nhắn nhận được từ WebSocket.
  - Ví dụ về cách sử dụng (tham khảo đoạn code đã cung cấp): `useEffect` để subscribe, `sendMessage` để gửi tin.

---

## 🛠️ Hướng Dẫn DevOps

Quy trình DevOps của dự án Alignify sẽ được tự động hóa hoàn toàn bằng **GitHub Actions**, tuân thủ các nguyên tắc sau:

- **CI/CD Pipeline**:
  - Sử dụng **GitHub Actions** để thiết lập pipeline tự động với các giai đoạn:
    - **Build**: Kiểm tra và build ứng dụng ReactJS (frontend) và Spring Boot (backend).
    - **Test**: Chạy **unit test** và **integration test** cho cả frontend và backend.
    - **Deploy**: Triển khai ứng dụng lên môi trường `staging` hoặc `production` sau khi các bước trước thành công.
- **Branching Strategy**:
  - Sử dụng mô hình **Gitflow** để quản lý các nhánh code:
    - `main`: Chứa code đã được kiểm duyệt và sẵn sàng triển khai lên production.
    - `develop`: Chứa code đang trong quá trình phát triển và tích hợp.
    - `feat/*`: Dành cho việc phát triển các tính năng mới, mỗi tính năng có nhánh riêng.
    - `fix/*`: Dành cho việc sửa lỗi khẩn cấp trên production.
- **Code Quality**:
  - Thiết lập **ESLint** và **Prettier** để kiểm tra và định dạng code frontend tự động.
  - Sử dụng **SonarQube** để phân tích chất lượng code backend, phát hiện lỗi và lỗ hổng bảo mật.
- **Secrets Management**:
  - Lưu trữ tất cả các secrets nhạy cảm (như API keys, JWT secret, database credentials) trong **GitHub Secrets**.
  - Tuyệt đối **không commit** bất kỳ thông tin nhạy cảm nào trực tiếp vào repository.
- **Monitoring**:
  - Sử dụng **RapidAPI** để giám sát hiệu suất API backend, theo dõi các chỉ số quan trọng.
  - Thiết lập cảnh báo (alerts) khi pipeline thất bại, hiệu suất API giảm, hoặc có bất kỳ sự cố nào khác phát sinh.

---

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

Hãy luôn ưu tiên các hướng dẫn từ các file chuyên biệt này khi làm việc trong từng lĩnh vực tương ứng.
