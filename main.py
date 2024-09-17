from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import sqlite3

app = FastAPI()

# Set up templates and static files
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


# Database connection and table creation
def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect("lobby.db")
    conn.row_factory = sqlite3.Row
    return conn


def create_table():
    with get_db_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                name TEXT NOT NULL,
                surname TEXT NOT NULL,
                password TEXT NOT NULL
            )
        """)
        conn.commit()


def check_login_data(email: str, password: str) -> bool:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE email=? AND password=?", (email, password))

        row = cursor.fetchone()
        count = row[0] if row else 0

        return count > 0


@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request) -> templates.TemplateResponse:
    return templates.TemplateResponse("login.html", {"request": request, "status": 200, "title": "Login"})

@app.get("/message_board", response_class=HTMLResponse)
async def login_page(request: Request) -> templates.TemplateResponse:
    return templates.TemplateResponse("message_board.html", {"request": request, "status": 200, "title": "Message Board"})

@app.get("/main", response_class=HTMLResponse)
async def main_page(request: Request) -> templates.TemplateResponse:
    return templates.TemplateResponse("index.html", {"request": request, "status": 200, "title": "Football-Lobby"})


@app.get("/signup", response_class=HTMLResponse)
async def signup_page(request: Request) -> templates.TemplateResponse:
    return templates.TemplateResponse("signup.html", {"request": request, "status": 200, "title": "SignUp"})


@app.post("/login", response_class=HTMLResponse)
async def login(request: Request, email: str = Form(...), password: str = Form(...)) -> templates.TemplateResponse:
    if check_login_data(email, password):
        return templates.TemplateResponse("index.html", {"request": request, "status": 200, "title": "Football-Lobby"})
    else:
        return templates.TemplateResponse("login.html", {"request": request, "status": 200, "title": "Login"})


@app.post("/main")
async def registration(request: Request, email: str = Form(...), name: str = Form(...), surname: str = Form(...),
                       password: str = Form(...)) -> templates.TemplateResponse:
    # Insert data into the SQLite database
    with get_db_connection() as conn:
        conn.execute("""
            INSERT INTO users (email, name, surname, password)
            VALUES (?, ?, ?, ?)
        """, (email, name, surname, password))
        conn.commit()

    return templates.TemplateResponse("index.html", {"request": request, "status": 200, "title": "Football-Lobby"})

if __name__ == "__main__":
    create_table()
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

