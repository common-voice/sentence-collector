# Common Voice Sentence Collector [![Build Status](https://travis-ci.com/Common-Voice/sentence-collector.svg?branch=master)](https://travis-ci.com/Common-Voice/sentence-collector)

## Get involved

- Fork the project and test that you can run the environment locally following the instructions below.
- Is everything working as expected? If not, submit [a new issue](https://github.com/Common-Voice/sentence-collector/issues/new).
- Review the pending issues in the [v2.0 project](https://github.com/Common-Voice/sentence-collector/projects/2).
- Create a [new PR](https://github.com/Common-Voice/sentence-collector/compare) to fix any of the existing issues in the project.

## Prerequisites

 * [Node >= 12.0.0](https://nodejs.org/en/)
 * [docker](https://docs.docker.com/install/)
 * [docker-compose](https://docs.docker.com/compose/install/)

## Local Development

```
cp .env_template .env
docker-compose up
```

Now we can install the dependencies and start the server in a new terminal window:

```
npm ci
npm run start:server
```

Finally, you can start the frontend in another terminal window. Please make sure that you're in the root directory of the repository.

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

## Useful queries

### Get all approved sentences

```
SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    GROUP BY Sentences.id
    HAVING
      number_of_approving_votes >= 2;
```

### Get not decided sentences

```
SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    GROUP BY Sentences.id
    HAVING
      number_of_votes < 2 OR # not enough votes yet
      number_of_votes = 2 AND number_of_approving_votes = 1; # a tie at one each
```

### Get all decided

```
SELECT Sentences.*
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    GROUP BY Sentences.id
    HAVING
      COUNT(Votes.approval) >= 2;
```

### Get all rejected

```
SELECT Sentences.*
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    GROUP BY Sentences.id
    HAVING
      (
        COUNT(Votes.approval) = 3 AND
        SUM(Votes.approval) < 2
      ) OR (
        COUNT(Votes.approval) = 2 AND
        SUM(Votes.approval) = 0
      );
```

## API

* Get info for a single sentence: `/sentences/de?sentence=Wie%20zuverl%C3%A4ssig%20eine%20Versicherung%20zahlt,%20wei%C3%9F%20man%20erst,%20wenn%20man%20sie%20braucht.`. Replace `de` with the locale code for the language. In the browser you can just copy/paste the sentence and it will correctly handle spaces and symbols)
* Get all sources: `/sentences/sources/de`. Replace `de` with the locale code for the language.
* Get all sentences as text: `/sentences/text/de`. Replace `de` with the locale code for the language.
