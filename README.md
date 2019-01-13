# Common Voice Sentence Collector [![Build Status](https://travis-ci.com/Common-Voice/sentence-collector.svg?branch=master)](https://travis-ci.com/Common-Voice/sentence-collector)

## Get involved

- Fork the project and test that you can run the environment locally following the instructions below.
- Is everything working as expected? If not, submit [a new issue](https://github.com/Common-Voice/sentence-collector/issues/new).
- Review the pending issues on the [MVP milestone](https://github.com/Common-Voice/sentence-collector/milestone/1).
- Create a [new PR](https://github.com/Common-Voice/sentence-collector/compare) to fix any of the existing issues in the MVP milestone.
- Get involved in the [development discussion topic](https://discourse.mozilla.org/t/sentence-collection-tool-development-topic/33390/2) and ask any questions.

## Prerequisites

 * [Node >= 10.12.0](https://nodejs.org/en/)
 * [yarn](https://yarnpkg.com/docs/install)
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
yarn
yarn init-db
```

If you get an error along the lines of `Error: ENOENT: no such file or directory, scandir '/directory/sentence-collector/voice-web/server/data'` you can safely ignore it for now. This folder is used to gather statistics and metadata from the local Common Voice instance. You can develop most of the features for the collector without having that repository around.

Finally, you can start the frontend by running yarn. Please make sure that you're in the root directory of the repository.

```
yarn start
```

The sentence collector is now accessible through `http://localhost:1234`.

## Deployment

The website is hosted on GitHub Pages. Contributors with write access to the repository can deploy to production by running the following command. Please note that you will need to provide a GitHub token for the release notes. [Read more about tokens on GitHub.](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

```
GITHUB_TOKEN=... yarn run deploy
```

This assumes that your `origin` is pointing to this repository. If not, you can specify the remote name with:

```
GITHUB_TOKEN=... yarn run deploy -- -o <remotename>
```

This will also create [release notes on GitHub](https://github.com/Common-Voice/sentence-collector/releases).

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
