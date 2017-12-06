# Author: Sanket Shahane (svshahan@ncsu.edu)

from pyspark import SparkConf, SparkContext
from pyspark import SparkConf, SparkContext
from pyspark.sql import SQLContext
from pyspark.sql.session import SparkSession
import json
import sys
import re

## Constants
APP_NAME = "Json to CSV"
##OTHER FUNCTIONS/CLASSES

def process(tweet):
    json_obj = None
    try:
        json_obj = json.loads(tweet)
    except:
        #print "Unexpected error:", sys.exc_info()[0]
        return None
    if 'delete' in json_obj.keys():
        return None
    ls = []
    for i in range(0,len(json_obj['entities']['hashtags'])):
        try:
            text = str(str(json_obj['text']))
            text = re.sub(r'(http|www)\S+','',text)
            text = re.sub('[^A-Za-z0-9\s]',' ',text)
            text = re.sub(' +',' ',text)
            text = text.replace('\n',' ').strip().lower()
            hashtag = str(json_obj['entities']['hashtags'][i]['text']).replace(",","").replace('\n',' ').lower()
            if hashtag==None or len(hashtag)==0 or hashtag=='null':
                continue
            ls.append(text+','+hashtag)
        except:
            #print "Unexpected error:", sys.exc_info()[0]
            continue
    return ls

def preprocess(sc, ipname):
    #datafile = sc.textFile("hdfs://master:9000/testdata/2015/03/22/*/*.json")
    datafile = sc.textFile("hdfs://master:9000/data/2015/03/"+ipname+'/*/*.json')
    temp = datafile.map(lambda x: process(x))
    csv = temp.filter(lambda x: x!=None and len(x)!=0).flatMap(lambda x: x)
    csv.saveAsTextFile("hdfs://master:9000/data/2015/03/"+ipname+"/temp/")
    sc.textFile("hdfs://master:9000/data/2015/03/"+ipname+"/temp/part*").coalesce(1).saveAsTextFile("hdfs://master:9000/data/csv/"+ipname)

def trend(sc):
    # Creating trending csv
    df = spark.read.csv("hdfs://master:9000/data/csv/*/part*")
    trend = df.groupBy('_c1').count()
    trend.coalesce(1).write.csv("hdfs://master:9000/data/graphdata")
    sqlContext.registerDataFrameAsTable(df,"rawtable")
    sqlContext.registerDataFrameAsTable(trend,"trendtable")
    outputDF = sqlContext.sql("select r._c0,r._c1,t.count from rawtable r, trendtable t where r._c1=t._c1").toDF('text','hashtag','trend')
    outputDF.coalesce(1).write.csv("hdfs://master:9000/data/trend", header=True)

preprocess(sc,'22') #preprocess day 1
preprocess(sc,'23') #preprocess day 2
preprocess(sc,'24') #preprocess day 3
trend(sc)           #generate trends