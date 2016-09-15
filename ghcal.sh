mkdir ../ghcal
cp thecompleteworks.txt ../ghcal/thecompleteworks.txt
cd ../ghcal
rm giterature.txt
git init
touch giterature.txt

COUNTS_ARRAY=()
DATES_ARRAY=()
OUTER_COUNTER=1

LENGTH=${#DATES_ARRAY[@]}

for i in $(seq 0 $((LENGTH-1)))
  do
    INNER_COUNTER=0
    while [ $INNER_COUNTER -lt ${COUNTS_ARRAY[i]} ]
      do
        # echo Outer counter $OUTER_COUNTER and inner $INNER_COUNTER
        # echo Array index $i value ${COUNTS_ARRAY[i]}
        tail -n+$OUTER_COUNTER thecompleteworks.txt | head -n1 >> giterature.txt
        git add giterature.txt
        GIT_AUTHOR_DATE="${DATES_ARRAY[i]}" GIT_COMMITTER_DATE="${DATES_ARRAY[i]}" \
        git commit -m "Line number $OUTER_COUNTER from His complete works"
        let INNER_COUNTER+=1
        let OUTER_COUNTER+=1
      done
  done
