# HashTag Recommender System for Twitter.

**Hadoop and Spark Clusters have been setup on 5 nodes. Total cluster capacity is 185 GB.**

To access Hadoop Cluster UI: http://152.46.19.126:50070

To access Spark Cluster UI: http://152.46.19.126:8080

**Pending Tasks**

1. Clean hadoop cluster
2. Add 3.5 days of data
3. Run Spark job on 3.5 days of data
4. Analyze global trends (top trending hastags) filter them and store in CSV (text,hashtag,trend) format.
5. Setup Solr cluster 3 nodes should be more than sufficient --important at this stage
6. Index terding tags' csv into Solr  --Prototype ready
7. Develop Front End UI and query Solr for suggestions.

1. Solr part is ready and works on the single node machine. recomender-schema.xml is the solr schema file and also has the query that the UI should make inorder to get the recommeded hashtags.

**Preliminary Results**

Preprocessing tweets for day 1 on single machine with 8GB RAM 6 Cores 256GB SSD: **40 mins**

Preprocessing tweets for day 1 in distributed Spark Cluster 5 ndoes: **5 mins**

Tweets preprocessed for day 1: **2,675,732**, **8.6GB**

Tweets to analyze after preprocessing day 1: **354,172**

