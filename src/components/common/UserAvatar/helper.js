import initials from 'initials';

export const getAbbr = name => {
  let abbr = initials(name);
  if (name.startsWith('+')) {
    abbr = `+${abbr}`;
  }
  if (!abbr) {
    console.warn('Could not get abbr from name');
    abbr = name;
  }
  return abbr;
};
