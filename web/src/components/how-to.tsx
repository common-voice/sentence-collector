import React from 'react';

export default function HowTo() {
  return (
    <section>
      <h1 id="how-to">How to</h1>

      <h2 id="login">Adding languages to work with</h2>
      <p>Once logged in you can select your languages from the profile section.</p>

      <h2 id="add-new-sentences">Add new sentences</h2>
      <ul>
        <li>
          All sentences you submit must be under{' '}
          <a href="https://en.wikipedia.org/wiki/Public_domain">Public Domain (CC-0) license</a>. To
          support the inclusion of work not under public licence, we have created a{' '}
          <a href="https://common-voice.github.io/community-playbook/sub_pages/cc0waiver_process.html">
            Contributions Agreement template
          </a>{' '}
          for works where the copyright owner would like to contribute the material to Common Voice.
        </li>
        <li>
          Numbers. There should be no digits in the source text because they can cause problems when
          read aloud. The way a number is read depends on context and might introduce confusion in
          the dataset. For example, the number “2409” could be accurately read as both “twenty-four
          zero nine” and “two thousand four hundred nine”.
        </li>
        <li>
          Abbreviations and Acronyms. Abbreviations and acronyms like “USA” or “ICE” should be
          avoided in the source text because they may be read in a way that does not coincide with
          their spelling. Additionally, there may be multiple accurate readings for a single
          abbreviation. For example, the acronym “ICE” could be pronounced “I-C-E” or as a single
          word.
        </li>
        <li>
          Punctuation. Special symbols and punctuation should only be included when absolutely
          necessary. For example, an apostrophe is included in English words like “don’t” and
          “we’re” and should be included in the source text, but it’s unlikely you’ll ever need a
          special symbol like “@” or “#.”
        </li>
        <li>
          Foreign letters. Letters must be valid in the language being spoken. For example, “ж” is a
          letter in the Russian alphabet but is never used in English and so should never appear in
          any English source text.
        </li>
        <li>Length. Sentences must be 14 words or less.</li>
      </ul>
      <p>
        We prefer natural/conversational sentences. While phonetic diversity and different words in
        sentences is important, we are trying to make recording sentences as much fun as possible.
        Therefore it would be great if you could try to keep your sentences as natural/engaging as
        possible.
      </p>
      
      <h2 id="how-to-reference-the-source">How to Cite</h2>
      <p>
        It&apos;s important that you reference where you found the public licence to avoid plagirism and
        to allow for follow ups on{' '}
        <a href="https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767">
          copyright issues
        </a>. Here are a few ways you can cite the work.
      </p>
      <ul>
        <li>You could include the website, e.g &quot;Common Voice - https://commonvoice.mozilla.org/&quot;</li>
        <li>
          You could use Academic referencing style, e.g harvard style &quot;Mozilla (2021) Common Voice. 
          Available at https://commonvoice.mozilla.org/ (Accessed: 15th Septmber 2021)&quot;   
        </li>
        <li>
          For public licence text not avialable online, you could use Academic referencing
          style e.g harvard style &quot;Jess (2021) My Public licence poems&quot;
        </li>
      </ul>

      <h2 id="review-sentences">Review Sentences</h2>

      <h3 id="make-sure-the-sentence-meets-the-following-criteria-">
        Make sure the sentence meets the following criteria:
      </h3>
      <ol>
        <li>The sentence must be spelled correctly.</li>
        <li>The sentence must be grammatically correct.</li>
        <li>The sentence must be speakable.</li>
        <li>If the sentence meets the criteria, click the &quot;yes&quot; button on the right.</li>
        <li>
          If the sentence does not meet the above criteria, click the &quot;no&quot; button on the
          right. If you are unsure about the sentence, you may also skip it and move on to the next
          one.
        </li>
        <li>If you run out of sentences to review, please help us collect more sentences!</li>
      </ol>

      <h2 id="finding-existing-sentences-in-the-public-domain">
        Finding existing sentences in the Public Domain
      </h2>

      <h3 id="search-for-them-on-the-internet">Search for them on the internet</h3>
      <p>
        Remember that we need permission to publish those sentences, so always ensure that the text
        belongs to the <a href="https://en.wikipedia.org/wiki/Public_domain">public domain</a>. If
        there is not an indication, reach out to the person that the text belongs to and ask if you
        can use their text.
      </p>
      <p>Here are some tips to find sentences:</p>
      <ul>
        <li>
          The best sources you can look for are podcasts, transcripts, movie scripts and anything
          that potential can contain everyday conversations.
        </li>
        <li>
          Government proceedings, books and articles are also great however since the text tends to
          be a little more formal they are less of a priority.
        </li>
        <li>
          Unfortunately we can’t have Wikimedia articles yet. So do not copy paste from there.
        </li>
      </ul>

      <h3 id="partner-with-local-organizations-or-individuals">
        Partner with local organizations or individuals
      </h3>
      <p>
        There are a lot of public organizations that might want to collaborate and already have a
        lot of texts they can donate as public domain. Reach out to local Universities, Governments
        and open source organizations to talk about the project and ask for their help.
      </p>
      <p>
        Expert linguists can also help, try to reach out to local linguistic Universities (both
        teachers and students) and see if they can help to gather a diverse set of sound-diverse
        sentences in your language.
      </p>
    </section>
  );
}
