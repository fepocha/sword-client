function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) return `rgb(var(${variable}))`;

    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  transparent: 'transparent',
    white: {
      light: withOpacityValue('--color-white-light'),
      mid: withOpacityValue('--color-white-mid'),
      dark: withOpacityValue('--color-white-dark'),
    },
    gray: {
      light: withOpacityValue('--color-gray-light'),
      mid: withOpacityValue('--color-gray-mid'),
      dark: withOpacityValue('--color-gray-dark'),
    },
    black: {
      light: withOpacityValue('--color-black-light'),
      mid: withOpacityValue('--color-black-mid'),
      dark: withOpacityValue('--color-black-dark'),
    },
    orange: {
      light: withOpacityValue('--color-orange-light'),
      mid: withOpacityValue('--color-orange-mid'),
      dark: withOpacityValue('--color-orange-dark'),
    },
    blue: {
      mid: withOpacityValue('--color-blue-light'),
    },
}
