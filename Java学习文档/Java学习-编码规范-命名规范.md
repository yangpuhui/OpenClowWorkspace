# Java学习-编码规范-命名规范

## 1. 核心概念

### 1.1 什么是命名规范？
**通俗解释**：就像给宠物起名字，"小白"、"旺财"大家都懂，但如果叫"12345"或"宠物a"就很难记住。代码命名规范就是让代码"说话"，一眼就能看出是干嘛的。

**生活案例**：
- ✅ 好命名：`张医生`（人名）、`2025-03-10`（日期）、`猫三针疫苗`（事项）
- ❌ 坏命名：`a`、`temp`、`flag1`（谁知道是啥？）

### 1.2 命名规范核心规则

| 类型 | 规则 | 示例 |
|------|------|------|
| **包名** | 全小写，用`.`分隔 | `com.pet.clinic.appointment` |
| **类名** | 大驼峰（PascalCase），名词 | `PetAppointmentService` |
| **方法名** | 小驼峰（camelCase），动词开头 | `createAppointment()` |
| **变量名** | 小驼峰（camelCase），有语义 | `appointmentDate` |
| **常量** | 全大写，下划线分隔 | `MAX_PET_COUNT` |
| **布尔变量** | is/has/can等前缀 | `isVaccinated` |

---

## 2. 代码Demo（符合阿里规范）

```java
package com.pet.clinic.appointment;  // 包名全小写，反转域名+业务模块

/**
 * 宠物预约服务类
 * 负责处理宠物医疗预约相关业务逻辑
 *
 * @author yph
 * @since 2026-03-10
 */
public class PetAppointmentService {

    /** 最大预约数量常量 */
    private static final int MAX_PET_COUNT = 10;

    /** 是否已预约 */
    private boolean isVaccinated;

    /**
     * 创建预约
     *
     * @param petName 宠物名称
     * @param appointmentDate 预约日期
     * @return 预约ID
     */
    public String createAppointment(String petName, String appointmentDate) {
        // 业务逻辑处理
        return "APT-" + System.currentTimeMillis();
    }
}
```

**解析**：
- 包名：`com.pet.clinic.appointment`（公司域名反写+业务模块，全小写）
- 类名：`PetAppointmentService`（大驼峰，明确表达职责）
- 方法名：`createAppointment()`（动词开头，小驼峰）
- 常量：`MAX_PET_COUNT`（全大写+下划线）
- 布尔变量：`isVaccinated`（is前缀，一目了然）

---

## 3. 梯度练习题

### 基础题（1分钟）
**题目**：根据命名规范，判断以下命名是否正确，错误请改正：

```java
1. class UserManage {}  // ❌
2. String petName;     // ❌
3. final int MAX_COUNT = 100;  // ❌
4. boolean hasVaccine;  // ✅
```

<details>
<summary>查看答案</summary>

1. 应改为：`class UserManage {}`（类名大驼峰）
2. 应改为：`String petName;`（变量名小驼峰，不使用下划线）
3. 应改为：`final int MAX_COUNT = 100;`（常量全大写+下划线）
4. ✅ 正确（布尔变量使用has前缀）
</details>

---

### 进阶题（3分钟）
**题目**：在宠物医疗预约平台中，需要定义一个类表示"预约记录"，包含以下属性：
- 预约ID（主键）
- 宠物ID
- 预约时间
- 预约状态（是否完成）

请写出符合阿里规范的完整类定义：

```java
package com.pet.clinic.appointment.model;

public class AppointmentRecord{
    
    private Long appointmentId;
    private Long petId;
    private String appointmentTime;
    peivate boolean isCompleted;
    
}

```



<details>
<summary>查看答案</summary>

```java
package com.pet.clinic.appointment.model;

/**
 * 预约记录实体类
 *
 * @author yph
 */
public class AppointmentRecord {

    /** 预约ID */
    private Long appointmentId;

    /** 宠物ID */
    private Long petId;

    /** 预约时间 */
    private String appointmentTime;

    /** 预约状态是否完成 */
    private boolean isCompleted;

    // Getter/Setter方法省略...
}
```
</details>

---

### 实战题（5分钟）
**题目**：结合宠物医疗预约平台场景，设计以下命名：
1. 删除预约的方法名

   ```java
   removeAppointment()
   ```

2. 查询宠物历史的变量名

   ```
   petHistoryList
   ```

3. 最大预约等待天数的常量名

   ```
   MAX_APPOINTMENT_WAIT_DAYS
   ```

<details>
<summary>查看答案</summary>

1. 方法名：`deleteAppointment()` 或 `removeAppointment()`
2. 变量名：`petHistoryList` 或 `medicalHistoryRecords`
3. 常量名：`MAX_APPOINTMENT_WAIT_DAYS`

**设计思路**：
- 方法名用动词开头，明确表达操作意图
- 变量名体现数据类型（List、Records等）
- 常量名语义明确，一看就知道是什么限制
</details>

---

## 4. 常见坑点

### ❌ 坑点1：拼音命名
```java
// 错误示例
String yuyueTime;  // 谁知道yuyue是预约？
int dingdanCount;  // dingdan是什么鬼？

// 正确做法
String appointmentTime;  // 英文，国际通用
int orderCount;           // 清晰易懂
```

---

### ❌ 坑点2：无语义缩写
```java
// 错误示例
String aptDate;  // apt是appointment缩写，别人得猜
int cnt;         // count缩写，没必要

// 正确做法
String appointmentDate;  // 完整拼写
int count;               // 或直接用list.size()判断
```

---

### ❌ 坑点3：布尔变量不加is前缀
```java
// 错误示例
boolean completed;       // 这是完成状态？还是完成动作？
boolean appointment;     // 预约对象？还是已预约？

// 正确做法
boolean isCompleted;      // is开头，明确表示状态
boolean hasAppointment;   // has开头，明确表示拥有属性
```

---

### ❌ 坑点4：包名大写或下划线
```java
// 错误示例
package com.Pet.Clinic;         // ❌ 包名不能大写
package com.pet_clinic.model;   // ❌ 包名不能有下划线

// 正确做法
package com.pet.clinic.model;   // ✅ 全小写，点分隔
```

---

## 5. 阿里规范要点速记

✅ **必须遵守**：
- 包名全小写
- 类名大驼峰
- 方法名/变量名小驼峰
- 常量全大写下划线分隔
- 布尔变量用is/has/can前缀

✅ **建议遵守**：
- 名字长度适中，不过长也不过短
- 避免缩写，除非团队共识
- 使用英文，不用拼音
- 有实际语义，不用a、b、c

---

## 下一步学习
完成本知识点后，继续学习：
- [[Java学习-编码规范-常量与变量]]（推荐）

---

**学习时长预估**：20分钟
**难度等级**：⭐☆☆☆☆（入门级）
**实战场景**：宠物医疗预约平台项目
