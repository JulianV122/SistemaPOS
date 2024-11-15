from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.routers.user import router as user_router
from src.routers.login import router as login_router
from src.config.settings import settings
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(user_router, prefix=f'{settings.API_V1_STR}/users', tags=['users'])
app.include_router(login_router, prefix=f'{settings.API_V1_STR}/auth', tags=['auth'])

@app.get("/")
def read_root():
    return {"Hello": "World"}
