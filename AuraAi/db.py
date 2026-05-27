import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Aashisahu@123",
    database="auraai"
)

cursor = conn.cursor()

print("Database Connected Successfully")