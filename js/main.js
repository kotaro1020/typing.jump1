'use strict';

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    kana.textContent = word.kana;
    underbar1.textContent = '';
    target.textContent = word.alphabet;
    loc = 0;
    offAll()
    bright(fingerMaps[word.alphabet[loc]])
    offAllKey()
    if(enableBright){
      brightKey(word.alphabet[loc])
    }
  }

  const fingerMaps = {
    a:1,
    b:4,
    c:3,
    d:3,
    e:3,
    f:4,
    g:4,
    h:7,
    i:8,
    j:7,
    k:8,
    l:9,
    m:7,
    n:7,
    o:9,
    p:10,
    q:1,
    r:4,
    s:2,
    t:4,
    u:7,
    v:4,
    w:2,
    x:2,
    y:7,
    z:1,
  }

  const words = [
    {alphabet:'ennsoku',kana:'えんそく'},
    {alphabet:'fukuro',kana:'ふくろ'},
    {alphabet:'senaka',kana:'せなか'},
    {alphabet:'kaeru',kana:'かえる'},
    {alphabet:'taiko',kana:'たいこ'},
    {alphabet:'okasi',kana:'おかし'},
    {alphabet:'kusuri',kana:'くすり'},
    {alphabet:'utiwa',kana:'うちわ'},
    // {alphabet:'kirinn'},
    {alphabet:'satoimo',kana:'さといも'},
    {alphabet:'tannkenn',kana:'たんけん'},
    {alphabet:'kaimono',kana:'かいもの'},
    // {alphabet:'kaminari'},
    {alphabet:'yama',kana:'やま'},
    {alphabet:'hatake',kana:'はたけ'},
    {alphabet:'kumori',kana:'くもり'},
    // {alphabet:'tukue'},
    {alphabet:'ehonn',kana:'えほん'},
    {alphabet:'himawari',kana:'ひまわり'},
    {alphabet:'sakana',kana:'さかな'},
    {alphabet:'kitutuki',kana:'きつつき'},
    // {alphabet:'tikatetu'},
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const underbar1 = document.getElementById('underbar1');
  const underbar2 = document.getElementById('underbar2');
  const kana = document.getElementById('kana');
  const target = document.getElementById('target');
  let inputWord = '';
  let oneWordAlphabet = '';
  let enableBright = true;
  const totalCharCount = Object.values(words).reduce((pre,current)=>pre+current.alphabet.length, 0);

  document.body.addEventListener('keydown',
    event => {
        if (event.key === 'y' && event.ctrlKey) {
          enableBright = !enableBright;
          console.log("bright:"+enableBright);
        }
    });

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== word.alphabet[loc]) {
      return;
    }


    inputWord += word.alphabet[loc];
    // const kanaLength = r2h(inputWord).replace(/[a-z]/g, '').length;
    // underbar1.textContent = '＿'.repeat(kanaLength);
    // underbar2.textContent = '＿'.repeat(word.kana.length - kanaLength);

    oneWordAlphabet += word.alphabet[loc];
    const oneWordAlphabetLength = r2h(oneWordAlphabet).replace(/[a-z]/g, '').length;
    if (oneWordAlphabetLength >= 1) {
      const oneWordKana = r2h(oneWordAlphabet).replace(/[a-z]/g, '');
      speechSynthesis.speak(new SpeechSynthesisUtterance(oneWordKana));
      oneWordAlphabet = '';
    }
    loc++;

    // console.log(fingerMaps[word.alphabet[loc]])
    if (word.alphabet[loc]){
      offAll()
      bright(fingerMaps[word.alphabet[loc]])
      offAllKey()
      if(enableBright){
        brightKey(word.alphabet[loc])
      }
    }


    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = '_'.repeat(loc) + word.alphabet.substring(loc);

    if (loc === word.alphabet.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.innerHTML = `Finished! ${elapsedTime} 秒!<br>入力スピード:${(totalCharCount/(elapsedTime/60)).toFixed(0)}key/分`;
        result.style.display = "block"
        return;
      }

      setTimeout(() => {
        inputWord = '';
        setWord();
      }, 400);
    }
  });
}

// License: Public Domain
var roman2hiragana = {
  'a':'あ', 'i':'い', 'u':'う', 'e':'え', 'o':'お',
  'ka':'か', 'ki':'き', 'ku':'く', 'ke':'け', 'ko':'こ',
  'sa':'さ', 'si':'し', 'su':'す', 'se':'せ', 'so':'そ',
  'ta':'た', 'ti':'ち', 'tu':'つ', 'te':'て', 'to':'と', 'chi':'ち', 'tsu':'つ',
  'na':'な', 'ni':'に', 'nu':'ぬ', 'ne':'ね', 'no':'の',
  'ha':'は', 'hi':'ひ', 'hu':'ふ', 'he':'へ', 'ho':'ほ', 'fu':'ふ',
  'ma':'ま', 'mi':'み', 'mu':'む', 'me':'め', 'mo':'も',
  'ya':'や', 'yi':'い', 'yu':'ゆ', 'ye':'いぇ', 'yo':'よ',
  'ra':'ら', 'ri':'り', 'ru':'る', 're':'れ', 'ro':'ろ',
  'wa':'わ', 'wyi':'ゐ', 'wu':'う', 'wye':'ゑ', 'wo':'を',
  'nn':'ん',
  'ga':'が', 'gi':'ぎ', 'gu':'ぐ', 'ge':'げ', 'go':'ご',
  'za':'ざ', 'zi':'じ', 'zu':'ず', 'ze':'ぜ', 'zo':'ぞ', 'ji':'じ',
  'da':'だ', 'di':'ぢ', 'du':'づ', 'de':'で', 'do':'ど',
  'ba':'ば', 'bi':'び', 'bu':'ぶ', 'be':'べ', 'bo':'ぼ',
  'pa':'ぱ', 'pi':'ぴ', 'pu':'ぷ', 'pe':'ぺ', 'po':'ぽ',
  'kya':'きゃ', 'kyu':'きゅ', 'kyo':'きょ',
  'sya':'しゃ', 'syu':'しゅ', 'syo':'しょ',
  'tya':'ちゃ', 'tyi':'ちぃ', 'tyu':'ちゅ', 'tye':'ちぇ', 'tyo':'ちょ', 'cha':'ちゃ', 'chu':'ちゅ', 'che':'ちぇ', 'cho':'ちょ',
  'nya':'にゃ', 'nyi':'にぃ', 'nyu':'にゅ', 'nye':'にぇ', 'nyo':'にょ',
  'hya':'ひゃ', 'hyi':'ひぃ', 'hyu':'ひゅ', 'hye':'ひぇ', 'hyo':'ひょ',
  'mya':'みゃ', 'myi':'みぃ', 'myu':'みゅ', 'mye':'みぇ', 'myo':'みょ',
  'rya':'りゃ', 'ryi':'りぃ', 'ryu':'りゅ', 'rye':'りぇ', 'ryo':'りょ',
  'gya':'ぎゃ', 'gyi':'ぎぃ', 'gyu':'ぎゅ', 'gye':'ぎぇ', 'gyo':'ぎょ',
  'zya':'じゃ', 'zyi':'じぃ', 'zyu':'じゅ', 'zye':'じぇ', 'zyo':'じょ',
  'ja':'じゃ', 'ju':'じゅ', 'je':'じぇ', 'jo':'じょ', 'jya':'じゃ', 'jyi':'じぃ', 'jyu':'じゅ', 'jye':'じぇ', 'jyo':'じょ',
  'dya':'ぢゃ', 'dyi':'ぢぃ', 'dyu':'ぢゅ', 'dye':'ぢぇ', 'dyo':'ぢょ',
  'bya':'びゃ', 'byi':'びぃ', 'byu':'びゅ', 'bye':'びぇ', 'byo':'びょ',
  'pya':'ぴゃ', 'pyi':'ぴぃ', 'pyu':'ぴゅ', 'pye':'ぴぇ', 'pyo':'ぴょ',
  'fa':'ふぁ', 'fi':'ふぃ', 'fe':'ふぇ', 'fo':'ふぉ',
  'fya':'ふゃ', 'fyu':'ふゅ', 'fyo':'ふょ',
  'xa':'ぁ', 'xi':'ぃ', 'xu':'ぅ', 'xe':'ぇ', 'xo':'ぉ', 'la':'ぁ', 'li':'ぃ', 'lu':'ぅ', 'le':'ぇ', 'lo':'ぉ',
  'xya':'ゃ', 'xyu':'ゅ', 'xyo':'ょ',
  'xtu':'っ', 'xtsu':'っ',
  'wi':'うぃ', 'we':'うぇ',
  'va':'ヴぁ', 'vi':'ヴぃ', 'vu':'ヴ', 've':'ヴぇ', 'vo':'ヴぉ'
};

/*
 * roman -> hiragana
 *
 * @param (String) roman:
 * @return (String): hiragana
 */
function r2h(roman) {
  var i, iz, match, regex,
      hiragana = '', table = roman2hiragana;

  regex = new RegExp((function(table){
    var key,
        s = '^(?:';

    for (key in table) if (table.hasOwnProperty(key)) {
      s += key + '|';
    }
    return s + '(?:n(?![aiueo]|y[aiueo]|$))|' + '([^aiueon])\\1)';
  })(table));
  for (i = 0, iz = roman.length; i < iz; ++i) {
    if (match = roman.slice(i).match(regex)) {
      if (match[0] === 'n') {
        hiragana += 'ん';
      } else if (/^([^n])\1$/.test(match[0])) {
        hiragana += 'っ';
        --i;
      } else {
        hiragana += table[match[0]];
      }
      i += match[0].length - 1;
    } else {
      hiragana += roman[i];
    }
  }
  return hiragana;
}

function bright(fingerNo){
  const finger = document.querySelector(".border-radius"+fingerNo)
  finger.classList.add("bright")
  // setTimeout(() => {
  // finger.classList.remove("bright")
  // }, 1500);
  console.log("!")
  }
  function brightKey(keyStr){
    const key = document.querySelector("#"+keyStr)
    if(key!=undefined){
      key.classList.add("bright")
    }
  }
function offAll(){
  document.querySelector(".border-radius1").classList.remove("bright")
  document.querySelector(".border-radius2").classList.remove("bright")
  document.querySelector(".border-radius3").classList.remove("bright")
  document.querySelector(".border-radius4").classList.remove("bright")
  document.querySelector(".border-radius5").classList.remove("bright")
  document.querySelector(".border-radius6").classList.remove("bright")
  document.querySelector(".border-radius7").classList.remove("bright")
  document.querySelector(".border-radius8").classList.remove("bright")
  document.querySelector(".border-radius9").classList.remove("bright")
  document.querySelector(".border-radius10").classList.remove("bright")

}

function offAllKey(){
  const keyList = document.querySelectorAll(".key")
  for (const key of keyList){
    key.classList.remove("bright");
  }
}