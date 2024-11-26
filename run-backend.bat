



@REM Activar entorno virtual
call venv\Scripts\activate

cd app/backend

uvicorn main:app --reload