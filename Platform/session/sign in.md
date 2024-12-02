# 用户登录

## 登录请求

使用 appId 和 clientId 调用接口获取响应数据：
{
"appId": "string",
"clientId": "string"
}
接口返回

```ts
export interface Response {
    /**
     * 状态码，0 为成功，其他为失败
     */
    code: number;
    /**
     * 操作结果，操作成功可能有值，失败一定无值
     */
    data?: Data;
    /**
     * 消息，结果描述
     */
    msg: string;
    [property: string]: any;
}

/**
 * 操作结果，操作成功可能有值，失败一定无值
 */
export interface Data {
    /**
     * 用户代码
     */
    code: string;
    /**
     * 会话 ID
     */
    session: string;
    /**
     * 提交 URL
     */
    url: string;
    [property: string]: any;
}
```

## 引导用户登录

您需要将接口返回的 `url` 提供给用户，以下是打开浏览器并导航到指定 URL 的示例代码：

```java
import java.awt.Desktop;
import java.net.URI;

public class OpenBrowser {
    public static void main(String[] args) throws Exception {
        String url = "https://example.com/login?session=yourSessionId";
        Desktop.getDesktop().browse(new URI(url));
    }
}

```

```java

import android.content.Intent;
import android.net.Uri;

public class OpenBrowser {
    public static void openBrowser(Context context, String url) {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        context.startActivity(browserIntent);
    }
}



```

```java

import java.io.IOException;

public class OpenBrowserMac {
    public static void main(String[] args) throws IOException {
        String url = "https://example.com/login?session=yourSessionId";
        Runtime.getRuntime().exec("open " + url);
    }
}



```

用户登录时， URL 中的 query 参数 `session` 会传递给 MGC 服务器。MGC 会将该次登录与 session 绑定。
后续所有请求都需要携带 session，请确保安全存储。
