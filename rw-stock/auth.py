import os
import json
import requests
import flask_login
from jose import jwt
from functools import wraps
from urllib.request import urlopen
from flask import request, _request_ctx_stack, session

AUTH0_DOMAIN = os.environ['URL']
ALGORITHMS = ['RS256']
API_AUDIENCE = os.environ['AUDIENCE']
API_CLIENT = os.environ['CLIENTID']
API_CONNECTION = os.environ['CONNECTION']

## AuthError Exception
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

## Check Auth Header
## If header contains not Authorization, check cookie instead
def get_token():
    """Obtains the Access Token from the Authorization Header
    """
    if 'token' in session:
        token = session['token']
        return token
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
        }, 401)

    parts = auth.split()
    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer".'
        }, 401)

    elif len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
        }, 401)

    elif len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be bearer token.'
        }, 401)

    token = parts[1]
    return token

## Validate permission in payload
def check_permissions(permission, payload):
    if 'permissions' not in payload:
        raise AuthError({
            'code': 'invalid_claims',
            'description': 'Permissions not included in JWT.'
        }, 400)

    if permission not in payload['permissions']:
        raise AuthError({
            'code': 'unauthorized',
            'description': 'Permission not found.'
        }, 403)
    return True

## Decode token and return payload
def verify_decode_jwt(token):
    jsonurl = urlopen(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json')
    jwks = json.loads(jsonurl.read())
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    if 'kid' not in unverified_header:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization malformed.'
        }, 401)

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer='https://' + AUTH0_DOMAIN + '/'
            )
            return payload

        except jwt.ExpiredSignatureError:
            raise AuthError({
                'code': 'token_expired',
                'description': 'Token expired.'
            }, 401)

        except jwt.JWTClaimsError:
            raise AuthError({
                'code': 'invalid_claims',
                'description': 'Incorrect claims. Please, check the audience and issuer.'
            }, 401)
        except Exception:
            raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to parse authentication token.'
            }, 400)
    raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to find the appropriate key.'
            }, 400)

# Construct the decorator for permisssion authentication
def requires_auth(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token()
            payload = verify_decode_jwt(token)
            check_permissions(permission,payload)
            return f(payload, *args, **kwargs)

        return wrapper
    return requires_auth_decorator

def auth_and_get_trader(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token()
            payload = verify_decode_jwt(token)
            check_permissions(permission,payload)
            id = payload["sub"][6:]
            return f(id, payload, *args, **kwargs)

        return wrapper
    return requires_auth_decorator

def sign_up(email,password):
    url = "https://"+AUTH0_DOMAIN +"/dbconnections/signup"
    payload = 'client_id=' + API_CLIENT + '&email=' + email + '&password=' + password + '&connection=' + API_CONNECTION
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.request("POST", url, headers=headers, data = payload).text
    return json.loads(response)

def log_in(email,password):
    url = "https://"+AUTH0_DOMAIN +"/oauth/token"
    payload = 'grant_type=password&client_id=' + API_CLIENT + '&audience=' + API_AUDIENCE + '&username=' + email + '&password=' + password
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.request("POST", url, headers=headers, data = payload).text
    return json.loads(response)