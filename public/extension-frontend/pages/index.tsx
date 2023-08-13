import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { AuthenticationContext } from "@clipcap/contexts";
import { SummarizeService } from "@clipcap/services";

import { PageLayout } from "../components/layouts/PageLayout";
import { YoutubeContainer } from "../components/features/Youtube/YoutubeContainer";

import { parseDate } from "@clipcap/helpers";
import { Button, Intent } from "@blueprintjs/core";

import type { TFeature, TSummary } from "@clipcap/types";

const HomePage: TFeature = () => {
  const router = useRouter();
  const { GetAccessToken } = useContext(AuthenticationContext);
  const { videoId } = router.query
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<TSummary[]>([]);
  const [showCopyIcon, setShowCopyIcon] = useState<boolean>(false);

  const handleSummarize = async (targetVideoId: string) => {
    // debug(`Summarizing ${targetVideoId}`);

    setLoading(true)

    let summary: TSummary[] = [];

    try {
      const access_token = await GetAccessToken();
      if (access_token === '') throw new Error('Unauthorized');

      const { success, event, result } = await SummarizeService.Youtube(
        access_token,
        targetVideoId
      );
      if (!success) {
        switch(event) {
          case "LIMIT_REACHED":
            router.push('/paywall');
            return;
          default:
          throw new Error(event);
        }
      }

      summary = result;
    } catch (err) {
      // debug({err});
    }

    setLoading(false);
    setSummary(summary);
  };

  const handleClickSummaryButton = () => {
    return handleSummarize(videoId as string);
  }

  const fallbackCopyTextToClipboard = (text: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      // console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  const handleCopySummary = () => {
    setShowCopyIcon(true)
    const text = summary.map(({ emoji, start, title, content }) => {
      let formattedEmoji = emoji;

      if (formattedEmoji.length > 2) {
        formattedEmoji = emoji.split('')[0];
      }
    
      const _startTs = parseDate(start * 1000);
    
      let readable = _startTs.utc_readable_time;
    
      if (start / 60 / 60 >= 1) readable = _startTs.utc_readable_time_hh;

      return `${emoji} \`${readable}\` **${title}**\n${content}\n`;
    }).join("\n");

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }

    navigator.clipboard.writeText(text);

    setTimeout(() => {
      setShowCopyIcon(false)
    }, 1000);
  }

  return (
    <PageLayout>
      <PageLayout.Section>
        <YoutubeContainer 
          loading={loading}
          summary={summary}
          onSummarizeButtonClick={handleClickSummaryButton}
        />
      </PageLayout.Section>
      <PageLayout.Section>
        {summary.length ? (
          <Button onClick={handleCopySummary} fill minimal={showCopyIcon} intent={Intent.SUCCESS} icon={showCopyIcon ? "tick" : "duplicate"}>
            {showCopyIcon ? "Скопировано" : "Копировать"}
          </Button>
        ) : ""}
      </PageLayout.Section>
    </PageLayout>
  )
}

export default HomePage;
