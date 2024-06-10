from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class DocumentSchema(BaseModel):
    id: int
    name: str
    type: str
    size: int
    location: str
    created: Optional[datetime] = datetime.now()
    updated: Optional[datetime] = datetime.now()

    def __str__(self) -> str:
        return super().__str__()
