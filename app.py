from flask import Flask, render_template, request, redirect, url_for, session
import os
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
secret_key = os.urandom(24)
app.secret_key = secret_key

# Database connection function
def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Falalala06??',
            database='employee_reward_management'
        )
        if connection.is_connected():
            print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def bindex():
    return render_template('index.html')

@app.route('/login.html')
def bogin():
    return render_template('login.html')

@app.route('/main.html')
def bain():
    return render_template('main.html')

@app.route('/about.html')
def board():
    return render_template('about.html')

@app.route('/adminlogin.html')
def bard():
    return render_template('adminlogin.html')

@app.route('/adminmain.html')
def card():
    return render_template('adminmain.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)

    if request.method == 'POST':
        email = request.form.get('username')
        password = request.form.get('password')  # You can implement password checking

        query = "SELECT * FROM employees WHERE email=%s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if user:
            session['user'] = user
            return redirect('/main')  # Redirect to the main page
        else:
            return "Invalid login"  # You can redirect to a login error page

    return render_template('login.html')

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    username = request.form.get('email')
    designation = request.form.get('designation')
    branch_office = request.form.get('branch_office')
    department = request.form.get('department')
    annual_income = request.form.get('annual_income')

    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    query = """
    INSERT INTO employees (name, email, designation, branch_office, department, annual_income, points)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    data = (name, username, designation, branch_office, department, annual_income, 0)

    try:
        cursor.execute(query, data)
        connection.commit()

        # Retrieve the newly signed-up user data
        cursor.execute("SELECT * FROM employees WHERE email = %s", (username,))
        user = cursor.fetchone()

        # Store the user data in the session
        session['user'] = user

        print("User signed up successfully")
    except Error as e:
        print(f"The error '{e}' occurred")
    finally:
        cursor.close()
        connection.close()

    return redirect('/main')  # Redirect to main page after signup

@app.route('/main')
def main():
    if 'user' in session:
        user = session['user']  # Get user data from session
        return render_template('main.html', user=user)
    else:
        return redirect('/login')  # Redirect to login if not logged in

if __name__ == '__main__':
    app.run(debug=True)
