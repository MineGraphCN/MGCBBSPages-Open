# 权限验证

在 Playform Open 中,所有的请求都需要通过 session 验证，
你需要在你的的 Mod/脚本发情请求时，需要带有验证信息

### Header

需要在 header 中包含：

```json
{
    "app": "yourAppId",
    "client": "yourClientId",
    "session": "yourSessionId"
}
```

### Body

API 的响应具有基本结构：

```typescript
{
    code?: number,
    msg?: string,
    data?: any,
}
```

## 会话失效

当您获取到 `code = 401` 时，表示身份验证失败，可能原因包括：

-   当前设备的 `clientId` 与 `session` 不匹配。
-   `session` 已转移至其他设备，例如因设备硬件更换或未经规范的整合包流动。

这是对用户数据的安全保护，避免计划外的登录。此时，您需要重新请求 session。

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class ApiResponseHandler {

    static class ApiResponse {
        public int code;
        public String msg;
        public Object data;

        // Getters and setters...
    }

    public static void main(String[] args) {
        String jsonResponse = "{ \"code\": 401, \"msg\": \"Unauthorized\", \"data\": null }";

        try {
            // 将 JSON 响应解析为对象
            ObjectMapper mapper = new ObjectMapper();
            ApiResponse response = mapper.readValue(jsonResponse, ApiResponse.class);

            // 检查响应的 code
            handleResponseCode(response);
        } catch (Exception e) {
            System.err.println("Error processing response: " + e.getMessage());
        }
    }

    private static void handleResponseCode(ApiResponse response) {
        switch (response.code) {
            case 0:
                System.out.println("Request successful: " + response.msg);
                break;
            case 401:
                System.err.println("Session invalid: " + response.msg);
                // 重新获取 session 的逻辑
                requestNewSession();
                break;
            default:
                System.err.println("Request failed with code " + response.code + ": " + response.msg);
                break;
        }
    }

    private static void requestNewSession() {
        // 示例逻辑：重新请求 session
        System.out.println("Requesting new session...");
        // 在这里发起请求获取新的 session
    }
}



```
