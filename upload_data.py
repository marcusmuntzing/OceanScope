import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://oceanscope:oceanscope@cluster0.fbyof7e.mongodb.net/?retryWrites=true&w=majority"


client = MongoClient(uri, server_api=ServerApi('1'))

db = client["data"]
collection = db["data"]

with open("data.json") as f:
    data = json.load(f)


collection.insert_many(data)