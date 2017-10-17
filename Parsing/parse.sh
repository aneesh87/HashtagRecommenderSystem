folders=`find . -name "*.json"`
for i in $folders
do
    echo "########## Starting Processing of $i ######################" >> logs.txt
    while read -r line || [ -n "$line" ]; do
      a=$(echo $line |  tr -d '\000-\031\127' | jq '.text, .entities.hashtags[].text' 2>> logs.txt | grep -v "^null")
      if [[ $a ]]
      then
        header=$(echo "$a" | head -n1 | tr -d ',')
        tail=$(echo "$a" | tail -n +2)
        #echo "$header"
        #echo "$tail"
        for y in $tail
        do
            echo $header","$y | tr -d '"#' >> KEYVALUES.csv
        done
      fi
    done < $i
    echo "########## Processed $i completely #######################" >> logs.txt
done
#cat CSVFILE | perl -nle 'print if m{^[[:ascii:]]+$}' > hastags.csv
#rm CSVFILE
