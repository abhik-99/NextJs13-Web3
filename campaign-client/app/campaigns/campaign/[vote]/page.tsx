"use client";
import StyledButtonClient from "@/app/components/StyledButtonClient";
import ProgressBarClient from "@/app/components/ProgressBarClient";
import StyledRadioOptionClient from "@/app/components/StyledRadioClient";
import contractAbi from "@/app/blockchain/contract_abi.json";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { useAccount, useConnect, usePublicClient } from "wagmi";
import { writeContract } from "@wagmi/core";
import axios from "axios";
import { polygonMumbai } from "viem/chains";
import StyledInputClient from "@/app/components/StyledInputClient";

type Campaign = {
  id: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    name: string;
    walletAddress: string;
  };
  creatorId: string;
  contractCampaignId: string;
  verifiedCampaign: boolean;
  transactionHash: string;
  startTime: string;
  endTime: string;
  topic: string;
  options: string[];
  votes: {
    option: string;
    createdAt: string;
    voter: {
      name: string;
      walletAddress: string;
    };
  }[];
};

type Vote = Partial<{
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  option?: number;
}>;

const VoteInCampaignPage = ({
  params: { vote },
}: {
  params: { vote: string };
}) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const publicClient = usePublicClient({ chainId: polygonMumbai.id });
  const router = useRouter();
  const [submitted, setSubmitted] = React.useState(false);
  const [snapshotted, setSnapshotted] = React.useState(false);
  const [campaign, setCampaign] = React.useState<Campaign>();
  React.useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(`/api/campaign/${vote}`);
        const campaign = await response.json();
        setCampaign(campaign);
      } catch (e) {
        console.log("Error occured", e);
        toast.error("Something went wrong");
      }
    }
    fetchCampaign();
  }, []);

  React.useEffect(() => {
    async function fetchUserVote() {
      try {
        const response = await fetch(
          `/api/vote?campaignId=${vote}&walletAddress=${address}`
        );
        const campaign = await response.json();
        if (campaign.voted && !campaign.snapshotted) setSubmitted(true);
        if (campaign.voted && campaign.snapshotted) setSnapshotted(false);
      } catch (e) {
        console.log("Error occured", e);
        toast.error("Something went wrong");
      }
    }
    fetchUserVote();
  }, []);

  async function fetchCampaignVotes() {
    const response = await fetch(`/api/campaign/votes/${vote}`, {
      next: { revalidate: 5 },
    });
    const campaignVotes = await response.json();
    return campaignVotes;
  }

  const { data }: { data: Vote[] } = useSWR(
    `/api/campaign/votes/${vote}`,
    fetchCampaignVotes,
    { refreshInterval: 10000 }
  );

  console.log("Data received", data);

  const handlePrev = () => {
    router.back();
  };

  const handleVote = async (values: { picked: string }) => {
    try {
      if (!isConnected) connect();

      const {
        data: { signedMessage, eat, nonce },
      } = await axios.get("/api/sig-token");
      const { hash } = await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: "vote",
        args: [
          vote,
          values.picked,
          { signature: signedMessage, eat: BigInt(eat), nonce: nonce },
        ],
      });
      toast.loading(
        `Submitted Vote to Contract. Trn Hash: ${hash.slice(0, 10)}...`
      );
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      if (receipt.status === "success") {
        const vote = await axios.post("/api/vote", { hash });
        toast.success("Vote Casted");
        setSubmitted(true);
        if (vote.status === 200 && vote.data.vote?.id) setSnapshotted(true);
      } else {
        toast.error("Transaction reverted!");
      }
    } catch (error) {
      console.log("Error Occured", error);
      toast.error("Something went wrong");
    }
  };

  const handleSnapshot = async (values: { hash: string }) => {
    const vote = await axios.post("/api/vote", { hash: values.hash });
    if (vote.status === 200 && vote.data.vote?.id) {
      setSnapshotted(true);
      toast.success("Vote Snapshotted successfully");
    }
  };

  return (
    <div>
      <h1 className="my-10 text-center text-6xl font-bold tracking-tight text-gray-500">
        Campaign
      </h1>
      <nav className="m-2 text-gray-400 hover:text-gray-200">
        <button onClick={handlePrev}>
          <p>{`<`} Back to Campaigns</p>
        </button>
      </nav>
      <main className="m-2 min-w-full border border-gray-500 rounded-lg">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="h-full w-full p-2 md:p-10 lg:p-15 flex flex-col items-start justify-center text-gray-300 font-semibold">
            <h2 className="my-5 text-3xl font-bold tracking-tight">
              Campaign Details
            </h2>
            <p>
              Created By:{" "}
              <span className="text-gray-50 font-normal">
                {campaign?.creator?.name}
              </span>
            </p>
            <p>
              Wallet Address:{" "}
              <span className="text-gray-50 font-normal">{`${campaign?.creator.walletAddress.slice(
                0,
                5
              )}...${campaign?.creator.walletAddress.slice(
                campaign?.creator.walletAddress.length - 5,
                campaign?.creator.walletAddress.length
              )}`}</span>
            </p>
            <p>
              Created At:{" "}
              <span className="text-gray-50 font-normal">
                {campaign?.createdAt}
              </span>
            </p>
            <p>
              Creation Hash:{" "}
              <span className="text-gray-50 font-normal">{`${campaign?.transactionHash.slice(
                0,
                5
              )}...${campaign?.transactionHash.slice(
                campaign?.transactionHash.length - 5,
                campaign?.transactionHash.length
              )}`}</span>
            </p>
            <p>
              Start Time:{" "}
              <span className="text-gray-50 font-normal">
                {campaign?.startTime}
              </span>
            </p>
            <p>
              End Time:{" "}
              <span className="text-gray-50 font-normal">
                {campaign?.endTime}
              </span>
            </p>
          </div>
          <div className="h-full w-full p-2 md:p-10 lg:p-15 flex flex-col items-start justify-center bg-gray-800">
            {submitted && snapshotted && (
              <div className="text-gray-200">
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <p>You have already Voted.</p>
              </div>
            )}
            {submitted && !snapshotted && (
              <div className="text-gray-200">
                <h2 className="text-2xl font-bold">Vote Not Snapshotted!</h2>
                <p>
                  You have already Voted but your vote has not been snapshotted.
                </p>
                <p>Enter transaction hash below and submit.</p>
                <Formik
                  initialValues={{
                    hash: "",
                  }}
                  onSubmit={handleSnapshot}
                  validate={(values) => {
                    if (values.hash.length === 0)
                      return { picked: "*Enter a valid hash" };
                  }}
                >
                  <StyledInputClient
                    name="hash"
                    placeholder="Enter Transaction Hash..."
                  />
                  <StyledButtonClient>Submit</StyledButtonClient>
                </Formik>
              </div>
            )}
            {!submitted && (
              <Formik
                initialValues={{
                  picked: "",
                }}
                onSubmit={handleVote}
                validate={(values) => {
                  if (values.picked === "")
                    return { picked: "*Please Select one option" };
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="min-w-full">
                    <h3
                      className="my-5 text-2xl font-bold tracking-tight"
                      id="campaign-radio-group"
                    >
                      Topic Here
                    </h3>
                    <div
                      role="group"
                      aria-labelledby="campaign-radio-group"
                      className="block my-6"
                    >
                      {campaign?.options.map((option, i) => (
                        <StyledRadioOptionClient
                          name="picked"
                          value={option}
                          label={`Option ${i}`}
                        />
                      ))}
                    </div>

                    <StyledButtonClient type="submit" disabled={isSubmitting}>
                      Submit
                    </StyledButtonClient>
                    <ErrorMessage
                      name="picked"
                      component="div"
                      className="mt-4"
                    />
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </main>
      <div className="min-w-full text-gray-400 py-5">
        <h2 className="my-6 text-4xl font-bold tracking-tight">
          Campaign <span className="text-cyan-200">Standings</span>
        </h2>
        <div>
          <h3 className="text-2xl">
            Total Votes:{" "}
            <span className="font-bold text-gray-300">{data?.length}</span>
          </h3>
          {campaign?.options.map((option, idx) => (
            <>
              <h4 className="text-lg font-bold mt-10">
                Option {idx + 1}:{" "}
                <span className="text-gray-300">
                  {data.filter((vote) => vote.option === idx + 1).length}
                </span>
              </h4>
              <ProgressBarClient value={25 * idx} maxValue={100} />
              <p className="text-sm text-gray-400">
                <span className="font-bold">Details:</span> {option}
              </p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoteInCampaignPage;
