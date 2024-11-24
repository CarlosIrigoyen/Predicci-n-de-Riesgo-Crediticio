# Cómo instalar

## Backend

![image](https://github.com/user-attachments/assets/3e411381-5662-4040-adac-d8d333d409b4)

Para instalar el backend, se deben seguir los siguientes pasos:

1. Crear un entorno virtual
```
python -m venv venv
```

2. Activar el entorno virtual
```
.\venv\Scripts\activate
```

3. Instalar dependencias necesarias
```
pip install -r requirements.txt
```

Una vez realizados esos pasos, ya contaremos con todo lo necesario para poder ejecutar el backend.

## Frontend

![image](https://github.com/user-attachments/assets/f2f2695f-db08-4865-8e22-71e5363bd105)

Para instalar el frontend, se deben seguir los siguientes pasos:

1. Moverse a la carpeta del frontend
```
cd app/frontend
```

2. Instalar dependencias
```
npm install
```

Una vez realizados esos pasos, ya contaremos con todo lo necesario para poder ejecutar el frontend.

# Cómo ejecutar

## Backend

1. Activar entorno virtual (si ya no lo tenemos activado)
```
.\venv\Scripts\activate
```

2. Moverse a la carpeta del backend
```
cd app/backend
```

3. Ejecutarlo
```
uvicorn main:app --reload
```

## Frontend

1. Moverse a la carpeta del frontend
```
cd app/frontend
```

2. Ejecutarlo
```
npm run dev
```
