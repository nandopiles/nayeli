## Nayeli Online Store API

### This repository contains the installation guide for setting up the API needed to manage users and products for the Nayeli online store. The API, built with Flask, serves as the backend for handling user authentication, product management, and other related functionalities. Follow the instructions below to install and run the API on an Ubuntu environment.

### If you have all the installation you can run the api and then access to the documentation at [API Documentation](http://127.0.0.1:5000/)

### Installation Guide for Ubuntu Environment

#### 1. Update and Upgrade

Update and upgrade your system:

```
sudo apt-get update
sudo apt-get upgrade
```

#### 2. Install Python3

Verify that Python3 is installed:

```
sudo apt install python3
python3 --version
```

#### 3. Install pip

Install Python package manager (pip):

```
sudo apt install python3-pip
```

#### 4. Install Flask

Install Flask using pip:

```
sudo pip3 install Flask
```

#### 5. Install MySql Server

Install MySQL server and its development library:

```
sudo apt install mysql-server libmysqlclient-dev
```

#### 6. Verify MySql Installation

Confirm MySQL installation:

```
sudo mysql
```

#### 7. Cloud Service Configuration

Vamos a utilizar el servicio en la nube: Clever Cloud

Utilize the Clever Cloud service for cloud hosting. Store database credentials securely in your preferred database manager.

#### 8. Install SQLAlchemy

Install SQLAlchemy ORM for database management:

```
sudo pip3 install Flask-SQLAlchemy
```

#### 9. Install Database connector

Install the MySQL database connector:

```
pip install mysqlclient
```

#### 10. Resolve Dependencies

If encountering an error, ensure the "pkg-config" package is installed:

```
sudo apt-get install pkg-config
```

#### 11. Update Path

Add ~/local/bin directory to your PATH by editing your terminal configuration file (e.g., ~/.zshrc or ~/bashrc) and adding the line:

```
export PATH="$HOME/.local/bin:$PATH"
```

Then, update the configuration:

```
source ~/.zshrc
```

#### 12. Run the API

After this, navigate to your project directory and execute the API:

```
python3 run-py
```

#### 13. Access API Docs

Once the API is running, you can access its documentation at:

```
http://127.0.0.1:5000/
```

Your directory structure should resemble the following:

```
└── 📁api
    └── 📁app
        └── __init__.py
        └── models.py
        └── routes.py
    └── config.json
    └── config.py
    └── run.py
```
