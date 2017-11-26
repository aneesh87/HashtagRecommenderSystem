# Author: Sanket Shahane svshahan@ncsu.edu

# Command to run the script: 22 is the day which you want to process in hadoop
# $spark-submit datapreprocessing.py 22

from pyspark import SparkConf, SparkContext
import json
import sys
import re
# Spark application name: Constant
APP_NAME = "Json to CSV"

# function to process each tweet. Called on the spark rdd
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

# main function to execute the data preprocessing step.
# Writes the final output to /data/csv/date/ folder in hdfs
def main(sc, ipname):
    #datafile = sc.textFile("hdfs://master:9000/testdata/2015/03/22/*/*.json")
    datafile = sc.textFile("hdfs://master:9000/data/2015/03/"+ipname+'/*/*.json')
    temp = datafile.map(lambda x: process(x))
    csv = temp.filter(lambda x: x!=None and len(x)!=0).flatMap(lambda x: x)
    csv.saveAsTextFile("hdfs://master:9000/data/2015/03/"+ipname+"/temp/")
    sc.textFile("hdfs://master:9000/data/2015/03/"+ipname+"/temp/part*").coalesce(1).saveAsTextFile("hdfs://master:9000/data/csv/"+ipname)

# Initialization call required for spark-submit
if __name__ == "__main__":
    conf = SparkConf().setAppName(APP_NAME)
    conf = conf.setMaster("spark://master:7077")
    conf = conf.set("spark.submit.deployMode", "client")
    sc= SparkContext(conf=conf)
    ipname = sys.argv[1]
    # Execute Main functionality
    main(sc, ipname)