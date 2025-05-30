# Teacher Portal

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hari10007/teacher_portal.git
   cd teacher-portal

   ```

2. **Create a virtual environment:**

```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate  # On Windows
```

### 3️ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️ Configure Database

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5 Collect Static
```bash
python manage.py collectstatic
```

### 6 Run the Development Server

```bash
python manage.py runserver