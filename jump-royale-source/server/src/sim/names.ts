export const REBUKES = ['Stop that', 'Calm down', 'What would your mother say', 'Woah buddy', 'Nice try. New name.', 'Keep it friendly', 'That name needs a timeout', 'Try a little kindness', 'The mountain says no', 'Better name, better climb'];
export const nameRebuke = (): string => REBUKES[Math.floor(Math.random() * REBUKES.length)];
export function isBadName(name: string): boolean {
  const lookalikes: Record<string,string> = {'а':'a','е':'e','і':'i','о':'o','с':'c','р':'p','х':'x','у':'y','α':'a','ο':'o'};
  const normalized=name.normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\u200b-\u200f\u202a-\u202e\u2060-\u206f]/g,'').replace(/[аеіосрхуαο]/g,c=>lookalikes[c]).replace(/[013457@$!|]/g,c=>({'0':'o','1':'i','3':'e','4':'a','5':'s','7':'t','@':'a','$':'s','!':'i','|':'i'}[c]!));
  const compact=normalized.replace(/[^a-z]/g,'').replace(/(.)\1+/g,'$1');
  // One arbitrary inserted letter, at any position, catches deliberate evasions.
  // Limit fuzzy matching to unmistakable longer terms to avoid short-word collisions.
  const severe=['nigger','nigga','faggot','wetback','raghead','towelhead','heilhitler','whitepower','siegheil'];
  const letters=normalized.replace(/[^a-z]/g,'');
  for(const term of severe) {
    if(letters.includes(term))return true;
    for(let gap=1;gap<term.length;gap++) {
      if(new RegExp(term.slice(0,gap)+'[a-z]'+term.slice(gap)).test(letters))return true;
    }
    const collapsed=term.replace(/(.)\1+/g,'$1');
    for(let gap=1;gap<collapsed.length;gap++)if(new RegExp(collapsed.slice(0,gap)+'[a-z]?'+collapsed.slice(gap)).test(compact))return true;
  }
  if(/nig[aeiou]*[gr]|niga|fagot|kike|chink|gook|wetback|raghead|towelhead|heilhitler|whitepower|siegheil/.test(compact))return true;
  return /(?:^|[^a-z])(?:spic|spick|coon|nazi|kkk|retard|tranny|cunt)(?:s|ed)?(?:$|[^a-z])/.test(normalized);
}
export function safePlayerName(value: string): string {
  if(isBadName(value))return 'Calm down';
  const name=value.normalize('NFKC').replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060-\u206f]/g,'').trim().slice(0,18);
  return isBadName(name)?'Calm down':name || 'Apprentice';
}
