# Java学习-编码规范-常量与变量

## 1. 核心概念

### 1.1 什么是常量与变量？

**通俗解释**：
- **变量**：像快递柜的储物格，可以放不同的东西，但每个储物格有固定编号（变量名）
- **常量**：像快递柜的固定标识牌，一旦贴上去就不能改（final修饰）

**生活案例**：
- **变量**：`appointmentDate = "2025-03-10"`，下次可以改成 `"2025-03-11"`
- **常量**：`MAX_PET_COUNT = 10`，宠物诊所最大接待10只，永远不变

### 1.2 阿里规范核心要求

| 类型 | 命名规则 | 声明位置 | 作用域 |
|------|----------|----------|--------|
| **常量** | 全大写+下划线 | 接口或类静态常量 | 全局共享 |
| **成员变量** | 小驼峰 | 类内部 | 实例级别 |
| **局部变量** | 小驼峰 | 方法/代码块内 | 临时使用 |
| **静态变量** | 小驼峰 | static修饰 | 类级别共享 |

---

## 2. 代码Demo（符合阿里规范）

```java
package com.pet.clinic.appointment;

/**
 * 宠物预约配置类
 * 演示常量与变量的正确使用
 *
 * @author yph
 * @since 2026-03-10
 */
public class AppointmentConfig {

    // ========== 常量区域 ==========
    /** 最大预约数量（永不改变） */
    public static final int MAX_APPOINTMENT_COUNT = 10;

    /** 默认预约时长（单位：分钟） */
    private static final int DEFAULT_DURATION_MINUTES = 30;

    /** 诊所名称 */
    public static final String CLINIC_NAME = "萌宠医疗中心";

    // ========== 成员变量 ==========
    /** 当前预约数量 */
    private int currentAppointmentCount;

    /** 是否营业中 */
    private boolean isOpen;

    // ========== 方法内局部变量 ==========
    /**
     * 检查是否可以预约
     *
     * @return true可以预约，false不可以
     */
    public boolean canMakeAppointment() {
        int availableSlots = MAX_APPOINTMENT_COUNT - currentAppointmentCount;
        return availableSlots > 0 && isOpen;
    }
}
```

**关键点**：
- 常量：`public static final`，全大写命名，描述性注释
- 成员变量：`private`，小驼峰，符合封装原则
- 局部变量：方法内声明，仅在该方法有效

---

## 3. 梯度练习题

### 基础题（1分钟）
**题目**：判断以下常量/变量定义是否符合阿里规范：

```java
1. final int MAX_COUNT = 10;               // ❌已修改
2. static final String CLINIC_NAME = "ABC";  // ❌已修改
3. private int count = 0;            // ✅
4. public static final int MAX_COUNT = 100;   // ✅
```

<details>
<summary>查看答案</summary>

1. ❌ 常量名应全大写：`MAX_COUNT`
2. ❌ 常量名应全大写，不能混用下划线+驼峰：`CLINIC_NAME`
3. ✅ 成员变量命名正确
4. ✅ 常量定义正确
</details>

---

### 进阶题（3分钟）
**题目**：在宠物医疗预约平台中，需要定义以下常量与变量，请写出符合规范的代码：
1. 最大预约等待天数（常量，值为7天）
2. 当前在线宠物数量（成员变量）
3. 预约成功提示消息（常量，值为"预约成功"）
   ```
   public static final int MAX_WAIT_DAYS = 10;
   private int onlinePetCount = 0;
   public static final String SUCCESS_MESSAGE = "预约成功";
   ```

<details>
<summary>查看答案</summary>
java
public class AppointmentService {

    /** 最大预约等待天数 */
    public static final int MAX_WAIT_DAYS = 7;

    /** 预约成功提示消息 */
    public static final String SUCCESS_MESSAGE = "预约成功";

    /** 当前在线宠物数量 */
    private int onlinePetCount;

    // Getter/Setter方法...
}
</details>

---

### 实战题（5分钟）
**题目**：结合宠物医疗预约平台，设计一个时间段枚举类，包含以下时间段常量：
- 上午（09:00-12:00）
- 下午（14:00-18:00）
- 晚上（19:00-21:00）

要求：
1. 使用枚举定义时间段
2. 每个时间段有开始时间和结束时间属性
3. 符合阿里命名规范
```
public enum AppointTimeSlot (){

}
```

<details>
<summary>查看答案</summary>

```java
package com.pet.clinic.appointment.enums;

/**
 * 预约时间段枚举
 *
 * @author yph
 */
public enum AppointmentTimeSlot {

    /** 上午时段 */
    MORNING("09:00", "12:00"),

    /** 下午时段 */
    AFTERNOON("14:00", "18:00"),

    /** 晚上时段 */
    EVENING("19:00", "21:00");

    /** 开始时间 */
    private final String startTime;

    /** 结束时间 */
    private final String endTime;

    /**
     * 构造方法
     *
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    AppointmentTimeSlot(String startTime, String endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getter方法...
    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }
}
```
</details>

---

## 4. 常见坑点

### ❌ 坑点1：常量不该用static final
```java
// 错误示例
public class PetService {
    // ❌ 这不是全局常量，不应该public static final
    public static final int MAX_AGE = 20;  // 只有这个类用

    // ✅ 正确做法：如果只有当前类用，使用private
    private static final int MAX_AGE = 20;
}
```

**阿里规范**：如果常量只在类内部使用，使用`private`修饰；如果多个类共享，才用`public`。

---

### ❌ 坑点2：魔法值（Magic Number）
```java
// 错误示例
if (appointmentCount > 10) {  // ❌ 10是什么意思？
    // ...
}

// ✅ 正确做法：定义常量
private static final int MAX_APPOINTMENT_COUNT = 10;

if (appointmentCount > MAX_APPOINTMENT_COUNT) {  // ✅ 一目了然
    // ...
}
```

---

### ❌ 坑点3：局部变量作用域过大
```java
// 错误示例
public void processAppointment() {
    int index = 0;  // ❌ 在方法开头就声明，但只用到一次

    // ...很多代码...

    if (someCondition) {
        System.out.println(index);
    }
}

// ✅ 正确做法：就近声明
public void processAppointment() {
    // ...很多代码...

    if (someCondition) {
        int index = 0;  // ✅ 在使用前声明
        System.out.println(index);
    }
}
```

---

### ❌ 坑点4：成员变量不封装
```java
// 错误示例
public class Appointment {
    public int count;  // ❌ 任何地方都能修改

    private String name;  // ✅ 私有，提供getter/setter
}
```

**阿里规范**：成员变量必须使用`private`修饰，通过`getter/setter`访问。

---

### ❌ 坑点5：常量值硬编码
```java
// 错误示例
public static final String DB_URL = "jdbc:mysql://localhost:3306/pet_clinic";
public static final String PASSWORD = "123456";  // ❌ 密码不能写死

// ✅ 正确做法：使用配置文件
// application.properties
// spring.datasource.url=jdbc:mysql://localhost:3306/pet_clinic
// spring.datasource.password=${DB_PASSWORD}
```

---

## 5. 阿里规范速记表

| 场景 | 正确做法 | 错误做法 |
|------|----------|----------|
| **常量命名** | `MAX_COUNT` | `maxCount`、`Max_Count` |
| **成员变量** | `private int count` | `public int count` |
| **魔法值** | `if (count > MAX)` | `if (count > 10)` |
| **局部变量** | 就近声明 | 方法开头全部声明 |
| **枚举常量** | 全大写 | 小驼峰 |
| **常量位置** | 接口或类顶部 | 方法内部 |

---

## 6. 实战场景应用

**宠物医疗预约平台场景**：

```java
public class AppointmentValidator {

    // ========== 全局共享常量 ==========
    /** 最大预约提前天数 */
    public static final int MAX_ADVANCE_DAYS = 7;

    /** 最小预约提前小时数 */
    public static final int MIN_ADVANCE_HOURS = 2;

    // ========== 类内部常量 ==========
    /** 默认预约时长（分钟） */
    private static final int DEFAULT_DURATION = 30;

    /** 默认咨询室编号 */
    private static final String DEFAULT_ROOM = "ROOM-001";

    // ========== 成员变量 ==========
    /** 当前预约列表 */
    private List<Appointment> appointmentList;

    /** 验证器状态 */
    private boolean isActive;

    /**
     * 验证预约时间是否有效
     */
    public boolean validateTime(LocalDateTime appointmentTime) {
        LocalDateTime now = LocalDateTime.now();  // 局部变量
        long hours = ChronoUnit.HOURS.between(now, appointmentTime);

        return hours >= MIN_ADVANCE_HOURS;
    }
}
```

---

## 下一步学习
完成本知识点后，继续学习：
- [[Java学习-编码规范-集合使用]]（推荐）

---

**学习时长预估**：25分钟
**难度等级**：⭐⭐☆☆☆（入门级）
**实战场景**：宠物医疗预约平台项目
