import jsPsychLearning from '../js/learning-trials';
import jsPsychProbe from '../js/probe';
import jsPsychFullscreen from '@jspsych/plugin-fullscreen';
import jsPsychInstructions from '@jspsych/plugin-instructions';
import jsPsychComprehension from '../js/comprehension';
import jsPsychMyInstructions from '../js/instructions';
import jsPsychPractice from '../js/practice';
import jsPsychHtmlSliderResponse from '@jspsych/plugin-html-slider-response';
import jsPsychSurveyMultiChoice from '@jspsych/plugin-survey-multi-choice';
import jsPsychSurveyMultiSelect from '@jspsych/plugin-survey-multi-select';
import jsPsychSurveyText from '@jspsych/plugin-survey-text';
import jsPsychCallFunction from '@jspsych/plugin-call-function';
import jsPsychImageKeyboardResponse from '@jspsych/plugin-image-keyboard-response';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jspsychPluginHtml from '@adp-psych/jspsych-plugin-html';
import 'jspsych/css/jspsych.css';
import '../css/robots-css.min.css';
import { images } from '../lib/utils';

// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
const jsPsychOptions = {
  on_trial_finish: function (data) {
    if (typeof data.value == 'undefined') {
      data.value = 'replacement';
    }
    if (typeof data.subject_id == 'undefined') {
      data.subject_id = 'replacement';
    }
    if (typeof data.missed_code == 'undefined') {
      data.missed_code = 'replacement';
    }
    if (typeof data.display_code == 'undefined') {
      data.display_code = 'replacement';
    }
    if (typeof data.response_code == 'undefined') {
      data.response_code = 'replacement';
    }
    if (typeof data.feedback_code == 'undefined') {
      data.feedback_code = 'replacement';
    }
    console.log(data);
  },
};

function buildTimeline(jsPsych) {
  // Define unique symbols.
  var symbol_array = [
    'c',
    'd',
    'e',
    'f',
    'j',
    'k',
    'm',
    'o',
    'x',
    's',
    't',
    'y',
    'C',
    'N',
    'O',
    'L',
    'T',
    'X',
  ];
  // Shuffle symbols.
  symbol_array = jsPsych.randomization.repeat(symbol_array, 1);
  var symbol_array_1 = symbol_array.slice(0, 9);

  // Define the contexts.
  var practice_array = ['forrest_1', 'desert_1'];
  var learn_1_array = ['forrest_2', 'desert_4'];

  // Randomize the contexts.
  var context_array = jsPsych.randomization.repeat(practice_array, 1);
  context_array = context_array.concat(['gray']);
  context_array = context_array.concat(jsPsych.randomization.repeat(learn_1_array, 1));

  var debug = false;

  // Define missed repsonses count.
  var missed_threshold = 100;
  var missed_responses = 0;

  // Define correct responses
  var correct_trial_count = 0;
  var total_trial_count = 0;
  var total_probe_trial_count = 0;

  // Define probabilities (default is all 75/25%)
  var reward_probs = 0.75;

  // Define counterfactual
  var cf = true;
  var font_size = 24;

  //---------------------------------------//
  // Define learning phase instructions.
  //---------------------------------------//

  const consentFormHtml = `
    <article id="pcf" class="instructions">
      <h1>Participant Consent Form</h1>
      <p>
      <p>                                  </p>
      <pCONSENT FOR RESEARCH PARTICIPATION</p>
      <p><strong>Assessing symptom and mood dynamics in pain using a
      smartphone application</strong></p>
      </blockquote>
      <p><mark>Online Task Sub-study: Perceptual Learning Computer Game Pilot
      Study</mark></p>
      <p>V4, 1/25/2023</p>
      <blockquote>
      <p><You are invited to take part in a Brown University research
      study. Your participation is voluntary.</p>
      <ul>
      <li><p style="text-align: left;">RESEARCHER:Frederike Petzschner, Ph.D.</p></li>
      <li><p style="text-align: left;">PURPOSE:This study is about assessing changes in how you learn
      and perceive different stimuli during an online computer game between
      adults with and without different common physical or psychological
      symptoms such as pain, depression, and anxiety. You are being asked to
      participate because you are an adult over the age of 18 who is a
      registered Prolific user and you have indicated that you either
      experience no pain or psychological symptoms, do experience pain of
      acute duration (for 3 months or less) or chronic duration (greater than
      3 months), and/or that you experience some common psychological symptoms
      like anxiety or depression.</p></li>
      <li><p style="text-align: left;">PROCEDURES: You will be asked to complete a computer game online
      via Prolific.</p></li>
      <li><p style="text-align: left;">TIME INVOLVED:The study will take approximately 1-1.5 hours of
      time.</p></li>
      <li><p style="text-align: left;">COMPENSATION:You will be paid $8 per hour for participation in
      this study via your existing registered Prolific account. You may
      receive a monetary bonus of up to $4 based on your performance during
      the game. Payments will be received from Prolific in accordance with
      terms and conditions agreed to through this platform.</p></li>
      <li><p style="text-align: left;">RISKS: You may feel bored or become tired during some parts of
      the computer game but other than that there are no real risks to you.
      You will be able to take breaks at instructed time throughout the task
      to help minimize this. All of your data will be stored without any
      personally identifying information on Brown University approved secure
      servers.</p></li>
      <li><p style="text-align: left;">BENEFITS:There are no direct benefits to you if you agree to be
      in this research study.</p></li>
      <li><p style="text-align: left;">CONFIDENTIALITY:To maintain confidentiality, we will assign all
      your data a numerical code. Your responses will not be connected to your
      identity. Please note that complete confidentiality can never be
      guaranteed when information is transmitted over the internet.</p></li>
      <li><p style="text-align: left;">VOLUNTARY: You do not have to be in this study if you do not want
      to be. Even if you decide to be in this study, you can change your mind
      and stop at any time.</p></li>
      <li><p style="text-align: left;">CONTACT INFORMATION: If you have any questions about your
      participation in this study, you can ask at any time, call our office at
      Brown University at (401)863-6272 or email <a
      href="mailto:soma@brown.edu">soma@brown.edu.</a></p></li>
      <li><p style="text-align: left;">YOUR RIGHTS: If you have questions about your rights as a
      research participant, you can contact Brown University’s Human Research
      Protection Program at 401-863-3050 or email them at <a
      href="mailto:IRB@Brown.edu">IRB@Brown.edu.</a></p></li>
      <li><p style="text-align: left;">CONSENT TO PARTICIPATE:Clicking the link below confirms that you
      have read and understood the information in this document, are 18 years
      old or older and that you agree to volunteer as a research participant
      for this study.</p></li>
      </p>
      <form id="consent-form">
        <label>
          <input type="checkbox" id="consent" />
          I want to participate.
        </label>
        <p id="consent-error" class="error"></p>
        <button type="button" class="jspsych-btn" id="begin">
          Begin Experiment
        </button>
      </form>
    </article>
  `;

  const isNil = (x) => typeof x === 'undefined' || x === null;

  const consentErrorMessage = 'You must agree to the consent declaration before you may begin.';

  const checkConsent = () => {
    if (document?.querySelector('#consent')?.checked) {
      return true;
    }
    const consentError = document?.querySelector('#consent-error');
    if (!isNil(consentError)) {
      consentError.textContent = consentErrorMessage;
    }
    return false;
  };

  const idTimelineNode = {
    check_fn: checkConsent,
    cont_btn: 'begin',
    html: consentFormHtml,
    type: jspsychPluginHtml,
  };

  var instructions_000 = {
    type: jsPsychImageKeyboardResponse,
    stimulus: images['keyboard_key_j.png'],
    stimulus_height: 400,
    prompt:
      '<p style="font-size:' +
      font_size +
      'px;">Welcome to the experiment. You can press the <b>f</b> and <b>j</b> keys to move through the instructions.</p>',
  };

  var instructions_00 = {
    type: jsPsychInstructions,
    key_forward: 'j',
    key_backward: 'f',
    pages: [
      '<p style="font-size:' +
        font_size +
        'px;">We are first going to start with a few questions about your pain levels. Press the <b>j</b> key to advance.',
    ],
  };

  var depression_01 = {
    type: jsPsychSurveyMultiChoice,
    preamble:
      '<p style="font-size:' +
      font_size +
      'px;"> <br> Over the last 2 weeks, how often have you been bothered by any of the following problems? <br> <br> Scroll down to finish the survey',
    questions: [
      {
        prompt: 'Little interest or pleasure in doing things',
        name: 'PHQ8_1',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt: 'Feeling down, depressed, or hopeless',
        name: 'PHQ8_2',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt: 'Trouble falling or staying asleep, or sleeping too much',
        name: 'PHQ8_3',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt: 'Feeling tired or having little energy',
        name: 'PHQ8_4',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt: 'Poor appetite or overeating',
        name: 'PHQ8_5',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt:
          'Feeling bad about yourself_or that you are a failure or have let yourself or your family down',
        name: 'PHQ8_6',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt:
          'Trouble concentrating on things, such as reading the newspaper or watching television',
        name: 'PHQ8_7',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
      {
        prompt:
          'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so figety or restless that you have been moving around a lot more than usual',
        name: 'PHQ8_8',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        required: true,
        horizontal: false,
      },
    ],
  };

  var pain_01 = {
    type: jsPsychHtmlSliderResponse,
    labels: [
      '<p style="font-size:' + font_size + 'px;">no pain',
      '<p style="font-size:' + font_size + 'px;">worst imaginable',
    ],
    stimulus:
      '<p style="font-size:' +
      font_size +
      'px;">Averaged over the past week, how intense is your pain?</p>',
  };

  var pain_02 = {
    type: jsPsychHtmlSliderResponse,
    labels: [
      '<p style="font-size:' + font_size + 'px;">no pain',
      '<p style="font-size:' + font_size + 'px;">worst imaginable',
    ],
    stimulus:
      '<p style="font-size:' +
      font_size +
      'px;">Averaged over the past week, how unpleasant is your pain?</p>',
  };

  var pain_03 = {
    type: jsPsychHtmlSliderResponse,
    labels: [
      '<p style="font-size:' + font_size + 'px;">no pain',
      '<p style="font-size:' + font_size + 'px;">worst imaginable',
    ],
    stimulus:
      '<p style="font-size:' +
      font_size +
      'px;">How much has your pain interfered with your activities <br> over the past week?</p>',
  };

  var pain_04 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
      {
        prompt: 'How long have you been in pain?',
        name: 'Pain Duration',
        options: [
          'I am not in pain',
          '< 2 weeks',
          '2-4 weeks',
          '1 – 3 months',
          '3 – 6 months',
          '6 – 12 months',
          '1 – 5 years',
          '> 5 years',
          '> 10 years',
        ],
        required: true,
      },
    ],
  };

  var pain_05 = {
    type: jsPsychSurveyMultiSelect,
    preamble:
      '<p style="font-size:' +
      font_size +
      'px;"> <br> Select all that apply <br> <br> Scroll down to finish the survey',
    questions: [
      {
        prompt: 'Have you been diagnosed with any  of the following',
        name: 'pain_type_survey',
        options: [
          '<b>Chronic back or neck pain</b>',
          '-- Scoliosis',
          '-- Stenosis',
          '-- Radiculopathy',
          '-- Degenerative Disc Disease',
          '-- Herniation',
          '-- Osteoarthritis',
          '-- Failed Back Surgery Syndrome (Post-laminectomy pain syndrome)',
          '-- Unsure',
          '-- Other (describe on next page)',
          '<b>Chronic musculoskeletal pain</b>',
          '<b>Fibromyalgia</b>',
          '<b>Osteoarthritis</b>',
          '-- Hip',
          '-- Knee',
          '-- Shoulder',
          '-- Ankle',
          '-- Foot',
          '-- Hand',
          '-- Wrist',
          '-- Back',
          '-- Neck',
          '-- Other (describe on next page)',
          '<b>Rheumatoid arthritis</b>',
          '<b>Chronic burn pain</b>',
          '<b>Acute burn pain</b>',
          '<b>Post-stroke pain</b>',
          '<b>Trigeminal neuralgia</b>',
          '<b>Post-herpetic neuralgia</b>',
          '<b>Diabetic neuropathy</b>',
          '<b>HIV neuropathy</b>',
          '<b>Polyneuropathy</b>',
          '<b>Temporomandibular joint disorder (TMJ) </b>',
          '<b>Shingles</b>',
          '<b>Headache</b>',
          '<b>Migraine</b>',
          '<b>Complex Regional Pain Syndrome (CRPS)</b>',
          '<b>Multiple Sclerosis</b>',
          '<b>Lupus</b>',
          '<b>Chronic Lyme Disease</b>',
          '<b>Neuropathic pain</b>',
          '<b>Spinal cord injury</b>',
          '<b>Traumatic brain injury</b>',
          '<b>Phantom limb syndrome/amputee pain</b>',
          '<b>Chronic pelvic pain</b>',
          '<b>Sickle cell disease/crisis</b>',
          '<b>Postoperative pain</b>',
          '<b>Traumatic injury</b>',
          '<b>Rheumatoid/osteoarthritis</b>',
          '<b>Gout</b>',
          '<b>Sports/exercise injuries</b>',
          '<b>Mechanical back pain</b>',
          '<b>Irritable bowel syndrome (IBS)</b>',
          '<b>Crohn’s Disease</b>',
          '<b>Ulcerative Colitis</b>',
          '<b>Ehlers Danlos</b>',
          'Other (describe on next page)',
        ],
        required: false,
        horizontal: false,
      },
    ],
  };

  var pain_06 = {
    type: jsPsychSurveyText,
    questions: [{ prompt: 'If you answered "Other" on the previous page, please elaborate here:' }],
  };

  var instructions_01 = {
    type: jsPsychMyInstructions,
    pages: [
      'We are now starting the experiment.<br><br>Use the <b>f</b> and <b>j</b> keys to navigate the instructions.',
      'In this task, you are picking a team of knights.<br>The knights will look like the ones below.',
      'Each knight will have a <b>unique symbol</b> on its chestplate.<br>This symbol will help you identify each knight.',
      "You'll also pick your team of knights from different places, either the desert or forest.",
      'On every turn, you will choose a knight for your team.<br>When you select a knight, it may give you:<br><b><font color=#01579b>+$2, </font><font color=#303030>+0 dollars</font></b>, or <b><font color=#A41919>-$2</font></b>.',
      "Once you've selected your knight, their platform and visor will light up to indicate your choice.",
      'To help you learn, we will also show you the dollars you<br><i>could have earned</i> if you had chosen the other knight.<br><b>NOTE:</b> You will earn dollars only for the knight you chose.',
      'Some knights are better than others. Some will gain dollars while others will avoid losing dollars. Try to earn as many dollars as you can.',
      "Now let's practice with the knights below. Using the <b>f</b> and <b>j</b> keys, select the knights for testing and try to learn<br>which will give you more dollars.",
      '<b>HINT:</b> You can differentiate between the knights based on the symbols on their chestplate.  Try to avoid losing dollars.',
    ],
    symbol_L: 'V',
    symbol_R: 'U',
  };

  var practice_block_01 = {
    type: jsPsychPractice,
    symbol_L: 'V',
    symbol_R: 'U',
    outcome_L: 'zero',
    outcome_R: 'win',
    context: context_array[0],
    choices: ['f', 'j'],
    correct: 'j',
    feedback_duration: 2000,
  };

  const instructions_02 = {
    type: jsPsychMyInstructions,
    pages: ["Great job! Now let's try for one more set of knights."],
    symbol_L: 'W',
    symbol_R: 'R',
  };

  var practice_block_02 = {
    type: jsPsychPractice,
    symbol_L: 'W',
    symbol_R: 'R',
    outcome_L: 'lose',
    outcome_R: 'zero',
    context: context_array[1],
    choices: ['f', 'j'],
    correct: 'j',
    feedback_duration: 2000,
  };

  const instructions_03 = {
    type: jsPsychMyInstructions,
    pages: [
      'During the task, there will be many different knights to choose from.<br>Remember to pay close attention to their symbols on their chestplates.',
      'Your job is to try to select the best knight in each pair.<br>Even though you will learn the outcomes for both knights,<br>you will only earn dollars for the knight you choose.',
      '<b>HINT:</b> The knights may not always give you dollars, but some knights are better at gaining dollars while other knights are better at avoiding losing dollars.',
      "You should try to earn as many dollars as you can, even if it's not possible to win dollars or avoid losing dollars on every round.",
      "At the end of the task, the total number of dollars you've earned will be converted into a performance percentage. You can earn up to an additional $4 based on your performance.",
      'Next, we will ask you some questions about the task.<br>You must answer all the questions correctly to be able to continue.',
    ],
    symbol_L: ' ',
    symbol_R: ' ',
  };

  var comprehension = {
    type: jsPsychComprehension,
  };

  // Define comprehension threshold.
  var max_errors = 0;
  var max_loops = 3;
  var num_loops = 0;

  if (debug) {
    var instructions = {
      timeline: [instructions_00],
    };
  } else {
    instructions = {
      timeline: [
        idTimelineNode,
        instructions_000,
        instructions_00,
        depression_01,
        pain_01,
        pain_02,
        pain_03,
        pain_04,
        pain_05,
        pain_06,
        instructions_01,
        practice_block_01,
        instructions_02,
        practice_block_02,
        instructions_03,
        comprehension,
      ],

      // }
      loop_function: function (data) {
        // Extract number of errors.
        const num_errors = data.values().slice(-1)[0].num_errors;

        // Check if instructions should repeat.
        if (num_errors > max_errors) {
          console.log(num_errors);
          num_loops++;
          if (num_loops >= max_loops) {
            low_quality = true;
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
    };
  }

  var comprehension_check = {
    type: jsPsychCallFunction,
    func: function () {},
    on_finish: function () {
      if (low_quality) {
        jsPsych.endExperiment();
      }
    },
  };

  var ready = {
    type: jsPsychInstructions,
    key_forward: 'j',
    key_backward: 'f',
    pages: [
      '<p style="font-size:' +
        font_size +
        'px;">Great job! You passed the comprehension check. <br>Press the <b>j</b> key to continue.',
      '<p style="font-size:' +
        font_size +
        'px;">Get ready to begin the experiment.<br>Press the <b>j</b> key when you are ready to start.',
    ],
  };

  // // //---------------------------------------//
  // // // Define probe phase instructions.
  // // //---------------------------------------//

  var instructions_05 = {
    type: jsPsychInstructions,
    key_forward: 'j',
    key_backward: 'f',
    pages: () => {
      return [
        '<p style="font-size:' +
          font_size +
          'px;">That is the end of the learning phase. Great job!',
        '<p style="font-size:' +
          font_size +
          'px;">In this next part, you will see the same knights as before, but they will be shown in new pair combinations. <br>Again, your job will be to select the knight you would like to join your team.',
        '<p style="font-size:' +
          font_size +
          'px;">As you make your choices, you will not receive any feedback after your choice.',
        '<p style="font-size:' +
          font_size +
          'px;">You should still choose the knight you think is better on each trial.<br>Your choices will still contribute to your performance bonus.',
      ];
    },
  };

  function reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  }

  // //---------------------------------------//
  // // Define learning phase 1.
  // //---------------------------------------//
  // // Learning blocks are comprised of
  // // 24 presentations of 4 unique stimulus
  // // pairs (96 total trials). With left/right
  // // side counterbalancing, this is 12
  // // presentations per unique pair / side.

  // Initialize phase array.
  var learning_phase_1 = [];
  var low_quality;
  var val;
  var prob_val_1;
  var prob_val_2;
  var color;
  var reduced_a;
  var diff_a;
  var multi_a;
  var not_reduced_a;
  var not_reduced_diff_a;
  var diff_arr_1;
  var diff_arr_2;
  var iters;
  var probe_iters;
  var context_iters;
  var win_high_array;
  var win_low_array;
  var lose_high_array;
  var lose_low_array;

  if (debug) {
    iters = 12;
    probe_iters = 9;
    context_iters = 3;
  } else {
    iters = 12;
    probe_iters = 9;
    context_iters = 3;
  }

  reduced_a = reduce(reward_probs * iters, iters);
  diff_a = reduced_a[1] - reduced_a[0];

  multi_a = iters / reduced_a[1];

  not_reduced_a = reduced_a[0] * multi_a;
  not_reduced_diff_a = diff_a * multi_a;

  win_high_array = Array(not_reduced_a).fill('win');
  diff_arr_2 = Array(not_reduced_diff_a).fill('zero');
  win_high_array = win_high_array.concat(diff_arr_2);

  win_low_array = Array(not_reduced_a).fill('zero');
  diff_arr_1 = Array(not_reduced_diff_a).fill('win');
  win_low_array = win_low_array.concat(diff_arr_1);

  lose_high_array = Array(not_reduced_a).fill('lose');
  diff_arr_2 = Array(not_reduced_diff_a).fill('zero');
  lose_high_array = lose_high_array.concat(diff_arr_2);

  lose_low_array = Array(not_reduced_a).fill('zero');
  diff_arr_1 = Array(not_reduced_diff_a).fill('lose');
  lose_low_array = lose_low_array.concat(diff_arr_1);

  var win_high_array_all;
  var win_low_array_all;
  var lose_high_array_all;
  var lose_low_array_all;

  win_high_array_all = [];
  win_low_array_all = [];
  lose_high_array_all = [];
  lose_low_array_all = [];

  for (var a = 0; a < 2; a++) {
    win_high_array_all.push(jsPsych.randomization.repeat(win_high_array, 1));
    win_low_array_all.push(jsPsych.randomization.repeat(win_low_array, 1));
    lose_high_array_all.push(jsPsych.randomization.repeat(lose_high_array, 1));
    lose_low_array_all.push(jsPsych.randomization.repeat(lose_low_array, 1));
  }

  // Iteratively define trials
  for (var i = 0; i < iters; i++) {
    // Initialize (temporary) trial array.
    const trials = [];

    // Iterate over unique pairs.
    for (var j = 0; j < 4; j++) {
      // Define metadata.

      if (j == 0) {
        val = 'win';
        prob_val_1 = win_high_array_all[0];
        prob_val_2 = win_low_array_all[0];
        color = context_array[3];
      } else if (j == 1) {
        val = 'lose';
        prob_val_1 = lose_high_array_all[0];
        prob_val_2 = lose_low_array_all[0];
        color = context_array[4];
      } else if (j == 2) {
        val = 'win';
        prob_val_1 = win_high_array_all[1];
        prob_val_2 = win_low_array_all[1];
        color = context_array[3];
      } else {
        val = 'lose';
        prob_val_1 = lose_high_array_all[1];
        prob_val_2 = lose_low_array_all[1];
        color = context_array[4];
      }

      // Append trial (LR).
      var LR = {
        type: jsPsychLearning,
        symbol_L: symbol_array_1[2 * j + 0],
        symbol_R: symbol_array_1[2 * j + 1],
        outcome_L: prob_val_1[i],
        outcome_R: prob_val_2[i],
        probs: reward_probs,
        counterfactual: cf,
        context: color,
        choices: ['f', 'j'],
        correct: val == 'win' ? 'f' : 'j',
        data: { block: 1 },
        on_finish: function (data) {
          // Evaluate missing data
          if (data.rt == null) {
            // Set missing data to true.
            data.missing = true;

            // Increment counter. Check if experiment should end.
            missed_responses++;
            if (missed_responses >= missed_threshold) {
              low_quality = true;
              jsPsych.endExperiment();
            }
          } else {
            // Set missing data to false.
            data.missing = false;
            total_trial_count++;
            if (data.accuracy == 1) {
              correct_trial_count++;
            }
          }
          console.log(low_quality);
        },
      };

      // Define looping node.
      const LR_node = {
        timeline: [LR],
        loop_function: function (data) {
          return data.values()[0].missing;
        },
      };
      trials.push(LR_node);

      // Append trial (RL).
      var RL = {
        type: jsPsychLearning,
        symbol_L: symbol_array_1[2 * j + 1],
        symbol_R: symbol_array_1[2 * j + 0],
        outcome_L: prob_val_2[i],
        outcome_R: prob_val_1[i],
        probs: reward_probs,
        counterfactual: cf,
        context: color,
        choices: ['f', 'j'],
        correct: val == 'win' ? 'j' : 'f',
        data: { block: 1 },
        on_finish: function (data) {
          // Evaluate missing data
          if (data.rt == null) {
            // Set missing data to true.
            data.missing = true;

            // Increment counter. Check if experiment should end.
            missed_responses++;
            if (missed_responses >= missed_threshold) {
              low_quality = true;
              jsPsych.endExperiment();
            }
          } else {
            // Set missing data to false.
            data.missing = false;
            total_trial_count++;
            if (data.accuracy == 1) {
              correct_trial_count++;
            }
          }
          console.log(low_quality);
        },
      };

      // Define looping node.
      const RL_node = {
        timeline: [RL],
        loop_function: function (data) {
          return data.values()[0].missing;
        },
      };
      trials.push(RL_node);
    }

    // console.log(missed);
    // Shuffle trials. Append.
    learning_phase_1 = learning_phase_1.concat(jsPsych.randomization.repeat(trials, 1));
  }

  //------------------------------------//
  // Define probe phase 1.
  //------------------------------------//
  // Probe phases are comprised of
  // every possible pair combination (8 previous stimuli and 1 new stimulus)
  // (36 in total) presented 4 times
  // (144 total trials). Each presented 3 times
  // either neutral (gray) background or
  // 2 other contexts (reward or punishment) (432 trials total).

  // Initialize phase array.
  var probe_phase_1 = [];
  // Iteratively define trials
  // for (i = 0; i < 8; i++) {
  for (var p = 0; p < probe_iters; p++) {
    // for (j = 0; j < 8; j++) {
    for (var q = 0; q < probe_iters; q++) {
      // for (var q = 0; q < probe_iters; q++) {
      for (var c = 0; c < context_iters; c++) {
        var u = 'none';
        if ((p == 0 && q == 4) || (q == 0 && p == 4)) {
          u = 'HR';
        } else if ((p == 1 && q == 5) || (q == 1 && p == 5)) {
          u = 'LR';
        } else if ((p == 2 && q == 6) || (q == 2 && p == 6)) {
          u = 'HP';
        } else if ((p == 3 && q == 7) || (q == 3 && p == 7)) {
          u = 'LP';
          // } else if ((p == 0 && q == 1) || (q == 1 && p == 0)) {
          //   u = 'SHR';
          // } else if ((p == 2 && q == 3) || (q == 3 && p == 2)) {
          //   u = 'SLR';
          // } else if ((p == 4 && q == 5) || (q == 5 && p == 4)) {
          //   u = 'SHP';
          // } else if ((p == 6 && q == 7) || (q == 7 && p == 6)) {
          //   u = 'SLP';
        } else if (p == q) {
          u = 'SAME';
        } else {
          u = 'zero';
        }

        // const conditionsArray = [u == 'HR', u == 'LR', u == 'HP', u == 'LP', u == 'SAME'];
        const conditionsArray = [
          u == 'HR',
          u == 'LR',
          u == 'HP',
          u == 'LP',
          // u == 'SHR',
          // u == 'SLR',
          // u == 'SHP',
          // u == 'SLP',
          u == 'SAME',
        ];
        if (!conditionsArray.includes(true)) {
          total_probe_trial_count++;
          // Append trial.
          var probe = {
            type: jsPsychProbe,
            symbol_L: symbol_array_1[p],
            symbol_R: symbol_array_1[q],
            context: context_array[4 - c],
            choices: ['f', 'j'],
            data: { block: 1 },
            on_finish: function (data) {
              // Evaluate missing data
              if (data.rt == null) {
                // Set missing data to true.
                data.missing = true;

                // Increment counter. Check if experiment should end.
                missed_responses++;
                if (missed_responses >= missed_threshold) {
                  low_quality = true;
                  jsPsych.endExperiment();
                }
              } else {
                // Set missing data to false.
                data.missing = false;
              }
            },
          };

          // Define looping node.
          const probe_node = {
            timeline: [probe],
            loop_function: function (data) {
              return data.values()[0].missing;
            },
          };

          // Add trials twice.
          probe_phase_1.push(probe_node);
          probe_phase_1.push(probe_node);
        }
      }
    }
  }
  // Shuffle trials.
  probe_phase_1 = jsPsych.randomization.repeat(probe_phase_1, 1);

  console.log('total probe trials');
  console.log(total_probe_trial_count);

  // Complete screen
  var complete = {
    type: jsPsychInstructions,
    pages: () => {
      return [
        '<p style="font-size:' +
          font_size +
          'px;">Great job! You have completed the experiment. You have made ' +
          Math.round((correct_trial_count / total_trial_count) * 100) +
          '% correct',
      ];
    },
    show_clickable_nav: true,
    button_label_previous: 'Prev',
    button_label_next: 'Next',
  };

  var final_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>You've finished the last task. Thanks for participating!</p>
      <p><a href="https://app.prolific.co/submissions/complete?cc=CK5KGDJA">Click here to return to Prolific and complete the study</a>.</p>`,
    choices: 'NO_KEYS',
  };

  const fullscreen = {
    type: jsPsychFullscreen,
  };

  var timeline = [];

  timeline = timeline.concat(fullscreen);
  timeline = timeline.concat(instructions);
  timeline = timeline.concat(comprehension_check);
  timeline = timeline.concat(ready);
  timeline = timeline.concat(learning_phase_1);
  timeline = timeline.concat(instructions_05);
  timeline = timeline.concat(probe_phase_1);
  timeline = timeline.concat(complete);
  timeline = timeline.concat(final_trial);

  return timeline;
}

// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
