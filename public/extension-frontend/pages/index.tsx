import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { AuthenticationContext } from "@clipcap/contexts";
import { SummarizeService } from "@clipcap/services";

import { PageLayout } from "../components/layouts/PageLayout";
import { YoutubeSummary } from "../components/features/YoutubeSummary/YoutubeSummary";

import type { TSummary } from "@clipcap/types";

const HomePage = () => {
  const router = useRouter();
  const { GetAccessToken } = useContext(AuthenticationContext);
  const { videoId } = router.query
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<TSummary[]>([]);

  const handleSummarize = async (targetVideoId: string) => {
    console.log(`Summarizing ${targetVideoId}`);

    setLoading(true)

    let summary: TSummary[] = [];

    try {
      const access_token = await GetAccessToken();
      if (access_token === '') throw new Error('Unauthorized');

      const { success, event, result } = await SummarizeService.Youtube(
        access_token,
        targetVideoId
      );
      if (!success) throw new Error(event);

      summary = result;
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    setSummary(summary);
  };

  const handleClickSummaryButton = () => {
    return handleSummarize(videoId as string);
  }

  return (
    <PageLayout>
      <YoutubeSummary 
        loading={loading}
        summary={summary}
        onSummarizeButtonClick={handleClickSummaryButton}
      />
    </PageLayout>
  )
}

export default HomePage;
