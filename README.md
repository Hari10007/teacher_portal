# Teacher Portal

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Hari10007/teacher_portal.git
cd teacher_portal

```

2. **Create a virtual environment:**

```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
```

3. **Install Python dependencies:**

```bash
pip install -r requirements.txt
```

4. **Apply database migrations:**

```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create a superuser account**
```bash
python manage.py createsuperuser
```

6. **Collect static files:**

```bash
python manage.py collectstatic
```

7. **Start the development server:**

```bash
python manage.py runserver
```
