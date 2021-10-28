import React from 'react';
import { Localized } from '@fluent/react';

export default function HowTo() {
  return (
    <section>
      <Localized id="sc-howto-title">
        <h1 id="how-to">How to</h1>
      </Localized>

      <Localized id="sc-howto-addlang-title">
        <h2 id="login">Adding languages to work with</h2>
      </Localized>
      <Localized id="sc-howto-addlang-text">
        <p>Once logged in you can select your languages from the profile section.</p>
      </Localized>

      <Localized id="sc-howto-addsen-title">
        <h2 id="add-new-sentences">Add new sentences</h2>
      </Localized>
      <ul>
        <Localized id="sc-howto-addsen-title">
          <h2 id="add-new-sentences">Add new sentences</h2>
        </Localized>
        <Localized id="sc-howto-addsen-item-1" elems={{
          wikipediaLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Public_domain"
            />
          ),
          cc0WaiverLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://common-voice.github.io/community-playbook/sub_pages/cc0waiver_process.html"
            />
          )
        }}>
          <li>
            All sentences you submit must be under{' '}
            <a href="https://en.wikipedia.org/wiki/Public_domain">Public Domain (CC-0) license</a>. To
            support the inclusion of work not under public licence, we have created a{' '}
            <a href="https://common-voice.github.io/community-playbook/sub_pages/cc0waiver_process.html">
              Contributions Agreement template
            </a>{' '}
            for works where the copyright owner would like to contribute the material to Common Voice.
          </li>
        </Localized>
        <Localized id="sc-howto-addsen-item-2">
          <li>
            Numbers. There should be no digits in the source text because they can cause problems when
            read aloud. The way a number is read depends on context and might introduce confusion in
            the dataset. For example, the number “2409” could be accurately read as both “twenty-four
            zero nine” and “two thousand four hundred nine”.
          </li>
        </Localized>
        <Localized id="sc-howto-addsen-item-3">
          <li>
            Abbreviations and Acronyms. Abbreviations and acronyms like “USA” or “ICE” should be
            avoided in the source text because they may be read in a way that does not coincide with
            their spelling. Additionally, there may be multiple accurate readings for a single
            abbreviation. For example, the acronym “ICE” could be pronounced “I-C-E” or as a single
            word.
          </li>
        </Localized>
        <Localized id="sc-howto-addsen-item-4">
          <li>
            Punctuation. Special symbols and punctuation should only be included when absolutely
            necessary. For example, an apostrophe is included in English words like “don’t” and
            “we’re” and should be included in the source text, but it’s unlikely you’ll ever need a
            special symbol like “@” or “#.”
          </li>
        </Localized>
        <Localized id="sc-howto-addsen-item-5">
          <li>
            Foreign letters. Letters must be valid in the language being spoken. For example, “ж” is a
            letter in the Russian alphabet but is never used in English and so should never appear in
            any English source text.
          </li>
        </Localized>
        <Localized id="sc-howto-addsen-item-6" elems={{
          validationRulesLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Public_domain"
            />
          )
        }}>
          <li>
            Languages can have their{' '}
            <a href="https://github.com/common-voice/sentence-collector/tree/main/server/lib/validation/languages">
              own validation rules
            </a>{' '}
            with additional requirements. If there is no specific validation file for a language, we
            are using the generic English rules.
          </li>
        </Localized>
      </ul>
      <Localized id="sc-howto-addsen-post-1">
        <p>
          We prefer natural/conversational sentences. While phonetic diversity and different words in
          sentences is important, we are trying to make recording sentences as much fun as possible.
          Therefore it would be great if you could try to keep your sentences as natural/engaging as
          possible.
        </p>
      </Localized>

      <h2 id="how-to-reference-the-source">How to Cite</h2>
      <Localized id="sc-howto-cite-pre-1" elems={{
        copyrightIssuesLink: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767"
          />
        )
      }}>
        <p>
          It&apos;s important that you reference where you found the public licence to avoid
          plagiarism and to allow for follow ups on{' '}
          <a href="https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767">
            copyright issues
          </a>
          . Here are a few ways you can cite the work.
        </p>
      </Localized>
      <ul>
        <Localized id="sc-howto-cite-item-1">
          <li>
            You could include the website, e.g &quot;Common Voice -
            https://commonvoice.mozilla.org/&quot;
          </li>
        </Localized>
        <Localized id="sc-howto-cite-item-2">
          <li>
            You could use Academic referencing style, e.g harvard style &quot;Mozilla (2021) Common
            Voice. Available at https://commonvoice.mozilla.org/ (Accessed: 15th Septmber 2021)&quot;
          </li>
        </Localized>
        <Localized id="sc-howto-cite-item-3">
          <li>
            For public licence text not avialable online, you could use Academic referencing style e.g
            harvard style &quot;Jess (2021) My Public licence poems&quot;
          </li>
        </Localized>
      </ul>

      <Localized id="sc-howto-review-title">
        <h2 id="review-sentences">Review Sentences</h2>
      </Localized>

      <Localized id="sc-howto-review-subtitle">
        <h3 id="make-sure-the-sentence-meets-the-following-criteria-">
          Make sure the sentence meets the following criteria:
        </h3>
      </Localized>
      <ol>
        <Localized id="sc-howto-review-criteria-1">
          <li>The sentence must be spelled correctly.</li>
        </Localized>
        <Localized id="sc-howto-review-criteria-2">
          <li>The sentence must be grammatically correct.</li>
        </Localized>
        <Localized id="sc-howto-review-criteria-3">
          <li>The sentence must be speakable.</li>
        </Localized>
        <Localized id="sc-howto-review-criteria-4">
          <li>If the sentence meets the criteria, click the &quot;Approve&quot; button.</li>
        </Localized>
        <Localized id="sc-howto-review-criteria-5">
          <li>
            If the sentence does not meet the above criteria, click the &quot;Reject&quot; button. If
            you are unsure about the sentence, you may also skip it and move on to the next one.
          </li>
        </Localized>
        <Localized id="sc-howto-review-criteria-6">
          <li>If you run out of sentences to review, please help us collect more sentences!</li>
        </Localized>
      </ol>

      <Localized id="sc-howto-findpd-title">
        <h2 id="finding-existing-sentences-in-the-public-domain">
          Finding existing sentences in the Public Domain
        </h2>
      </Localized>

      <Localized id="sc-howto-findpd-subtitle">
        <h3 id="search-for-them-on-the-internet">Search for them on the internet</h3>
      </Localized>
      <Localized id="sc-howto-findpd-text" elems={{
          wikipediaLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Public_domain"
            />
          )
        }}>
        <p>
          Remember that we need permission to publish those sentences, so always ensure that the text
          belongs to the <a href="https://en.wikipedia.org/wiki/Public_domain">public domain</a>. If
          there is not an indication, reach out to the person that the text belongs to and ask if you
          can use their text.
        </p>
      </Localized>
      <Localized id="sc-howto-findpd-tips">
        <p>Here are some tips to find sentences:</p>
      </Localized>
      <ul>
        <Localized id="sc-howto-findpd-tips-1">
          <li>
            The best sources you can look for are podcasts, transcripts, movie scripts and anything
            that potential can contain everyday conversations.
          </li>
        </Localized>
        <Localized id="sc-howto-findpd-tips-2">
          <li>
            Government proceedings, books and articles are also great however since the text tends to
            be a little more formal they are less of a priority.
          </li>
        </Localized>
        <Localized id="sc-howto-findpd-tips-3">
          <li>
            Unfortunately we can’t have Wikimedia articles yet. So do not copy paste from there.
          </li>
        </Localized>
      </ul>

      <Localized id="sc-howto-findpd-subtitle-2">
        <h3 id="partner-with-local-organizations-or-individuals">
          Partner with local organizations or individuals
        </h3>
      </Localized>
      <Localized id="sc-howto-findpd-partner-1">
        <p>
          There are a lot of public organizations that might want to collaborate and already have a
          lot of texts they can donate as public domain. Reach out to local Universities, Governments
          and open source organizations to talk about the project and ask for their help.
        </p>
      </Localized>
      <Localized id="sc-howto-findpd-partner-2">
        <p>
          Expert linguists can also help, try to reach out to local linguistic Universities (both
          teachers and students) and see if they can help to gather a diverse set of sound-diverse
          sentences in your language.
        </p>
      </Localized>
    </section>
  );
}
