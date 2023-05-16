import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://blutech:blutech@blutech.p9bzac5.mongodb.net/?retryWrites=true&w=majority"


client = MongoClient(uri, server_api=ServerApi('1'))

db = client["blutech"]
collection = db["data1"]

with open("data.json") as f:
    data = json.load(f)


collection.insert_many(data)