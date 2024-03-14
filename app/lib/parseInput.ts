export type SearchResultType = {
  name?: string;
  picture?: string;
  bio?: string;
  address: string;
  ens?: string;
  votes?: string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  statementSummary?: string;
  delegatorsCount?: number;
};

export type SearchInputType = {
  daoOrChainID?: string;
  address?: string;
  ens?: string;
};

export function detectInputType(input: string) {
  // Check if the input is empty
  if (input.trim() === "") {
    return "empty";
  }
  // Check if the input contains only numbers
  const onlyNumbers = /^\d+$/.test(input);
  if (onlyNumbers) {
    return "numbers";
  }
  // Check if the input contains only letters and hyphens
  const onlyLettersAndHyphens = /^[A-Za-z\-]+$/.test(input);
  if (onlyLettersAndHyphens) {
    return "letters";
  }
  // Check if the input contains both numbers and letters (including hyphens)
  const mixedContent = /^(?=.*[A-Za-z\-])(?=.*\d).+$/.test(input);
  if (mixedContent) {
    return "mixed";
  }
  // If none of the above conditions are met, the input contains invalid characters
  return "invalid";
}

export function parseInput(input: string) {
  const _input = input.trim().toLowerCase();
  // Updated regex to correctly handle hyphens in Dao or chainID
  const regex =
    /^(?:([\dA-Za-z-]+|\d+)@)?(?:0x([\dA-Fa-f]{40})|((?:[\dA-Za-z](?:[\dA-Za-z\-]{0,61}[\dA-Za-z])?\.)+eth))$/;
  const match = _input.match(regex);

  if (match) {
    const daoOrChainID = match[1]; // First capturing group for Dao or chainID
    const address = match[2]; // Second capturing group for Address
    const ens = match[3]; // Third capturing group for Ens

    return {
      daoOrChainID: daoOrChainID?.trim().toLowerCase(),
      address: address?.trim(),
      ens: ens?.trim().toLowerCase(),
    };
  } else {
    return null; // Return null if no match found
  }
}
