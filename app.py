from flask import Flask, request, redirect, session, send_from_directory
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from itsdangerous import URLSafeTimedSerializer
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.secret_key = "subti"


client = MongoClient("mongodb+srv://SimpleG:Hope@subtilens.ccb8r95.mongodb.net/?retryWrites=true&w=majority&appName=SubtiLens")
db = client['DBSubtiLens']
collection = db['usuarios']

# Ruta para el inicio -> redirige si ya está logueado
@app.route('/')
def home():
    if 'usuario' in session:
        return redirect('/index.html')
    return redirect('/login')


@app.route('/register.html')
def mostrar_registro():
    return send_from_directory('', 'register.html')


@app.route('/register', methods=['POST'])
def procesar_registro():
    nombres = request.form['nombres']
    apellidos = request.form['apellidos']
    birthdate = request.form['birthdate']
    usuario = request.form['usuario']
    contrasena = request.form['contrasena']
    confirmar = request.form['confirmar']

    if contrasena != confirmar:
        return " Las contraseñas no coinciden"

    if collection.find_one({'usuario': usuario}):
        return " El nombre de usuario ya está registrado"

    hashed_password = bcrypt.generate_password_hash(contrasena).decode('utf-8')

    collection.insert_one({
        'nombres': nombres,
        'apellidos': apellidos,
        'fecha_nacimiento': birthdate,
        'usuario': usuario,
        'contrasena': hashed_password
    })

    session['usuario'] = usuario
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['usuario']
        contrasena = request.form['contrasena']

        user = collection.find_one({'usuario': usuario})

        if user and bcrypt.check_password_hash(user['contrasena'], contrasena):
            session['usuario'] = usuario
            return redirect('/index.html')
        else:
            return " Usuario o contraseña incorrectos"

    return send_from_directory('', 'login.html')
#mostrar usuario actual
@app.route('/api/usuario')
def usuario_actual():
    return {'usuario': session.get('usuario')}

# Cerrar sesión
@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect('/login')


@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)


@app.route('/index.html')
def index():

    return send_from_directory('', 'index.html')

@app.route('/buy.html')
def comprar():
    if 'usuario' not in session:
        return redirect('/login')  
    return send_from_directory('', 'buy.html')

@app.route('/<page_name>.html')
def static_html_pages(page_name):
    return send_from_directory('', f'{page_name}.html')


if __name__ == '__main__':
    app.run(debug=True)