from dotenv import load_dotenv
load_dotenv()
from routes import items
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://slingr-shopping-list.vercel.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router, prefix="/items", tags=["items"])

# this is a simple endpoint to keep the render server alive every 14min with a cron job
@app.get("/keepalive")
async def keepalive():
    return { "message": "still alive..." }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True)
