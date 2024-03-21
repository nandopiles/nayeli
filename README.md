Api hecha en Flask, supongamos que desde un equipo Ubuntu

Tenemos que tener Python3 instalado

sudo apt update
sudo apt install python3
python3 --version

Tendremos que tener el paquete de instalación de Python (pip) instalado:
sudo apt install python3-pip

Con éste instalaremos Flask:
pip install Flask

Tendremos que instalar también MySQL server y yo he usado como gestor MySQL Workbench
sudo apt-get update
sudo apt-get upgrade
sudo apt-get autoremove

sudo apt-get install mysql-server

Comprobamos que se ha instalado correctamente:
sudo mysql

Ahora hay que instalar el gestor MySQL Workbench
sudo snap install mysql-workbench-community

Luego en la consola, se debe ejecutar los siguientes comandos, con el propósito de cambiar el plugin de auth_socket a mysql_native_password:
sudo mysql -u root -p

mysql> use mysql
mysql> SELECT User, Host, plugin FROM mysql.user;
mysql> UPDATE user SET plugin='mysql_native_password' WHERE User='root';
mysql> FLUSH PRIVILEGES;

Revisamos que los cambios se hayan efectuado:
mysql> SELECT User, Host, plugin FROM mysql.user;


Vamos a utilizar el servicio en la nube:
Clever Cloud

Por lo que pondremos todas las credenciales e información de la base de datos en nuestro gestor de base de datos y accederemos a ella.

Después de esto utilizaremos el ORM flask_sqlalchemy:
pip install flask_sqlalchemy



