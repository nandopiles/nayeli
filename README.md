Api hecha en Flask  
Guía de instalación y ejecución en un entorno Ubuntu  
Nos aseguramos que tenemos las últimas actualizaciones  
```
sudo apt-get update  
sudo apt-get upgrade
```

Tenemos que tener Python3 instalado  
```
sudo apt install python3  
python3 --version
```

También el paquete de instalación de Python (pip):  
```
sudo apt install python3-pip  
```

Con éste instalaremos Flask:  
```
sudo pip3 install Flask  
```

También tendremos que instalar MySQL server  
```
sudo apt install mysql-server libmysqlclient-dev  
```

Comprobamos que se ha instalado correctamente:  
```
sudo mysql
```

Vamos a utilizar el servicio en la nube: Clever Cloud

Por lo que pondremos todas las credenciales e información de la base de datos en nuestro gestor de base de datos de preferencia y accederemos a ella.

Tendremos que instalar también el ORM que vamos a utilizar, que va a ser SQLAlchemy:  
``` 
sudo pip3 install Flask-SQLAlchemy
```

También tendremos que instalar el conector a la base de datos: 
``` 
pip install mysqlclient  
```
En el caso de que nos diera un error, seguramente sea por la falta del paquete "pkg-config" en nuestro equipo. Para ello tendremos que ejecutar el siguiente comando:  
```
sudo apt-get install pkg-config
```

Una vez hecho eso ya podremos instalar mysqlclient

Tendremos que agregar el directorio ~/local/bin a nuestra PATH. Para ello nos iremos a nuestro fichero de configuración de la terminal  
En mi caso es ~/.zshrc, pero si estáis utilizando bash será ~/bashrc  
Agregamos la siguiente línea:  
```
export PATH="$HOME/.local/bin:$PATH"
```

Y actualizamos la configuración:  
```
source ~/.zshrc
```

Una vez hecho esto nos posicionaremos dentro de nuestro proyecto y ya podremos ejecutar la api:

```
python3 run-py
```
La estructura de directorios se tiene que ver algo así:

```
└── 📁nayeli
    └── README.md
    └── 📁api
        └── 📁app
            └── __init__.py
            └── models.py
            └── routes.py
        └── config.py
        └── run.py
```
