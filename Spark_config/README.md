HashTag Recommender System for Twitter.

Steps to configure Spark Cluster:
	1. Install Java 8 on all machines
	2. Add entries to the _/etc/hosts_ file of all nodes
	3. Install openssh-server and configure passwordless ssh authentication using ssh-keygen and ssh-copyid
	3. Download Spark on master
	4. add the two files in from the repo to _$SPARK\_HOME/conf_
	5. scp this installation to all the nodes in the cluster;
	6. edit the _.bashrc_ and export SPARK\_HOME, export JAVA_HOME (step 6: Optional)
	7. Start spark cluster: _SPARK\_HOME/sbin$./start-all.sh_ 
	8. Stop spark cluster: _SPARK\_HOME/sbin$./stop-all.sh_
