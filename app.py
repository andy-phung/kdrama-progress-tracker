# run using: python -m flask run

from pypresence import Presence # The simple rich presence client in pypresence
import time
from flask import Flask, request
from flask_cors import CORS
import json


client_id = "1043791855114002453"  # Put your Client ID in here
RPC = Presence(client_id)  # Initialize the Presence client
RPC.connect()

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def result():
    RPC.update(state=str(request.json["episode"]), details="Watching " + str(request.json["title"]), large_image=str(request.json["image"]), buttons=[{"label": "watch with me!", "url": str(request.json["watch"])}]) # Updates our presence
    return 'Received !' # response to your request.

#while True:  # The presence will stay on as long as the program is running
#    RPC.update(state = "test", start=start_time) # We want to apply start time when you run the presence.
    
        
