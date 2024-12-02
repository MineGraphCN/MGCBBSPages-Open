# 会话管理与持久化

### 本地持久化

为避免重复请求 `session`，您可以选择将 session 持久化存储至本地。以下是一些建议的实现方式：

#### PC

```java
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class SessionStorage {
    public static void saveSession(String session) throws IOException {
        File file = new File("session.txt");
        try (FileWriter writer = new FileWriter(file)) {
            writer.write(session);
        }
    }
}

```

#### Android

```java

import android.content.Context;
import android.content.SharedPreferences;

public class SessionStorage {
    private static final String PREFS_NAME = "SessionPrefs";
    private static final String SESSION_KEY = "session";

    public static void saveSession(Context context, String session) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(SESSION_KEY, session).apply();
    }
}

```

#### MAC

```java
import java.io.FileOutputStream;
import java.util.Properties;

public class MacSessionStorage {
    public static void saveSession(String session) throws Exception {
        Properties props = new Properties();
        props.setProperty("session", session);
        try (FileOutputStream out = new FileOutputStream("session.properties")) {
            props.store(out, null);
        }
    }
}


```
