import { daoSearch } from "./daoSearch";
import { ensToAddress } from "./ensClient";
import type { SearchInputType, SearchResultType } from "./parseInput";
import { parseInput } from "./parseInput";

export async function fetchSearchResults(searchInput: string) {
  if (searchInput === null || searchInput === "" || searchInput === undefined) {
    return [];
  }
  const regexAddress = /^0x[\dA-Fa-f]{40}$/;
  const regexEns = /^(?:[\dA-Za-z](?:[\dA-Za-z\-]{0,61}[\dA-Za-z])?\.)+eth$/;
  const parsedSearchInput: SearchInputType | null = parseInput(searchInput);

  const address_or_ens = parsedSearchInput?.address ?? parsedSearchInput?.ens;
  console.log("parsedSearchInput: ", parsedSearchInput);
  const dao_or_chainid = parsedSearchInput?.daoOrChainID;

  const daoResult = await daoSearch(String(dao_or_chainid));

  // default dao (arbitrum) if dao slug or chainId not defined
  let daoId = daoResult?.daoId ?? "eip155:42161";
  let governorId =
    daoResult?.governorId ??
    "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9";

  if (regexAddress.test(String(`0x${address_or_ens}`))) {
    console.log("The string is valid Address.");

    const response = await fetch("https://api.tally.xyz/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.TALLY_API_KEY || "",
      },
      body: JSON.stringify({
        query: `
        query SearchByAddress($address: Address!, $governorId: AccountID!, $input: DelegateInput!, $proposalsCreatedCountInput: ProposalsCreatedCountInput!, $accountId: AccountID!) {
          address(address: $address) {
            ethAccount {
              address
              bio
              picture
              name
              twitter
              ens
              type
              isOFAC
              votes(governorId: $governorId)
            }
          }
          delegate(input: $input) {
            statement {
              id
              address
              organizationID
              issues {
                id
                name
                organizationId
                description
              }
              statementSummary
              dataSource
              dataSourceURL
              discourseUsername
              discourseProfileLink
              isSeekingDelegation
            }
          }
          account(id: $accountId) {
            proposalsCreatedCount(input: $proposalsCreatedCountInput)
          }
          delegate(input: $input) {
            delegatorsCount
            votesCount
            token {
              id
              name
              symbol
              decimals
            }
          }
        }`,
        variables: {
          address: address_or_ens,
          governorId: governorId,
          accountId: `${daoId}:${address_or_ens}`,
          input: {
            address: address_or_ens,
            governorId: governorId,
          },
          proposalsCreatedCountInput: {
            governorId: governorId,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const _searchResult = data?.data ?? [];
    const searchResult: SearchResultType = {
      name: _searchResult?.address?.ethAccount?.name,
      picture: _searchResult?.address?.ethAccount?.picture,
      bio: _searchResult?.address?.ethAccount?.bio,
      address: _searchResult?.address?.ethAccount?.address,
      ens: _searchResult?.address?.ethAccount?.ens,
      votes: _searchResult?.address?.ethAccount?.votes,
      tokenSymbol: _searchResult?.delegate?.token?.symbol,
      tokenDecimals: _searchResult?.delegate?.token?.decimals,
      statementSummary: _searchResult?.delegate?.statement?.statementSummary,
      delegatorsCount: _searchResult?.delegate?.delegatorsCount,
    };

    return searchResult; // Return search result
  } else if (regexEns.test(String(address_or_ens))) {
    const addressEns = await ensToAddress(String(address_or_ens));
    const response = await fetch("https://api.tally.xyz/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.TALLY_API_KEY || "",
      },
      body: JSON.stringify({
        query: `
        query SearchByEns($searchString: String!, $governorId: AccountID!, $input: DelegateInput!, $proposalsCreatedCountInput: ProposalsCreatedCountInput!, $accountId: AccountID!) {
          accountByEns(ens: $searchString) {
            address
            bio
            email
            picture
            name
            twitter
            ens
            type
            isOFAC
            votes(governorId: $governorId)
          }
          delegate(input: $input) {
            statement {
              id
              address
              organizationID
              issues {
                id
                name
                organizationId
                description
              }
              statementSummary
              dataSource
              dataSourceURL
              discourseUsername
              discourseProfileLink
              isSeekingDelegation
            }
          }
          account(id: $accountId) {
            proposalsCreatedCount(input: $proposalsCreatedCountInput)
          }
          delegate(input: $input) {
            delegatorsCount
            votesCount
            token {
              id
              name
              symbol
              decimals
            }
          }
        }`,
        variables: {
          searchString: address_or_ens,
          governorId: governorId,
          accountId: `${daoId}:${addressEns}`,
          input: {
            address: addressEns,
            governorId: governorId,
          },
          proposalsCreatedCountInput: {
            governorId: governorId,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    //const searchResult = data?.data?.accountByEns ?? [];
    const _searchResult = data?.data ?? [];
    const searchResult: SearchResultType = {
      name: _searchResult?.accountByEns?.name,
      picture: _searchResult?.accountByEns?.picture,
      bio: _searchResult?.accountByEns?.bio,
      address: _searchResult?.accountByEns?.address,
      ens: _searchResult?.accountByEns?.ens,
      votes: _searchResult?.accountByEns?.votes,
      tokenSymbol: _searchResult?.delegate?.token?.symbol,
      tokenDecimals: _searchResult?.delegate?.token?.decimals,
      statementSummary: _searchResult?.delegate?.statement?.statementSummary,
      delegatorsCount: _searchResult?.delegate?.delegatorsCount,
    };
    return searchResult; // Return search result
  } else {
    console.log("address_or_ens ", address_or_ens);
    console.log("The string is invalid.");
    return [];
  }
}
