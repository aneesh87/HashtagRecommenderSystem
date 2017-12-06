# HashTag Recommender System for Twitter.

**Hadoop and Spark Clusters have been setup on 5 nodes. Total cluster capacity is 185 GB.**

To access Hadoop Cluster UI: http://152.46.19.126:50070

To access Spark Cluster UI: http://152.46.19.126:8080

To access Solr UI: http://152.46.18.227:8983/solr/

**Completed Tasks**

1. Clean hadoop cluster
2. Added 2.5 days of data
3. Ran Spark job on all the data
4. Analyze global trends (top trending hastags) filter them and store in CSV (text,hashtag,trend) format.
5. Setup Solr cluster on 2 nodes and Zookeeper on one
6. Index terding tags' csv into Solr 
7. Developed Front End UI and query Solr for suggestions.

**Preliminary Results**

Preprocessing tweets for day 1 on single machine with 8GB RAM 6 Cores 256GB SSD: **40 mins**

Preprocessing tweets for day 1 in distributed Spark Cluster 5 ndoes: **5 mins**

Tweets preprocessed for day 1: **2,675,732**, **8.6GB**

Tweets to analyze after preprocessing day 1: **354,172**

