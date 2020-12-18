from inspektlabs import db, app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False, unique=True)
    image = db.Column(db.String(20), default='')

    def create_token(self, exp=1800):
        s = Serializer(app.config['SECRET_KEY'], exp)
        return s.dumps({'id': self.id}).decode('utf-8')

    @staticmethod
    def verify_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            id = s.loads(token)['id']
        except:
            return None
        return User.query.get(id)

    def __repr__(self):
        return f"User(Email: {self.email}, Image: {self.image})"
