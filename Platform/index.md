# MGC Platform Open


我们使用HTTP REST API 进行数据交互。


## 准备工作
在使用MGC Platform Open 前，您需要以下信息：
- **App ID**：用于标识您的应用程序，您需要从管理后台获取;
- **Client ID**：用于标识当前设备。您可以根据设备类型（PC、Android、Mac）通过以下示例代码获取。
### App ID 获取：




### Client ID 获取：
#### PC
```java
import java.util.UUID;

public class PCClientID {
    public static void main(String[] args) {
        String clientId = UUID.randomUUID().toString();
        System.out.println("Client ID: " + clientId);
    }
}

```
#### Android 

```java
import android.content.Context;
import android.provider.Settings;

public class AndroidClientID {
    public static String getClientID(Context context) {
        return Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
    }
}

```
#### Mac 
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class MacClientID {
    public static String getClientID() throws Exception {
        Process process = Runtime.getRuntime().exec("system_profiler SPHardwareDataType | grep 'UUID'");
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.contains("UUID")) {
                return line.split(":")[1].trim();
            }
        }
        return null;
    }
}


```

## 请求内容

``` json
"header": {
    "appId": "yourAppId",
    "clientId": "yourClientId",
    "session":
}

```