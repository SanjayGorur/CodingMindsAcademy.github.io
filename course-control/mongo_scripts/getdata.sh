echo please input mlab username:
read username
echo please input mlab password:
read password
mongo ds247569.mlab.com:47569/shareworks-prod -u $username -p $password < registration_page.js > ../course2020Summer1.js
mongo ds247569.mlab.com:47569/shareworks-prod -u $username -p $password < advice_page.js > ../id_coursecodes2.js
echo Finished
echo MAKE SURE to clean TWO files above, mongo script would print some message.