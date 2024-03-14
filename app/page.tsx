import type { FrameReducer, NextServerPageProps } from "frames.js/next/server";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";

import { createDebugUrl, DEFAULT_DEBUGGER_HUB_URL } from "./debug";
import { ellipsisAddress } from "./lib/ellipsisAddress";
import { formatNumber } from "./lib/formatNumber";
import { isObjectEmpty } from "./lib/isEmpty";
import type { SearchResultType } from "./lib/parseInput";
import { fetchSearchResults } from "./lib/tallySearch";
import { currentURL } from "./utils";

type State =
  | {
      page: "initial";
    }
  | {
      page: "result";
    }
  | { page: "notfound" };

const initialState: State = { page: "initial" };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;

  switch (state.page) {
    case "initial":
      return buttonIndex === 1 ? { page: "result" } : state;
    case "result":
      return buttonIndex === 1 ? { page: "initial" } : state;
    case "notfound":
      return buttonIndex === 1 ? { page: "initial" } : state;
    default:
      return { page: "initial" };
  }
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/");
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame,
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  console.log("info: state is:", state);
  const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
  console.log("info: baseUrl is:", baseUrl);

  function isSearchResultType(value: any): value is SearchResultType {
    console.log("VALUE ", value);
    return value && typeof value === "object" && "name" in value;
  }

  // Function to fetch search results or return a default value
  async function getSearchResult(
    state: any,
    previousFrame: any,
  ): Promise<SearchResultType> {
    const result =
      state?.page === "result"
        ? await fetchSearchResults(
            String(previousFrame.postBody?.untrustedData.inputText),
          )
        : {
            // Default values for SearchResultType
          };

    if (isSearchResultType(result)) {
      return result;
    } else {
      //throw new Error("Result is not of type SearchResultType");
      console.log("Result is not of type SearchResultType");
      return {} as SearchResultType;
    }
  }

  const searchResult: SearchResultType = await getSearchResult(
    state,
    previousFrame,
  );

  const initialPage = [
    <FrameImage key="landing-image" aspectRatio="1.91:1">
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #725bff, #7274ff)",
          fontSize: 40,
          color: "white",
          padding: "2rem",
          letterSpacing: 1,
          fontWeight: 400,
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <img
          src={`${baseUrl}/tally-logo.png`}
          width={256}
          height={256}
          alt="tally logo"
          tw="mt-3"
        />
        <h1 tw="-mt-3">Browse and Search Delegates</h1>
      </div>
    </FrameImage>,
    <FrameInput key="search-input" text="Type [Dao|chainID]@[Address|Ens]" />,
    <FrameButton key="search-button">Search</FrameButton>,
  ];

  const notfoundPage = [
    <FrameImage key="search-notfound" aspectRatio="1.91:1">
      <div
        tw="flex w-full h-full"
        style={{
          backgroundImage: "linear-gradient(to bottom, #725bff, #1d173f)",
        }}
      >
        <div tw="flex flex-col w-full h-full items-center justify-center">
          <h2 tw="flex flex-col text-[164px] font-bold tracking-tight text-white">
            <span tw="items-center justify-center pb-6">Oops!</span>
            <span tw="text-red-200 text-5xl pb-3">
              Sorry! we are unable to find what you are looking for...
            </span>
            <span tw="items-center justify-center text-5xl text-indigo-100">
              Check your input and try again!
            </span>
          </h2>
        </div>
      </div>
    </FrameImage>,
    <FrameButton key="tryagain-button">Try again</FrameButton>,
  ];

  const resultPage = [
    <FrameImage key="search-result" aspectRatio="1.91:1">
      <div tw="flex flex-col border bg-white p-21">
        <div tw="flex items-start mt-8">
          <div tw="flex shrink-0">
            <img
              alt="profile avatar"
              tw="h-36 w-36 rounded-full mr-6"
              height="36"
              src={
                searchResult?.picture
                  ? searchResult?.picture
                  : `https://effigy.im/a/${searchResult?.address}.png`
              }
              style={{
                objectFit: "cover",
              }}
              width="36"
            />
          </div>
          <div tw="flex flex-col flex-1 min-w-0">
            <p tw="text-[64px] font-medium leading-5 text-gray-900">
              {searchResult?.name !== ""
                ? searchResult?.name
                : searchResult?.ens
                  ? searchResult?.ens
                  : ellipsisAddress(searchResult?.address)}
            </p>
            <p tw="mt-1 text-[48px] leading-5 text-gray-500">
              {searchResult?.votes ? formatNumber(searchResult?.votes) : 0}{" "}
              {searchResult?.tokenSymbol}
            </p>
          </div>
        </div>
        <div tw="flex -mt-6">
          <p tw="max-h-[233px] text-[38px] flex leading-10 text-gray-900 overflow-hidden">
            {/*I would like to contribute to DeFi development on Arbitrum and
            support investing in Layer 2 scaling solutions. Additionally, I
            believe public goods funding is crucial for ecosystem development,
            similar to the positive impact of the Optimism Grants.*/}
            {searchResult?.statementSummary
              ? searchResult?.statementSummary
              : searchResult?.bio
                ? searchResult?.bio
                : "No existing statement or bio..."}
          </p>
        </div>
        <div tw="flex items-center justify-between">
          <p tw="flex text-[38px] leading-5 text-[#725bff]">
            Trusted by {searchResult?.delegatorsCount} accounts
          </p>
        </div>
      </div>
    </FrameImage>,
    <FrameButton key="back-button">Back</FrameButton>,
    <FrameButton
      action="link"
      key="visit-profile"
      target={`https://tally.xyz/profile/${searchResult?.address}`}
    >
      Visit profile
    </FrameButton>,
  ];

  console.log("searchResult ", searchResult);

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
      <FrameContainer
        postUrl="/frames"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {state.page === "initial"
          ? initialPage
          : state.page === "result" && !isObjectEmpty(searchResult)
            ? resultPage
            : notfoundPage}
      </FrameContainer>
    </div>
  );
}
