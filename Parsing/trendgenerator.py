# Author: Sanket Shahane svshahan@ncsu.edu

# Command to run the script:
# $spark-submit trendgenerator.py

from pyspark import SparkConf, SparkContext
from pyspark.sql.session import SparkSession
import json
import sys
import re

APP_NAME = "Trend Generator"

def main(sc):
    # Creating trending csv
    df = spark.read.csv("hdfs://master:9000/data/csv/*/part*")
    trend = df.groupBy('_c1').count()
    trend.write.csv("hdfs://master:9000/data/grpahdata")
    sqlContext.registerDataFrameAsTable(df,"rawtable")
    sqlContext.registerDataFrameAsTable(trend,"trendtable")
    outputDF = sqlContext.sql("select r._c0,r._c1,t.count from rawtable r, trendtable t where r._c1=t._c1").toDF('text','hashtag','trend')
    outputDF.write.csv("hdfs://master:9000/data/trend")

if __name__ == "__main__":
    conf = SparkConf().setAppName(APP_NAME)
    conf = conf.setMaster("spark://master:7077")
    conf = conf.set("spark.submit.deployMode", "client")
    sc= SparkContext(conf=conf)
    spark = SparkSession(sc)
    sqlContext = SQLContext(sc)
    main(sc)
