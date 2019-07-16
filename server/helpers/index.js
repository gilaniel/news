const translateArr = {
  ' ': '_',
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  ы: 'i',
  э: 'e',
  ё: 'yo',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ю: 'yu',
  я: 'ya'
};

module.exports = {
  grouped_each: (every, context, options) => {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
  },

  translite: (str) => {
    str = str.replace(/ /g,'_');

    const replacer = (a) => { return translateArr[a] || a };

    return str.replace(/[А-яёЁ]/g,replacer).replace(/[ъь]+/g, '').replace(/,/g, '');
  }
}