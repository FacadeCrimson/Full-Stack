import os
import json
import unittest
from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy

from app import create_app
from models import setup_db, db

class CapstoneiTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "cap_test"
        self.database_path = "postgres://{}/{}".format('localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()
        
        self.trader = {"email":"bbb@gmail.com","password":"B2bbbbbbb"}
                      
        self.admin = {"email":"aaa@gmail.com","password":"A1aaaaaaa"}

        self.stock1 = {"exchange":2,"price":66,"name":"Microsoft","code":"MSFT"}

        self.stock2 = {"exchange":1,"price":100,"name":"Apple","code":"AAPL"}
    
    def tearDown(self):
        """Executed after reach test"""
        pass
    
    def test_login(self):
       res=self.client().post('/login',json=self.admin)
       self.assertEqual(res.status_code,200)
       self.assertTrue(res)

    def test_list_stock(self):
        res=self.client().post('/list',json=self.stock1)
        data=json.loads(res.data)
        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)

    def test_list_stock2(self):
        res=self.client().post('/list',json=self.stock2)
        data=json.loads(res.data)
        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)

    def test_get_price(self):
        res=self.client().get('/price')
        data=json.loads(res.data)
        self.assertEqual(res.status_code,200)
        self.assertTrue(len(data)==2)

    def test_get_exchange_price(self):
        res=self.client().get('/exchange/1/price')
        data=json.loads(res.data)
        self.assertEqual(res.status_code,200)
        self.assertTrue(len(data)==1)
    
    def test_admin_buy_stock(self):
        res=self.client().post('/buy',json={"shares": 10,"code":"MSFT"})
        data=json.loads(res.data)
        self.assertEqual(res.status_code,500)
        self.assertEqual(data['success'],False)

    def test_log_out(self):
        res=self.client().get('/logout')
        data=json.loads(res.data)
        cookie=res.client.cookies
        self.assertTrue(not cookie)
    
# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
   
   
    # * One test for success behavior of each endpoint
    # * One test for error behavior of each endpoint
    # * At least two tests of RBAC for each role

