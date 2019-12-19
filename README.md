# Common Voice Sentence Collector [![Build Status](https://travis-ci.com/Common-Voice/sentence-collector.svg?branch=master)](https://travis-ci.com/Common-Voice/sentence-collector)

## Get involved

- Fork the project and test that you can run the environment locally following the instructions below.
- Is everything working as expected? If not, submit [a new issue](https://github.com/Common-Voice/sentence-collector/issues/new).
- Review the pending issues in the [v2.0 project](https://github.com/Common-Voice/sentence-collector/projects/2).
- Create a [new PR](https://github.com/Common-Voice/sentence-collector/compare) to fix any of the existing issues in the project.

## Prerequisites

 * [Node >= 10.12.0](https://nodejs.org/en/)
 * [docker](https://docs.docker.com/install/)
 * [docker-compose](https://docs.docker.com/compose/install/)

## Local Development

```
cp .env_template .env
docker-compose up
```

Once Kinto is fully started, you can create an admin account with the password `password`. Run the following in a separate Terminal window:

```
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"data": {"password": "password"}}' \
  http://localhost:8888/v1/accounts/admin
```

If you want to change the password, please also change the `KINTO_PASSWORD` in `.env`.

Now we can install the dependencies and initialize the database:

```
npm install
npm run init-db
```

If you get an error along the lines of `Error: ENOENT: no such file or directory, scandir '/directory/sentence-collector/voice-web/server/data'` you can safely ignore it for now. This folder is used to gather statistics and metadata from the local Common Voice instance. You can develop most of the features for the collector without having that repository around.

Finally, you can start the frontend by running npm. Please make sure that you're in the root directory of the repository.

```
npm start
```

The sentence collector is now accessible through `http://localhost:1234`.

## Deployment

The website is hosted on GitHub Pages. Contributors with write access to the repository can deploy to production by running the following command. Please note that you will need to provide a GitHub token for the release notes. [Read more about tokens on GitHub.](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

```
GITHUB_TOKEN=... npm run deploy
```

This assumes that your `origin` is pointing to this repository. If not, you can specify the remote name with:

```
GITHUB_TOKEN=... npm run deploy -o <remotename>
```

This will also create [release notes on GitHub](https://github.com/Common-Voice/sentence-collector/releases).

### In case of a crash

In the past we've experienced a couple of crashes with Kinto. It's recommended to only restart the database container. If that doesn't do the trick and the `docker-compose` process mentions authorization errors, you might have to `docker exec` a bash on the database machine and recreate the postgres role `CREATE ROLE <POSTGRES_USER> WITH LOGIN PASSWORD '<POSTGRES_PASSWORD>;

## Export

### Locally

Make sure you have voice-web repository cloned locally first.

``git clone https://github.com/mozilla/voice-web.git``

Anyone with a locally working setup can export sentences to be added to Common Voice. Make sure to have your `.env` file correctly set up, including the correct path to the Common Voice (voice-web) repository as well as the Kinto credentials depending on the environment.

If you want to run the export against the local instance, remove the `SC_SYSTEM` env variable below.

```
SC_SYSTEM=production npm run export
```

This will export all the approved sentences for languages currently active in https://raw.githubusercontent.com/mozilla/voice-web/master/locales/all.json and put them into `sentence-collector.txt` files in the corresponding locale folder of the Common Voice repository. After the script ran, you might verify the output by running `git status` in the voice-web repository.

### Exporting to the official repository

1. Make sure you have forked voice-web repo in your user.
2. Clone voice-web locally and link your remote fork for exports

```
git clone https://github.com/mozilla/voice-web.git
cd voice-web
git remote add fork git@github.com:YOURUSERNAME/voice-web.git
```

All steps to do the export to our fork (you can repeat this each time you want to make an updated export)

```
cd  voice-web
## Making sure our master branch is updated
git checkout master
git pull origin master
git push fork master
git push --delete fork sentence-collector-export
git branch -D sentence-collector-export
## Creating a new branch just for forks
git checkout -b sentence-collector-export
cd ..
## Creating the export
SC_SYSTEM=production npm run export
## Committing the export to our Fork
cd voice-web
git add .
git commit -am "Sentence Collector - validated sentences export - 2019-02-13-13-28"
git push fork sentence-collector-export
```

Now you will be able to create a manual pull request using the following URL:

``https://github.com/YOURUSERNAME/voice-web/pull/new/sentence-collector-export``

## Adding a new user

You can add as many users as you want. To do so, call the accounts endpoint again:

```
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"data": {"password": "THIS_IS_YOUR_PASSWORD"}}' \
  http://localhost:8888/v1/accounts/USERNAME
```

where `USERNAME` is your username and `THIS_IS_YOUR_PASSWORD` is your password.

To create a user "Bob" with the password "mozilla":

```
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"data": {"password": "mozilla"}}' \
  http://localhost:8888/v1/accounts/Bob
```
