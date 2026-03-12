"""
AutoDoc 示例项目
简单的FastAPI应用，用于测试AutoDoc文档生成
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class User(BaseModel):
    """用户模型

    属性:
        name: 用户名
        email: 邮箱
        age: 年龄（可选）
    """
    name: str
    email: str
    age: int = None


@app.get("/")
async def root():
    """根路径

    返回:
        欢迎消息
    """
    return {"message": "Welcome to AutoDoc Demo"}


@app.get("/users/{user_id}")
async def get_user(user_id: int):
    """获取用户信息

    根据用户ID获取用户信息

    Args:
        user_id: 用户ID

    Returns:
        用户信息
    """
    return {
        "id": user_id,
        "name": "John Doe",
        "email": "john@example.com"
    }


@app.get("/users")
async def list_users(skip: int = 0, limit: int = 10):
    """获取用户列表

    分页获取用户列表

    Args:
        skip: 跳过的记录数
        limit: 返回的记录数

    Returns:
        用户列表
    """
    return {
        "total": 100,
        "skip": skip,
        "limit": limit,
        "users": [
            {"id": i, "name": f"User {i}"}
            for i in range(skip, skip + limit)
        ]
    }


@app.post("/users")
async def create_user(user: User):
    """创建用户

    创建新用户

    Args:
        user: 用户信息

    Returns:
        创建的用户信息
    """
    return {
        "id": 1,
        **user.dict()
    }


@app.put("/users/{user_id}")
async def update_user(user_id: int, user: User):
    """更新用户

    更新指定用户的信息

    Args:
        user_id: 用户ID
        user: 更新的用户信息

    Returns:
        更新后的用户信息
    """
    return {
        "id": user_id,
        **user.dict()
    }


@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    """删除用户

    删除指定用户

    Args:
        user_id: 用户ID

    Returns:
        删除结果
    """
    return {
        "success": True,
        "message": f"User {user_id} deleted"
    }
