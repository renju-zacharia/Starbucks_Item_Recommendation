from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pymongo
# import scrape_mars

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/sb_menu_db")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    tweets_rec = mongo.db.menu_cluster.find_one()

    # Return index.html
    return render_template("index.html")
 
# Route that will return aggregated sentiments counts
@app.route("/buildchoice/<choice>/")
def buildchoice(choice):

    choice_list = [choice]

    items_rec = mongo.db.menu_cluster.find(   {"Label": {"$in": choice_list}}  
                                             ,{"Beverage": 1, "Type": 1, "_id": 0, "Calories":1 , "Fat":1, "Carbohydrate":1, "Fibre":1, "Sugar":1, "Protein":1, "Caffeine":1 ,"Label":1, "item_url":1, "image_url":1 } 
                                             #,{"image_url":{ "$ne": "null" } }
                                             #,{"image_url":{"$exists": True} }
                                          )
    
    items_list = []

    for item in items_rec:
        #print(item)
        items_list.append(item)

    #print(items_list)
    return jsonify(items_list)

if __name__ == "__main__":
    app.run(debug=True)
