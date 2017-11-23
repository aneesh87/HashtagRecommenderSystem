# HashTag Recommender System for Twitter.

**Hadoop and Spark Clusters have been setup on 5 nodes. Total cluster capacity is 185 GB.**

To access Hadoop Cluster UI: http://152.46.19.126:50070

To access Spark Cluster UI: http://152.46.19.126:8080

**Pending Tasks**

1. Run Spark job on 2.5 days of data
2. Clean hadoop cluster
3. Add 3.5 days of data
4. Run Spark job on 3.5 days of data
5. Analyze trends (top trending hastags) filter them and store in CSV
6. Setup Solr cluster 3 nodes should be more than sufficient
7. Index terding tags' csv into Solr
8. Develop Front End UI and query Solr for suggestions.

**Preliminary Results**

Preprocessing tweets for day 1 on single machine with 8GB RAM 6 Cores 256GB SSD: **40 mins**

Preprocessing tweets for day 1 in distributed Spark Cluster 5 ndoes: **5 mins**

Tweets preprocessed for day 1: **2,675,732** 

Tweets to analyze after preprocessing day 1: **354,172**
