from inspektlabs import app, bcrypt, db, limiter
from flask import request, make_response, jsonify
from inspektlabs.model import User
from functools import wraps
import os


@app.route('/register', methods=['POST'])
@limiter.exempt
def register():
    req = request.get_json()
    try:
        email = req['email']
        password = req['password']
        password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(email=email, password=password)
        db.session.add(user)
        db.session.commit()
        token = user.create_token()
        return make_response(jsonify({'msg': token}), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({'msg': 'Please enter credentials'}), 422)


@app.route('/login', methods=['POST'])
@limiter.exempt
def login():
    req = request.get_json()
    try:
        email = req['email']
        password = req['password']
        user = User.query.filter_by(email=email).first()
        if(user):
            if bcrypt.check_password_hash(user.password, password):
                token = user.create_token()
            else:
                return make_response(jsonify({'msg': 'Invalid Credentials'}), 401)
        else:
            return make_response(jsonify({'msg': 'Invalid Credentials'}), 401)
        return make_response(jsonify({'msg': token}), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({'msg': 'Please enter credentials'}), 422)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return make_response(jsonify({'msg': 'No token'}), 422)
        user = User.verify_token(token)
        if user is None:
            return make_response(jsonify({'msg': 'Token is invalid'}), 401)
        return f(user, *args, *kwargs)
    return decorated


@app.route('/upload', methods=['POST'])
@limiter.limit("5 per minute")
@token_required
def upload(user):
    file = request.files['file']
    filename = file.filename

    img_path = os.path.join(app.root_path, 'static/images', f"{filename}")
    file.save(img_path)

    user.image = filename
    db.session.commit()

    return make_response(jsonify({'msg': f'{filename}'}), 200)

@app.route('/loadimage', methods=['GET'])
@limiter.limit("5 per minute")
@token_required
def load_image(user):
    return make_response(jsonify({'msg': f'{user.image}'}), 200)

