from pydantic import BaseModel
from typing import List, Optional

# --- Item Schemas ---
class ItemBase(BaseModel):
    title: str
    description: str
    location: str
    type: str # "lost" or "found"
    contact_phone: str

class ItemCreate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int
    owner_id: int
    is_resolved: bool

    class Config:
        from_attributes = True

# --- User Schemas ---
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    items: List[ItemResponse] = []

    class Config:
        from_attributes = True