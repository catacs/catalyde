while true; do \
kill $( \
 ps -obsdtime= -opid= -p $(pgrep -d, -P $(pgrep -d, gdb)) \
 | awk '//{split($1,a,":");if(a[1]*60+a[2]>=10)print $2}' \
 ); \
sleep 5; done

