"use client";
import StyledButtonClient from "@/app/components/StyledButtonClient";
import ProgressBarClient from "@/app/components/ProgressBarClient";
import StyledRadioOptionClient from "@/app/components/StyledRadioClient";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import useSWR from "swr";

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

const VoteInCampaignPage = ({
  params: { vote },
}: {
  params: { vote: string };
}) => {
  const router = useRouter();
  const [submitted, setSubmitted] = React.useState(false);
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

  async function fetchCampaignVotes() {
    const response = await fetch(`/api/campaign/votes/${vote}`, {
      next: { revalidate: 5 },
    });
    const campaignVotes = await response.json();
    return campaignVotes;
  }

  const { data, isLoading } = useSWR(
    `/api/campaign/votes/${vote}`,
    fetchCampaignVotes,
    { refreshInterval: 10000 }
  );

  console.log("Data received", data);

  const handlePrev = () => {
    router.back();
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
            {submitted && (
              <>
                <h2 className="my-5 text-3xl font-bold tracking-tight text-gray-300">
                  Campaign <span className="text-cyan-200">Standings</span>
                </h2>
                <h3
                  className="my-5 text-2xl font-bold tracking-tight text-gray-300"
                  id="campaign-radio-group"
                >
                  Topic Here
                </h3>
                {[1, 2, 3, 4].map((i) => (
                  <ProgressBarClient
                    label={`Option ${i}`}
                    value={25 * i}
                    maxValue={100}
                  />
                ))}
              </>
            )}

            {!submitted && (
              <Formik
                initialValues={{
                  picked: "",
                }}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  setSubmitted(true);
                  console.log("Picked", values);
                }}
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
                      {[1, 2, 3, 4].map((i) => (
                        <StyledRadioOptionClient
                          name="picked"
                          value={i.toString()}
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
      <div></div>
    </div>
  );
};

export default VoteInCampaignPage;
