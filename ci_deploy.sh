username="sherwin.yu@us.ibm.com"
pass=$CF_SECRET
branch=$TRAVIS_BRANCH
org="sherwinyu"

if [ $branch == "master" ];
then
  space="prod"
else
  space="dev"
  cp manifest-dev.yml manifest.yml
fi

cf api https://api.ng.bluemix.net
cf auth $username $pass
cf target -o $org -s $space
cf push
