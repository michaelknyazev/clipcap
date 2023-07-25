import { Button, Icon, Intent, NonIdealState, Tag } from "@blueprintjs/core";
import { PageLayout } from "../components/layouts/PageLayout";
import { useRouter } from "next/router";

const PaywallPage = () => {
  const router = useRouter();

  const handlePay = () => {

  }

  const handleWait = () => {
    router.push('/');
  }

  return (
    <PageLayout>
      <PageLayout.Section empty>
        <NonIdealState
          icon={<Icon iconSize={40} icon="dollar" />}
          title="Free limit reached!"
          description={
            <>
            You have reached your monthly free limit of 10 summaries. To continue saving time with our AI-summary extension, please upgrade to our
            <Tag intent={Intent.SUCCESS} style={{ margin: "0 5px" }}>PRO</Tag>
            subscription
            </>
          }
        />
      </PageLayout.Section>
      <PageLayout.Section>
        <Button large intent={Intent.SUCCESS} fill icon="credit-card">Upgrade</Button>
      </PageLayout.Section>
      <PageLayout.Section>
        <Button onClick={handleWait} large intent={Intent.NONE} fill icon="time">I'll wait to the next month</Button>
      </PageLayout.Section>
    </PageLayout>
  )
}

export default PaywallPage;