export const getPhoneMask = (value: string) => {
  const strNumbers = value.replace(/\D/g, "");
  let finalString = '';

  for (let index = 0; index < strNumbers.length; index++) {
    const element = strNumbers[index];

    if (index === 0)
      finalString += `(${element}`;

    else if (index === 1)
      finalString += `${element}) `;

    else if (index === 7)
      finalString += `-${element}`;

    else
      finalString += element;
  }

  return finalString;
}