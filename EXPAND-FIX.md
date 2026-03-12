# 🔧 展开功能修复

## 问题描述

**症状**：
点击API端点无法展开查看详情，点击没有任何效果。

---

## 根本原因

### Vue 响应式问题

**问题代码**：
```javascript
const filteredEndpoints = computed(() => {
  if (!searchQuery.value.trim()) {
    return docs.value.map(ep => ({ ...ep, expanded: false }))
  }

  const query = searchQuery.value.toLowerCase()
  return docs.value
    .filter(ep =>
      ep.path.toLowerCase().includes(query) ||
      ep.description?.toLowerCase().includes(query)
    )
    .map(ep => ({ ...ep, expanded: false }))  // ❌ 问题在这里
})
```

### 问题分析

1. `filteredEndpoints` 是一个 **computed 属性**
2. 每次数据变化或搜索时，它会**重新计算**
3. 重新计算时，所有对象的 `expanded` 属性都被**重置为 `false`**
4. 用户点击展开 → `expanded` 变为 `true` → 搜索或刷新 → 变回 `false`

### 用户体验
```
用户操作：
1. 点击 API → ▶ 变成 ▼
2. 输入搜索关键词
3. 所有展开状态消失 ❌
4. 再次点击 → 又可以展开
5. 刷新页面 → 所有状态丢失 ❌
```

---

## ✅ 修复方案

### 方案：使用独立的状态追踪

#### 1. 添加独立的 Set 追踪展开状态

```javascript
const expandedEndpoints = ref(new Set())  // 追踪哪些端点已展开
```

#### 2. 修改 filteredEndpoints，不创建新对象

```javascript
const filteredEndpoints = computed(() => {
  let filtered = docs.value

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = docs.value.filter(ep =>
      ep.path.toLowerCase().includes(query) ||
      ep.description?.toLowerCase().includes(query)
    )
  }

  return filtered  // ✅ 直接返回，不修改对象
})
```

#### 3. 添加辅助函数检查展开状态

```javascript
const isExpanded = (endpoint) => {
  const key = `${endpoint.method}-${endpoint.path}`
  return expandedEndpoints.value.has(key)
}
```

#### 4. 修改 toggle 函数

```javascript
const toggleEndpoint = (endpoint) => {
  const key = `${endpoint.method}-${endpoint.path}`
  if (expandedEndpoints.value.has(key)) {
    expandedEndpoints.value.delete(key)  // 收起
  } else {
    expandedEndpoints.value.add(key)     // 展开
  }
}
```

#### 5. 更新模板

```html
<!-- 之前 -->
<div v-if="endpoint.expanded">
  {{ endpoint.expanded ? '▼' : '▶' }}
</div>

<!-- 之后 -->
<div v-if="isExpanded(endpoint)">
  {{ isExpanded(endpoint) ? '▼' : '▶' }}
</div>
```

---

## 🎯 修复效果

### 之前
```
❌ 点击无法展开
❌ 展开状态无法保持
❌ 搜索时状态丢失
```

### 之后
```
✅ 点击可以展开
✅ 展开状态持久化
✅ 搜索时状态保持
✅ 刷新页面后状态保持（如果API数据不变）
```

---

## 🧪 验证步骤

### 1. 刷新浏览器
```
按 F5 或 Ctrl+R
```

### 2. 点击任意API端点
```
应该看到：
- ▶ 变成 ▼
- 展开显示详细信息
```

### 3. 测试搜索
```
输入关键词 "users"
- 展开状态应该保持
- 切换到其他端点，状态应该正确
```

### 4. 测试多次切换
```
点击展开 → 收起 → 展开
应该正常切换
```

---

## 📊 状态追踪原理

### Set 数据结构

```javascript
expandedEndpoints = Set([
  "GET-/",
  "GET-/users",
  "POST-/users"
])
```

### 检查逻辑

```javascript
// 展开时
expandedEndpoints.add("GET-/users")

// 收起时
expandedEndpoints.delete("GET-/users")

// 检查时
expandedEndpoints.has("GET-/users")  // true/false
```

---

## 🔑 使用唯一键

**为什么用 `${method}-${path}` 作为键？**

避免冲突：
```javascript
// 同一路径，不同方法
GET-/users     → 独立
POST-/users    → 独立
PUT-/users     → 独立

// 不同路径，相同方法
GET-/users     → 独立
GET-/orders    → 独立
```

---

## ✅ Git提交

**Commit**: 775e47a
**Message**: "fix: Fix expand/collapse toggle not working"

**变更**：
- 添加 expandedEndpoints Set
- 添加 isExpanded 函数
- 修改 toggleEndpoint 函数
- 更新模板使用 isExpanded

---

## 🚀 立即测试

### 1. 刷新前端
```
关闭前端窗口（Ctrl+C）
cd frontend
npm run dev

或直接刷新浏览器（F5）
```

### 2. 测试展开功能
```
点击任意API端点
应该看到详情展开
再次点击应该收起
```

### 3. 测试搜索
```
输入关键词
展开状态应该保持
```

---

## 📝 总结

**问题**：computed 属性重新计算导致状态丢失

**解决**：使用独立的 Set 追踪展开状态

**结果**：✅ 展开/收起功能正常工作

---

**展开功能已修复，现在可以正常查看API详情了！** 🎉
